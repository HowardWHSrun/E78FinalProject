"""
Background DSP worker that ties PlutoSDR RX, impairments, synchronisation,
and demodulation into a continuous pipeline.

Runs as a QThread.  Instead of emitting Qt signals per buffer (which floods
the GUI event loop), the worker stores the latest processed results in
shared attributes that the GUI timer reads at its own pace (~20 FPS).
"""

import traceback
import numpy as np
from PyQt6.QtCore import QThread, pyqtSignal, QMutex, QMutexLocker

from modulation import (
    demodulate, compute_ber, compute_evm,
    ideal_symbols_for, rrc_filter, SCHEMES,
)
from impairments import apply_impairments
from synchronization import build_tx_frame, synchronize, PREAMBLE_LEN
from pluto_interface import PlutoInterface, HardwareError

PAYLOAD_BITS = 2048
SPS = 8
ALPHA = 0.35
NUM_TAPS = 101


class DSPWorker(QThread):
    """Continuous receive -> impair -> sync -> demod pipeline."""

    sig_status = pyqtSignal(str)
    sig_hw_error = pyqtSignal(str)  # emitted when PlutoSDR disconnects

    def __init__(self, pluto: PlutoInterface, parent=None):
        super().__init__(parent)
        self.pluto = pluto
        self._running = False
        self._mutex = QMutex()

        # Modulation state
        self._scheme = "QPSK"
        self._tx_bits = None
        self._rrc_taps = None

        # Impairment parameters (written by GUI thread, read by worker)
        self.imp_snr_db = 40.0
        self.imp_phase_deg = 0.0
        self.imp_freq_hz = 0.0
        self.imp_mp_delay = 0
        self.imp_mp_amp = 0.0
        self.imp_fading_k = 40.0

        # --- Shared latest-result slots (written by worker, read by GUI) ---
        self._data_mutex = QMutex()
        self.latest_raw_iq = None
        self.latest_impaired_iq = None
        self.latest_rx_symbols = None
        self.latest_ideal_symbols = None
        self.latest_mf_samples = None
        self.latest_ber = 0.0
        self.latest_evm = 0.0
        self.latest_snr = 50.0
        self.latest_freq_off = 0.0
        self.latest_phase_off = 0.0
        self.latest_bits_decoded = 0
        self.has_new_data = False

    # ------------------------------------------------------------------
    # Public interface (called from GUI thread)
    # ------------------------------------------------------------------

    def set_scheme(self, scheme_name: str):
        with QMutexLocker(self._mutex):
            self._scheme = scheme_name
            self._rebuild_tx()

    def request_stop(self):
        self._running = False

    def read_latest(self):
        """Non-blocking read of the most recent results.  Returns None
        if no new data is available since the last read."""
        with QMutexLocker(self._data_mutex):
            if not self.has_new_data:
                return None
            result = dict(
                raw_iq=self.latest_raw_iq,
                impaired_iq=self.latest_impaired_iq,
                rx_symbols=self.latest_rx_symbols,
                ideal_symbols=self.latest_ideal_symbols,
                mf_samples=self.latest_mf_samples,
                ber=self.latest_ber,
                evm=self.latest_evm,
                snr=self.latest_snr,
                freq_off=self.latest_freq_off,
                phase_off=self.latest_phase_off,
                bits_decoded=self.latest_bits_decoded,
            )
            self.has_new_data = False
            return result

    # ------------------------------------------------------------------
    # TX frame construction
    # ------------------------------------------------------------------

    def _rebuild_tx(self):
        bps = SCHEMES[self._scheme]["bits_per_symbol"]
        self._tx_bits = np.random.randint(0, 2, PAYLOAD_BITS).astype(np.int8)

        cmap = SCHEMES[self._scheme]["map"]
        num_syms = PAYLOAD_BITS // bps
        payload_symbols = np.empty(num_syms, dtype=complex)
        for i in range(num_syms):
            chunk = tuple(int(b) for b in self._tx_bits[i * bps:(i + 1) * bps])
            payload_symbols[i] = cmap[chunk]

        frame_symbols = build_tx_frame(payload_symbols)

        up = np.zeros(len(frame_symbols) * SPS, dtype=complex)
        up[::SPS] = frame_symbols
        self._rrc_taps = rrc_filter(SPS, NUM_TAPS, ALPHA)
        from scipy.signal import fftconvolve
        tx_samples = fftconvolve(up, self._rrc_taps, mode="same")

        self.pluto.start_tx(tx_samples)
        self.sig_status.emit(f"TX: {self._scheme}  "
                             f"{len(frame_symbols)} sym  "
                             f"{len(tx_samples)} samp")

    # ------------------------------------------------------------------
    # Main loop
    # ------------------------------------------------------------------

    def run(self):
        self._running = True

        with QMutexLocker(self._mutex):
            self._rebuild_tx()

        while self._running:
            try:
                self._process_one_buffer()
            except HardwareError as exc:
                self._running = False
                self.sig_hw_error.emit(str(exc))
                break
            except Exception as exc:
                traceback.print_exc()
                self.sig_status.emit(f"DSP error: {exc}")
                self.msleep(50)

        self.pluto.stop_tx()

    def _process_one_buffer(self):
        raw_iq = self.pluto.receive()
        if raw_iq is None or len(raw_iq) == 0:
            return

        sample_rate = self.pluto.sample_rate

        impaired = apply_impairments(
            raw_iq,
            snr_db=self.imp_snr_db,
            phase_deg=self.imp_phase_deg,
            freq_offset_hz=self.imp_freq_hz,
            sample_rate=sample_rate,
            multipath_delay=self.imp_mp_delay,
            multipath_amplitude=self.imp_mp_amp,
            fading_k_db=self.imp_fading_k,
        )

        with QMutexLocker(self._mutex):
            scheme = self._scheme
            rrc = self._rrc_taps
            tx_bits = self._tx_bits

        if rrc is None or tx_bits is None:
            return

        preamble_syms, payload_syms, freq_off, phase_off = synchronize(
            impaired, SPS, rrc, sample_rate, use_gardner=True
        )

        if len(payload_syms) == 0:
            return

        from scipy.signal import fftconvolve as _fftconv
        mf = _fftconv(impaired, rrc, mode="same")

        rx_bits = demodulate(payload_syms, scheme)
        n_bits = len(rx_bits)
        ber = compute_ber(tx_bits, rx_bits)
        ideal = ideal_symbols_for(payload_syms, scheme)
        evm = compute_evm(payload_syms, ideal)

        sig_power = np.mean(np.abs(ideal) ** 2)
        noise_power = np.mean(np.abs(payload_syms - ideal) ** 2)
        if noise_power > 1e-20 and sig_power > 0:
            snr_est = float(np.clip(10 * np.log10(sig_power / noise_power), -10, 60))
        else:
            snr_est = 50.0
        if not np.isfinite(snr_est):
            snr_est = 50.0

        # Store results for the GUI to pick up
        with QMutexLocker(self._data_mutex):
            self.latest_raw_iq = raw_iq
            self.latest_impaired_iq = impaired
            self.latest_rx_symbols = payload_syms
            self.latest_ideal_symbols = ideal
            self.latest_mf_samples = mf
            self.latest_ber = ber
            self.latest_evm = evm
            self.latest_snr = snr_est
            self.latest_freq_off = freq_off
            self.latest_phase_off = phase_off
            self.latest_bits_decoded = n_bits
            self.has_new_data = True

"""
BER-vs-SNR sweep engine.

Runs through the full TX -> channel -> sync -> demod pipeline at each SNR
point for every modulation scheme, collecting measured BER.  Also provides
closed-form theoretical BER curves for comparison.

Can operate in two modes:
  - HARDWARE : transmit/receive through the PlutoSDR at each SNR
  - SOFTWARE : pure simulation (faster, no hardware needed)
"""

import numpy as np
from scipy.special import erfc
from scipy.signal import fftconvolve
from PyQt6.QtCore import QThread, pyqtSignal, QMutexLocker, QMutex

from modulation import rrc_filter, demodulate, compute_ber, SCHEMES
from impairments import add_awgn
from synchronization import build_tx_frame, synchronize, PREAMBLE_LEN
from pluto_interface import PlutoInterface, HardwareError

SPS = 8
ALPHA = 0.35
NUM_TAPS = 101
BITS_PER_POINT = 20_000  # enough bits per SNR point for smooth curves


# -----------------------------------------------------------------------
# Theoretical BER formulas (AWGN, no coding)
# -----------------------------------------------------------------------

def _qfunc(x):
    return 0.5 * erfc(x / np.sqrt(2))


def theoretical_ber(scheme_name: str, ebno_db: np.ndarray) -> np.ndarray:
    """Closed-form BER vs Eb/No (dB) for the given modulation."""
    ebno = 10 ** (ebno_db / 10)
    if scheme_name == "BPSK":
        return _qfunc(np.sqrt(2 * ebno))
    elif scheme_name == "QPSK":
        return _qfunc(np.sqrt(2 * ebno))
    elif scheme_name == "8-PSK":
        return (2 / 3) * _qfunc(np.sqrt(2 * 3 * ebno) * np.sin(np.pi / 8))
    elif scheme_name == "16-QAM":
        return (3 / 8) * erfc(np.sqrt((4 / 10) * ebno))
    return np.zeros_like(ebno_db)


def snr_to_ebno(snr_db: float, bits_per_symbol: int) -> float:
    """Convert per-symbol SNR (Es/No) to Eb/No:  Eb/No = Es/No - 10*log10(k)."""
    return snr_db - 10 * np.log10(bits_per_symbol)


# -----------------------------------------------------------------------
# Sweep worker thread
# -----------------------------------------------------------------------

class BERSweepWorker(QThread):
    """Run a BER sweep across SNR for all modulation schemes."""

    # (scheme_name, snr_db, measured_ber, progress_fraction)
    sig_point = pyqtSignal(str, float, float, float)
    sig_done = pyqtSignal()
    sig_status = pyqtSignal(str)

    def __init__(self, pluto: PlutoInterface, parent=None):
        super().__init__(parent)
        self.pluto = pluto
        self._running = False

        # Sweep parameters (set before start)
        self.snr_min = 0.0
        self.snr_max = 20.0
        self.snr_step = 2.0
        self.use_hardware = False  # True = TX/RX through Pluto

    def request_stop(self):
        self._running = False

    def run(self):
        self._running = True
        schemes = list(SCHEMES.keys())
        snr_values = np.arange(self.snr_min, self.snr_max + 0.1, self.snr_step)
        total_steps = len(schemes) * len(snr_values)
        step = 0

        rrc = rrc_filter(SPS, NUM_TAPS, ALPHA)

        for scheme_name in schemes:
            if not self._running:
                break

            bps = SCHEMES[scheme_name]["bits_per_symbol"]
            cmap = SCHEMES[scheme_name]["map"]

            # Generate payload bits and symbols
            num_bits = BITS_PER_POINT
            num_bits -= num_bits % bps
            tx_bits = np.random.randint(0, 2, num_bits).astype(np.int8)
            num_syms = num_bits // bps
            payload_syms = np.empty(num_syms, dtype=complex)
            for i in range(num_syms):
                chunk = tuple(int(b) for b in tx_bits[i * bps:(i + 1) * bps])
                payload_syms[i] = cmap[chunk]

            # Build frame and pulse-shape
            frame_syms = build_tx_frame(payload_syms)
            up = np.zeros(len(frame_syms) * SPS, dtype=complex)
            up[::SPS] = frame_syms
            tx_samples = fftconvolve(up, rrc, mode="same")

            if self.use_hardware and self.pluto.is_hardware:
                try:
                    self.pluto.start_tx(tx_samples)
                except HardwareError:
                    self.use_hardware = False

            for snr_db in snr_values:
                if not self._running:
                    break

                self.sig_status.emit(
                    f"Sweep: {scheme_name} SNR={snr_db:.0f} dB")

                ber = self._measure_ber_at_snr(
                    tx_samples, rrc, tx_bits, num_syms,
                    scheme_name, snr_db)

                progress = (step + 1) / total_steps
                self.sig_point.emit(scheme_name, float(snr_db), ber, progress)
                step += 1

            if self.use_hardware:
                self.pluto.stop_tx()

        self.sig_done.emit()

    def _measure_ber_at_snr(self, tx_samples, rrc, tx_bits, num_syms,
                            scheme_name, snr_db):
        """Measure BER at one SNR point, optionally through hardware."""
        sample_rate = self.pluto.sample_rate

        if self.use_hardware and self.pluto.is_hardware:
            try:
                rx_raw = self.pluto.receive()
            except HardwareError:
                rx_raw = tx_samples.copy()
        else:
            rx_raw = tx_samples.copy()

        # Apply AWGN at the target SNR
        rx = add_awgn(rx_raw, snr_db)

        # Synchronise and demodulate
        _, payload_syms, _, _ = synchronize(
            rx, SPS, rrc, sample_rate, use_gardner=True)

        if len(payload_syms) == 0:
            return 0.5  # total failure

        rx_bits = demodulate(payload_syms[:num_syms], scheme_name)
        return compute_ber(tx_bits, rx_bits)

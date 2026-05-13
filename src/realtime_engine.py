"""
Threaded DSP engine shared by non-Qt front ends (e.g. web dashboards).
"""

from __future__ import annotations

import threading
import time
import traceback
from dataclasses import dataclass
from typing import Optional

import numpy as np
from scipy.signal import fftconvolve

from modulation import (
    SCHEMES,
    compute_ber,
    compute_evm,
    demodulate,
    ideal_symbols_for,
    rrc_filter,
)
from impairments import apply_impairments
from synchronization import build_tx_frame, synchronize
from pluto_interface import HardwareError, PlutoInterface

PAYLOAD_BITS = 2048
SPS = 8
ALPHA = 0.35
NUM_TAPS = 101


@dataclass
class EngineResult:
    scheme: str
    sequence: int
    produced_at: float
    raw_iq: np.ndarray
    impaired_iq: np.ndarray
    rx_symbols: np.ndarray
    ideal_symbols: np.ndarray
    mf_samples: np.ndarray
    ber: float
    evm: float
    snr: float
    freq_off: float
    phase_off: float
    bits_decoded: int
    total_bits_decoded: int


class RealtimeEngine:
    def __init__(self):
        self.pluto = PlutoInterface()
        self._lock = threading.Lock()
        self._data_lock = threading.Lock()
        self._thread: Optional[threading.Thread] = None
        self._running = False
        self._status = "Idle"

        self._scheme = "QPSK"
        self._tx_bits = None
        self._rrc_taps = None
        self._tx_samples = None

        self.imp_snr_db = 30.0
        self.imp_phase_deg = 0.0
        self.imp_freq_hz = 0.0
        self.imp_mp_delay = 0
        self.imp_mp_amp = 0.0
        self.imp_fading_k = 40.0

        self._latest: Optional[EngineResult] = None
        self._has_new_data = False
        self._sequence = 0
        self._total_bits_decoded = 0

    @property
    def is_running(self) -> bool:
        return self._running

    @property
    def status(self) -> str:
        return self._status

    def connect_hardware(self) -> bool:
        self.stop()
        ok = self.pluto.connect_hardware()
        self._status = "Connected (Hardware)" if ok else "Hardware not found"
        return ok

    def connect_simulation(self) -> bool:
        self.stop()
        ok = bool(self.pluto.connect_simulation())
        self._status = "Connected (Simulation)" if ok else "Simulation unavailable"
        return ok

    def disconnect(self):
        self.stop()
        self.pluto.disconnect()
        self._status = "Disconnected"

    def set_scheme(self, scheme_name: str):
        if scheme_name not in SCHEMES:
            return
        tx_samples = None
        with self._lock:
            if self._scheme == scheme_name and self._tx_samples is not None:
                return
            self._scheme = scheme_name
            self._rebuild_tx()
            if self._running:
                tx_samples = self._tx_samples.copy()
                self._status = f"Streaming ({self._scheme})"
        if tx_samples is not None:
            try:
                self.pluto.start_tx(tx_samples)
            except HardwareError as exc:
                self._status = f"Hardware error: {exc}"
                self._running = False

    def set_impairments(
        self,
        snr_db: float,
        phase_deg: float,
        freq_hz: float,
        mp_delay_sym: int,
        mp_amp: float,
        fading_k_db: float,
    ):
        self.imp_snr_db = float(snr_db)
        self.imp_phase_deg = float(phase_deg)
        self.imp_freq_hz = float(freq_hz)
        self.imp_mp_delay = int(mp_delay_sym) * SPS
        self.imp_mp_amp = float(mp_amp)
        self.imp_fading_k = float(fading_k_db)

    def start(self):
        if self._running:
            return
        if not self.pluto.is_connected:
            self._status = "Not connected — choose Simulation or Connect Pluto, then Start"
            return

        with self._lock:
            self._rebuild_tx()
            tx_samples = self._tx_samples.copy() if self._tx_samples is not None else None

        if tx_samples is None:
            self._status = "No waveform available"
            return

        try:
            self.pluto.start_tx(tx_samples)
        except HardwareError as exc:
            self._status = f"Hardware error: {exc}"
            return

        self._reset_stream_counters()
        self._running = True
        self._thread = threading.Thread(target=self._run_loop, daemon=True)
        self._thread.start()
        self._status = f"Streaming ({self._scheme})"

    def stop(self):
        self._running = False
        if self._thread is not None and self._thread.is_alive():
            self._thread.join(timeout=2.0)
        self._thread = None
        self.pluto.stop_tx()
        if self.pluto.is_connected:
            self._status = "Connected (idle)"

    def read_latest(self) -> Optional[EngineResult]:
        with self._data_lock:
            self._has_new_data = False
            return self._latest

    def _reset_stream_counters(self):
        with self._data_lock:
            self._latest = None
            self._has_new_data = False
            self._sequence = 0
            self._total_bits_decoded = 0

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
        tx_samples = fftconvolve(up, self._rrc_taps, mode="same")
        self._tx_samples = tx_samples

    def _run_loop(self):
        while self._running:
            try:
                self._process_one_buffer()
            except HardwareError as exc:
                self._status = f"Hardware error: {exc}"
                self._running = False
                break
            except Exception as exc:
                traceback.print_exc()
                self._status = f"DSP error: {exc}"
            # Brief yield so the Dash UI thread can run callbacks reliably.
            time.sleep(0.002)

    def _process_one_buffer(self):
        raw_iq = self.pluto.receive()
        if raw_iq is None or len(raw_iq) == 0:
            return

        impaired = apply_impairments(
            raw_iq,
            snr_db=self.imp_snr_db,
            phase_deg=self.imp_phase_deg,
            freq_offset_hz=self.imp_freq_hz,
            sample_rate=self.pluto.sample_rate,
            multipath_delay=self.imp_mp_delay,
            multipath_amplitude=self.imp_mp_amp,
            fading_k_db=self.imp_fading_k,
        )

        with self._lock:
            scheme = self._scheme
            rrc = self._rrc_taps
            tx_bits = self._tx_bits

        if rrc is None or tx_bits is None:
            return

        fs = self.pluto.sample_rate
        _, payload_syms, freq_off, phase_off = synchronize(
            impaired, SPS, rrc, fs, use_gardner=True
        )
        if len(payload_syms) == 0:
            _, payload_syms, freq_off, phase_off = synchronize(
                impaired, SPS, rrc, fs, use_gardner=False
            )
        if len(payload_syms) == 0:
            return

        bps = SCHEMES[scheme]["bits_per_symbol"]
        expected_payload_syms = len(tx_bits) // bps
        payload_syms = payload_syms[:expected_payload_syms]
        if len(payload_syms) == 0:
            return

        mf = fftconvolve(impaired, rrc, mode="same")
        rx_bits = demodulate(payload_syms, scheme)[:len(tx_bits)]
        bits_decoded = min(len(rx_bits), len(tx_bits))
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

        produced_at = time.monotonic()
        with self._data_lock:
            self._sequence += 1
            self._total_bits_decoded += bits_decoded
            sequence = self._sequence
            total_bits_decoded = self._total_bits_decoded

        result = EngineResult(
            scheme=scheme,
            sequence=sequence,
            produced_at=produced_at,
            raw_iq=raw_iq,
            impaired_iq=impaired,
            rx_symbols=payload_syms,
            ideal_symbols=ideal,
            mf_samples=mf,
            ber=ber,
            evm=evm,
            snr=snr_est,
            freq_off=freq_off,
            phase_off=phase_off,
            bits_decoded=bits_decoded,
            total_bits_decoded=total_bits_decoded,
        )

        with self._data_lock:
            self._latest = result
            self._has_new_data = True

"""
Receiver synchronization for a framed digital waveform.

Frame structure (built by build_tx_frame):
    [preamble | payload symbols]

The preamble is a known BPSK sequence (length-13 Barker code repeated) that
enables:
  1. Frame detection via cross-correlation
  2. Coarse frequency-offset estimation (repeated-preamble method)
  3. Phase-offset estimation (pilot-aided, from preamble)

Symbol-timing recovery uses the Gardner TED with a 1st-order loop.
"""

import numpy as np
from scipy.signal import fftconvolve

from modulation import rrc_filter, SCHEMES

# ---------------------------------------------------------------------------
# Preamble design
# ---------------------------------------------------------------------------

BARKER_13 = np.array([1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1], dtype=float)

PREAMBLE_REPS = 4  # repeat Barker sequence for better correlation / freq est
PREAMBLE_SYMBOLS = np.tile(BARKER_13, PREAMBLE_REPS).astype(complex)
PREAMBLE_LEN = len(PREAMBLE_SYMBOLS)


def build_tx_frame(payload_symbols: np.ndarray) -> np.ndarray:
    """Prepend the known preamble to a block of payload symbols."""
    return np.concatenate([PREAMBLE_SYMBOLS, payload_symbols])


# ---------------------------------------------------------------------------
# Frame detection
# ---------------------------------------------------------------------------

def detect_frame(rx_samples: np.ndarray, sps: int,
                 rrc_taps: np.ndarray) -> int:
    """Find the sample index where the preamble starts.

    Uses cross-correlation of the matched-filtered received signal with the
    pulse-shaped preamble.  Returns -1 if no clear peak is found.
    """
    # Build the reference preamble waveform at sample rate
    preamble_up = np.zeros(PREAMBLE_LEN * sps, dtype=complex)
    preamble_up[::sps] = PREAMBLE_SYMBOLS
    ref = fftconvolve(preamble_up, rrc_taps, mode="same")

    corr = np.abs(fftconvolve(rx_samples, np.conj(ref[::-1]), mode="full"))

    # The peak of the full-mode convolution occurs at index
    # (peak_in_rx + len(ref) - 1), so subtract to get sample-domain index.
    peak_idx = np.argmax(corr) - (len(ref) - 1)

    # Sanity check: peak should be significantly above the mean
    threshold = 3.0 * np.mean(corr)
    if corr[np.argmax(corr)] < threshold:
        return -1

    return max(0, int(peak_idx))


# ---------------------------------------------------------------------------
# Coarse frequency-offset estimation (repeated-preamble method)
# ---------------------------------------------------------------------------

def estimate_freq_offset(rx_samples: np.ndarray, sps: int,
                         sample_rate: float) -> float:
    """Estimate carrier frequency offset using the repeated Barker preamble.

    Compares successive repetitions of the Barker-13 in the preamble; the
    phase difference between identical blocks gives the frequency error.
    """
    block_len = len(BARKER_13) * sps
    if len(rx_samples) < 2 * block_len:
        return 0.0

    blk0 = rx_samples[:block_len]
    blk1 = rx_samples[block_len:2 * block_len]

    R = np.sum(blk1 * np.conj(blk0))
    delta_phi = np.angle(R)
    T_block = block_len / sample_rate
    freq_off = delta_phi / (2 * np.pi * T_block)
    return float(freq_off)


def correct_frequency(signal: np.ndarray, freq_offset_hz: float,
                      sample_rate: float) -> np.ndarray:
    """Remove a frequency offset from the signal."""
    n = np.arange(len(signal))
    return signal * np.exp(-1j * 2 * np.pi * freq_offset_hz / sample_rate * n)


# ---------------------------------------------------------------------------
# Phase-offset estimation (pilot-aided)
# ---------------------------------------------------------------------------

def estimate_phase_offset(rx_preamble_symbols: np.ndarray) -> float:
    """Estimate residual phase offset from the preamble symbols.

    Compares received preamble symbols (after freq correction and
    downsampling) to the known preamble.
    """
    min_len = min(len(rx_preamble_symbols), PREAMBLE_LEN)
    if min_len == 0:
        return 0.0
    ref = PREAMBLE_SYMBOLS[:min_len]
    rx = rx_preamble_symbols[:min_len]
    R = np.sum(rx * np.conj(ref))
    return float(np.angle(R))


def correct_phase(signal: np.ndarray, phase_rad: float) -> np.ndarray:
    """Remove a fixed phase offset."""
    return signal * np.exp(-1j * phase_rad)


# ---------------------------------------------------------------------------
# Gardner symbol-timing recovery
# ---------------------------------------------------------------------------

def _interp(signal, idx):
    """Linear interpolation at a fractional sample index."""
    i0 = int(idx)
    frac = idx - i0
    if i0 < 0 or i0 + 1 >= len(signal):
        return signal[min(max(i0, 0), len(signal) - 1)]
    return signal[i0] * (1 - frac) + signal[i0 + 1] * frac


def gardner_ted(signal: np.ndarray, sps: int,
                loop_bw: float = 0.005) -> np.ndarray:
    """Gardner timing-error-detector with a first-order loop.

    Operates on the matched-filtered signal and produces one output symbol
    per symbol period, with interpolation to correct timing errors.

    Parameters
    ----------
    signal : ndarray (complex)
        Matched-filtered, frequency/phase-corrected samples.
    sps : int
        Nominal samples per symbol.
    loop_bw : float
        Proportional gain of the timing loop.

    Returns
    -------
    symbols : ndarray (complex)
        Recovered symbols.
    """
    mu = 0.0
    strobe = float(0)  # first strobe at sample 0
    prev_sym = complex(0)
    symbols = []

    while strobe < len(signal) - 1:
        sym = _interp(signal, strobe)
        symbols.append(sym)

        # Midpoint between previous and current strobe
        mid_pos = strobe - sps / 2.0
        if mid_pos >= 0 and len(symbols) > 1:
            mid = _interp(signal, mid_pos)
            e = np.real((sym - prev_sym) * np.conj(mid))
            mu = np.clip(loop_bw * e, -0.5, 0.5)

        prev_sym = sym
        strobe += sps + mu

    return np.array(symbols, dtype=complex) if symbols else np.array([], dtype=complex)


# ---------------------------------------------------------------------------
# Full synchronisation pipeline
# ---------------------------------------------------------------------------

def synchronize(rx_samples: np.ndarray, sps: int, rrc_taps: np.ndarray,
                sample_rate: float, use_gardner: bool = True):
    """Run the full sync chain on one buffer of received samples.

    Returns
    -------
    preamble_symbols : ndarray
        Recovered preamble (for diagnostics).
    payload_symbols : ndarray
        Recovered payload symbols ready for demodulation.
    freq_offset : float
        Estimated frequency offset (Hz).
    phase_offset : float
        Estimated phase offset (rad).
    """
    # 1. Frame detection
    start = detect_frame(rx_samples, sps, rrc_taps)
    if start < 0:
        start = 0

    aligned = rx_samples[start:]

    # 2. Matched filter
    filtered = fftconvolve(aligned, rrc_taps, mode="same")

    # 3. Coarse frequency-offset estimation and correction
    preamble_samples = aligned[:PREAMBLE_LEN * sps]
    freq_offset = estimate_freq_offset(preamble_samples, sps, sample_rate)
    filtered = correct_frequency(filtered, freq_offset, sample_rate)

    # 4. Symbol timing recovery
    if use_gardner and len(filtered) > 4 * sps:
        symbols = gardner_ted(filtered, sps)
    else:
        # Find best downsample offset via max correlation with preamble
        best_offset, best_corr = 0, 0.0
        for off in range(sps):
            cand = filtered[off::sps]
            if len(cand) < PREAMBLE_LEN:
                continue
            c = np.abs(np.sum(cand[:PREAMBLE_LEN] * np.conj(PREAMBLE_SYMBOLS)))
            if c > best_corr:
                best_corr = c
                best_offset = off
        symbols = filtered[best_offset::sps]

    if len(symbols) == 0:
        return np.array([]), np.array([]), freq_offset, 0.0

    # 5. Phase estimation from recovered preamble symbols
    preamble_syms = symbols[:PREAMBLE_LEN] if len(symbols) >= PREAMBLE_LEN else symbols
    phase_offset = estimate_phase_offset(preamble_syms)

    symbols = correct_phase(symbols, phase_offset)

    # Split preamble / payload
    preamble_symbols = symbols[:PREAMBLE_LEN]
    payload_symbols = symbols[PREAMBLE_LEN:]

    return preamble_symbols, payload_symbols, freq_offset, phase_offset

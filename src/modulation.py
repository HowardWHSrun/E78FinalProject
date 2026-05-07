"""
Digital modulation / demodulation with pulse shaping.

Supported schemes: BPSK, QPSK, 8-PSK, 16-QAM.
"""

import numpy as np
from scipy.signal import fftconvolve

# ---------------------------------------------------------------------------
# Constellation maps  (Gray-coded where applicable)
# ---------------------------------------------------------------------------

BPSK_MAP = {
    (0,): complex(-1, 0),
    (1,): complex(1, 0),
}

QPSK_MAP = {
    (0, 0): complex(-1, -1) / np.sqrt(2),
    (0, 1): complex(-1, 1) / np.sqrt(2),
    (1, 0): complex(1, -1) / np.sqrt(2),
    (1, 1): complex(1, 1) / np.sqrt(2),
}

_8PSK_MAP = {
    tuple(int(b) for b in format(i, "03b")): np.exp(1j * 2 * np.pi * i / 8)
    for i in range(8)
}

# 16-QAM: 4-bit symbols on a 4x4 grid, average power normalised to 1
_qam16_raw = {}
_gray4 = [0, 1, 3, 2]  # 2-bit Gray code
for i, gi in enumerate(_gray4):
    for q, gq in enumerate(_gray4):
        bits = tuple(int(b) for b in format(gi, "02b") + format(gq, "02b"))
        _qam16_raw[bits] = complex(-3 + 2 * i, -3 + 2 * q)
_qam16_avg_power = np.mean([abs(v) ** 2 for v in _qam16_raw.values()])
QAM16_MAP = {k: v / np.sqrt(_qam16_avg_power) for k, v in _qam16_raw.items()}

SCHEMES = {
    "BPSK": {"map": BPSK_MAP, "bits_per_symbol": 1},
    "QPSK": {"map": QPSK_MAP, "bits_per_symbol": 2},
    "8-PSK": {"map": _8PSK_MAP, "bits_per_symbol": 3},
    "16-QAM": {"map": QAM16_MAP, "bits_per_symbol": 4},
}


def _invert_map(cmap):
    """symbol -> bits lookup (nearest-neighbour uses the point array instead)."""
    return {v: k for k, v in cmap.items()}


# Pre-build arrays for fast nearest-neighbour demodulation
_DEMOD_CACHE = {}

def _get_demod_arrays(scheme_name):
    if scheme_name not in _DEMOD_CACHE:
        info = SCHEMES[scheme_name]
        cmap = info["map"]
        bps = info["bits_per_symbol"]
        points = np.array(list(cmap.values()))
        bit_labels = np.array(list(cmap.keys()), dtype=np.int8)
        _DEMOD_CACHE[scheme_name] = (points, bit_labels, bps)
    return _DEMOD_CACHE[scheme_name]


# ---------------------------------------------------------------------------
# Root-Raised-Cosine filter
# ---------------------------------------------------------------------------

def rrc_filter(sps: int, num_taps: int = 101, alpha: float = 0.35) -> np.ndarray:
    """Design a root-raised-cosine filter.

    Parameters
    ----------
    sps : int
        Samples per symbol.
    num_taps : int
        Filter length (odd recommended).
    alpha : float
        Roll-off factor (0 < alpha <= 1).

    Returns
    -------
    h : ndarray
        Filter coefficients, normalised so that convolving twice (TX+RX)
        gives a raised-cosine pulse.
    """
    N = num_taps
    n = np.arange(N) - (N - 1) / 2
    h = np.zeros(N)
    Ts = sps  # symbol period in samples

    for i, ni in enumerate(n):
        if ni == 0:
            h[i] = (1 / Ts) * (1 + alpha * (4 / np.pi - 1))
        elif abs(abs(ni) - Ts / (4 * alpha)) < 1e-9:
            h[i] = (alpha / (Ts * np.sqrt(2))) * (
                (1 + 2 / np.pi) * np.sin(np.pi / (4 * alpha))
                + (1 - 2 / np.pi) * np.cos(np.pi / (4 * alpha))
            )
        else:
            num = np.sin(np.pi * ni / Ts * (1 - alpha)) + 4 * alpha * ni / Ts * np.cos(np.pi * ni / Ts * (1 + alpha))
            den = np.pi * ni / Ts * (1 - (4 * alpha * ni / Ts) ** 2)
            h[i] = (1 / Ts) * num / den

    h /= np.sqrt(np.sum(h ** 2))
    return h


# ---------------------------------------------------------------------------
# Modulate
# ---------------------------------------------------------------------------

def modulate(bits: np.ndarray, scheme_name: str, sps: int = 8,
             alpha: float = 0.35, num_taps: int = 101) -> tuple:
    """Map bits to pulse-shaped IQ samples.

    Returns
    -------
    tx_samples : ndarray (complex)
        Upsampled + pulse-shaped waveform ready for the DAC / PlutoSDR.
    symbols : ndarray (complex)
        The un-shaped constellation symbols (useful for BER reference).
    rrc_taps : ndarray
        The RRC filter coefficients (needed for matched filtering on RX).
    """
    info = SCHEMES[scheme_name]
    cmap = info["map"]
    bps = info["bits_per_symbol"]

    remainder = len(bits) % bps
    if remainder:
        bits = np.concatenate([bits, np.zeros(bps - remainder, dtype=bits.dtype)])

    num_symbols = len(bits) // bps
    symbols = np.empty(num_symbols, dtype=complex)
    for idx in range(num_symbols):
        chunk = tuple(int(b) for b in bits[idx * bps:(idx + 1) * bps])
        symbols[idx] = cmap[chunk]

    # Upsample
    upsampled = np.zeros(num_symbols * sps, dtype=complex)
    upsampled[::sps] = symbols

    # Pulse-shape
    rrc_taps = rrc_filter(sps, num_taps, alpha)
    tx_samples = fftconvolve(upsampled, rrc_taps, mode="same")

    return tx_samples, symbols, rrc_taps


# ---------------------------------------------------------------------------
# Demodulate
# ---------------------------------------------------------------------------

def matched_filter(rx_samples: np.ndarray, rrc_taps: np.ndarray) -> np.ndarray:
    """Apply the matched (RRC) filter to received samples."""
    return fftconvolve(rx_samples, rrc_taps, mode="same")


def downsample_symbols(filtered: np.ndarray, sps: int, offset: int = 0) -> np.ndarray:
    """Downsample at the symbol rate."""
    return filtered[offset::sps]


def demodulate(symbols: np.ndarray, scheme_name: str) -> np.ndarray:
    """Hard-decision nearest-neighbour demodulation.

    Returns a flat array of detected bits.
    """
    points, bit_labels, bps = _get_demod_arrays(scheme_name)
    # Vectorised nearest-neighbour: |symbol - each ref point|
    dists = np.abs(symbols[:, None] - points[None, :])  # (N, M)
    nearest_idx = np.argmin(dists, axis=1)
    detected_bits = bit_labels[nearest_idx].flatten()
    return detected_bits


def compute_ber(tx_bits: np.ndarray, rx_bits: np.ndarray) -> float:
    """Bit-error rate between two equal-length bit arrays."""
    min_len = min(len(tx_bits), len(rx_bits))
    if min_len == 0:
        return 0.0
    errors = np.sum(tx_bits[:min_len] != rx_bits[:min_len])
    return float(errors) / min_len


def compute_evm(rx_symbols: np.ndarray, ref_symbols: np.ndarray) -> float:
    """Error vector magnitude in percent (RMS)."""
    if len(rx_symbols) == 0:
        return 0.0
    min_len = min(len(rx_symbols), len(ref_symbols))
    err = rx_symbols[:min_len] - ref_symbols[:min_len]
    rms_err = np.sqrt(np.mean(np.abs(err) ** 2))
    rms_ref = np.sqrt(np.mean(np.abs(ref_symbols[:min_len]) ** 2))
    if rms_ref == 0:
        return 0.0
    return float(rms_err / rms_ref * 100.0)


def ideal_symbols_for(rx_symbols: np.ndarray, scheme_name: str) -> np.ndarray:
    """Map each received symbol to its nearest ideal constellation point."""
    points, _, _ = _get_demod_arrays(scheme_name)
    dists = np.abs(rx_symbols[:, None] - points[None, :])
    nearest_idx = np.argmin(dists, axis=1)
    return points[nearest_idx]

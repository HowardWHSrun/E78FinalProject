"""
Software-defined channel impairments applied to IQ sample streams.

Each function takes an ndarray of complex IQ samples and returns a modified
copy. They are designed to be chained and controlled independently via GUI
sliders in real time.
"""

import numpy as np


def add_awgn(signal: np.ndarray, snr_db: float) -> np.ndarray:
    """Add complex additive white Gaussian noise at a given SNR (dB).

    SNR is measured relative to the signal power in *signal*.
    """
    if snr_db >= 100:
        return signal.copy()
    sig_power = np.mean(np.abs(signal) ** 2)
    noise_power = sig_power / (10 ** (snr_db / 10))
    noise = np.sqrt(noise_power / 2) * (
        np.random.randn(len(signal)) + 1j * np.random.randn(len(signal))
    )
    return signal + noise


def add_phase_offset(signal: np.ndarray, phase_deg: float) -> np.ndarray:
    """Apply a fixed phase rotation (degrees)."""
    if phase_deg == 0.0:
        return signal.copy()
    return signal * np.exp(1j * np.deg2rad(phase_deg))


def add_frequency_offset(signal: np.ndarray, freq_offset_hz: float,
                         sample_rate: float) -> np.ndarray:
    """Apply a constant frequency offset (linear phase ramp).

    Parameters
    ----------
    freq_offset_hz : float
        Frequency offset in Hz.
    sample_rate : float
        Sample rate of *signal* in Hz.
    """
    if freq_offset_hz == 0.0:
        return signal.copy()
    n = np.arange(len(signal))
    return signal * np.exp(1j * 2 * np.pi * freq_offset_hz / sample_rate * n)


def add_multipath(signal: np.ndarray, delay_samples: int,
                  amplitude: float) -> np.ndarray:
    """Simple two-tap multipath: original + delayed/attenuated copy.

    Parameters
    ----------
    delay_samples : int
        Delay of the second path in samples (>= 0).
    amplitude : float
        Relative amplitude of the reflected path (0 = no multipath).
    """
    if amplitude == 0.0 or delay_samples == 0:
        return signal.copy()
    delayed = np.zeros_like(signal)
    delay_samples = int(min(delay_samples, len(signal) - 1))
    delayed[delay_samples:] = signal[:-delay_samples] * amplitude
    return signal + delayed


def add_flat_fading(signal: np.ndarray, k_factor_db: float) -> np.ndarray:
    """Apply Rician flat fading.

    Parameters
    ----------
    k_factor_db : float
        Rician K-factor in dB.  High K -> mostly line-of-sight (less fading).
        K = -inf  -> pure Rayleigh.  K = +40 dB -> essentially no fading.
    """
    if k_factor_db >= 40:
        return signal.copy()

    K = 10 ** (k_factor_db / 10)
    # LOS component (deterministic) + diffuse component (random)
    los = np.sqrt(K / (K + 1))
    diffuse_std = np.sqrt(1 / (2 * (K + 1)))
    h = los + diffuse_std * (
        np.random.randn(len(signal)) + 1j * np.random.randn(len(signal))
    )
    return signal * h


def apply_impairments(signal: np.ndarray, *,
                      snr_db: float = 100.0,
                      phase_deg: float = 0.0,
                      freq_offset_hz: float = 0.0,
                      sample_rate: float = 1e6,
                      multipath_delay: int = 0,
                      multipath_amplitude: float = 0.0,
                      fading_k_db: float = 40.0) -> np.ndarray:
    """Convenience wrapper that chains all impairments in a fixed order.

    Order: multipath -> fading -> frequency offset -> phase offset -> AWGN.
    This order matches the physical channel model convention.
    """
    out = signal
    out = add_multipath(out, multipath_delay, multipath_amplitude)
    out = add_flat_fading(out, fading_k_db)
    out = add_frequency_offset(out, freq_offset_hz, sample_rate)
    out = add_phase_offset(out, phase_deg)
    out = add_awgn(out, snr_db)
    return out

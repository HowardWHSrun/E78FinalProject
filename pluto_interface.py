"""
PlutoSDR hardware interface via pyadi-iio.

Two explicit modes:
  - HARDWARE : real PlutoSDR connected via USB.  Errors (unplug, timeout)
               propagate as HardwareError so the caller can stop cleanly.
  - SIMULATION : pure software loopback for demo / development.
"""

import numpy as np

import os

# Ensure libiio dylib is found on macOS (built from source to ~/.local)
_local_lib = os.path.join(os.path.expanduser("~"), ".local", "lib")
if os.path.isdir(_local_lib):
    os.environ.setdefault("DYLD_LIBRARY_PATH", _local_lib)
    # Also help ctypes find the library directly
    import ctypes
    try:
        ctypes.CDLL(os.path.join(_local_lib, "libiio.dylib"))
    except OSError:
        pass

try:
    import adi
    import iio as _iio
    HAS_PLUTO = True
except (ImportError, AttributeError, OSError):
    HAS_PLUTO = False


DEFAULT_LO = int(915e6)
DEFAULT_FS = int(1e6)
DEFAULT_BW = int(1e6)
DEFAULT_TX_GAIN = -30
DEFAULT_RX_GAIN = "slow_attack"
DEFAULT_BUFFER_SIZE = 2 ** 14


class HardwareError(RuntimeError):
    """Raised when the PlutoSDR becomes unreachable mid-stream."""


class PlutoInterface:
    """Thin wrapper around a single ADALM-PLUTO in loopback mode."""

    # Possible modes
    MODE_DISCONNECTED = "disconnected"
    MODE_HARDWARE = "hardware"
    MODE_SIMULATION = "simulation"

    def __init__(self, uri: str = "ip:192.168.2.1"):
        self.uri = uri
        self.sdr = None
        self.mode = self.MODE_DISCONNECTED
        self._tx_active = False
        self._tx_samples = None

    # ------------------------------------------------------------------
    # Connection
    # ------------------------------------------------------------------

    def connect_hardware(self, lo=DEFAULT_LO, fs=DEFAULT_FS, bw=DEFAULT_BW,
                         tx_gain=DEFAULT_TX_GAIN, rx_gain=DEFAULT_RX_GAIN,
                         buffer_size=DEFAULT_BUFFER_SIZE) -> bool:
        """Try to connect to a real PlutoSDR.  Returns True on success.

        Auto-detects the Pluto via USB scan if the default IP is unreachable.
        """
        self.disconnect()

        if not HAS_PLUTO:
            print("[Pluto] pyadi-iio / libiio not available")
            return False

        uri = self._find_pluto_uri()
        if uri is None:
            print("[Pluto] No PlutoSDR found (checked IP and USB)")
            return False

        try:
            self.sdr = adi.Pluto(uri)
        except Exception as exc:
            print(f"[Pluto] Cannot reach {uri}: {exc}")
            return False

        try:
            self.sdr.rx_lo = lo
            self.sdr.tx_lo = lo
            self.sdr.sample_rate = fs
            self.sdr.rx_rf_bandwidth = bw
            self.sdr.tx_rf_bandwidth = bw
            self.sdr.tx_hardwaregain_chan0 = tx_gain
            self.sdr.gain_control_mode_chan0 = rx_gain
            self.sdr.rx_buffer_size = buffer_size
            self.sdr.tx_cyclic_buffer = True
        except Exception as exc:
            print(f"[Pluto] Config failed: {exc}")
            self.sdr = None
            return False

        self.mode = self.MODE_HARDWARE
        self._active_uri = uri
        print(f"[Pluto] Connected (HW) at {uri}  "
              f"LO={lo/1e6:.1f} MHz  Fs={fs/1e6:.2f} MSPS")
        return True

    @staticmethod
    def _find_pluto_uri() -> str | None:
        """Auto-detect PlutoSDR -- try USB scan first, then fall back to IP."""
        try:
            ctxs = _iio.scan_contexts()
            for uri, desc in ctxs.items():
                if "PlutoSDR" in desc or "ADALM-PLUTO" in desc or "0456:b673" in desc:
                    print(f"[Pluto] Found via scan: {uri}  ({desc})")
                    return uri
        except Exception:
            pass
        # Fall back to the default IP
        try:
            ctx = _iio.Context("ip:192.168.2.1")
            if ctx is not None:
                return "ip:192.168.2.1"
        except Exception:
            pass
        return None

    def connect_simulation(self):
        """Enter software-loopback mode (no hardware needed)."""
        self.disconnect()
        self.mode = self.MODE_SIMULATION
        print("[Pluto] Simulation mode enabled")

    @property
    def is_hardware(self) -> bool:
        return self.mode == self.MODE_HARDWARE

    @property
    def is_connected(self) -> bool:
        return self.mode != self.MODE_DISCONNECTED

    @property
    def sample_rate(self) -> float:
        if self.is_hardware and self.sdr is not None:
            return float(self.sdr.sample_rate)
        return float(DEFAULT_FS)

    # ------------------------------------------------------------------
    # Transmit
    # ------------------------------------------------------------------

    def start_tx(self, iq_samples: np.ndarray):
        """Load iq_samples into the TX buffer and start streaming."""
        if self._tx_active:
            self.stop_tx()

        self._tx_samples = iq_samples.copy()

        if self.is_hardware:
            try:
                peak = np.max(np.abs(iq_samples))
                if peak == 0:
                    peak = 1.0
                scaled = iq_samples / peak * (2 ** 14)
                self.sdr.tx(scaled)
            except Exception as exc:
                raise HardwareError(f"TX failed: {exc}") from exc

        self._tx_active = True

    def stop_tx(self):
        if self.is_hardware and self.sdr is not None:
            try:
                self.sdr.tx_destroy_buffer()
            except Exception:
                pass
        self._tx_active = False

    # ------------------------------------------------------------------
    # Receive
    # ------------------------------------------------------------------

    def receive(self) -> np.ndarray:
        """Read one RX buffer.

        In hardware mode, errors (e.g. USB disconnect) raise HardwareError.
        In simulation mode, returns the TX waveform + small noise.
        """
        if self.is_hardware:
            if self.sdr is None:
                raise HardwareError("SDR object is None")
            try:
                return np.array(self.sdr.rx(), dtype=complex)
            except Exception as exc:
                raise HardwareError(f"RX failed: {exc}") from exc

        if self.mode == self.MODE_SIMULATION:
            if self._tx_active and self._tx_samples is not None:
                n = DEFAULT_BUFFER_SIZE
                sig = self._tx_samples
                reps = int(np.ceil(n / len(sig)))
                buf = np.tile(sig, reps)[:n]
                noise = 0.01 * (np.random.randn(n) + 1j * np.random.randn(n))
                return buf + noise
            return np.zeros(DEFAULT_BUFFER_SIZE, dtype=complex)

        raise HardwareError("Not connected")

    # ------------------------------------------------------------------
    # Cleanup
    # ------------------------------------------------------------------

    def disconnect(self):
        self.stop_tx()
        self.sdr = None
        self.mode = self.MODE_DISCONNECTED

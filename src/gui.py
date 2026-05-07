"""
Real-time visualisation GUI built with PyQt6 + PyQtGraph.

Two modes:
  1. Live mode  -- real-time spectrum / constellation / eye / metrics
  2. BER sweep  -- automated BER-vs-SNR curves for all modulation schemes
"""

import time
import traceback
import numpy as np
import pyqtgraph as pg
from PyQt6.QtWidgets import (
    QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QGridLayout,
    QLabel, QSlider, QComboBox, QPushButton, QGroupBox, QSplitter,
    QMessageBox, QStackedWidget, QProgressBar, QSpinBox,
)
from PyQt6.QtCore import Qt, QTimer
from collections import deque

from dsp_worker import DSPWorker, SPS
from pluto_interface import PlutoInterface
from modulation import SCHEMES
from ber_sweep import BERSweepWorker, theoretical_ber, snr_to_ebno

CLR_RAW = (100, 180, 255, 120)
CLR_IMPAIRED = (255, 100, 100, 180)
CLR_CONSTELLATION = (50, 255, 130, 200)
CLR_IDEAL = (255, 255, 80, 220)
CLR_EYE = (80, 200, 255, 30)
CLR_BER = (255, 90, 90)
CLR_EVM = (90, 200, 255)
CLR_SNR = (120, 255, 120)
CLR_THROUGHPUT = (255, 200, 50)
CLR_CUMUL = (200, 130, 255)

INFO_STYLE = """
    QPushButton {
        background: rgba(80, 120, 220, 200);
        color: white;
        border-radius: 12px;
        font-weight: bold;
        font-size: 13px;
        border: 1px solid rgba(255,255,255,80);
    }
    QPushButton:hover {
        background: rgba(110, 150, 255, 240);
    }
"""

PLOT_EXPLANATIONS = {
    "spectrum": (
        "Power Spectrum",
        "The Power Spectrum shows the frequency-domain representation of the "
        "received signal, computed via a Fast Fourier Transform (FFT).\n\n"
        "-- Blue trace (Raw RX): the signal as received from the PlutoSDR "
        "(or software loopback) before any software impairments are applied.\n\n"
        "-- Red trace (Impaired): the same signal after software-injected "
        "impairments (AWGN, phase offset, frequency offset, multipath, fading).\n\n"
        "What to look for:\n"
        "  * The main lobe shape reflects the root-raised-cosine pulse shaping.\n"
        "  * Adding AWGN raises the noise floor across all frequencies.\n"
        "  * A frequency offset shifts the entire spectrum left or right.\n"
        "  * Multipath can create spectral nulls (dips) at certain frequencies.\n\n"
        "The x-axis is frequency in Hz centered at the carrier; the y-axis is "
        "power in dB (10*log10 scale)."
    ),
    "constellation": (
        "Constellation Diagram",
        "The Constellation Diagram plots each demodulated symbol as a point "
        "in the complex I/Q plane (In-Phase vs Quadrature).\n\n"
        "-- Green dots: the received, synchronized symbols after matched "
        "filtering and timing recovery.\n"
        "-- Yellow crosses: the ideal reference constellation points for the "
        "current modulation scheme.\n\n"
        "What to look for:\n"
        "  * Clean signal: tight clusters centered on the yellow crosses.\n"
        "  * AWGN: clusters spread into circular clouds -- more noise means "
        "wider spread.\n"
        "  * Phase offset: the entire constellation rotates around the origin.\n"
        "  * Frequency offset: symbols spiral (the synchronizer tries to "
        "correct this).\n"
        "  * Multipath: clusters smear or ghost images appear between the "
        "ideal points.\n\n"
        "Higher-order schemes (e.g. 16-QAM) have more closely spaced points, "
        "so they are more sensitive to noise -- you can see this directly as "
        "clusters start overlapping sooner."
    ),
    "eye": (
        "Eye Diagram",
        "The Eye Diagram overlays many consecutive 2-symbol-period segments of "
        "the matched-filtered In-Phase (I) channel on top of each other.\n\n"
        "Each trace represents the waveform over two symbol periods. When many "
        "traces are stacked, the pattern resembles an 'eye'.\n\n"
        "What to look for:\n"
        "  * Wide-open eye: good signal quality, easy for the receiver to make "
        "correct decisions at the sampling instant (center of the eye).\n"
        "  * Closing eye: noise, ISI (inter-symbol interference), or timing "
        "errors are degrading the signal.\n"
        "  * Eye completely closed: the receiver can no longer reliably "
        "distinguish between symbol levels -- expect high BER.\n\n"
        "  * Vertical spread at the center = noise.\n"
        "  * Horizontal jitter at zero crossings = timing uncertainty.\n"
        "  * Multiple trace levels blurring together = ISI from multipath.\n\n"
        "The x-axis spans 2 symbol periods (2T); the y-axis is the signal "
        "amplitude."
    ),
    "metrics": (
        "Running Metrics",
        "This panel shows three key performance metrics updated in real time "
        "as a rolling history:\n\n"
        "-- BER (Bit Error Rate, red): the fraction of decoded bits that "
        "differ from the transmitted bits. 0 = perfect; 0.5 = random "
        "guessing. Computed by comparing the known TX bits to the RX bits "
        "after demodulation.\n\n"
        "-- EVM (Error Vector Magnitude, blue): measures how far each "
        "received symbol is from its ideal constellation point, expressed "
        "as a percentage. Lower EVM = cleaner signal. Typically <5%% is "
        "excellent; >30%% indicates significant distortion.\n\n"
        "-- Estimated SNR (Signal-to-Noise Ratio, green): estimated from "
        "the ratio of ideal signal power to the error power at the "
        "constellation points, in dB. Higher = better.\n\n"
        "The x-axis is the update number (each tick = one processed buffer, "
        "at ~20 updates per second)."
    ),
    "throughput": (
        "Throughput & Cumulative Bits",
        "This panel tracks the data flow through the receiver in real time.\n\n"
        "-- Yellow trace (Throughput, left axis): the instantaneous data rate "
        "in kilobits per second (kbit/s). This is computed as the number of "
        "payload bits decoded in each buffer divided by the time between "
        "buffers. Typical values:\n"
        "  * BPSK: ~20 kbit/s\n"
        "  * QPSK: ~40 kbit/s\n"
        "  * 8-PSK: ~60 kbit/s\n"
        "  * 16-QAM: ~80 kbit/s\n"
        "(at ~20 frames/sec with 2048-bit payload per frame)\n\n"
        "-- Purple trace (Total Bits, right axis): the cumulative number of "
        "bits successfully decoded since you clicked 'Start'. A steady linear "
        "ramp means the link is stable. A plateau means synchronization was "
        "lost and no bits are being decoded.\n\n"
        "The x-axis is elapsed time in seconds since the stream started."
    ),
    "ber_sweep": (
        "BER Sweep Mode",
        "The BER Sweep automatically measures Bit Error Rate across a range "
        "of SNR values for all four modulation schemes.\n\n"
        "-- Solid lines with circles: measured BER at each Eb/No point. "
        "For each SNR step, the system transmits and receives many frames, "
        "counts the bit errors, and plots the result.\n\n"
        "-- Dashed lines: theoretical BER curves from closed-form equations:\n"
        "  * BPSK & QPSK: Q(sqrt(2 * Eb/No))\n"
        "  * 8-PSK: uses the standard union-bound approximation\n"
        "  * 16-QAM: (3/8) * erfc(sqrt(0.4 * Eb/No))\n\n"
        "The x-axis is Eb/No (energy per bit over noise spectral density) in "
        "dB. The y-axis is BER on a logarithmic scale.\n\n"
        "What to look for:\n"
        "  * Measured points should closely track the theoretical curves.\n"
        "  * BPSK is most robust (lowest BER at a given Eb/No).\n"
        "  * 16-QAM requires the highest Eb/No for the same BER.\n"
        "  * Hardware loopback adds ~0.5-1 dB of implementation loss "
        "compared to pure simulation."
    ),
}

# Distinct colours for each scheme in BER sweep
SCHEME_COLORS = {
    "BPSK":   (66, 165, 245),
    "QPSK":   (102, 187, 106),
    "8-PSK":  (255, 167, 38),
    "16-QAM": (239, 83, 80),
}

MAX_HISTORY = 200
MAX_EYE_CURVES = 40
SPECTRUM_DECIMATE = 4


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(
            "Real-Time Digital Modulation & Channel Impairment Visualizer"
        )
        self.resize(1400, 850)

        self.pluto = PlutoInterface()
        self.worker = DSPWorker(self.pluto)
        self.sweep_worker = BERSweepWorker(self.pluto)

        self._ber_hist = deque(maxlen=MAX_HISTORY)
        self._evm_hist = deque(maxlen=MAX_HISTORY)
        self._snr_hist = deque(maxlen=MAX_HISTORY)
        self._throughput_hist = deque(maxlen=MAX_HISTORY)
        self._throughput_time = deque(maxlen=MAX_HISTORY)

        self._total_bits = 0
        self._cumul_bits_list = []
        self._cumul_time_list = []
        self._start_time = None
        self._last_data_time = None

        # BER sweep accumulated data
        self._sweep_data = {}  # scheme -> (snr_list, ber_list)

        self._build_ui()
        self._connect_signals()

        self._timer = QTimer()
        self._timer.setInterval(50)
        self._timer.timeout.connect(self._on_timer)

        QTimer.singleShot(200, self._auto_start)

    # ==================================================================
    # UI construction
    # ==================================================================

    def _build_ui(self):
        central = QWidget()
        self.setCentralWidget(central)
        root = QHBoxLayout(central)

        pg.setConfigOptions(antialias=False, background="#1e1e2e",
                            foreground="#cdd6f4", useOpenGL=False)

        # --- Stacked plot area: page 0 = live, page 1 = BER sweep ---
        self.plot_stack = QStackedWidget()

        # PAGE 0: live plots
        live_widget = QWidget()
        plot_grid = QGridLayout(live_widget)
        plot_grid.setSpacing(6)

        self.pw_spectrum = pg.PlotWidget(title="Power Spectrum (dB)")
        self.pw_spectrum.setLabel("bottom", "Frequency", units="Hz")
        self.pw_spectrum.setLabel("left", "Power", units="dB")
        self.pw_spectrum.setDownsampling(auto=True, mode="peak")
        self.pw_spectrum.setClipToView(True)
        self.pw_spectrum.addLegend(offset=(10, 10))
        self.curve_spec_raw = self.pw_spectrum.plot(
            pen=pg.mkPen(CLR_RAW, width=1), name="Raw RX")
        self.curve_spec_imp = self.pw_spectrum.plot(
            pen=pg.mkPen(CLR_IMPAIRED, width=1), name="Impaired")
        plot_grid.addWidget(self._wrap_with_info(self.pw_spectrum, "spectrum"),
                            0, 0)

        self.pw_const = pg.PlotWidget(title="Constellation Diagram")
        self.pw_const.setLabel("bottom", "In-Phase (I)")
        self.pw_const.setLabel("left", "Quadrature (Q)")
        self.pw_const.setAspectLocked(True)
        self.scatter_rx = pg.ScatterPlotItem(
            size=3, pen=None, brush=pg.mkBrush(*CLR_CONSTELLATION))
        self.scatter_ideal = pg.ScatterPlotItem(
            size=10, pen=None, brush=pg.mkBrush(*CLR_IDEAL), symbol="+")
        self.pw_const.addItem(self.scatter_rx)
        self.pw_const.addItem(self.scatter_ideal)
        plot_grid.addWidget(self._wrap_with_info(self.pw_const, "constellation"),
                            0, 1)

        self.pw_eye = pg.PlotWidget(title="Eye Diagram (I channel)")
        self.pw_eye.setLabel("bottom", "Sample index within 2T")
        self.pw_eye.setLabel("left", "Amplitude")
        self._eye_curves = []
        for _ in range(MAX_EYE_CURVES):
            c = self.pw_eye.plot(pen=pg.mkPen(CLR_EYE, width=1))
            self._eye_curves.append(c)
        plot_grid.addWidget(self._wrap_with_info(self.pw_eye, "eye"), 1, 0)

        self.pw_metrics = pg.PlotWidget(title="Running Metrics")
        self.pw_metrics.setLabel("bottom", "Update #")
        self.pw_metrics.addLegend(offset=(10, 10))
        self.curve_ber = self.pw_metrics.plot(
            pen=pg.mkPen(CLR_BER, width=2), name="BER")
        self.curve_evm = self.pw_metrics.plot(
            pen=pg.mkPen(CLR_EVM, width=2), name="EVM (%)")
        self.curve_snr = self.pw_metrics.plot(
            pen=pg.mkPen(CLR_SNR, width=2), name="Est. SNR (dB)")
        plot_grid.addWidget(self._wrap_with_info(self.pw_metrics, "metrics"),
                            1, 1)

        self.pw_throughput = pg.PlotWidget(
            title="Throughput & Cumulative Bits")
        self.pw_throughput.setLabel("bottom", "Time (s)")
        self.pw_throughput.addLegend(offset=(10, 10))
        self.curve_throughput = self.pw_throughput.plot(
            pen=pg.mkPen(CLR_THROUGHPUT, width=2), name="Throughput (kbit/s)")
        self.pw_throughput.showGrid(x=True, y=True, alpha=0.3)

        self.vb_cumul = pg.ViewBox()
        self.pw_throughput.scene().addItem(self.vb_cumul)
        self.pw_throughput.getAxis("right").linkToView(self.vb_cumul)
        self.vb_cumul.setXLink(self.pw_throughput)
        self.pw_throughput.getAxis("right").setLabel(
            "Total Bits", color="#c882ff")
        self.pw_throughput.showAxis("right")
        self.curve_cumul = pg.PlotCurveItem(
            pen=pg.mkPen(CLR_CUMUL, width=2), name="Total Bits")
        self.vb_cumul.addItem(self.curve_cumul)
        self.pw_throughput.getViewBox().sigResized.connect(
            self._sync_cumul_viewbox)

        plot_grid.addWidget(
            self._wrap_with_info(self.pw_throughput, "throughput"), 2, 0, 1, 2)
        plot_grid.setRowStretch(0, 3)
        plot_grid.setRowStretch(1, 3)
        plot_grid.setRowStretch(2, 2)

        self.plot_stack.addWidget(live_widget)

        # PAGE 1: BER sweep plot
        self.pw_ber_sweep = pg.PlotWidget(
            title="BER vs Eb/No -- Measured & Theoretical")
        self.pw_ber_sweep.setLabel("bottom", "Eb/No (dB)")
        self.pw_ber_sweep.setLabel("left", "Bit Error Rate")
        self.pw_ber_sweep.setLogMode(x=False, y=True)
        self.pw_ber_sweep.setYRange(-5, 0)   # 1e-5 to 1e0
        self.pw_ber_sweep.showGrid(x=True, y=True, alpha=0.3)
        self.pw_ber_sweep.addLegend(offset=(10, 10))

        # Pre-create curve objects for measured + theoretical
        self._sweep_curves_meas = {}
        self._sweep_curves_theo = {}
        for name, clr in SCHEME_COLORS.items():
            self._sweep_curves_meas[name] = self.pw_ber_sweep.plot(
                pen=pg.mkPen(clr, width=2),
                symbol="o", symbolSize=6,
                symbolBrush=pg.mkBrush(*clr),
                name=f"{name} (measured)")
            self._sweep_curves_theo[name] = self.pw_ber_sweep.plot(
                pen=pg.mkPen((*clr, 100), width=1, style=Qt.PenStyle.DashLine),
                name=f"{name} (theory)")

        # Draw theoretical curves once
        ebno_fine = np.linspace(-2, 22, 200)
        for name in SCHEME_COLORS:
            ber_theo = theoretical_ber(name, ebno_fine)
            ber_theo = np.clip(ber_theo, 1e-7, 1)
            self._sweep_curves_theo[name].setData(ebno_fine, ber_theo)

        self.plot_stack.addWidget(
            self._wrap_with_info(self.pw_ber_sweep, "ber_sweep"))

        # --- Sidebar ---
        sidebar = QVBoxLayout()
        sidebar.setSpacing(8)

        # Mode toggle
        grp_mode = QGroupBox("Mode")
        lo_mode = QHBoxLayout()
        self.btn_live = QPushButton("Live")
        self.btn_live.setCheckable(True)
        self.btn_live.setChecked(True)
        self.btn_sweep = QPushButton("BER Sweep")
        self.btn_sweep.setCheckable(True)
        lo_mode.addWidget(self.btn_live)
        lo_mode.addWidget(self.btn_sweep)
        grp_mode.setLayout(lo_mode)
        sidebar.addWidget(grp_mode)

        # Connection
        grp_conn = QGroupBox("PlutoSDR")
        lo_conn = QVBoxLayout()
        self.btn_connect = QPushButton("Connect Hardware")
        self.btn_sim = QPushButton("Simulation Mode")
        lo_conn.addWidget(self.btn_connect)
        lo_conn.addWidget(self.btn_sim)
        self.lbl_hw = QLabel("Disconnected")
        self.lbl_hw.setStyleSheet("color: #f38ba8;")
        lo_conn.addWidget(self.lbl_hw)
        grp_conn.setLayout(lo_conn)
        sidebar.addWidget(grp_conn)

        # Start / Stop (live mode)
        self.btn_start = QPushButton("Start")
        self.btn_stop = QPushButton("Stop")
        self.btn_stop.setEnabled(False)
        hbox_ss = QHBoxLayout()
        hbox_ss.addWidget(self.btn_start)
        hbox_ss.addWidget(self.btn_stop)
        sidebar.addLayout(hbox_ss)

        # Modulation
        grp_mod = QGroupBox("Modulation")
        lo_mod = QVBoxLayout()
        self.cmb_scheme = QComboBox()
        self.cmb_scheme.addItems(list(SCHEMES.keys()))
        self.cmb_scheme.setCurrentText("QPSK")
        lo_mod.addWidget(self.cmb_scheme)
        grp_mod.setLayout(lo_mod)
        sidebar.addWidget(grp_mod)

        # Impairments (live mode)
        self.grp_imp = QGroupBox("Channel Impairments")
        lo_imp = QVBoxLayout()
        self.sld_snr, self.lbl_snr = self._make_slider(
            "SNR (dB)", 0, 40, 30, lo_imp)
        self.sld_phase, self.lbl_phase = self._make_slider(
            "Phase offset (deg)", -180, 180, 0, lo_imp)
        self.sld_freq, self.lbl_freq = self._make_slider(
            "Freq offset (Hz)", -5000, 5000, 0, lo_imp)
        self.sld_mp_delay, self.lbl_mp_delay = self._make_slider(
            "Multipath delay (sym)", 0, 10, 0, lo_imp)
        self.sld_mp_amp, self.lbl_mp_amp = self._make_slider(
            "Multipath amp (x100)", 0, 100, 0, lo_imp)
        self.sld_fading, self.lbl_fading = self._make_slider(
            "Fading K (dB)", -10, 40, 40, lo_imp)
        self.grp_imp.setLayout(lo_imp)
        sidebar.addWidget(self.grp_imp)

        # BER sweep controls (hidden initially)
        self.grp_sweep = QGroupBox("BER Sweep Settings")
        lo_sweep = QVBoxLayout()
        h1 = QHBoxLayout()
        h1.addWidget(QLabel("SNR min (dB):"))
        self.spn_snr_min = QSpinBox()
        self.spn_snr_min.setRange(-5, 30)
        self.spn_snr_min.setValue(0)
        h1.addWidget(self.spn_snr_min)
        lo_sweep.addLayout(h1)
        h2 = QHBoxLayout()
        h2.addWidget(QLabel("SNR max (dB):"))
        self.spn_snr_max = QSpinBox()
        self.spn_snr_max.setRange(0, 40)
        self.spn_snr_max.setValue(20)
        h2.addWidget(self.spn_snr_max)
        lo_sweep.addLayout(h2)
        h3 = QHBoxLayout()
        h3.addWidget(QLabel("Step (dB):"))
        self.spn_snr_step = QSpinBox()
        self.spn_snr_step.setRange(1, 5)
        self.spn_snr_step.setValue(2)
        h3.addWidget(self.spn_snr_step)
        lo_sweep.addLayout(h3)
        self.btn_run_sweep = QPushButton("Run Sweep")
        self.btn_stop_sweep = QPushButton("Stop Sweep")
        self.btn_stop_sweep.setEnabled(False)
        hsw = QHBoxLayout()
        hsw.addWidget(self.btn_run_sweep)
        hsw.addWidget(self.btn_stop_sweep)
        lo_sweep.addLayout(hsw)
        self.sweep_progress = QProgressBar()
        self.sweep_progress.setRange(0, 100)
        self.sweep_progress.setValue(0)
        lo_sweep.addWidget(self.sweep_progress)
        self.grp_sweep.setLayout(lo_sweep)
        self.grp_sweep.setVisible(False)
        sidebar.addWidget(self.grp_sweep)

        # Live readouts
        self.grp_read = QGroupBox("Live Readouts")
        lo_read = QVBoxLayout()
        self.lbl_ber = QLabel("BER: --")
        self.lbl_evm = QLabel("EVM: --")
        self.lbl_snr_est = QLabel("SNR est: --")
        self.lbl_freq_off = QLabel("Freq off: --")
        self.lbl_phase_off = QLabel("Phase off: --")
        self.lbl_throughput = QLabel("Throughput: --")
        self.lbl_total_bits = QLabel("Total bits: --")
        for w in (self.lbl_ber, self.lbl_evm, self.lbl_snr_est,
                  self.lbl_freq_off, self.lbl_phase_off,
                  self.lbl_throughput, self.lbl_total_bits):
            w.setStyleSheet("font-family: monospace; font-size: 12px;")
            lo_read.addWidget(w)
        self.grp_read.setLayout(lo_read)
        sidebar.addWidget(self.grp_read)

        self.lbl_status = QLabel("")
        self.lbl_status.setWordWrap(True)
        self.lbl_status.setStyleSheet("color: #a6adc8; font-size: 11px;")
        sidebar.addWidget(self.lbl_status)
        sidebar.addStretch()

        sidebar_widget = QWidget()
        sidebar_widget.setLayout(sidebar)
        sidebar_widget.setFixedWidth(280)

        splitter = QSplitter(Qt.Orientation.Horizontal)
        splitter.addWidget(self.plot_stack)
        splitter.addWidget(sidebar_widget)
        splitter.setStretchFactor(0, 3)
        splitter.setStretchFactor(1, 1)
        root.addWidget(splitter)

    @staticmethod
    def _make_slider(label_text, vmin, vmax, default, parent_layout):
        lbl = QLabel(f"{label_text}: {default}")
        sld = QSlider(Qt.Orientation.Horizontal)
        sld.setMinimum(vmin)
        sld.setMaximum(vmax)
        sld.setValue(default)
        sld.setTickPosition(QSlider.TickPosition.TicksBelow)
        parent_layout.addWidget(lbl)
        parent_layout.addWidget(sld)
        return sld, lbl

    def _wrap_with_info(self, plot_widget, key):
        title, text = PLOT_EXPLANATIONS[key]
        container = QWidget()
        layout = QVBoxLayout(container)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)
        header = QHBoxLayout()
        header.setContentsMargins(0, 2, 4, 0)
        header.addStretch()
        btn = QPushButton("?")
        btn.setFixedSize(24, 24)
        btn.setStyleSheet(INFO_STYLE)
        btn.setCursor(Qt.CursorShape.PointingHandCursor)
        btn.setToolTip(f"Click for info about {title}")
        btn.clicked.connect(
            lambda checked, t=title, tx=text: QMessageBox.information(
                self, t, tx))
        header.addWidget(btn)
        layout.addLayout(header)
        layout.addWidget(plot_widget)
        return container

    def _sync_cumul_viewbox(self):
        self.vb_cumul.setGeometry(
            self.pw_throughput.getViewBox().sceneBoundingRect())

    # ==================================================================
    # Signal / slot wiring
    # ==================================================================

    def _connect_signals(self):
        self.btn_connect.clicked.connect(self._on_connect_hw)
        self.btn_sim.clicked.connect(self._on_connect_sim)
        self.btn_start.clicked.connect(self._on_start)
        self.btn_stop.clicked.connect(self._on_stop)
        self.cmb_scheme.currentTextChanged.connect(self._on_scheme_changed)

        self.btn_live.clicked.connect(lambda: self._switch_mode("live"))
        self.btn_sweep.clicked.connect(lambda: self._switch_mode("sweep"))
        self.btn_run_sweep.clicked.connect(self._on_run_sweep)
        self.btn_stop_sweep.clicked.connect(self._on_stop_sweep)

        self.sld_snr.valueChanged.connect(
            lambda v: self.lbl_snr.setText(f"SNR (dB): {v}"))
        self.sld_phase.valueChanged.connect(
            lambda v: self.lbl_phase.setText(f"Phase offset (deg): {v}"))
        self.sld_freq.valueChanged.connect(
            lambda v: self.lbl_freq.setText(f"Freq offset (Hz): {v}"))
        self.sld_mp_delay.valueChanged.connect(
            lambda v: self.lbl_mp_delay.setText(f"Multipath delay (sym): {v}"))
        self.sld_mp_amp.valueChanged.connect(
            lambda v: self.lbl_mp_amp.setText(f"Multipath amp (x100): {v}"))
        self.sld_fading.valueChanged.connect(
            lambda v: self.lbl_fading.setText(f"Fading K (dB): {v}"))

        self.worker.sig_status.connect(self._update_status)
        self.worker.sig_hw_error.connect(self._on_hw_error)

        self.sweep_worker.sig_point.connect(self._on_sweep_point)
        self.sweep_worker.sig_done.connect(self._on_sweep_done)
        self.sweep_worker.sig_status.connect(self._update_status)

    # ==================================================================
    # Mode switching
    # ==================================================================

    def _switch_mode(self, mode):
        if mode == "live":
            self.btn_live.setChecked(True)
            self.btn_sweep.setChecked(False)
            self.plot_stack.setCurrentIndex(0)
            self.grp_imp.setVisible(True)
            self.grp_sweep.setVisible(False)
            self.grp_read.setVisible(True)
            self.btn_start.setVisible(True)
            self.btn_stop.setVisible(True)
            self.cmb_scheme.setEnabled(True)
        else:
            self.btn_live.setChecked(False)
            self.btn_sweep.setChecked(True)
            self._stop_if_running()
            self.plot_stack.setCurrentIndex(1)
            self.grp_imp.setVisible(False)
            self.grp_sweep.setVisible(True)
            self.grp_read.setVisible(False)
            self.btn_start.setVisible(False)
            self.btn_stop.setVisible(False)
            self.cmb_scheme.setEnabled(False)

    # ==================================================================
    # Connection handlers
    # ==================================================================

    def _auto_start(self):
        try:
            ok = self.pluto.connect_hardware()
            if ok:
                self.lbl_hw.setText("Connected (Hardware)")
                self.lbl_hw.setStyleSheet("color: #a6e3a1;")
            else:
                self.pluto.connect_simulation()
                self.lbl_hw.setText("Simulation mode")
                self.lbl_hw.setStyleSheet("color: #fab387;")
            self._on_start()
        except Exception:
            traceback.print_exc()

    def _stop_if_running(self):
        if self.worker.isRunning():
            self._timer.stop()
            self.worker.request_stop()
            self.worker.wait(3000)

    def _on_connect_hw(self):
        self._stop_if_running()
        self.pluto.disconnect()
        ok = self.pluto.connect_hardware()
        if ok:
            self.lbl_hw.setText("Connected (Hardware)")
            self.lbl_hw.setStyleSheet("color: #a6e3a1;")
            if self.plot_stack.currentIndex() == 0:
                self._on_start()
        else:
            self.lbl_hw.setText("Hardware not found")
            self.lbl_hw.setStyleSheet("color: #f38ba8;")
            self.btn_start.setEnabled(False)
            self.btn_stop.setEnabled(False)
            QMessageBox.warning(
                self, "Connection Failed",
                "Could not reach PlutoSDR.\n\n"
                "Check USB connection and try again,\n"
                "or use Simulation Mode.")

    def _on_connect_sim(self):
        self._stop_if_running()
        self.pluto.disconnect()
        self.pluto.connect_simulation()
        self.lbl_hw.setText("Simulation mode")
        self.lbl_hw.setStyleSheet("color: #fab387;")
        if self.plot_stack.currentIndex() == 0:
            self._on_start()

    def _on_hw_error(self, msg):
        self._timer.stop()
        self.worker.wait(2000)
        self.pluto.disconnect()
        self.btn_start.setEnabled(False)
        self.btn_stop.setEnabled(False)
        self.lbl_hw.setText("Disconnected (lost)")
        self.lbl_hw.setStyleSheet("color: #f38ba8;")
        self.lbl_status.setText(f"Hardware error: {msg}")
        QMessageBox.critical(
            self, "PlutoSDR Disconnected",
            f"Lost connection to PlutoSDR:\n{msg}\n\n"
            "Reconnect the device and click 'Connect Hardware',\n"
            "or switch to 'Simulation Mode'.")

    # ==================================================================
    # Live mode start / stop
    # ==================================================================

    def _on_start(self):
        if self.worker.isRunning():
            return
        if not self.pluto.is_connected:
            return
        self.btn_start.setEnabled(False)
        self.btn_stop.setEnabled(True)
        self._ber_hist.clear()
        self._evm_hist.clear()
        self._snr_hist.clear()
        self._throughput_hist.clear()
        self._throughput_time.clear()
        self._total_bits = 0
        self._cumul_bits_list = []
        self._cumul_time_list = []
        self._start_time = time.monotonic()
        self._last_data_time = self._start_time
        self.worker.set_scheme(self.cmb_scheme.currentText())
        self.worker.start()
        self._timer.start()

    def _on_stop(self):
        self._timer.stop()
        self.worker.request_stop()
        self.worker.wait(3000)
        self.btn_start.setEnabled(True)
        self.btn_stop.setEnabled(False)

    def _on_scheme_changed(self, name):
        if self.worker.isRunning():
            self.worker.set_scheme(name)

    # ==================================================================
    # BER sweep
    # ==================================================================

    def _on_run_sweep(self):
        if self.sweep_worker.isRunning():
            return
        if not self.pluto.is_connected:
            self._update_status("Connect first (hardware or simulation)")
            return

        self._stop_if_running()

        # Clear old data
        self._sweep_data = {}
        for name in SCHEME_COLORS:
            self._sweep_curves_meas[name].setData([], [])

        self.sweep_worker.snr_min = self.spn_snr_min.value()
        self.sweep_worker.snr_max = self.spn_snr_max.value()
        self.sweep_worker.snr_step = self.spn_snr_step.value()
        self.sweep_worker.use_hardware = self.pluto.is_hardware

        self.btn_run_sweep.setEnabled(False)
        self.btn_stop_sweep.setEnabled(True)
        self.sweep_progress.setValue(0)
        self.sweep_worker.start()

    def _on_stop_sweep(self):
        self.sweep_worker.request_stop()
        self.sweep_worker.wait(3000)
        self.btn_run_sweep.setEnabled(True)
        self.btn_stop_sweep.setEnabled(False)

    def _on_sweep_point(self, scheme_name, snr_db, ber, progress):
        bps = SCHEMES[scheme_name]["bits_per_symbol"]
        ebno = snr_to_ebno(snr_db, bps)

        if scheme_name not in self._sweep_data:
            self._sweep_data[scheme_name] = ([], [])
        self._sweep_data[scheme_name][0].append(ebno)
        self._sweep_data[scheme_name][1].append(max(ber, 1e-7))

        x = np.array(self._sweep_data[scheme_name][0])
        y = np.array(self._sweep_data[scheme_name][1])
        self._sweep_curves_meas[scheme_name].setData(x, y)

        self.sweep_progress.setValue(int(progress * 100))

    def _on_sweep_done(self):
        self.btn_run_sweep.setEnabled(True)
        self.btn_stop_sweep.setEnabled(False)
        self.sweep_progress.setValue(100)
        self._update_status("BER sweep complete")

    # ==================================================================
    # Live timer
    # ==================================================================

    def _on_timer(self):
        self.worker.imp_snr_db = float(self.sld_snr.value())
        self.worker.imp_phase_deg = float(self.sld_phase.value())
        self.worker.imp_freq_hz = float(self.sld_freq.value())
        self.worker.imp_mp_delay = self.sld_mp_delay.value() * SPS
        self.worker.imp_mp_amp = self.sld_mp_amp.value() / 100.0
        self.worker.imp_fading_k = float(self.sld_fading.value())

        data = self.worker.read_latest()
        if data is None:
            return
        try:
            self._render(data)
        except Exception:
            traceback.print_exc()

    # ==================================================================
    # Render live plots
    # ==================================================================

    def _render(self, d):
        raw_iq = d["raw_iq"]
        impaired_iq = d["impaired_iq"]
        rx_symbols = d["rx_symbols"]
        ideal_symbols = d["ideal_symbols"]
        mf_samples = d["mf_samples"]

        if raw_iq is not None and len(raw_iq) > 0:
            fs = self.pluto.sample_rate
            N = len(raw_iq)
            freqs = np.fft.fftshift(np.fft.fftfreq(N, 1.0 / fs))
            spec_raw = 20 * np.log10(
                np.abs(np.fft.fftshift(np.fft.fft(raw_iq))) + 1e-12)
            spec_imp = 20 * np.log10(
                np.abs(np.fft.fftshift(np.fft.fft(impaired_iq))) + 1e-12)
            s = SPECTRUM_DECIMATE
            self.curve_spec_raw.setData(freqs[::s], spec_raw[::s])
            self.curve_spec_imp.setData(freqs[::s], spec_imp[::s])

        if rx_symbols is not None and len(rx_symbols) > 0:
            self.scatter_rx.setData(rx_symbols.real, rx_symbols.imag)
            if ideal_symbols is not None and len(ideal_symbols) > 0:
                combined = np.column_stack(
                    [ideal_symbols.real, ideal_symbols.imag])
                unique = np.unique(np.round(combined, 6), axis=0)
                self.scatter_ideal.setData(unique[:, 0], unique[:, 1])

        if mf_samples is not None and len(mf_samples) > 0:
            seg_len = 2 * SPS
            num_traces = min(MAX_EYE_CURVES, len(mf_samples) // seg_len)
            x = np.arange(seg_len)
            for i in range(num_traces):
                seg = mf_samples[i * seg_len:(i + 1) * seg_len]
                if len(seg) == seg_len:
                    self._eye_curves[i].setData(x, seg.real)
            for i in range(num_traces, MAX_EYE_CURVES):
                self._eye_curves[i].setData([], [])

        ber = d["ber"]
        evm = d["evm"]
        snr_est = d["snr"]
        freq_off = d["freq_off"]
        phase_off = d["phase_off"]
        bits_decoded = d.get("bits_decoded", 0)

        now = time.monotonic()
        dt = now - self._last_data_time if self._last_data_time else 0.05
        dt = max(dt, 1e-6)
        self._last_data_time = now
        throughput_kbps = (bits_decoded / dt) / 1000.0

        self._total_bits += bits_decoded
        elapsed = now - self._start_time if self._start_time else 0.0

        self._ber_hist.append(ber)
        self._evm_hist.append(evm)
        self._snr_hist.append(snr_est)
        self._throughput_hist.append(throughput_kbps)
        self._throughput_time.append(elapsed)
        self._cumul_bits_list.append(self._total_bits)
        self._cumul_time_list.append(elapsed)

        hx = np.arange(len(self._ber_hist))
        self.curve_ber.setData(hx, np.array(self._ber_hist))
        self.curve_evm.setData(hx, np.array(self._evm_hist))
        self.curve_snr.setData(hx, np.array(self._snr_hist))

        tp_t = np.array(self._throughput_time)
        self.curve_throughput.setData(tp_t, np.array(self._throughput_hist))
        cu_t = np.array(self._cumul_time_list)
        self.curve_cumul.setData(cu_t, np.array(self._cumul_bits_list))
        self.vb_cumul.autoRange()

        self.lbl_ber.setText(f"BER:       {ber:.4e}")
        self.lbl_evm.setText(f"EVM:       {evm:.1f} %")
        self.lbl_snr_est.setText(f"SNR est:   {snr_est:.1f} dB")
        self.lbl_freq_off.setText(f"Freq off:  {freq_off:.1f} Hz")
        self.lbl_phase_off.setText(
            f"Phase off: {np.degrees(phase_off):.1f} deg")
        self.lbl_throughput.setText(
            f"Throughput: {throughput_kbps:.1f} kbit/s")

        if self._total_bits >= 1_000_000:
            self.lbl_total_bits.setText(
                f"Total:     {self._total_bits/1e6:.2f} Mbit")
        elif self._total_bits >= 1_000:
            self.lbl_total_bits.setText(
                f"Total:     {self._total_bits/1e3:.1f} kbit")
        else:
            self.lbl_total_bits.setText(
                f"Total:     {self._total_bits} bit")

    def _update_status(self, msg):
        self.lbl_status.setText(msg)

    # ==================================================================
    # Cleanup
    # ==================================================================

    def closeEvent(self, event):
        self._stop_if_running()
        if self.sweep_worker.isRunning():
            self.sweep_worker.request_stop()
            self.sweep_worker.wait(3000)
        self.pluto.disconnect()
        event.accept()

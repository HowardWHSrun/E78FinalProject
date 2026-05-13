#!/usr/bin/env python3
"""Live PlutoSDR dashboard for the ENGR 078 final project."""

from __future__ import annotations

import errno
import os
import sys
import time
import webbrowser
from collections import deque
from pathlib import Path

import numpy as np
from dash import Dash, Input, Output, State, callback_context, dcc, html
import plotly.graph_objects as go

_ROOT = Path(__file__).resolve().parent
_SRC = _ROOT / "src"
if str(_SRC) not in sys.path:
    sys.path.insert(0, str(_SRC))

from modulation import SCHEMES
from realtime_engine import RealtimeEngine, SPS
from pluto_interface import PlutoInterface

PAPER = "#101827"
PLOT = "#111827"
GRID = "#263247"
TEXT = "#e5e7eb"
BLUE = "#60a5fa"
GREEN = "#34d399"
YELLOW = "#facc15"
RED = "#fb7185"
VIOLET = "#a78bfa"

VISIBLE_SCHEMES = ["BPSK", "QPSK", "16-QAM"]
MAX_HISTORY = 180
MAX_EYE_TRACES = 36
SPECTRUM_DECIMATE = 4

engine = RealtimeEngine()

snr_hist = deque(maxlen=MAX_HISTORY)
throughput_hist = deque(maxlen=MAX_HISTORY)
throughput_time = deque(maxlen=MAX_HISTORY)
cumul_bits = deque(maxlen=MAX_HISTORY)
cumul_time = deque(maxlen=MAX_HISTORY)

start_time = None
last_data_time = None
total_bits = 0
last_seen_sequence = None
last_engine_total_bits = 0


def base_fig(title: str, y_title: str | None = None, x_title: str | None = None) -> go.Figure:
    fig = go.Figure()
    fig.update_layout(
        title=title,
        template="plotly_dark",
        margin=dict(l=46, r=22, t=46, b=42),
        paper_bgcolor=PAPER,
        plot_bgcolor=PLOT,
        font=dict(color=TEXT, family="Inter, Arial, sans-serif"),
        legend=dict(orientation="h", yanchor="bottom", y=1.01, xanchor="right", x=1),
        hovermode="x unified",
    )
    fig.update_xaxes(title=x_title, gridcolor=GRID, zerolinecolor="#3b455c", showline=True, linecolor="#3b455c")
    fig.update_yaxes(title=y_title, gridcolor=GRID, zerolinecolor="#3b455c", showline=True, linecolor="#3b455c")
    return fig


def stat(label: str, value: str, color: str = BLUE):
    return html.Div(
        className="stat",
        children=[
            html.Div(label, className="stat-label"),
            html.Div(value, className="stat-value", style={"color": color}),
        ],
    )


def empty_readouts(scheme: str | None = None):
    src = source_state()
    run_state = "running" if engine.is_running else "stopped"
    bps = str(SCHEMES[scheme]["bits_per_symbol"]) if scheme in SCHEMES else "—"
    snr_value = "RX timeout" if engine.status.startswith("Hardware error") else "waiting"
    return [
        stat("Run source", f"{src['short']} ({run_state})", src["color"]),
        stat("Bits / symbol", bps, GREEN),
        stat("SNR est", snr_value, GREEN),
        stat("Throughput", "0.0 kb/s", YELLOW),
        stat("Total bits", "0", VIOLET),
    ]


def idle_message() -> str:
    src = source_state()
    if not engine.pluto.is_connected:
        return "No source selected. Choose Simulation or Connect Pluto, then press Start."
    if engine.status.startswith("Hardware error"):
        return f"{engine.status}. Press Connect Pluto, then Start again. If it repeats, check the USB/network link."
    if not engine.is_running:
        return f"{src['short']} is connected, but streaming is stopped. Press Start to receive I/Q samples."
    if engine.pluto.is_hardware:
        return (
            "Pluto is running, but no synchronized frame has been decoded yet. "
            "The radio may still be receiving I/Q samples; check the TX/RX path, antenna or loopback, and gain."
        )
    return "Simulation is running and waiting for the first decoded frame."


def source_state():
    """Return display fields for the current data source."""
    mode = engine.pluto.mode
    if mode == PlutoInterface.MODE_HARDWARE:
        return {
            "label": "HARDWARE: ADALM-Pluto SDR",
            "short": "Hardware",
            "color": GREEN,
            "detail": "RX samples are coming from the physical ADALM-Pluto over USB/network.",
        }
    if mode == PlutoInterface.MODE_SIMULATION:
        return {
            "label": "SIMULATION: software loopback",
            "short": "Simulation",
            "color": YELLOW,
            "detail": "No radio is being used. The transmitted waveform is looped back in software.",
        }
    return {
        "label": "NO SOURCE SELECTED",
        "short": "Disconnected",
        "color": RED,
        "detail": "Choose Connect Pluto for hardware or Simulation (no radio) for software-only mode.",
    }


def source_card(snr, phase, freq):
    src = source_state()
    running = "running" if engine.is_running else "idle"
    return html.Div(
        className="source-card",
        children=[
            html.Div("Signal source", className="stat-label"),
            html.Div(src["label"], className="source-value", style={"color": src["color"]}),
            html.Div(f"{src['detail']} Current stream state: {running}.", className="source-detail"),
            html.Div(
                f"Software impairments are simulated overlays: AWGN SNR {float(snr):.0f} dB, "
                f"phase {float(phase):.0f}°, frequency offset {float(freq):.0f} Hz.",
                className="source-detail source-note",
            ),
        ],
    )


def source_badge(fig: go.Figure, frozen: bool = False):
    src = source_state()
    stream_state = "RUNNING" if engine.is_running else "STOPPED"
    if frozen:
        stream_state = "STOPPED - frozen last buffer"
    fig.add_annotation(
        text=f"Source: {src['short']} | {stream_state}",
        xref="paper",
        yref="paper",
        x=0,
        y=1.14,
        showarrow=False,
        align="left",
        font=dict(size=12, color=src["color"]),
        bgcolor="rgba(15, 23, 42, 0.86)",
        bordercolor=src["color"],
        borderwidth=1,
        borderpad=4,
    )


def idle_figure(title: str, y_title: str | None, x_title: str | None) -> go.Figure:
    """Placeholder when the DSP thread has not produced a buffer yet."""
    fig = base_fig(title, y_title, x_title)
    fig.add_annotation(
        text=idle_message(),
        xref="paper",
        yref="paper",
        x=0.5,
        y=0.55,
        showarrow=False,
        font=dict(size=13, color=TEXT),
        align="center",
    )
    return fig


app = Dash(__name__)
app.title = "PlutoSDR Live"

app.layout = html.Div(
    className="app-shell",
    children=[
        html.Div(
            className="topbar",
            children=[
                html.Div(
                    children=[
                        html.H1("ADALM-Pluto Live Dashboard"),
                        html.Div(
                            "Live loopback display: spectrum/PSD, I/Q constellation, eye diagram, SNR, and throughput.",
                            className="subtitle",
                        ),
                    ]
                ),
                html.Div(
                    className="scope-pills",
                    children=[html.Span("Spectrum"), html.Span("Constellation"), html.Span("Eye diagram"), html.Span("Throughput")],
                ),
            ],
        ),
        html.Div(
            className="tab-pane",
            children=[
                html.Div(
                    className="controls",
                    children=[
                        html.Div("Pluto Controls", className="controls-title"),
            html.Div(id="source-mode", children=source_card(30, 0, 0)),
                        html.Div(
                            className="quick-start",
                            children=[
                                html.Div("Quick start", className="quick-title"),
                                html.Ol(
                                    children=[
                                        html.Li("Use Connect Pluto for hardware, or Simulation (no radio) for software-only mode."),
                                        html.Li("Press Start and check the Signal source label."),
                                        html.Li("Choose BPSK, QPSK, or 16-QAM."),
                                        html.Li("Adjust SNR, phase, or frequency offset if you want to test impairments."),
                                    ]
                                ),
                            ],
                        ),
                        html.Button("Connect Pluto", id="btn-connect", n_clicks=0, className="ctrl-btn btn-connect"),
                        html.Button(
                            "Simulation (no radio)",
                            id="btn-sim",
                            n_clicks=0,
                            className="ctrl-btn",
                            style={"marginLeft": "8px"},
                        ),
                        html.Div(style={"height": "8px"}),
                        html.Button("Start", id="btn-start", n_clicks=0, className="ctrl-btn btn-start"),
                        html.Button("Stop", id="btn-stop", n_clicks=0, className="ctrl-btn btn-stop", style={"marginLeft": "8px"}),
                        html.Label("Modulation", className="control-label"),
                        dcc.Dropdown(
                            id="scheme",
                            options=[{"label": k, "value": k} for k in VISIBLE_SCHEMES if k in SCHEMES],
                            value="QPSK",
                            clearable=False,
                        ),
                        html.Label("Software AWGN SNR (dB)", className="control-label"),
                        dcc.Slider(id="snr", min=0, max=40, step=1, value=30),
                        html.Label("Carrier phase offset (deg)", className="control-label"),
                        dcc.Slider(id="phase", min=-180, max=180, step=5, value=0),
                        html.Label("Carrier frequency offset (Hz)", className="control-label"),
                        dcc.Slider(id="freq", min=-5000, max=5000, step=100, value=0),
                        html.Div(id="status", className="stat", style={"marginTop": "14px"}),
                        html.Div(id="readouts", className="stats-grid", children=empty_readouts("QPSK")),
                    ],
                ),
                html.Div(
                    className="plot-grid two",
                    children=[
                        html.Div(className="panel", children=[dcc.Graph(id="fig-spectrum")]),
                        html.Div(className="panel", children=[dcc.Graph(id="fig-const")]),
                        html.Div(className="panel", children=[dcc.Graph(id="fig-eye")]),
                        html.Div(className="panel", children=[dcc.Graph(id="fig-throughput")]),
                    ],
                ),
            ],
        ),
        dcc.Interval(id="tick", interval=300, n_intervals=0),
    ],
)


def _clear_histories():
    global start_time, last_data_time, total_bits, last_seen_sequence, last_engine_total_bits
    start_time = time.monotonic()
    last_data_time = None
    total_bits = 0
    last_seen_sequence = None
    last_engine_total_bits = 0
    snr_hist.clear()
    throughput_hist.clear()
    throughput_time.clear()
    cumul_bits.clear()
    cumul_time.clear()


def _startup():
    if os.environ.get("PLUTO_AUTOSTART") != "1":
        return
    ok = engine.connect_hardware()
    if ok:
        engine.set_scheme("QPSK")
        _clear_histories()
        engine.start()


_startup()


@app.callback(
    Output("source-mode", "children"),
    Output("status", "children"),
    Input("btn-connect", "n_clicks"),
    Input("btn-sim", "n_clicks"),
    Input("btn-start", "n_clicks"),
    Input("btn-stop", "n_clicks"),
    Input("scheme", "value"),
    Input("snr", "value"),
    Input("phase", "value"),
    Input("freq", "value"),
)
def control(_connect_clicks, _sim_clicks, _start_clicks, _stop_clicks, scheme, snr, phase, freq):
    trig = callback_context.triggered[0]["prop_id"].split(".")[0] if callback_context.triggered else ""

    engine.set_scheme(scheme)
    engine.set_impairments(snr, phase, freq, 0, 0.0, 40.0)

    if trig == "btn-connect":
        engine.connect_hardware()
    elif trig == "btn-sim":
        engine.connect_simulation()
    elif trig == "btn-start":
        _clear_histories()
        engine.start()
    elif trig == "btn-stop":
        engine.stop()

    src = source_state()
    return (
        source_card(snr, phase, freq),
        [
            html.Div("Status", className="stat-label"),
            html.Div(engine.status, className="stat-value", style={"color": src["color"]}),
        ],
    )


@app.callback(
    Output("fig-spectrum", "figure"),
    Output("fig-const", "figure"),
    Output("fig-eye", "figure"),
    Output("fig-throughput", "figure"),
    Output("readouts", "children"),
    Input("tick", "n_intervals"),
    State("scheme", "value"),
)
def render(_n, scheme):
    global total_bits, last_data_time, last_seen_sequence, last_engine_total_bits

    data = engine.read_latest()
    if data is None:
        return (
            idle_figure("Power Spectral Density", "PSD (dB/Hz)", "Frequency (Hz)"),
            idle_figure("Constellation", "Q", "I"),
            idle_figure("Eye Diagram", "Amplitude", "Samples in 2T"),
            idle_figure("Throughput Counter", "Throughput (kb/s)", "Elapsed time (s)"),
            empty_readouts(scheme),
        )

    fs = engine.pluto.sample_rate
    n = len(data.raw_iq)
    freqs = np.fft.fftshift(np.fft.fftfreq(n, 1.0 / fs))
    window = np.hanning(n)
    raw_fft = np.fft.fftshift(np.fft.fft(data.raw_iq * window))
    imp_fft = np.fft.fftshift(np.fft.fft(data.impaired_iq * window))
    norm = fs * np.sum(window ** 2)
    spec_raw = 10 * np.log10((np.abs(raw_fft) ** 2 / norm) + 1e-18)
    spec_imp = 10 * np.log10((np.abs(imp_fft) ** 2 / norm) + 1e-18)
    s = SPECTRUM_DECIMATE

    frozen = not engine.is_running
    data_scheme = data.scheme if data.scheme in SCHEMES else scheme

    fig_spectrum = base_fig("Power Spectral Density", "PSD (dB/Hz)", "Frequency (Hz)")
    src = source_state()
    raw_name = "hardware RX" if engine.pluto.is_hardware else "simulation loopback"
    fig_spectrum.add_trace(go.Scatter(x=freqs[::s], y=spec_raw[::s], name=raw_name, line=dict(color=BLUE, width=1)))
    fig_spectrum.add_trace(go.Scatter(x=freqs[::s], y=spec_imp[::s], name="software-impaired view", line=dict(color=RED, width=1)))
    source_badge(fig_spectrum, frozen=frozen)

    fig_const = base_fig("Constellation", "Q", "I")
    fig_const.add_trace(
        go.Scatter(
            x=data.rx_symbols.real,
            y=data.rx_symbols.imag,
            mode="markers",
            marker=dict(size=4, color=GREEN),
            name=f"{src['short'].lower()} symbols",
        )
    )
    unique = np.unique(np.round(np.column_stack([data.ideal_symbols.real, data.ideal_symbols.imag]), 6), axis=0)
    fig_const.add_trace(go.Scatter(x=unique[:, 0], y=unique[:, 1], mode="markers", marker=dict(size=11, color=YELLOW, symbol="x"), name="ideal"))
    fig_const.update_yaxes(scaleanchor="x", scaleratio=1)
    source_badge(fig_const, frozen=frozen)

    fig_eye = base_fig("Eye Diagram", "Amplitude", "Samples in 2T")
    seg_len = 2 * SPS
    num_traces = min(MAX_EYE_TRACES, len(data.mf_samples) // seg_len)
    x = np.arange(seg_len)
    for i in range(num_traces):
        seg = data.mf_samples[i * seg_len:(i + 1) * seg_len]
        if len(seg) == seg_len:
            fig_eye.add_trace(
                go.Scatter(x=x, y=seg.real, mode="lines", line=dict(color="rgba(96,165,250,0.22)", width=1), showlegend=False)
            )
    fig_eye.add_vline(x=SPS, line_width=2, line_dash="dash", line_color=YELLOW)
    source_badge(fig_eye, frozen=frozen)

    has_new_frame = data.sequence != last_seen_sequence
    throughput_kbps = throughput_hist[-1] if throughput_hist else 0.0
    total_bits = data.total_bits_decoded

    if has_new_frame:
        elapsed = data.produced_at - (start_time or data.produced_at)
        if last_data_time is not None:
            dt = max(data.produced_at - last_data_time, 1e-6)
            delta_bits = max(data.total_bits_decoded - last_engine_total_bits, 0)
            throughput_kbps = (delta_bits / dt) / 1000.0
            throughput_hist.append(throughput_kbps)
            throughput_time.append(elapsed)
        else:
            throughput_hist.append(0.0)
            throughput_time.append(elapsed)

        snr_hist.append(data.snr)
        cumul_bits.append(total_bits)
        cumul_time.append(elapsed)
        last_data_time = data.produced_at
        last_seen_sequence = data.sequence
        last_engine_total_bits = data.total_bits_decoded

    if frozen:
        throughput_kbps = 0.0

    fig_tp = base_fig("Throughput Counter", "Throughput (kb/s)", "Elapsed time (s)")
    fig_tp.add_trace(go.Scatter(x=list(throughput_time), y=list(throughput_hist), name="decoded rate", line=dict(color=YELLOW, width=2)))
    fig_tp.add_trace(go.Scatter(x=list(cumul_time), y=list(cumul_bits), name="cumulative bits", yaxis="y2", line=dict(color=VIOLET, width=2)))
    fig_tp.update_layout(yaxis2=dict(title="Total bits", overlaying="y", side="right"))
    source_badge(fig_tp, frozen=frozen)

    readouts = [
        stat("Run source", f"{src['short']} ({'running' if engine.is_running else 'stopped'})", src["color"]),
        stat("Bits / symbol", str(SCHEMES[data_scheme]["bits_per_symbol"]), GREEN),
        stat("SNR est", f"{data.snr:.1f} dB", GREEN),
        stat("Throughput", f"{throughput_kbps:.1f} kb/s", YELLOW),
        stat("Total bits", f"{total_bits:,}", VIOLET),
    ]
    return fig_spectrum, fig_const, fig_eye, fig_tp, readouts


if __name__ == "__main__":
    # Port 8051 avoids clashing with python main.py (class visualizer on 8050).
    # Default 0.0.0.0: accept connections via 127.0.0.1 and this machine’s LAN IP.
    # (ERR_CONNECTION_REFUSED almost always means this script is not running or the port is wrong.)
    host = os.environ.get("PLUTO_DASH_HOST", "0.0.0.0")
    port = int(os.environ.get("PLUTO_DASH_PORT", "8051"))
    loop_url = f"http://127.0.0.1:{port}/"
    print(
        "\n  Pluto Live dashboard — keep this terminal open while you use the browser.\n"
        f"  → On this computer open: {loop_url}\n"
        "  If you see ERR_CONNECTION_REFUSED, the server is not running here, or you used the wrong port "
        f"({port} for Pluto Live; 8050 is main.py only).\n"
        "  To listen on loopback only: PLUTO_DASH_HOST=127.0.0.1 python pluto_live_app.py\n",
        flush=True,
    )
    if os.environ.get("PLUTO_OPEN_BROWSER", "1").lower() not in ("0", "false", "no"):
        try:
            webbrowser.open(loop_url)
        except Exception:
            pass
    try:
        app.run(debug=False, host=host, port=port, threaded=True)
    except OSError as exc:
        if getattr(exc, "errno", None) == errno.EADDRINUSE:
            print(
                f"\n  Port {port} is already in use. Stop the other process, or run:\n"
                f"    PLUTO_DASH_PORT={port + 1} python pluto_live_app.py\n",
                flush=True,
            )
        raise

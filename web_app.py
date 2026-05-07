#!/usr/bin/env python3
"""
Browser dashboard for the modulation visualizer.

Run:
    python web_app.py
Then open:
    http://127.0.0.1:8050
"""

import sys
import time
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

MAX_HISTORY = 200
MAX_EYE_TRACES = 40
SPECTRUM_DECIMATE = 4

engine = RealtimeEngine()

ber_hist = deque(maxlen=MAX_HISTORY)
evm_hist = deque(maxlen=MAX_HISTORY)
snr_hist = deque(maxlen=MAX_HISTORY)
throughput_hist = deque(maxlen=MAX_HISTORY)
throughput_time = deque(maxlen=MAX_HISTORY)
cumul_bits = deque(maxlen=MAX_HISTORY)
cumul_time = deque(maxlen=MAX_HISTORY)

start_time = None
last_data_time = None
total_bits = 0


def empty_fig(title: str) -> go.Figure:
    fig = go.Figure()
    fig.update_layout(
        title=title,
        template="plotly_dark",
        margin=dict(l=40, r=20, t=40, b=35),
        paper_bgcolor="#111827",
        plot_bgcolor="#111827",
    )
    return fig


app = Dash(__name__)
app.title = "PlutoSDR Web Dashboard"

app.layout = html.Div(
    style={
        "fontFamily": "Inter, Arial, sans-serif",
        "backgroundColor": "#0b1220",
        "color": "#e5e7eb",
        "minHeight": "100vh",
        "padding": "16px",
    },
    children=[
        html.H2("Real-Time Digital Modulation Visualizer (Web)"),
        html.Div(
            style={
                "display": "grid",
                "gridTemplateColumns": "360px 1fr",
                "gap": "16px",
                "alignItems": "start",
            },
            children=[
                html.Div(
                    style={
                        "background": "#111827",
                        "border": "1px solid #1f2937",
                        "borderRadius": "12px",
                        "padding": "14px",
                        "position": "sticky",
                        "top": "10px",
                    },
                    children=[
                        html.Div(
                            style={"marginBottom": "12px"},
                            children=[
                                html.Div("Control Bar", className="section-title"),
                                html.Div(
                                    "Connect, start streaming, and tune impairments live.",
                                    style={"fontSize": "13px", "color": "#9ca3af"},
                                ),
                            ],
                        ),
                        html.Div(
                            style={
                                "background": "#0f172a",
                                "border": "1px solid #1f2937",
                                "borderRadius": "10px",
                                "padding": "10px",
                                "marginBottom": "10px",
                            },
                            children=[
                                html.Div("Connection", className="section-title"),
                                dcc.Dropdown(
                                    id="conn-mode",
                                    options=[
                                        {"label": "Simulation", "value": "sim"},
                                        {"label": "Hardware (PlutoSDR)", "value": "hw"},
                                    ],
                                    value="sim",
                                    clearable=False,
                                    style={"color": "#111827"},
                                ),
                                html.Div(style={"height": "10px"}),
                                html.Div(
                                    style={"display": "grid", "gridTemplateColumns": "1fr 1fr 1fr", "gap": "8px"},
                                    children=[
                                        html.Button("Connect", id="btn-connect", n_clicks=0, className="ctrl-btn btn-connect"),
                                        html.Button("Start", id="btn-start", n_clicks=0, className="ctrl-btn btn-start"),
                                        html.Button("Stop", id="btn-stop", n_clicks=0, className="ctrl-btn btn-stop"),
                                    ],
                                ),
                            ],
                        ),
                        html.Div(
                            style={
                                "background": "#0f172a",
                                "border": "1px solid #1f2937",
                                "borderRadius": "10px",
                                "padding": "10px",
                                "marginBottom": "10px",
                            },
                            children=[
                                html.Div("Modulation", className="section-title"),
                                dcc.Dropdown(
                                    id="scheme",
                                    options=[{"label": k, "value": k} for k in SCHEMES.keys()],
                                    value="QPSK",
                                    clearable=False,
                                    style={"color": "#111827"},
                                ),
                            ],
                        ),
                        html.Div(
                            style={
                                "background": "#0f172a",
                                "border": "1px solid #1f2937",
                                "borderRadius": "10px",
                                "padding": "10px",
                                "marginBottom": "10px",
                            },
                            children=[
                                html.Div("Impairments", className="section-title"),
                                html.Label("SNR (dB)", style={"fontSize": "13px"}),
                                dcc.Slider(id="snr", min=0, max=40, step=1, value=30, tooltip={"placement": "bottom", "always_visible": False}),
                                html.Label("Phase (deg)", style={"fontSize": "13px", "marginTop": "8px"}),
                                dcc.Slider(id="phase", min=-180, max=180, step=1, value=0, tooltip={"placement": "bottom", "always_visible": False}),
                                html.Label("Freq Offset (Hz)", style={"fontSize": "13px", "marginTop": "8px"}),
                                dcc.Slider(id="freq", min=-5000, max=5000, step=50, value=0, tooltip={"placement": "bottom", "always_visible": False}),
                                html.Label("Multipath Delay (symbols)", style={"fontSize": "13px", "marginTop": "8px"}),
                                dcc.Slider(id="mp-delay", min=0, max=10, step=1, value=0, tooltip={"placement": "bottom", "always_visible": False}),
                                html.Label("Multipath Amplitude", style={"fontSize": "13px", "marginTop": "8px"}),
                                dcc.Slider(id="mp-amp", min=0, max=1, step=0.01, value=0, tooltip={"placement": "bottom", "always_visible": False}),
                                html.Label("Rician K (dB)", style={"fontSize": "13px", "marginTop": "8px"}),
                                dcc.Slider(id="fading", min=-10, max=40, step=1, value=40, tooltip={"placement": "bottom", "always_visible": False}),
                            ],
                        ),
                        html.Div(
                            style={
                                "background": "#0f172a",
                                "border": "1px solid #1f2937",
                                "borderRadius": "10px",
                                "padding": "10px",
                            },
                            children=[
                                html.Div(id="status", children="Status: Idle", style={"fontWeight": "700", "color": "#86efac"}),
                                html.Div(
                                    id="readouts",
                                    style={
                                        "marginTop": "8px",
                                        "fontFamily": "ui-monospace, SFMono-Regular, Menlo, monospace",
                                        "whiteSpace": "pre-line",
                                        "fontSize": "13px",
                                        "lineHeight": "1.5",
                                        "color": "#d1d5db",
                                    },
                                ),
                            ],
                        ),
                    ],
                ),
                html.Div(
                    style={"display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "12px"},
                    children=[
                        dcc.Graph(id="fig-spectrum", figure=empty_fig("Power Spectrum")),
                        dcc.Graph(id="fig-const", figure=empty_fig("Constellation")),
                        dcc.Graph(id="fig-eye", figure=empty_fig("Eye Diagram")),
                        dcc.Graph(id="fig-metrics", figure=empty_fig("Metrics")),
                        dcc.Graph(
                            id="fig-throughput",
                            figure=empty_fig("Throughput & Cumulative Bits"),
                            style={"gridColumn": "1 / span 2"},
                        ),
                    ],
                ),
            ],
        ),
        dcc.Interval(id="tick", interval=250, n_intervals=0),
    ],
)


@app.callback(
    Output("status", "children"),
    Input("btn-connect", "n_clicks"),
    Input("btn-start", "n_clicks"),
    Input("btn-stop", "n_clicks"),
    Input("scheme", "value"),
    Input("snr", "value"),
    Input("phase", "value"),
    Input("freq", "value"),
    Input("mp-delay", "value"),
    Input("mp-amp", "value"),
    Input("fading", "value"),
    State("conn-mode", "value"),
)
def control(
    _connect_clicks,
    _start_clicks,
    _stop_clicks,
    scheme,
    snr,
    phase,
    freq,
    mp_delay,
    mp_amp,
    fading,
    conn_mode,
):
    global start_time, last_data_time, total_bits
    trig = callback_context.triggered[0]["prop_id"].split(".")[0] if callback_context.triggered else ""

    engine.set_scheme(scheme)
    engine.set_impairments(snr, phase, freq, mp_delay, mp_amp, fading)

    if trig == "btn-connect":
        ok = engine.connect_hardware() if conn_mode == "hw" else engine.connect_simulation()
        if not ok:
            return "Status: Connection failed"
    elif trig == "btn-start":
        engine.start()
        start_time = time.monotonic()
        last_data_time = start_time
        total_bits = 0
        ber_hist.clear()
        evm_hist.clear()
        snr_hist.clear()
        throughput_hist.clear()
        throughput_time.clear()
        cumul_bits.clear()
        cumul_time.clear()
    elif trig == "btn-stop":
        engine.stop()

    return f"Status: {engine.status}"


@app.callback(
    Output("fig-spectrum", "figure"),
    Output("fig-const", "figure"),
    Output("fig-eye", "figure"),
    Output("fig-metrics", "figure"),
    Output("fig-throughput", "figure"),
    Output("readouts", "children"),
    Input("tick", "n_intervals"),
)
def render(_n):
    global total_bits, last_data_time
    data = engine.read_latest()
    if data is None:
        return (
            empty_fig("Power Spectrum"),
            empty_fig("Constellation"),
            empty_fig("Eye Diagram"),
            empty_fig("Metrics"),
            empty_fig("Throughput & Cumulative Bits"),
            "BER: --\nEVM: --\nSNR: --\nThroughput: --\nTotal bits: --",
        )

    # Spectrum
    fs = engine.pluto.sample_rate
    n = len(data.raw_iq)
    freqs = np.fft.fftshift(np.fft.fftfreq(n, 1.0 / fs))
    spec_raw = 20 * np.log10(np.abs(np.fft.fftshift(np.fft.fft(data.raw_iq))) + 1e-12)
    spec_imp = 20 * np.log10(np.abs(np.fft.fftshift(np.fft.fft(data.impaired_iq))) + 1e-12)
    s = SPECTRUM_DECIMATE

    fig_spectrum = empty_fig("Power Spectrum (dB)")
    fig_spectrum.add_trace(go.Scattergl(x=freqs[::s], y=spec_raw[::s], name="Raw RX", line=dict(width=1)))
    fig_spectrum.add_trace(go.Scattergl(x=freqs[::s], y=spec_imp[::s], name="Impaired", line=dict(width=1)))

    # Constellation
    fig_const = empty_fig("Constellation")
    fig_const.add_trace(
        go.Scattergl(
            x=data.rx_symbols.real,
            y=data.rx_symbols.imag,
            mode="markers",
            marker=dict(size=4, color="#32d583"),
            name="RX",
        )
    )
    unique = np.unique(np.round(np.column_stack([data.ideal_symbols.real, data.ideal_symbols.imag]), 6), axis=0)
    fig_const.add_trace(
        go.Scatter(
            x=unique[:, 0],
            y=unique[:, 1],
            mode="markers",
            marker=dict(size=10, color="#facc15", symbol="x"),
            name="Ideal",
        )
    )
    fig_const.update_yaxes(scaleanchor="x", scaleratio=1)

    # Eye diagram
    fig_eye = empty_fig("Eye Diagram")
    seg_len = 2 * SPS
    num_traces = min(MAX_EYE_TRACES, len(data.mf_samples) // seg_len)
    x = np.arange(seg_len)
    for i in range(num_traces):
        seg = data.mf_samples[i * seg_len:(i + 1) * seg_len]
        if len(seg) == seg_len:
            fig_eye.add_trace(
                go.Scatter(
                    x=x,
                    y=seg.real,
                    mode="lines",
                    line=dict(color="rgba(56,189,248,0.18)", width=1),
                    showlegend=False,
                )
            )

    # Metrics + throughput
    now = time.monotonic()
    dt = max((now - last_data_time) if last_data_time else 0.05, 1e-6)
    last_data_time = now
    throughput_kbps = (data.bits_decoded / dt) / 1000.0
    total_bits += data.bits_decoded
    elapsed = now - (start_time or now)

    ber_hist.append(data.ber)
    evm_hist.append(data.evm)
    snr_hist.append(data.snr)
    throughput_hist.append(throughput_kbps)
    throughput_time.append(elapsed)
    cumul_bits.append(total_bits)
    cumul_time.append(elapsed)

    fig_metrics = empty_fig("Running Metrics")
    hx = list(range(len(ber_hist)))
    fig_metrics.add_trace(go.Scatter(x=hx, y=list(ber_hist), name="BER", mode="lines"))
    fig_metrics.add_trace(go.Scatter(x=hx, y=list(evm_hist), name="EVM (%)", mode="lines"))
    fig_metrics.add_trace(go.Scatter(x=hx, y=list(snr_hist), name="SNR (dB)", mode="lines"))

    fig_tp = empty_fig("Throughput & Cumulative Bits")
    fig_tp.add_trace(
        go.Scatter(x=list(throughput_time), y=list(throughput_hist), name="Throughput (kbit/s)", mode="lines")
    )
    fig_tp.add_trace(
        go.Scatter(
            x=list(cumul_time),
            y=list(cumul_bits),
            name="Total Bits",
            mode="lines",
            yaxis="y2",
            line=dict(color="#c084fc"),
        )
    )
    fig_tp.update_layout(
        yaxis=dict(title="Throughput (kbit/s)"),
        yaxis2=dict(title="Total Bits", overlaying="y", side="right"),
    )

    readouts = (
        f"BER: {data.ber:.4e}\n"
        f"EVM: {data.evm:.1f} %\n"
        f"SNR est: {data.snr:.1f} dB\n"
        f"Freq off: {data.freq_off:.1f} Hz\n"
        f"Phase off: {np.degrees(data.phase_off):.1f} deg\n"
        f"Throughput: {throughput_kbps:.1f} kbit/s\n"
        f"Total bits: {total_bits}"
    )

    return fig_spectrum, fig_const, fig_eye, fig_metrics, fig_tp, readouts


if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1", port=8050)

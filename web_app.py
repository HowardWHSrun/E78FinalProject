#!/usr/bin/env python3
"""
ENGR 078 class-content visualizer.

Run:
    python web_app.py
Then open:
    http://127.0.0.1:8050
"""

from __future__ import annotations

import math

import numpy as np
from dash import Dash, Input, Output, dcc, html
import plotly.graph_objects as go


PAPER = "#101827"
PLOT = "#111827"
GRID = "#263247"
TEXT = "#e5e7eb"
MUTED = "#9ca3af"
BLUE = "#60a5fa"
GREEN = "#34d399"
YELLOW = "#facc15"
RED = "#fb7185"
VIOLET = "#a78bfa"
ORANGE = "#fb923c"

LINE_CODES = [
    "On-off NRZ",
    "On-off RZ",
    "Polar NRZ",
    "Polar RZ",
    "Bipolar AMI",
    "Manchester",
]

CARRIER_SCHEMES = [
    "ASK/OOK",
    "BPSK",
    "BFSK",
    "QPSK",
    "16-QAM",
]

CARRIER_BITS_PER_SYMBOL = {
    "ASK/OOK": 1,
    "BPSK": 1,
    "BFSK": 1,
    "QPSK": 2,
    "16-QAM": 4,
}


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
    fig.update_xaxes(
        title=x_title,
        gridcolor=GRID,
        zerolinecolor="#3b455c",
        showline=True,
        linecolor="#3b455c",
    )
    fig.update_yaxes(
        title=y_title,
        gridcolor=GRID,
        zerolinecolor="#3b455c",
        showline=True,
        linecolor="#3b455c",
    )
    return fig


def normalize_bits(bit_string: str) -> np.ndarray:
    bits = [int(ch) for ch in bit_string if ch in "01"]
    if not bits:
        bits = [1, 1, 0, 1, 0, 1, 0, 1]
    return np.array(bits[:32], dtype=int)


def make_stat(label: str, value: str, tone: str = BLUE) -> html.Div:
    return html.Div(
        className="stat",
        children=[
            html.Div(label, className="stat-label"),
            html.Div(value, className="stat-value", style={"color": tone}),
        ],
    )


def card(children, class_name: str = "panel") -> html.Div:
    return html.Div(className=class_name, children=children)


def controls(title: str, children) -> html.Div:
    return html.Div(
        className="controls",
        children=[
            html.Div(title, className="controls-title"),
            *children,
        ],
    )


def label(text: str) -> html.Label:
    return html.Label(text, className="control-label")


def sinc(x: np.ndarray) -> np.ndarray:
    return np.sinc(x)


def line_code(bits: np.ndarray, code: str, samples_per_bit: int = 80) -> tuple[np.ndarray, np.ndarray]:
    y = np.zeros(len(bits) * samples_per_bit)
    polarity = 1
    half = samples_per_bit // 2

    for idx, bit in enumerate(bits):
        start = idx * samples_per_bit
        stop = start + samples_per_bit
        mid = start + half

        if code == "On-off NRZ":
            y[start:stop] = 1 if bit else 0
        elif code == "On-off RZ":
            y[start:mid] = 1 if bit else 0
        elif code == "Polar NRZ":
            y[start:stop] = 1 if bit else -1
        elif code == "Polar RZ":
            y[start:mid] = 1 if bit else -1
        elif code == "Bipolar AMI":
            if bit:
                y[start:mid] = polarity
                polarity *= -1
        elif code == "Manchester":
            if bit:
                y[start:mid] = 1
                y[mid:stop] = -1
            else:
                y[start:mid] = -1
                y[mid:stop] = 1

    t = np.arange(len(y)) / samples_per_bit
    return t, y


def spectrum_db(y: np.ndarray, samples_per_bit: int = 80) -> tuple[np.ndarray, np.ndarray]:
    y = y - np.mean(y)
    n_fft = int(2 ** np.ceil(np.log2(max(512, len(y) * 4))))
    win = np.hanning(len(y))
    spec = np.abs(np.fft.rfft(y * win, n=n_fft)) ** 2
    spec /= max(spec.max(), 1e-15)
    f = np.fft.rfftfreq(n_fft, d=1.0 / samples_per_bit)
    return f, 10 * np.log10(spec + 1e-12)


def raised_cosine(beta: float, span: int = 8, samples_per_symbol: int = 80) -> tuple[np.ndarray, np.ndarray]:
    t = np.arange(-span * samples_per_symbol, span * samples_per_symbol + 1) / samples_per_symbol
    if beta <= 1e-9:
        p = sinc(t)
    else:
        den = 1 - (2 * beta * t) ** 2
        p = np.empty_like(t)
        singular = np.isclose(den, 0.0)
        regular = ~singular
        p[regular] = sinc(t[regular]) * np.cos(np.pi * beta * t[regular]) / den[regular]
        p[singular] = np.pi / 4 * sinc(1 / (2 * beta))
    p /= np.max(np.abs(p))
    return t, p


def add_controlled_isi(pulse: np.ndarray, samples_per_symbol: int, isi: float) -> np.ndarray:
    if isi <= 0:
        return pulse
    shifted_late = np.roll(pulse, samples_per_symbol)
    shifted_early = np.roll(pulse, -samples_per_symbol)
    mixed = pulse + 0.32 * isi * shifted_late + 0.22 * isi * shifted_early
    center = len(mixed) // 2
    return mixed / max(abs(mixed[center]), 1e-12)


def build_eye(beta: float, isi: float, noise: float, m_pam: int) -> tuple[np.ndarray, list[tuple[np.ndarray, np.ndarray]], np.ndarray]:
    sps = 80
    _, pulse = raised_cosine(beta, samples_per_symbol=sps)
    pulse = add_controlled_isi(pulse, sps, isi)

    rng = np.random.default_rng(78)
    levels = np.arange(-(m_pam - 1), m_pam, 2, dtype=float)
    levels /= np.max(np.abs(levels))
    symbols = rng.choice(levels, size=150)
    up = np.zeros(len(symbols) * sps)
    up[::sps] = symbols
    waveform = np.convolve(up, pulse, mode="same")
    waveform += rng.normal(0, noise, size=len(waveform))

    traces = []
    x = np.arange(2 * sps) / sps
    for k in range(16, min(95, len(symbols) - 3)):
        start = k * sps
        seg = waveform[start:start + 2 * sps]
        if len(seg) == 2 * sps:
            traces.append((x, seg))
    sample_points = waveform[16 * sps:95 * sps:sps]
    return waveform, traces, sample_points


def pam_levels(m_pam: int) -> np.ndarray:
    levels = np.arange(-(m_pam - 1), m_pam, 2, dtype=float)
    return levels / np.max(np.abs(levels))


def carrier_waveform(scheme: str, bits: np.ndarray, symbol_rate: float = 1.0, samples_per_symbol: int = 120):
    rng = np.random.default_rng(7)
    carrier_per_symbol = 5
    t = np.arange(0, min(8, len(bits)) * samples_per_symbol) / samples_per_symbol
    symbols_used = max(1, len(t) // samples_per_symbol)

    if scheme == "ASK/OOK":
        sym = bits[:symbols_used]
        env = np.repeat(sym, samples_per_symbol)[:len(t)]
        y = env * np.cos(2 * np.pi * carrier_per_symbol * t)
        points = np.column_stack([sym, np.zeros_like(sym)])
        point_label = "ASK amplitudes"
    elif scheme == "BPSK":
        sym = 2 * bits[:symbols_used] - 1
        env = np.repeat(sym, samples_per_symbol)[:len(t)]
        y = env * np.cos(2 * np.pi * carrier_per_symbol * t)
        points = np.column_stack([sym, np.zeros_like(sym)])
        point_label = "BPSK phase states"
    elif scheme == "BFSK":
        sym = bits[:symbols_used]
        y = np.zeros_like(t)
        for idx, bit in enumerate(sym):
            start = idx * samples_per_symbol
            stop = min(start + samples_per_symbol, len(t))
            f = carrier_per_symbol + (-1.2 if bit == 0 else 1.2)
            y[start:stop] = np.cos(2 * np.pi * f * t[start:stop])
        points = np.column_stack([carrier_per_symbol + np.array([-1.2, 1.2]), [0, 0]])
        point_label = "BFSK tones"
    elif scheme == "QPSK":
        b = bits.copy()
        if len(b) % 2:
            b = np.append(b, 0)
        pairs = b.reshape(-1, 2)[:symbols_used]
        i = 2 * pairs[:, 0] - 1
        q = 2 * pairs[:, 1] - 1
        i_rep = np.repeat(i / np.sqrt(2), samples_per_symbol)[:len(t)]
        q_rep = np.repeat(q / np.sqrt(2), samples_per_symbol)[:len(t)]
        y = i_rep * np.cos(2 * np.pi * carrier_per_symbol * t) - q_rep * np.sin(2 * np.pi * carrier_per_symbol * t)
        points = np.column_stack([i / np.sqrt(2), q / np.sqrt(2)])
        point_label = "QPSK I/Q"
    else:
        levels = np.array([-3, -1, 1, 3]) / np.sqrt(10)
        i = rng.choice(levels, symbols_used)
        q = rng.choice(levels, symbols_used)
        i_rep = np.repeat(i, samples_per_symbol)[:len(t)]
        q_rep = np.repeat(q, samples_per_symbol)[:len(t)]
        y = i_rep * np.cos(2 * np.pi * carrier_per_symbol * t) - q_rep * np.sin(2 * np.pi * carrier_per_symbol * t)
        grid_i, grid_q = np.meshgrid(levels, levels)
        points = np.column_stack([grid_i.ravel(), grid_q.ravel()])
        point_label = "16-QAM I/Q"

    n_fft = 4096
    spec = np.abs(np.fft.fftshift(np.fft.fft(y * np.hanning(len(y)), n=n_fft))) ** 2
    spec /= max(spec.max(), 1e-15)
    freq = np.fft.fftshift(np.fft.fftfreq(n_fft, d=1.0 / samples_per_symbol))
    return t, y, freq, 10 * np.log10(spec + 1e-12), points, point_label


def binary_entropy(p: np.ndarray) -> np.ndarray:
    p = np.clip(p, 1e-12, 1 - 1e-12)
    return -(p * np.log2(p) + (1 - p) * np.log2(1 - p))


def parse_probabilities(prob_text: str) -> np.ndarray:
    vals = []
    for part in prob_text.replace(",", " ").split():
        try:
            vals.append(float(part))
        except ValueError:
            pass
    if not vals:
        vals = [0.4, 0.25, 0.2, 0.15]
    probs = np.array(vals[:8], dtype=float)
    probs = np.clip(probs, 0, None)
    if probs.sum() <= 0:
        probs = np.array([0.4, 0.25, 0.2, 0.15])
    return probs / probs.sum()


def discrete_entropy(probs: np.ndarray) -> float:
    p = probs[probs > 0]
    return float(-np.sum(p * np.log2(p)))


def hamming_distance(a: str, b: str) -> int:
    return sum(x != y for x, y in zip(a, b))


app = Dash(__name__)
app.title = "ENGR 078 Visualizer"

app.layout = html.Div(
    className="app-shell",
    children=[
        html.Div(
            className="topbar",
            children=[
                html.Div(
                    children=[
                        html.H1("ENGR 078 Communications Visualizer"),
                        html.Div(
                            "Interactive communications visuals for PCM, line coding, PSD, ISI, eye diagrams, M-ary baseband, carrier systems, capacity, and error-control basics.",
                            className="subtitle",
                        ),
                    ]
                ),
                html.Div(
                    className="scope-pills",
                    children=[
                        html.Span("Line coding"),
                        html.Span("Raised cosine"),
                        html.Span("ASK/PSK/FSK/QAM"),
                        html.Span("Shannon + BSC"),
                    ],
                ),
            ],
        ),
        dcc.Tabs(
            id="tabs",
            value="pcm",
            className="tabs",
            children=[
                dcc.Tab(label="PCM", value="pcm", className="tab", selected_className="tab-active"),
                dcc.Tab(label="Line Coding", value="line", className="tab", selected_className="tab-active"),
                dcc.Tab(label="ISI + Eye", value="isi", className="tab", selected_className="tab-active"),
                dcc.Tab(label="M-ary + Carrier", value="carrier", className="tab", selected_className="tab-active"),
                dcc.Tab(label="Capacity + Codes", value="capacity", className="tab", selected_className="tab-active"),
            ],
        ),
        html.Div(
            id="tab-content",
            className="tab-content",
            children=[
                html.Div(
                    id="pcm-panel",
                    className="tab-pane",
                    children=[
                        controls(
                            "PCM and Source Coding",
                            [
                                label("Message bandwidth Bm (kHz)"),
                                dcc.Slider(id="pcm-bm", min=1, max=10, step=0.5, value=5),
                                label("Sampling multiplier"),
                                dcc.Slider(id="pcm-fs-mult", min=2, max=6, step=0.5, value=2),
                                label("Bits per sample n"),
                                dcc.Dropdown(
                                    id="pcm-bits",
                                    options=[{"label": str(v), "value": v} for v in [2, 3, 4, 6, 8]],
                                    value=4,
                                    clearable=False,
                                ),
                                html.Div(id="pcm-stats", className="stats-grid"),
                            ],
                        ),
                        card([dcc.Graph(id="pcm-fig")]),
                    ],
                ),
                html.Div(
                    id="line-panel",
                    className="tab-pane",
                    style={"display": "none"},
                    children=[
                        controls(
                            "Line Coding and PSD",
                            [
                                label("Input bits"),
                                dcc.Input(id="line-bits", value="11010101", debounce=True, className="text-input"),
                                label("Line code"),
                                dcc.Dropdown(
                                    id="line-code",
                                    options=[{"label": c, "value": c} for c in LINE_CODES],
                                    value="Polar RZ",
                                    clearable=False,
                                ),
                                html.Div(id="line-stats", className="stats-grid"),
                            ],
                        ),
                        html.Div(
                            className="plot-grid two",
                            children=[
                                card([dcc.Graph(id="line-wave")]),
                                card([dcc.Graph(id="line-psd")]),
                            ],
                        ),
                    ],
                ),
                html.Div(
                    id="isi-panel",
                    className="tab-pane",
                    style={"display": "none"},
                    children=[
                        controls(
                            "ISI, Raised Cosine, and Eye",
                            [
                                label("Raised-cosine roll-off beta"),
                                dcc.Slider(id="rc-beta", min=0, max=1, step=0.05, value=0.5),
                                label("Neighbor-symbol coupling"),
                                dcc.Slider(id="isi-amount", min=0, max=1, step=0.05, value=0.15),
                                label("Noise standard deviation"),
                                dcc.Slider(id="eye-noise", min=0, max=0.35, step=0.01, value=0.04),
                                label("PAM levels"),
                                dcc.Dropdown(
                                    id="eye-m",
                                    options=[{"label": f"{m}-PAM", "value": m} for m in [2, 4, 8]],
                                    value=2,
                                    clearable=False,
                                ),
                                html.Div(id="isi-stats", className="stats-grid"),
                            ],
                        ),
                        html.Div(
                            className="plot-grid two",
                            children=[
                                card([dcc.Graph(id="rc-pulse")]),
                                card([dcc.Graph(id="eye-fig")]),
                            ],
                        ),
                    ],
                ),
                html.Div(
                    id="carrier-panel",
                    className="tab-pane",
                    style={"display": "none"},
                    children=[
                        controls(
                            "M-ary Baseband and Carrier Systems",
                            [
                                label("Baseband PAM order"),
                                dcc.Dropdown(
                                    id="pam-m",
                                    options=[{"label": f"{m}-PAM", "value": m} for m in [2, 4, 8, 16]],
                                    value=4,
                                    clearable=False,
                                ),
                                label("Symbol rate Rs (baud)"),
                                dcc.Slider(id="symbol-rate", min=600, max=4800, step=600, value=2400),
                                label("Carrier scheme"),
                                dcc.Dropdown(
                                    id="carrier-scheme",
                                    options=[{"label": s, "value": s} for s in CARRIER_SCHEMES],
                                    value="QPSK",
                                    clearable=False,
                                ),
                                html.Div(id="carrier-stats", className="stats-grid"),
                            ],
                        ),
                        html.Div(
                            className="plot-grid two",
                            children=[
                                card([dcc.Graph(id="pam-levels")]),
                                card([dcc.Graph(id="carrier-time")]),
                                card([dcc.Graph(id="carrier-spectrum")]),
                                card([dcc.Graph(id="throughput-fig")]),
                            ],
                        ),
                    ],
                ),
                html.Div(
                    id="capacity-panel",
                    className="tab-pane",
                    style={"display": "none"},
                    children=[
                        controls(
                            "Information, Capacity, and Coding",
                            [
                                label("AWGN bandwidth B (kHz)"),
                                dcc.Slider(id="cap-bandwidth", min=1, max=20, step=1, value=3),
                                label("Selected SNR"),
                                dcc.Slider(id="cap-snr", min=-5, max=30, step=1, value=9),
                                label("Source probabilities"),
                                dcc.Input(id="source-probs", value="0.4, 0.25, 0.2, 0.15", debounce=True, className="text-input"),
                                label("Received repetition word"),
                                dcc.Dropdown(
                                    id="rx-word",
                                    options=[{"label": w, "value": w} for w in ["000", "001", "010", "011", "100", "101", "110", "111"]],
                                    value="010",
                                    clearable=False,
                                ),
                                html.Div(id="capacity-stats", className="stats-grid"),
                            ],
                        ),
                        html.Div(
                            className="plot-grid three",
                            children=[
                                card([dcc.Graph(id="capacity-fig")]),
                                card([dcc.Graph(id="entropy-bsc-fig")]),
                                card([dcc.Graph(id="coding-fig")]),
                            ],
                        ),
                    ],
                ),
            ],
        ),
        dcc.Interval(id="throughput-tick", interval=1000, n_intervals=0),
    ],
)


@app.callback(
    Output("pcm-panel", "style"),
    Output("line-panel", "style"),
    Output("isi-panel", "style"),
    Output("carrier-panel", "style"),
    Output("capacity-panel", "style"),
    Input("tabs", "value"),
)
def show_selected_tab(active_tab: str):
    visible = {"display": "grid"}
    hidden = {"display": "none"}
    return (
        visible if active_tab == "pcm" else hidden,
        visible if active_tab == "line" else hidden,
        visible if active_tab == "isi" else hidden,
        visible if active_tab == "carrier" else hidden,
        visible if active_tab == "capacity" else hidden,
    )


@app.callback(
    Output("pcm-fig", "figure"),
    Output("pcm-stats", "children"),
    Input("pcm-bm", "value"),
    Input("pcm-fs-mult", "value"),
    Input("pcm-bits", "value"),
)
def render_pcm(bm_khz: float, fs_mult: float, bits_per_sample: int):
    bm_hz = bm_khz * 1000
    fs = fs_mult * bm_hz
    duration = 4 / bm_hz
    t = np.linspace(0, duration, 1600)
    msg = 0.72 * np.sin(2 * np.pi * 0.62 * bm_hz * t) + 0.22 * np.sin(2 * np.pi * 0.18 * bm_hz * t)

    ts = np.arange(0, duration, 1 / fs)
    samples = 0.72 * np.sin(2 * np.pi * 0.62 * bm_hz * ts) + 0.22 * np.sin(2 * np.pi * 0.18 * bm_hz * ts)
    levels = 2 ** bits_per_sample
    q_step = 2 / levels
    quantized = np.clip(np.round((samples + 1) / q_step) * q_step - 1, -1, 1)

    fig = base_fig("PCM: sample -> quantize -> binary encode", "Amplitude", "Time (ms)")
    fig.add_trace(go.Scatter(x=t * 1000, y=msg, mode="lines", name="message", line=dict(color=BLUE, width=2)))
    fig.add_trace(go.Scatter(x=ts * 1000, y=samples, mode="markers", name="samples", marker=dict(color=YELLOW, size=7)))
    fig.add_trace(
        go.Scatter(
            x=ts * 1000,
            y=quantized,
            mode="lines+markers",
            name="quantized",
            line=dict(color=GREEN, shape="hv", width=2),
            marker=dict(size=5),
        )
    )
    fig.update_yaxes(range=[-1.12, 1.12])

    rb = bits_per_sample * fs
    stats = [
        make_stat("Nyquist fs", f"{2 * bm_khz:.1f} kHz", GREEN),
        make_stat("Selected fs", f"{fs / 1000:.1f} kHz", BLUE),
        make_stat("Levels L", f"{levels}", YELLOW),
        make_stat("PCM bit rate Rb", f"{rb / 1000:.1f} kb/s", ORANGE),
    ]
    return fig, stats


@app.callback(
    Output("line-wave", "figure"),
    Output("line-psd", "figure"),
    Output("line-stats", "children"),
    Input("line-bits", "value"),
    Input("line-code", "value"),
)
def render_line_coding(bit_string: str, code: str):
    bits = normalize_bits(bit_string)
    sps = 80
    t, y = line_code(bits, code, sps)
    f, psd = spectrum_db(y, sps)

    wave = base_fig(f"{code} waveform", "Amplitude", "Bit time Tb")
    wave.add_trace(go.Scatter(x=t, y=y, mode="lines", line=dict(color=GREEN, width=2), name=code))
    for k, bit in enumerate(bits):
        wave.add_vline(k, line_width=1, line_dash="dot", line_color="#3b455c")
        wave.add_annotation(x=k + 0.5, y=1.28, text=str(bit), showarrow=False, font=dict(size=12, color=TEXT))
    wave.update_yaxes(range=[-1.45, 1.45])

    psd_fig = base_fig("PSD of selected line code", "Relative power (dB)", "Frequency (cycles / Tb)")
    psd_fig.add_trace(go.Scatter(x=f, y=psd, mode="lines", line=dict(color=BLUE, width=2), name="PSD"))
    psd_fig.update_xaxes(range=[0, 4])
    psd_fig.update_yaxes(range=[-70, 2])

    has_dc = "yes" if code in {"On-off NRZ", "On-off RZ"} else "no/low"
    clock = {
        "Manchester": "full",
        "Polar RZ": "good",
        "On-off RZ": "partial",
        "Bipolar AMI": "partial",
    }.get(code, "weak")
    bandwidth = {
        "Polar NRZ": "~Rb",
        "On-off NRZ": "~Rb",
        "Bipolar AMI": "~Rb",
        "On-off RZ": "~2Rb",
        "Polar RZ": "~2Rb",
        "Manchester": "high",
    }[code]
    stats = [
        make_stat("Clock recovery", clock, GREEN),
        make_stat("DC content", has_dc, YELLOW if has_dc == "yes" else GREEN),
        make_stat("Bandwidth rule", bandwidth, BLUE),
        make_stat("Baud", "symbols/s", ORANGE),
    ]
    return wave, psd_fig, stats


@app.callback(
    Output("rc-pulse", "figure"),
    Output("eye-fig", "figure"),
    Output("isi-stats", "children"),
    Input("rc-beta", "value"),
    Input("isi-amount", "value"),
    Input("eye-noise", "value"),
    Input("eye-m", "value"),
)
def render_isi(beta: float, isi: float, noise: float, m_pam: int):
    sps = 80
    t, pulse = raised_cosine(beta, samples_per_symbol=sps)
    pulse_isi = add_controlled_isi(pulse, sps, isi)

    pulse_fig = base_fig("Raised-cosine pulse and sampling instants", "p(t)", "t / Ts")
    pulse_fig.add_trace(go.Scatter(x=t, y=pulse, mode="lines", name="zero-ISI pulse", line=dict(color=BLUE, width=2)))
    pulse_fig.add_trace(go.Scatter(x=t, y=pulse_isi, mode="lines", name="with neighbor coupling", line=dict(color=RED, width=2)))
    ks = np.arange(-4, 5)
    sample_vals = np.interp(ks, t, pulse_isi)
    pulse_fig.add_trace(go.Scatter(x=ks, y=sample_vals, mode="markers", name="decision samples", marker=dict(color=YELLOW, size=8)))
    pulse_fig.update_xaxes(range=[-4, 4])
    pulse_fig.update_yaxes(range=[-0.45, 1.15])

    _, traces, sample_points = build_eye(beta, isi, noise, m_pam)
    eye = base_fig("Eye diagram", "Amplitude", "Symbol periods")
    for x, seg in traces[:55]:
        eye.add_trace(
            go.Scatter(
                x=x,
                y=seg,
                mode="lines",
                line=dict(color="rgba(96,165,250,0.22)", width=1),
                showlegend=False,
                hoverinfo="skip",
            )
        )
    eye.add_vline(x=1.0, line_width=2, line_dash="dash", line_color=YELLOW)
    eye.update_yaxes(range=[-1.7, 1.7])
    eye.update_xaxes(range=[0, 2])

    center = len(pulse_isi) // 2
    p0 = pulse_isi[center]
    p_prev = pulse_isi[center - sps]
    p_next = pulse_isi[center + sps]
    eye_height = np.percentile(sample_points, 90) - np.percentile(sample_points, 10)
    bw_ratio = (1 + beta) / 2
    stats = [
        make_stat("BT / Rb", f"{bw_ratio:.3f}", BLUE),
        make_stat("p(0)", f"{p0:.2f}", GREEN),
        make_stat("p(-Tb), p(Tb)", f"{p_prev:.2f}, {p_next:.2f}", RED if isi else GREEN),
        make_stat("Eye height", f"{eye_height:.2f}", YELLOW),
    ]
    return pulse_fig, eye, stats


@app.callback(
    Output("pam-levels", "figure"),
    Output("carrier-time", "figure"),
    Output("carrier-spectrum", "figure"),
    Output("carrier-stats", "children"),
    Input("pam-m", "value"),
    Input("symbol-rate", "value"),
    Input("carrier-scheme", "value"),
)
def render_carrier(m_pam: int, symbol_rate: int, carrier_scheme: str):
    levels = pam_levels(m_pam)
    bps = int(round(math.log2(m_pam)))
    rb = symbol_rate * bps

    level_fig = base_fig(f"{m_pam}-PAM levels", "Amplitude", "Symbol index")
    level_fig.add_trace(
        go.Scatter(
            x=np.arange(m_pam),
            y=levels,
            mode="markers+text",
            text=[format(i, f"0{bps}b") for i in range(m_pam)],
            textposition="top center",
            marker=dict(color=GREEN, size=12),
            name="levels",
        )
    )
    for level in levels:
        level_fig.add_hline(y=float(level), line_width=1, line_dash="dot", line_color="#3b455c")
    level_fig.update_yaxes(range=[-1.18, 1.18])

    bits = normalize_bits("1101010010110110")
    t, y, freq, spec, points, point_label = carrier_waveform(carrier_scheme, bits)
    time_fig = base_fig(f"{carrier_scheme} carrier signal", "Amplitude", "Symbol periods")
    time_fig.add_trace(go.Scatter(x=t, y=y, mode="lines", name="s(t)", line=dict(color=BLUE, width=2)))
    time_fig.update_xaxes(range=[0, min(8, t[-1] if len(t) else 8)])
    time_fig.update_yaxes(range=[-1.5, 1.5])

    spec_fig = base_fig("Carrier PSD + States", "Relative power (dB)", "Frequency (cycles / symbol)")
    spec_fig.add_trace(go.Scatter(x=freq, y=spec, mode="lines", line=dict(color=ORANGE, width=2), name="PSD"))
    spec_fig.update_xaxes(range=[0, 10])
    spec_fig.update_yaxes(range=[-72, 2])

    state_fig = spec_fig
    inset = go.Scatter(
        x=points[:, 0],
        y=points[:, 1],
        mode="markers",
        marker=dict(color=YELLOW, size=10),
        name=point_label,
        xaxis="x2",
        yaxis="y2",
    )
    state_fig.add_trace(inset)
    state_fig.update_layout(
        xaxis2=dict(domain=[0.58, 0.94], anchor="y2", showgrid=True, gridcolor=GRID, zerolinecolor="#3b455c", title="I / tone"),
        yaxis2=dict(domain=[0.55, 0.94], anchor="x2", showgrid=True, gridcolor=GRID, zerolinecolor="#3b455c", title="Q"),
    )

    carrier_bps = CARRIER_BITS_PER_SYMBOL[carrier_scheme]
    stats = [
        make_stat("PAM bits/symbol", str(bps), GREEN),
        make_stat("PAM bit rate", f"{rb / 1000:.1f} kb/s", BLUE),
        make_stat("Carrier bits/symbol", str(carrier_bps), YELLOW),
        make_stat("Carrier throughput", f"{symbol_rate * carrier_bps / 1000:.1f} kb/s", ORANGE),
    ]
    return level_fig, time_fig, state_fig, stats


@app.callback(
    Output("throughput-fig", "figure"),
    Input("throughput-tick", "n_intervals"),
    Input("symbol-rate", "value"),
    Input("pam-m", "value"),
    Input("carrier-scheme", "value"),
)
def render_throughput(n_intervals: int, symbol_rate: int, m_pam: int, carrier_scheme: str):
    carrier_bps = CARRIER_BITS_PER_SYMBOL[carrier_scheme]
    carrier_rate = symbol_rate * carrier_bps
    pam_rate = symbol_rate * int(round(math.log2(m_pam)))

    elapsed = np.arange(max(0, n_intervals - 29), n_intervals + 1)
    if len(elapsed) == 0:
        elapsed = np.array([0])

    fig = base_fig("Throughput Counter", "Throughput (kb/s)", "Elapsed time (s)")
    fig.add_trace(
        go.Scatter(
            x=elapsed,
            y=np.full_like(elapsed, carrier_rate / 1000.0, dtype=float),
            mode="lines",
            line=dict(color=YELLOW, width=3),
            name=f"{carrier_scheme} rate",
        )
    )
    fig.add_trace(
        go.Scatter(
            x=elapsed,
            y=np.full_like(elapsed, pam_rate / 1000.0, dtype=float),
            mode="lines",
            line=dict(color=BLUE, width=2, dash="dot"),
            name=f"{m_pam}-PAM rate",
        )
    )
    fig.add_trace(
        go.Scatter(
            x=elapsed,
            y=carrier_rate * elapsed,
            mode="lines",
            line=dict(color=VIOLET, width=2),
            name="cumulative bits",
            yaxis="y2",
        )
    )
    fig.update_layout(
        yaxis=dict(title="Throughput (kb/s)"),
        yaxis2=dict(title="Total bits", overlaying="y", side="right"),
        annotations=[
            dict(
                text=f"{carrier_scheme}: {symbol_rate} baud x {carrier_bps} bit/symbol = {carrier_rate / 1000:.1f} kb/s",
                xref="paper",
                yref="paper",
                x=0.02,
                y=0.96,
                showarrow=False,
                align="left",
                font=dict(color=TEXT, size=12),
                bgcolor="rgba(15,23,42,0.74)",
                bordercolor="#334155",
                borderwidth=1,
            )
        ],
    )
    return fig


@app.callback(
    Output("capacity-fig", "figure"),
    Output("entropy-bsc-fig", "figure"),
    Output("coding-fig", "figure"),
    Output("capacity-stats", "children"),
    Input("cap-bandwidth", "value"),
    Input("cap-snr", "value"),
    Input("source-probs", "value"),
    Input("rx-word", "value"),
)
def render_capacity(bandwidth_khz: int, snr_db: int, prob_text: str, rx_word: str):
    snr_axis = np.linspace(-5, 30, 250)
    snr_linear = 10 ** (snr_axis / 10)
    capacity_kbps = bandwidth_khz * np.log2(1 + snr_linear)
    selected_capacity = bandwidth_khz * math.log2(1 + 10 ** (snr_db / 10))

    cap_fig = base_fig("AWGN capacity: C = B log2(1 + S/N)", "Capacity (kb/s)", "SNR (dB)")
    cap_fig.add_trace(go.Scatter(x=snr_axis, y=capacity_kbps, mode="lines", line=dict(color=GREEN, width=2), name="capacity"))
    cap_fig.add_trace(go.Scatter(x=[snr_db], y=[selected_capacity], mode="markers", marker=dict(color=YELLOW, size=11), name="selected"))

    pe = np.linspace(0, 0.5, 240)
    hb = binary_entropy(pe)
    bsc_capacity = 1 - hb
    probs = parse_probabilities(prob_text)
    source_entropy = discrete_entropy(probs)
    avg_len_example = np.sum(np.sort(probs)[::-1] * np.arange(1, len(probs) + 1))

    info_fig = base_fig("Binary entropy and BSC capacity", "bits", "error probability p")
    info_fig.add_trace(go.Scatter(x=pe, y=hb, mode="lines", line=dict(color=BLUE, width=2), name="Hb(p)"))
    info_fig.add_trace(go.Scatter(x=pe, y=bsc_capacity, mode="lines", line=dict(color=RED, width=2), name="BSC Cs"))
    info_fig.update_yaxes(range=[0, 1.05])

    d0 = hamming_distance(rx_word, "000")
    d1 = hamming_distance(rx_word, "111")
    decoded = "0" if d0 <= d1 else "1"
    code_fig = base_fig("3-repetition code: nearest-codeword decoding", "Hamming distance", "Codeword")
    code_fig.add_trace(
        go.Bar(
            x=["000 -> data 0", "111 -> data 1"],
            y=[d0, d1],
            marker_color=[GREEN if decoded == "0" else "#64748b", GREEN if decoded == "1" else "#64748b"],
            name=f"received {rx_word}",
        )
    )
    code_fig.add_hline(y=1, line_width=1, line_dash="dash", line_color=YELLOW)
    code_fig.update_yaxes(range=[0, 3.4])

    stats = [
        make_stat("Capacity", f"{selected_capacity:.2f} kb/s", GREEN),
        make_stat("Source entropy H", f"{source_entropy:.2f} bits/sym", BLUE),
        make_stat("Code rate R", "1/3", YELLOW),
        make_stat("Decode", f"{rx_word} -> {decoded}", ORANGE),
    ]
    if len(probs) == 4:
        stats.append(make_stat("Huffman example L", f"{avg_len_example:.2f}", VIOLET))
    return cap_fig, info_fig, code_fig, stats


if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1", port=8050)

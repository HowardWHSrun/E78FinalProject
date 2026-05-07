#!/usr/bin/env python3
"""
Regenerate block and frame-structure figures with consistent signal-flow arrows.

Run from anywhere:
  python figures/make_diagrams.py
"""

from __future__ import annotations

import os
import shutil

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch


BG = "#f7fafc"
FG = "#18212f"
MUTED = "#64748b"
ACCENT = "#dbeafe"
ACCENT2 = "#fecdd3"
ACCENT3 = "#bbf7d0"
EDGE = "#334155"


def _box(ax, x, y, w, h, text, color, fontsize=9):
    p = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.04,rounding_size=0.08",
        facecolor=color,
        edgecolor=EDGE,
        linewidth=1.0,
        alpha=1.0,
    )
    ax.add_patch(p)
    ax.text(
        x + w / 2,
        y + h / 2,
        text,
        ha="center",
        va="center",
        color=FG,
        fontsize=fontsize,
        fontweight="bold",
        wrap=True,
    )
    return x, y, w, h


def _arrow(ax, x1, y1, x2, y2, color=FG, lw=1.6, style="->"):
    a = FancyArrowPatch(
        (x1, y1),
        (x2, y2),
        arrowstyle=style,
        mutation_scale=14,
        linewidth=lw,
        color=color,
        shrinkA=2,
        shrinkB=2,
        zorder=2,
    )
    ax.add_patch(a)


def make_block_diagram(out_path: str) -> None:
    """Readable end-to-end signal flow for the presentation."""
    fig, ax = plt.subplots(figsize=(14.8, 7.0))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 14.8)
    ax.set_ylim(1.75, 7.65)
    ax.axis("off")

    cx = lambda b: b[0] + b[2]
    lx = lambda b: b[0]
    mx = lambda b: b[0] + b[2] / 2
    my = lambda b: b[1] + b[3] / 2

    h = 0.82
    gap = 0.38

    ax.text(0.45, 7.35, "Transmit chain on host PC", color=MUTED, fontsize=14, fontweight="bold")
    ax.text(0.45, 3.30, "Receive + DSP chain", color=MUTED, fontsize=14, fontweight="bold")

    y_tx = 6.35
    x = 0.45
    b_bits = _box(ax, x, y_tx, 1.55, h, "Bits", "#e2e8f0", 15)
    x += b_bits[2] + gap
    b_map = _box(ax, x, y_tx, 2.20, h, "Modulate\n+ RRC", ACCENT, 14)
    x += b_map[2] + gap
    b_frame = _box(ax, x, y_tx, 2.25, h, "Frame\npreamble + data", ACCENT, 13)
    x += b_frame[2] + gap
    b_tx = _box(ax, x, y_tx, 1.55, h, "PlutoSDR\nTX", ACCENT2, 13)

    for left, right in [(b_bits, b_map), (b_map, b_frame), (b_frame, b_tx)]:
        _arrow(ax, cx(left), my(left), lx(right), my(right), color=MUTED, lw=1.5)

    rf_y = 4.70
    rf = _box(
        ax,
        mx(b_tx) - 1.55,
        rf_y,
        3.10,
        0.72,
        "30 dB RF loopback\nSMA cable + attenuator",
        ACCENT3,
        12,
    )
    _arrow(ax, mx(b_tx), b_tx[1], mx(rf), rf[1] + rf[3], color="#16a34a", lw=1.8)
    ax.text(mx(rf), rf[1] - 0.22, "real signal leaves and re-enters the Pluto", ha="center", color="#15803d", fontsize=11)

    y_rx = 2.35
    rx_x = 4.85
    b_rx = _box(ax, rx_x, y_rx, 1.25, h, "PlutoSDR\nRX", ACCENT2, 11)
    ax.plot([mx(rf), mx(rf), mx(b_rx)], [rf[1], 3.62, 3.62], color="#16a34a", lw=1.8)
    _arrow(ax, mx(b_rx), 3.62, mx(b_rx), b_rx[1] + b_rx[3], color="#16a34a", lw=1.8)

    x = cx(b_rx) + gap
    b_imp = _box(ax, x, y_rx, 1.65, h, "Inject\nimpairments", "#ede9fe", 11)
    x += b_imp[2] + gap
    b_sync = _box(ax, x, y_rx, 2.00, h, "Sync\nCFO + phase + timing", ACCENT, 10)
    x += b_sync[2] + gap
    b_demod = _box(ax, x, y_rx, 1.65, h, "Demod\nBER/EVM/SNR", "#fed7aa", 11)
    x += b_demod[2] + gap
    b_gui = _box(ax, x, y_rx, 1.25, h, "PyQt GUI\n20 FPS", "#ccfbf1", 10)

    for left, right in [(b_rx, b_imp), (b_imp, b_sync), (b_sync, b_demod), (b_demod, b_gui)]:
        _arrow(ax, cx(left), my(left), lx(right), my(right), color=MUTED, lw=1.5)

    plt.tight_layout()
    fig.savefig(out_path, dpi=220, bbox_inches="tight", facecolor=BG)
    plt.close(fig)


def make_frame_structure(out_path: str) -> None:
    """
    Frame layout with annotations that point to the correct segments:
      - Frame detection uses preamble (+ pilots region)
      - CFO / phase use pilots (and preamble)
      - BER applies to payload
    """
    fig, ax = plt.subplots(figsize=(11.5, 3.8))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 4.2)
    ax.axis("off")

    y_bar = 2.35
    h_bar = 0.85
    segments = [
        (0.4, 1.8, "Barker-13\npreamble ×4", "#f38ba8"),
        (2.2, 1.1, "Pilots", "#fab387"),
        (3.3, 5.9, "Payload\n(data symbols)", "#89b4fa"),
        (9.2, 1.4, "Guard", "#e2e8f0"),
    ]

    for x, w, label, color in segments:
        _box(ax, x, y_bar, w, h_bar, label, color, 8)

    ax.text(5.5, y_bar + h_bar + 0.35, "Frame structure (symbol domain, schematic)", color=FG, fontsize=12, fontweight="bold", ha="center")

    # Annotation row below
    ann = [
        (1.0, 0.75, "Frame detection\n(preamble correlation)", "#f38ba8"),
        (2.75, 0.75, "Coarse CFO &\nfine phase\n(pilots / preamble)", "#fab387"),
        (6.2, 0.75, "BER / throughput\n(payload bits)", "#89b4fa"),
    ]

    for x, y, txt, c in ann:
        ax.text(x, y, txt, ha="center", va="top", color=c, fontsize=8, fontweight="bold")

    # Arrows from annotation to the correct bar segments (vertical, downward to bar)
    _arrow(ax, 1.0, 1.45, 1.0, y_bar + h_bar + 0.02, color="#be123c")
    _arrow(ax, 2.75, 1.45, 2.75, y_bar + h_bar + 0.02, color="#c2410c")
    _arrow(ax, 6.2, 1.45, 6.2, y_bar + h_bar + 0.02, color="#1d4ed8")

    ax.text(
        5.5,
        0.25,
        "Arrows indicate which frame regions primarily drive each receiver processing step.",
        ha="center",
        color=MUTED,
        fontsize=8,
        style="italic",
    )

    plt.tight_layout()
    fig.savefig(out_path, dpi=200, bbox_inches="tight", facecolor=BG)
    plt.close(fig)


def make_impairment_chain(out_path: str) -> None:
    """Software impairment chain (matches apply_impairments in impairments.py)."""
    fig, ax = plt.subplots(figsize=(13, 2.9))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 3)
    ax.axis("off")

    y = 1.35
    h = 0.75
    gap = 0.28
    items = [
        ("RX IQ\n(from Pluto or\nsimulation)", "#e2e8f0"),
        ("Multipath\n(2-tap delay)", "#ede9fe"),
        ("Rician flat\nfading (K)", "#ede9fe"),
        ("Frequency\noffset", "#ede9fe"),
        ("Phase\noffset", "#ede9fe"),
        ("AWGN\n(SNR)", "#ede9fe"),
        ("To synchronizer\nand demod", "#fed7aa"),
    ]
    widths = [1.38] * len(items)

    x = 0.28
    mid = y + h / 2
    for i, ((txt, col), w) in enumerate(zip(items, widths)):
        _box(ax, x, y, w, h, txt, col, 7)
        if i < len(items) - 1:
            x1 = x + w
            x2 = x + w + gap
            _arrow(ax, x1 + 0.02, mid, x2 - 0.02, mid, color=MUTED, lw=1.4)
        x += w + gap

    ax.text(
        6.5,
        2.58,
        "Software impairment chain (fixed order, post-RX)",
        ha="center",
        color=FG,
        fontsize=11,
        fontweight="bold",
    )
    ax.text(
        6.5,
        0.42,
        "Matches apply_impairments(): multipath → fading → frequency offset → phase offset → AWGN.",
        ha="center",
        color=MUTED,
        fontsize=8,
        style="italic",
    )

    plt.tight_layout()
    fig.savefig(out_path, dpi=200, bbox_inches="tight", facecolor=BG)
    plt.close(fig)


def main():
    root = os.path.dirname(os.path.abspath(__file__))
    v2 = os.path.join(root, "block_diagram_v2.png")
    simple = os.path.join(root, "block_diagram.png")
    frame = os.path.join(root, "frame_structure.png")
    ichain = os.path.join(root, "impairment_chain.png")

    make_block_diagram(v2)
    shutil.copy(v2, simple)
    make_frame_structure(frame)
    make_impairment_chain(ichain)
    print("Wrote:", v2, simple, frame, ichain, sep="\n  ")


if __name__ == "__main__":
    main()

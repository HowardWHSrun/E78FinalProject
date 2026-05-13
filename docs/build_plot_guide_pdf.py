#!/usr/bin/env python3
"""Build the ADALM-Pluto dashboard plot guide as a technical PDF."""

from __future__ import annotations

from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
IMG_DIR = DOCS / "plot_guide_screenshots"
OUT = DOCS / "ADALM_Pluto_Dashboard_Plot_Guide.pdf"

MODES = [
    ("BPSK", "bpsk", "M = 2", "k = log2(M) = 1", "Ideal points: {-1, +1} on the I axis."),
    ("QPSK", "qpsk", "M = 4", "k = log2(M) = 2", "Ideal points: (+/-1 +/- j)/sqrt(2)."),
    ("16-QAM", "16_qam", "M = 16", "k = log2(M) = 4", "Ideal points: 4-by-4 I/Q grid, normalized to average symbol power 1."),
]

PLOTS = [
    {
        "title": "Power Spectrum / PSD",
        "slug": "spectrum",
        "meaning": (
            "The spectrum plot shows how the received signal energy is distributed over frequency. "
            "This is the practical dashboard version of the power spectral density idea from class. "
            "A digital baseband waveform does not occupy only one frequency; its pulse shape spreads "
            "energy across a band around 0 Hz."
        ),
        "math": [
            "Complex baseband received samples: r[n] = I[n] + j Q[n]",
            "N-point DFT: R[k] = sum_{n=0}^{N-1} r[n] exp(-j 2 pi k n / N)",
            "Frequency axis after fftshift: f_k = (k - N/2) Fs / N",
            "Displayed magnitude spectrum: P[k] = 20 log10(|fftshift(R[k])| + epsilon)",
            "More formal PSD estimate: S_rr(f_k) approx |R[k]|^2 / (N Fs)",
            "Pulse-shaping relation: S_y(f) = |P_pulse(f)|^2 S_a(f)",
            "Raised-cosine occupied baseband width: B_one-sided approx (1 + alpha) Rs / 2",
            "Dashboard values: Fs approx 1.00 MS/s, SPS = 8, Rs = Fs/SPS approx 125 ksym/s, alpha = 0.35",
            "So the expected two-sided occupied width is about (1 + alpha) Rs approx 169 kHz.",
        ],
        "axes": [
            ("x-axis", "Frequency in Hz after FFT shifting, centered so 0 Hz is baseband center."),
            ("y-axis", "Magnitude in dB. The dashboard uses 20 log10(|FFT|), so it is a spectrum display rather than a fully calibrated dB/Hz PSD."),
            ("Blue trace", "Raw received I/Q samples from Pluto."),
            ("Red trace", "Received I/Q after the dashboard's software impairment controls are applied."),
        ],
        "mode_notes": [
            ("BPSK", "Same approximate bandwidth as the other modes if Rs and pulse shaping stay fixed; carries 1 bit/symbol."),
            ("QPSK", "Similar occupied bandwidth to BPSK at the same symbol rate, but carries 2 bits/symbol."),
            ("16-QAM", "Similar bandwidth at the same symbol rate, but carries 4 bits/symbol and needs higher SNR for reliable symbol decisions."),
        ],
        "how": [
            "The raised center band is the useful transmitted signal energy.",
            "The flatter area away from the center is mostly the noise floor and receiver background.",
            "The blue trace is the raw received Pluto signal. The red trace is after the software impairment model used by the dashboard.",
            "A higher noise floor means lower SNR. A shifted center band means carrier frequency offset. A wider band usually means higher symbol rate or a less smooth pulse shape.",
            "For BPSK, QPSK, and 16-QAM in this app, the spectral width is similar because the symbol rate and pulse shaping are kept similar; the bit rate changes because bits per symbol changes.",
        ],
        "diagnostics": [
            ("Clean signal", "One raised band near 0 Hz with a visibly lower surrounding floor."),
            ("More AWGN", "Noise floor rises, so the signal stands out less from the background."),
            ("Frequency offset", "The occupied band moves left or right instead of staying centered."),
            ("Bandwidth/shape issue", "The band becomes unusually wide, ragged, or asymmetric."),
        ],
    },
    {
        "title": "I/Q Constellation",
        "slug": "constellation",
        "meaning": (
            "The constellation plot shows the received symbol estimates in the complex I/Q plane. "
            "Each point is one symbol after synchronization and matched filtering. The receiver chooses "
            "which transmitted symbol was most likely by comparing each green point to the ideal yellow decision points."
        ),
        "math": [
            "Symbol estimate: z_k = I_k + j Q_k",
            "Constellation set: C = {c_0, c_1, ..., c_{M-1}}",
            "Nearest-neighbor decision: c_hat_k = arg min_{c in C} |z_k - c|^2",
            "Bits per symbol: k_bits = log2(M)",
            "Error vector: e_k = z_k - c_hat_k",
            "EVM_rms = sqrt(mean(|e_k|^2) / mean(|c_hat_k|^2)) * 100 percent",
            "Dashboard SNR estimate: SNR_est = 10 log10(mean(|c_hat_k|^2) / mean(|z_k - c_hat_k|^2))",
            "Phase offset model: z_k' = z_k exp(j phi)",
            "Frequency offset model: z_k' = z_k exp(j 2 pi Delta_f k T_sym)",
        ],
        "axes": [
            ("x-axis", "In-phase component I_k, the real part of the symbol estimate."),
            ("y-axis", "Quadrature component Q_k, the imaginary part of the symbol estimate."),
            ("Green dots", "Received symbol estimates z_k after synchronization and matched filtering."),
            ("Yellow x marks", "Ideal reference constellation points used for nearest-neighbor decisions."),
        ],
        "mode_notes": [
            ("BPSK", "Two ideal decisions on the I axis. Most information is the sign of I."),
            ("QPSK", "Four ideal decisions, one per quadrant. Information is carried by phase quadrant."),
            ("16-QAM", "Sixteen ideal decisions in a 4-by-4 grid. Both amplitude and phase matter; decision regions are smaller."),
        ],
        "how": [
            "Yellow x marks are ideal symbol locations. Green dots are received Pluto symbol estimates.",
            "Tight green clusters near yellow points mean good decisions. Wide clouds mean noise, synchronization error, or distortion.",
            "A constant phase offset rotates the whole constellation. A frequency offset makes the points rotate over time and can smear the display.",
            "16-QAM is more sensitive than BPSK and QPSK because the ideal points are closer together, so the same noise cloud causes more decision ambiguity.",
            "The scale of the axes can change with Pluto gain and synchronization. The relative shape of the point cloud matters more than the absolute numbers.",
        ],
        "diagnostics": [
            ("High SNR", "Compact clusters around ideal points."),
            ("Low SNR", "Dots spread outward into neighboring decision regions."),
            ("Phase offset", "Whole constellation rotates around the origin."),
            ("Frequency offset", "Points smear into arcs or rings because phase changes across time."),
            ("Gain/scaling issue", "Pattern is too large or too small but still has the same geometry."),
        ],
    },
    {
        "title": "Eye Diagram",
        "slug": "eye",
        "meaning": (
            "The eye diagram overlays many short pieces of the matched-filter output. It is a time-domain "
            "tool for judging timing margin, noise margin, and intersymbol interference. The dashboard plots "
            "the real part of the matched-filter samples, so it is especially useful for seeing amplitude levels "
            "and timing crossings."
        ),
        "math": [
            "Transmit symbols: a_k in C",
            "Pulse-shaped baseband signal: s(t) = sum_k a_k p(t - kT)",
            "Received waveform: r(t) = s(t) convolved with h(t) + w(t)",
            "Matched-filter output: y(t) = r(t) convolved with p*(-t)",
            "Sample decision value: y_k = y(kT + tau_hat)",
            "Nyquist no-ISI condition: g(mT) = 0 for all nonzero integer m, and g(0) is maximum",
            "Dashboard segment length: 2T = 2*SPS samples = 16 samples because SPS = 8",
            "Dashed yellow line: nominal sampling instant at one symbol period into the two-symbol window.",
        ],
        "axes": [
            ("x-axis", "Samples across a two-symbol window, so 0 to 16 samples when SPS = 8."),
            ("y-axis", "Amplitude of the real part of the matched-filter output."),
            ("Blue traces", "Many overlaid two-symbol waveform segments."),
            ("Dashed yellow line", "Nominal decision sampling instant at one symbol period."),
        ],
        "mode_notes": [
            ("BPSK", "Real-part eye usually has two main amplitude levels, one for each symbol sign."),
            ("QPSK", "Real part has two main levels while Q has its own two-level behavior not shown directly here."),
            ("16-QAM", "Real part can have four amplitude levels, so the eye is naturally more crowded."),
        ],
        "how": [
            "The vertical opening is amplitude/noise margin. A taller opening gives the decision threshold more room.",
            "The horizontal opening is timing margin. A wider opening means the receiver can sample slightly early or late and still make the same decision.",
            "Thick crossings indicate timing jitter or inconsistent zero-crossing timing.",
            "A closing eye indicates ISI, noise, filtering problems, or poor timing recovery.",
            "For BPSK the real-part eye tends to have two main levels. For QPSK the real part also has two main levels while the Q part carries the other half. For 16-QAM the real part can have four levels, so the eye looks more crowded.",
        ],
        "diagnostics": [
            ("Open eye", "Good timing and amplitude margin."),
            ("Closed eye", "ISI/noise makes samples harder to decide."),
            ("Narrow eye", "Sampling time is sensitive; timing recovery matters more."),
            ("Thick crossings", "Timing jitter, frequency offset, or synchronization instability."),
            ("Many levels", "Expected for higher-order amplitude constellations such as 16-QAM."),
        ],
    },
    {
        "title": "Throughput Counter",
        "slug": "throughput",
        "meaning": (
            "The throughput plot is the live decoded-bit-rate view. It is not a theoretical BER curve or a "
            "channel-capacity plot; it is a counter based on how many payload bits the receiver decoded during "
            "each dashboard update interval."
        ),
        "math": [
            "Cumulative decoded bits: B_total(t_m) = sum_{i=1}^{m} N_bits,i",
            "Instantaneous dashboard throughput:",
            "  R_hat_b(t_m) = N_bits,m / (t_m - t_{m-1})",
            "Displayed units: kb/s = R_hat_b / 1000",
            "Theoretical uncoded bit rate: R_b = k_bits Rs = log2(M) Rs",
            "With Fs approx 1.00 MS/s and SPS = 8: Rs approx 125 ksym/s",
            "Ideal rates from symbol mapping alone:",
            "  BPSK approx 125 kb/s",
            "  QPSK approx 250 kb/s",
            "  16-QAM approx 500 kb/s",
            "Measured dashboard rate is lower/spikier because the app includes:",
            "  buffering, synchronization, plotting time, and successful-frame processing.",
        ],
        "axes": [
            ("x-axis", "Elapsed dashboard time in seconds."),
            ("left y-axis", "Instantaneous decoded throughput in kb/s for the latest update interval."),
            ("right y-axis", "Cumulative decoded bits since the latest stream start."),
            ("Yellow trace", "Short-term decoded rate, computed from delta bits divided by delta time."),
            ("Purple trace", "Running total of decoded bits."),
        ],
        "mode_notes": [
            ("BPSK", "Lowest ideal bit rate because k_bits = 1, but usually most robust to noise."),
            ("QPSK", "Middle ideal bit rate because k_bits = 2; common bandwidth-efficient PSK mode."),
            ("16-QAM", "Highest ideal bit rate here because k_bits = 4, but requires better constellation separation."),
        ],
        "how": [
            "The yellow curve is the short-term decoded rate. It jumps because each receive/update interval is short.",
            "The purple curve is cumulative decoded bits. While streaming works, it should keep increasing.",
            "BPSK carries fewer bits per symbol but is more robust. 16-QAM carries more bits per symbol but needs cleaner symbol decisions.",
            "A flat purple curve means the receiver is not adding decoded bits. That can happen if streaming stops, synchronization fails, or the Pluto path is not receiving useful data.",
            "Do not read one yellow spike as the final data rate. The trend and the cumulative line are more reliable.",
        ],
        "diagnostics": [
            ("Healthy stream", "Purple cumulative bits steadily increases."),
            ("Short update jitter", "Yellow rate jumps up and down while purple remains monotonic."),
            ("Stopped stream", "Both curves stop changing."),
            ("Poor synchronization", "Rate drops or becomes intermittent because fewer buffers decode cleanly."),
            ("Mode comparison", "Higher-order modes can carry more bits per symbol, but only if the signal quality is good enough."),
        ],
    },
]


def styles():
    base = getSampleStyleSheet()
    base.add(
        ParagraphStyle(
            "GuideTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=28,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#111827"),
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "GuideSubtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#4b5563"),
            spaceAfter=18,
        )
    )
    base.add(
        ParagraphStyle(
            "GuideH1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=colors.HexColor("#2E74B5"),
            spaceBefore=12,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "GuideH2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=colors.HexColor("#1F4D78"),
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    base.add(
        ParagraphStyle(
            "GuideBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=13.3,
            textColor=colors.HexColor("#111827"),
            spaceAfter=6,
        )
    )
    base.add(
        ParagraphStyle(
            "GuideBullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.0,
            leading=13.0,
            leftIndent=14,
            firstLineIndent=-7,
            bulletIndent=0,
            textColor=colors.HexColor("#111827"),
            spaceAfter=4,
        )
    )
    base.add(
        ParagraphStyle(
            "Caption",
            parent=base["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=8.5,
            leading=11,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#4b5563"),
            spaceBefore=2,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "Equation",
            parent=base["Code"],
            fontName="Courier",
            fontSize=8.7,
            leading=11.0,
            textColor=colors.HexColor("#111827"),
            leftIndent=8,
            rightIndent=8,
            spaceBefore=3,
            spaceAfter=3,
            backColor=colors.HexColor("#F3F6FA"),
        )
    )
    return base


def scaled_image(path: Path, max_width: float = 6.35 * inch) -> Image:
    with PILImage.open(path) as im:
        width_px, height_px = im.size
    width = max_width
    height = width * height_px / width_px
    return Image(str(path), width=width, height=height)


def bullet(text: str, style_sheet):
    return Paragraph(f"&bull; {text}", style_sheet["GuideBullet"])


def equation(lines: list[str], style_sheet):
    return Preformatted("\n".join(lines), style_sheet["Equation"])


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(colors.HexColor("#6b7280"))
    canvas.drawString(doc.leftMargin, 0.45 * inch, "ADALM-Pluto Dashboard Plot Guide")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.45 * inch, f"Page {doc.page}")
    canvas.restoreState()


def table_style(header_fill="#E8EEF5"):
    return TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(header_fill)),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#1F4D78")),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9.0),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#DADCE0")),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )


def mode_table(style_sheet):
    data = [["Mode", "Order", "Bits/symbol", "Technical expectation"]]
    for mode, _, order, bits, desc in MODES:
        data.append([mode, order, bits, Paragraph(desc, style_sheet["GuideBody"])])
    table = Table(data, colWidths=[0.85 * inch, 0.85 * inch, 1.15 * inch, 3.5 * inch])
    table.setStyle(table_style())
    return table


def diagnostics_table(rows, style_sheet):
    data = [["Condition", "What it looks like"]]
    for label, desc in rows:
        data.append([label, Paragraph(desc, style_sheet["GuideBody"])])
    table = Table(data, colWidths=[1.65 * inch, 4.7 * inch])
    table.setStyle(table_style("#F2F4F7"))
    return table


def two_col_table(rows, style_sheet, first_header, second_header, first_width=1.45):
    data = [[first_header, second_header]]
    for label, desc in rows:
        data.append([label, Paragraph(desc, style_sheet["GuideBody"])])
    table = Table(data, colWidths=[first_width * inch, (6.35 - first_width) * inch])
    table.setStyle(table_style("#F2F4F7"))
    return table


def add_intro(story, style_sheet):
    story.extend(
        [
            Paragraph("ADALM-Pluto Dashboard Plot Guide", style_sheet["GuideTitle"]),
            Paragraph("ENGR 078 Final Project 1 live signal displays", style_sheet["GuideSubtitle"]),
            Paragraph(
                "This version adds the mathematical and technical interpretation behind each dashboard plot. "
                "The guide stays focused on class-connected content: spectrum/PSD, I/Q signaling, eye diagrams, noise/SNR, symbol decisions, and throughput.",
                style_sheet["GuideBody"],
            ),
            Paragraph(
                "The screenshots were captured from the running ADALM-Pluto dashboard in BPSK, QPSK, and 16-QAM modes. "
                "Because Pluto is live hardware, exact point clouds, SNR estimates, and throughput values will change from run to run.",
                style_sheet["GuideBody"],
            ),
            Paragraph("System Model Used By The Dashboard", style_sheet["GuideH1"]),
            Paragraph(
                "The app is displaying a complex baseband digital communication chain. Bits are grouped into symbols, "
                "mapped to constellation points, pulse-shaped, transmitted through Pluto, received as I/Q samples, synchronized, "
                "matched-filtered, and then displayed.",
                style_sheet["GuideBody"],
            ),
            equation(
                [
                    "bits -> symbols a_k -> pulse shaping -> Pluto TX/RX -> received I/Q r[n]",
                    "",
                    "Transmitted baseband:  s(t) = sum_k a_k p(t - kT)",
                    "Received model:        r[n] = A s[n-d] exp(j(2 pi Delta_f n/Fs + phi)) + w[n]",
                    "",
                    "a_k: transmitted constellation symbol",
                    "p(t): pulse-shaping filter, here root-raised-cosine style shaping",
                    "T: symbol period, Rs = 1/T is symbol rate",
                    "Fs: sample rate, SPS = Fs/Rs is samples per symbol",
                    "w[n]: additive noise, modeled by the software AWGN SNR control",
                ],
                style_sheet,
            ),
            Paragraph("Modulation Modes", style_sheet["GuideH1"]),
            mode_table(style_sheet),
            Spacer(1, 0.12 * inch),
            Paragraph("Important Rate Relationships", style_sheet["GuideH2"]),
            equation(
                [
                    "M = number of constellation points",
                    "k_bits = log2(M) bits/symbol",
                    "Rs = symbol rate in symbols/second",
                    "Rb = k_bits Rs bits/second",
                    "",
                    "In this dashboard: Fs approx 1.00 MS/s, SPS = 8",
                    "Rs approx Fs/SPS = 125 ksym/s",
                    "Ideal uncoded mapping rates: BPSK 125 kb/s, QPSK 250 kb/s, 16-QAM 500 kb/s",
                ],
                style_sheet,
            ),
            Paragraph("How To Read The Dashboard In Order", style_sheet["GuideH2"]),
            bullet("Confirm the mode first, because it sets M, bits per symbol, and the expected constellation geometry.", style_sheet),
            bullet("Use the spectrum to check that a band of signal energy is present and centered.", style_sheet),
            bullet("Use the constellation to judge symbol decision quality in the I/Q plane.", style_sheet),
            bullet("Use the eye diagram to judge timing margin and ISI in the matched-filter output.", style_sheet),
            bullet("Use throughput to confirm decoded bits are accumulating over time.", style_sheet),
            Spacer(1, 0.12 * inch),
        ]
    )


def add_plot_section(story, style_sheet, plot, fig_num):
    story.append(Paragraph(plot["title"], style_sheet["GuideH1"]))
    story.append(Paragraph("What The Plot Means", style_sheet["GuideH2"]))
    story.append(Paragraph(plot["meaning"], style_sheet["GuideBody"]))
    story.append(Paragraph("Mathematical Definition", style_sheet["GuideH2"]))
    story.append(equation(plot["math"], style_sheet))
    story.append(Paragraph("Axes And Units", style_sheet["GuideH2"]))
    story.append(two_col_table(plot["axes"], style_sheet, "Item", "Meaning", first_width=1.2))
    story.append(Paragraph("Mode-By-Mode Expectation", style_sheet["GuideH2"]))
    story.append(two_col_table(plot["mode_notes"], style_sheet, "Mode", "Expected behavior", first_width=1.05))
    story.append(Paragraph("How To Read It Technically", style_sheet["GuideH2"]))
    for item in plot["how"]:
        story.append(bullet(item, style_sheet))
    story.append(Paragraph("Common Diagnostic Patterns", style_sheet["GuideH2"]))
    story.append(diagnostics_table(plot["diagnostics"], style_sheet))
    story.append(Spacer(1, 0.08 * inch))

    for mode, safe, _, _, _ in MODES:
        image_path = IMG_DIR / f"{safe}_{plot['slug']}.png"
        story.append(scaled_image(image_path))
        story.append(Paragraph(f"Figure {fig_num}. {plot['title']} in {mode} mode.", style_sheet["Caption"]))
        fig_num += 1
    return fig_num


def add_appendix(story, style_sheet):
    story.extend(
        [
            PageBreak(),
            Paragraph("Technical Appendix", style_sheet["GuideH1"]),
            Paragraph("Why Higher-Order Modulation Is Harder", style_sheet["GuideH2"]),
            Paragraph(
                "When M increases, each symbol carries more bits, but the constellation points become closer together for the same average power. "
                "That smaller spacing means the same noise vector is more likely to push a received point across a decision boundary.",
                style_sheet["GuideBody"],
            ),
            equation(
                [
                    "Nearest-neighbor receiver: choose c_hat that minimizes |z - c|^2",
                    "Decision reliability depends strongly on d_min, the minimum distance between ideal points.",
                    "For normalized constellations, 16-QAM has much smaller spacing than BPSK or QPSK.",
                ],
                style_sheet,
            ),
            Paragraph("SNR, Noise, And The AWGN Slider", style_sheet["GuideH2"]),
            Paragraph(
                "The dashboard's AWGN control adds software noise to the received I/Q samples. Lower SNR means noise power is larger relative to signal power. "
                "That affects every plot: the spectrum floor rises, constellation clusters widen, the eye closes, and throughput can become less stable.",
                style_sheet["GuideBody"],
            ),
            equation(
                [
                    "SNR_dB = 10 log10(P_signal / P_noise)",
                    "If SNR decreases by 10 dB, the signal-to-noise power ratio is 10 times worse.",
                    "If SNR decreases by 3 dB, the signal-to-noise power ratio is about 2 times worse.",
                ],
                style_sheet,
            ),
            Paragraph("Carrier Phase And Frequency Offsets", style_sheet["GuideH2"]),
            Paragraph(
                "A phase offset is a constant rotation of the complex baseband plane. A frequency offset is a rotation whose angle changes over time. "
                "That is why phase offset looks like a rotated constellation, while frequency offset can smear the points into arcs or circles.",
                style_sheet["GuideBody"],
            ),
            equation(
                [
                    "Phase offset only:      z_k' = z_k exp(j phi)",
                    "Frequency offset:       z_k' = z_k exp(j 2 pi Delta_f k T)",
                    "Phase change per symbol: Delta_theta = 2 pi Delta_f T radians/symbol",
                ],
                style_sheet,
            ),
            Paragraph("Pulse Shaping And ISI", style_sheet["GuideH2"]),
            Paragraph(
                "Pulse shaping controls spectral width and intersymbol interference. Root-raised-cosine filtering is commonly used because the transmit and receive filters combine into a raised-cosine response that can satisfy the Nyquist no-ISI condition at the sampling instants.",
                style_sheet["GuideBody"],
            ),
            equation(
                [
                    "TX filter p(t) and RX matched filter p*(-t)",
                    "Combined pulse: g(t) = p(t) convolved with p*(-t)",
                    "Nyquist condition: g(0) is maximum, and g(mT) = 0 for all nonzero integers m",
                    "If this condition is not met, neighboring symbols leak into the current decision sample: ISI.",
                ],
                style_sheet,
            ),
            Paragraph("What The Dashboard Does Not Claim", style_sheet["GuideH2"]),
            bullet("The spectrum plot is a practical magnitude spectrum display; a fully calibrated PSD would include additional normalization and units such as W/Hz or dB/Hz.", style_sheet),
            bullet("The throughput plot is a live software measurement, not the Shannon capacity and not a guaranteed channel bit rate.", style_sheet),
            bullet("The constellation and eye diagram are diagnostic views. They help explain receiver behavior but do not replace a full link-budget or calibrated RF measurement.", style_sheet),
        ]
    )


def build_pdf():
    style_sheet = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        rightMargin=0.8 * inch,
        leftMargin=0.8 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.75 * inch,
        title="ADALM-Pluto Dashboard Plot Guide",
        author="ENGR 078",
    )

    story = []
    add_intro(story, style_sheet)

    fig_num = 1
    for idx, plot in enumerate(PLOTS):
        fig_num = add_plot_section(story, style_sheet, plot, fig_num)
        if idx != len(PLOTS) - 1:
            story.append(PageBreak())

    add_appendix(story, style_sheet)
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    return OUT


if __name__ == "__main__":
    print(build_pdf())

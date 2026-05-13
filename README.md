# ENGR 078 Communications Systems Visualizer

**Repository:** [github.com/HowardWHSrun/E78FinalProject](https://github.com/HowardWHSrun/E78FinalProject)

Interactive **Dash / Plotly** dashboards for UC Riverside **ENGR 078** topics: PCM, line coding and PSD, ISI and eye diagrams, M-ary PAM, passband modulation (ASK through 16-QAM), Shannon capacity, entropy / BSC, and a small repetition-code example. An **optional** second app streams IQ through an **ADALM-PLUTO** (or pure **simulation**) with spectrum, constellation, eye, and throughput readouts.

---

## Features

| Main app (`main.py`, port **8050**) | Pluto live (`pluto_live_app.py`, port **8051**) |
|-------------------------------------|--------------------------------------------------|
| Tabbed course visualizer (`web_app.py`) | Real-time loopback: spectrum, constellation, eye |
| PCM, line codes, ISI + eye, carrier, capacity tabs | BPSK, QPSK, 16-QAM; software impairments (AWGN, phase, frequency, multipath, fading) |
| No radio hardware required | **Simulation (no radio)** or **Connect Pluto** + **Start** |

---

## Requirements

- **Python 3.10+** recommended (3.11 used in development).
- Install from the repository root:

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -U pip
pip install -r requirements.txt
```

| Package | Role |
|---------|------|
| `numpy`, `scipy` | Signal generation, FFTs, filtering |
| `dash`, `plotly` | Web UI and figures |
| `pyadi-iio` | PlutoSDR (optional; skip if you only use simulation) |

If `pyadi-iio` fails to install, you can still run **`main.py`** and Pluto live in **simulation** mode; use a full install when the Analog Devices **libiio** stack is available ([Pluto wiki](https://wiki.analog.com/university/tools/pluto)).

---

## Quick start

### 1. Class visualizer (default)

```bash
python main.py
```

Open **[http://127.0.0.1:8050](http://127.0.0.1:8050)** (use `127.0.0.1` if `localhost` fails on IPv6-only clients).

### 2. Pluto live dashboard (optional)

```bash
python pluto_live_app.py
```

Open **[http://127.0.0.1:8051](http://127.0.0.1:8051)**. Choose **Simulation (no radio)** or **Connect Pluto**, then **Start**.

Environment knobs (optional):

| Variable | Default | Meaning |
|----------|---------|---------|
| `PLUTO_DASH_HOST` | `0.0.0.0` | Bind address |
| `PLUTO_DASH_PORT` | `8051` | HTTP port |
| `PLUTO_OPEN_BROWSER` | `1` | Set `0` to disable auto-open |

### Hardware loopback (Pluto)

1. Connect **TX → RX** with an SMA cable and use a **rated attenuator** (e.g. 30 dB) so the RX front end is not overdriven.
2. On macOS, Pluto USB Ethernet is often **`ncm`**; the device may appear at **`192.168.2.1`**.
3. Do not transmit on bands or power levels that violate **FCC / course** rules; cable loopback is the intended lab configuration.

---

## Repository layout

```
.
├── main.py                 # Entry: course Dash app on port 8050
├── pluto_live_app.py       # Optional Pluto / simulation Dash app on port 8051
├── web_app.py              # Tabs, layouts, callbacks for the class visualizer
├── requirements.txt
├── assets/
│   └── dashboard.css       # Shared styles (Pluto live)
├── src/                    # DSP + Pluto wrapper used by pluto_live_app
│   ├── modulation.py
│   ├── impairments.py
│   ├── synchronization.py
│   ├── pluto_interface.py
│   └── realtime_engine.py
└── docs/                   # LaTeX report, Beamer deck, speaker script, Q&A PDF
    ├── Makefile            # `make` builds PDFs (Tectonic or pdflatex)
    ├── README.md           # How to build documentation
    ├── report.tex / report.pdf
    ├── presentation.tex / presentation.pdf
    ├── speaker_script.tex / speaker_script.pdf
    ├── presentation_qa.tex / presentation_qa.pdf
    ├── script.md
    └── plot_guide_screenshots/   # Figures for TeX sources
```

---

## Building PDFs (optional)

From the repo root:

```bash
make -C docs
```

See **[docs/README.md](docs/README.md)** for `rebuild`, Tectonic vs. `pdflatex`, and legacy commands.

---

## Troubleshooting

| Symptom | What to try |
|---------|-------------|
| **Address already in use** | Another process holds the port. Stop it, or use `PLUTO_DASH_PORT=8052 python pluto_live_app.py`. |
| **Connection refused** on 8051 | Start `pluto_live_app.py` and keep that terminal open; 8050 is only the main class app. |
| **Pluto not found** | Install libiio / drivers; use **Simulation** for grading without hardware. |
| **Blank plots in Pluto live** | Use **Simulation** then **Start**; ensure browser allows the page; try another browser if WebGL or threading issues appear. |

---

## Authors

Howard Wang, Kaw Moo, Charlie Schuzte — ENGR 078, Spring 2026.

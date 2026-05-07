# Real-Time Visualization of Digital Modulation and Channel Impairments Using a Single PlutoSDR

ENGR 78 Final Project

## Overview

This application generates a digitally modulated signal, transmits and receives it through an ADALM-PLUTO SDR in hardware loopback, injects software-controlled channel impairments in real time, and visualizes:

- **Power spectrum** — received RF spectrum before and after impairments  
- **Constellation diagram** — demodulated symbols versus ideal reference points  
- **Eye diagram** — overlaid baseband I-channel traces at the symbol rate  
- **Running metrics** — BER, EVM (%), and estimated SNR over time  
- **Throughput and cumulative bits** — decoded data rate and total bits since Start  

A **BER sweep** mode measures BER versus SNR for all schemes with theoretical overlays. Each plot has a **?** button with a short explanation.

Impairments are controlled via GUI sliders:

| Impairment | Range |
|---|---|
| AWGN (SNR) | 0 -- 40 dB |
| Phase offset | -180 -- +180 deg |
| Frequency offset | -5000 -- +5000 Hz |
| Multipath delay | 0 -- 10 symbol periods |
| Multipath amplitude | 0 -- 1.0 |
| Rician fading K-factor | -10 -- 40 dB |

Supported modulation schemes: **BPSK, QPSK, 8-PSK, 16-QAM**.

## Repository layout

```
.
├── main.py              # Run this from the project root
├── requirements.txt
├── src/                 # Application source code
│   ├── gui.py
│   ├── dsp_worker.py
│   ├── pluto_interface.py
│   ├── modulation.py
│   ├── impairments.py
│   ├── synchronization.py
│   └── ber_sweep.py
├── figures/             # PNG assets for the report and presentation
│   └── make_diagrams.py # Regenerates block_diagram*.png, frame_structure.png, impairment_chain.png
└── docs/                # Final report, Beamer deck, speaker script
    ├── report.tex
    ├── report.pdf
    ├── presentation.tex
    ├── presentation.pdf
    └── script.md
```

## Hardware setup

1. Connect the PlutoSDR TX port to the RX port with an SMA cable.  
2. Insert a **30 dB attenuator** between the cable and the RX port to protect the receiver front end.  
3. Plug the Pluto into the computer via USB.  

If no Pluto is connected, the application falls back to **simulation mode** (software loopback).

## Installation

```bash
pip install -r requirements.txt
```

If `pyadi-iio` installation fails (no Pluto drivers), the app can still run in simulation mode:

```bash
pip install numpy scipy PyQt6 pyqtgraph
```

### PlutoSDR drivers

- **macOS / Linux**: install `libiio` (see [Analog Devices Pluto wiki](https://wiki.analog.com/university/tools/pluto/drivers/linux)).  
- **Windows**: install the [PlutoSDR drivers](https://wiki.analog.com/university/tools/pluto/drivers/windows).

## Running

From the **project root** (the folder that contains `main.py`):

```bash
python main.py
```

1. Use **Connect Hardware** to use the Pluto, or **Simulation Mode** for software-only.  
2. **Start** begins streaming; **Stop** halts the DSP thread.  
3. Adjust the modulation dropdown and impairment sliders in real time.  
4. Switch to **BER Sweep** for automated BER-vs-SNR curves.  

### Browser dashboard

You can also run a browser-based live dashboard:

```bash
python web_app.py
```

Then open [http://127.0.0.1:8050](http://127.0.0.1:8050).

The web app supports:
- Hardware or simulation connect
- Start/stop streaming
- Scheme selection and impairment sliders
- Live spectrum, constellation, eye, metrics, and throughput plots

## Building the PDFs (optional)

LaTeX sources live in `docs/` and pull figures from `../figures/`. From `docs/`:

```bash
cd docs
pdflatex -interaction=nonstopmode report.tex
pdflatex -interaction=nonstopmode report.tex
pdflatex -interaction=nonstopmode presentation.tex
pdflatex -interaction=nonstopmode presentation.tex
```

Committed PDFs in `docs/` are pre-built for convenience.

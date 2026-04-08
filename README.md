# Real-Time Visualization of Digital Modulation and Channel Impairments Using a Single PlutoSDR

ENGR 78 Final Project

## Overview

This application generates a digitally modulated signal, transmits and receives it through an ADALM-PLUTO SDR in hardware loopback, injects software-controlled channel impairments in real time, and visualises the effects on four live plot panels:

- **Power spectrum** -- received RF spectrum before and after impairments
- **Constellation diagram** -- demodulated symbols versus ideal reference points
- **Eye diagram** -- overlaid baseband I-channel traces at the symbol rate
- **Running metrics** -- BER, EVM (%), and estimated SNR over time

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

## Hardware Setup

1. Connect the PlutoSDR TX port to the RX port with an SMA cable.
2. Insert a **30 dB attenuator** between the cable and the RX port to protect the receiver front end.
3. Plug the Pluto into the computer via USB.

If no Pluto is connected the application falls back to a **software loopback** so you can still explore the DSP and visualisation.

## Installation

```bash
pip install -r requirements.txt
```

If `pyadi-iio` installation fails (no Pluto drivers), the app will still run in software-loopback mode -- just install the remaining packages:

```bash
pip install numpy scipy PyQt6 pyqtgraph
```

### PlutoSDR Drivers

- **macOS / Linux**: install `libiio` (`brew install libad9361-iio` on macOS, or follow [Analog Devices wiki](https://wiki.analog.com/university/tools/pluto/drivers/linux)).
- **Windows**: install the [PlutoSDR drivers](https://wiki.analog.com/university/tools/pluto/drivers/windows).

## Running

```bash
python main.py
```

1. Click **Connect** to initialise the Pluto (or enter software-loopback mode).
2. Click **Start** to begin transmitting and receiving.
3. Adjust the modulation scheme dropdown and impairment sliders to explore their effects in real time.
4. Click **Stop** to halt the stream.

## Project Structure

| File | Purpose |
|---|---|
| `main.py` | Application entry point |
| `gui.py` | PyQt6 GUI with four real-time plots and control sidebar |
| `dsp_worker.py` | QThread running the continuous RX -> impair -> sync -> demod pipeline |
| `pluto_interface.py` | PlutoSDR TX/RX management via pyadi-iio (with software-loopback fallback) |
| `modulation.py` | Constellation maps, modulation, demodulation, RRC pulse shaping |
| `impairments.py` | Channel impairment functions (AWGN, phase, freq, multipath, fading) |
| `synchronization.py` | Frame detection, frequency/phase estimation, Gardner timing recovery |
| `requirements.txt` | Python dependencies |

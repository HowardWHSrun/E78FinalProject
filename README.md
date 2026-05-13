# ENGR 078 Communications Visualizer

This app visualizes communication-systems topics from the class material:

- PCM sampling, quantization levels, and bit rate
- Line coding waveforms and PSD for on-off, polar, AMI, and Manchester codes
- Raised-cosine roll-off, ISI, and eye diagrams
- M-ary PAM rate/spacing tradeoffs plus a live throughput/cumulative-bits counter
- ASK/OOK, BPSK, BFSK, QPSK, and 16-QAM carrier views
- Shannon AWGN capacity, binary entropy/BSC capacity, and repetition-code distance

The previous SDR-oriented source modules are still in `src/` for reference, but the default runnable app no longer depends on radio hardware or visualizes out-of-scope channel models.

## Run

```bash
pip install -r requirements.txt
python main.py
```

Then open [http://127.0.0.1:8050](http://127.0.0.1:8050).

## Pluto Live Mode

For the live hardware dashboard:

```bash
python pluto_live_app.py
```

Then open [http://127.0.0.1:8051](http://127.0.0.1:8051) (port **8051** so it does not conflict with `main.py` on 8050). Use **Simulation (no radio)** if you do not have hardware, then click **Start**. With a Pluto, use **Connect Pluto**, then **Start**.

On macOS, Pluto USB Ethernet should use `ncm` mode so the device appears at `192.168.2.1`.

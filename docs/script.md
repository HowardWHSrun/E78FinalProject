# Presentation Script

## Slide 1 -- Title

> Hi everyone. My project is a real-time visualization tool for digital modulation and channel impairments, built around a single ADALM-PLUTO software-defined radio. I'll walk you through what it does, how it works, and what I learned building it.

---

## Slide 2 -- The Problem

> So here's the motivation. In communications classes we learn equations like the Q-function BER formula, and we can plug in numbers, but we almost never get to *see* what these effects actually look like as they happen. What does a constellation look like when you crank the noise up? How does multipath distort an eye diagram? There's a gap between solving equations and really understanding what's going on physically. My goal was to close that gap -- build a tool where you can adjust channel parameters with sliders and watch the signal degrade in real time, on real hardware.

---

## Slide 3 -- What We Built

> Here's what I built. It's an interactive Python application. You generate a digital signal, transmit it through the PlutoSDR, receive it back through a loopback cable, and then inject software-controlled impairments with sliders. The GUI shows you four live panels -- spectrum, constellation, eye diagram, and rolling metrics like BER, EVM, and SNR. There's also a BER sweep mode that automatically measures BER across a range of SNR values and compares against the theoretical curves. If you don't have a Pluto plugged in, the whole thing works in a software simulation mode too, so you can demo it anywhere.

---

## Slide 4 -- System Architecture

> This is the system block diagram. On the top row, we generate random bits, modulate them with pulse shaping, insert a preamble for synchronization, and transmit through the PlutoSDR. The signal loops back through an SMA cable with a 30 dB attenuator into the receive side. After reception, software impairments are injected -- that's the purple block -- and then the signal goes through synchronization, demodulation, and BER computation. The key design choice here is that impairments are injected *after* reception, not before transmission. That means we never have to rebuild the transmit buffer when you move a slider -- the response is instant. If no hardware is connected, the system falls back to a pure software loopback.

---

## Slide 5 -- Four Modulation Schemes

> We support four standard digital modulation schemes. BPSK with 1 bit per symbol, QPSK with 2, 8-PSK with 3, and 16-QAM with 4. All constellations are Gray-coded so that adjacent symbols differ by only one bit, which minimizes bit errors. We use root-raised-cosine pulse shaping with a roll-off factor of 0.35 and 8 samples per symbol. Demodulation uses nearest-neighbor hard decisions. You can switch between schemes on the fly from a dropdown menu in the GUI, and the transmitter and receiver both reconfigure immediately.

---

## Slide 6 -- Channel Impairments

> This slide shows you what the impairments actually *do* to the constellation. On the far left is a clean QPSK constellation at 40 dB SNR -- four tight clusters. Next, AWGN at 10 dB spreads them into clouds. Then a 30-degree phase offset rotates the whole constellation. And on the right, multipath creates ghost clusters because delayed copies of the signal interfere with the current symbols. Each impairment has its own slider in the GUI, and they're applied in physical order: multipath first, then fading, frequency offset, phase offset, and finally AWGN.

---

## Slide 7 -- Receiver Synchronization

> Synchronization is what makes the whole thing work in practice. Every transmitted frame starts with four repetitions of a Barker-13 preamble, followed by pilot symbols and then the payload. On the receive side, we cross-correlate with the known preamble template to find where the frame starts. Then we use the repeated preamble copies to estimate frequency offset via the phase difference between them. Fine phase estimation comes from the pilot symbols. And finally, a Gardner timing error detector with a first-order loop recovers the correct sample timing. This chain has to work reliably under all the impairments we're injecting, which was honestly the hardest part of the project.

---

## Slide 8 -- Eye Diagram Deep Dive

> The eye diagram is one of the most intuitive displays. We take 50 overlapping two-symbol-period traces of the matched-filtered I channel and plot them on top of each other. At 30 dB SNR on the left, the eye is wide open -- there's a clear decision point in the middle, and you can easily distinguish between the two levels. At 15 dB, the traces start to blur together. At 5 dB, the eye is almost closed -- at that point, the receiver is making a lot of wrong decisions. This directly shows ISI from multipath, jitter from timing errors, and the overall noise level, all in one plot.

---

## Slide 9 -- Live GUI Walkthrough

> Here's what the actual application looks like in live mode. The top left is the power spectrum showing the spectral shape of the received signal. Top right is the constellation diagram with ideal reference points as yellow crosses. Bottom left is the eye diagram we just discussed. Bottom right shows rolling BER, EVM percentage, and estimated SNR on a time axis. On the right side of the window are all the control sliders -- you can adjust any impairment and immediately see how all four panels respond. The whole interface updates at about 20 frames per second.

---

## Slide 10 -- BER Sweep Mode

> The second mode is the BER sweep. Instead of manual exploration, this automates the process. For each modulation scheme, it steps through a range of SNR values, measures the BER at each point, and plots the result as circles. The dashed lines are the closed-form theoretical BER curves -- Q-function for BPSK and QPSK, erfc-based formula for 16-QAM. The fact that our measured points line up with theory validates that the entire pipeline -- modulation, synchronization, demodulation -- is working correctly. When you run this on actual hardware instead of simulation, you see about half a dB to one dB of additional loss, which comes from real I/Q imbalance, DC offset, and quantization noise in the PlutoSDR's ADC.

---

## Slide 11 -- Throughput & Cumulative Bits

> This is a new panel we added to the GUI that tracks throughput and cumulative data volume in real time. The yellow trace shows instantaneous throughput in kilobits per second -- for QPSK at 20 frames per second, that works out to roughly 40 kilobits per second of decoded payload. If you switch to 16-QAM, which carries 4 bits per symbol instead of 2, that roughly doubles to about 80 kilobits per second. The purple trace is the cumulative total of every bit decoded since you clicked "Start." If the link is healthy, this ramps up linearly. If synchronization is lost -- say you crank multipath too high -- you'll see the ramp flatten out into a plateau, because no bits are being decoded. Within about 30 seconds of clean QPSK operation, you'll have decoded over a million bits. This gives you a tangible sense of data flow, not just error rates.

---

## Slide 12 -- Software Architecture

> On the software side, the project is about 1200 lines of Python across seven modules. The modulation and impairments modules are pure NumPy/SciPy. The synchronization module handles preamble detection and timing recovery. The pluto interface module wraps pyadi-iio for hardware access and includes USB auto-detection. The key architecture decision is the decoupled rendering model. The DSP worker thread runs the full pipeline -- receive, impairments, sync, demod, metrics -- and writes the latest results to shared memory protected by a mutex. The GUI runs a separate timer that reads from shared memory at 20 FPS. This means the GUI never falls behind or freezes, even if the DSP processing speed varies, because it always just renders the most recent data.

---

## Slide 13 -- Demo Scenarios

> If you want to try it yourself, here are four scenarios that show off different aspects. First, noise floor exploration: start clean, then slide the SNR down and watch everything degrade smoothly. Second, phase and frequency offset: a 45-degree phase offset rotates the constellation, and a 2 kHz frequency offset makes the symbols spin -- but you can see the synchronizer correcting it. Third, multipath: set a 3-symbol delay with 0.5 amplitude and you'll see ISI in the eye diagram and blurred clusters in the constellation. Fourth, scheme comparison: fix the SNR at 15 dB and switch from BPSK to 16-QAM to see the direct trade-off between spectral efficiency and noise robustness.

---

## Slide 14 -- Results and Observations

> Quantitatively, the measured BER curves match theoretical predictions within less than 1 dB for all four schemes under AWGN. Hardware loopback adds about half a dB to one dB of implementation loss. The Gardner timing error detector reliably locks within 2 to 3 symbol periods. On throughput: the system sustains about 40 kilobits per second decoded payload for QPSK and about 80 for 16-QAM -- over a million bits within 30 seconds. On the rendering side, simulation mode sustains about 20 frames per second with 6 milliseconds of DSP processing per frame. Hardware mode is slightly slower at about 15 FPS due to USB latency.

---

## Slide 15 -- Lessons Learned

> Four things I took away from this project. First, synchronization is the hard part. Modulating and demodulating are straightforward, but getting preamble detection and timing recovery to work robustly under impairments took most of the development time and a lot of iterative tuning. Second, you have to decouple DSP from GUI rendering. My first version emitted Qt signals for every processed buffer, which caused an event-queue backlog and made the interface lag badly. Switching to shared memory with timer-based polling fixed it. Third, real hardware has surprises. The PlutoSDR introduces DC offset, I/Q imbalance, and USB latency that you don't encounter in pure simulation. And fourth, this project genuinely taught me more about digital communications than the equations alone. Watching a constellation rotate under frequency offset and seeing the synchronizer correct it was more instructive than any derivation.

---

## Slide 16 -- Conclusion

> To wrap up: I built a complete real-time digital communications visualizer covering four modulation schemes, six controllable impairments, a full synchronization chain, live throughput tracking, and two operating modes. The system sustains around 40 to 80 kilobits per second of decoded throughput depending on the modulation scheme, and you can watch the cumulative bits climb in real time. It works with real hardware or in simulation, and it's all open-source Python. Thanks for listening -- happy to take any questions.

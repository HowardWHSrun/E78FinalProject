/**
 * Synthetic spectrum for live demo + programmatic sample CSV (Keysight-shaped).
 */
function hashNoise(f) {
  return Math.sin(f * 1.237148e-4 + 2.1) * Math.cos(f * 3.891e-5) * 0.45;
}

function gaussian(f, center, sigma) {
  const z = (f - center) / sigma;
  return Math.exp(-0.5 * z * z);
}

/**
 * @param {number} timeSec
 * @param {string} preset  'b0' | 'fm' | 'wifi'
 * @returns {{ frequency: number, amplitude: number }[]}
 */
function generateSyntheticSpectrum(timeSec, preset) {
  const presets = {
    b0: { f0: 10e3, f1: 160e3, n: 2200 },
    fm: { f0: 87e6, f1: 108e6, n: 2000 },
    wifi: { f0: 2390e6, f1: 2490e6, n: 1800 },
  };
  const p = presets[preset] || presets.b0;
  const n = p.n;
  const span = p.f1 - p.f0;
  const df = span / (n - 1);

  let peakDefs = [];
  if (preset === "b0") {
    peakDefs = [
      { c: 60e3, sig: 2.5e3, amp: 14, ph: 0 },
      { c: 100e3, sig: 4e3, amp: 9, ph: 1.2 },
      { c: 135e3, sig: 3e3, amp: 11, ph: 2.4 },
      { c: 42e3, sig: 1.8e3, amp: 7, ph: 0.8 },
    ];
  } else if (preset === "fm") {
    peakDefs = [
      { c: 98.1e6, sig: 0.35e6, amp: 16, ph: 0 },
      { c: 88.7e6, sig: 0.28e6, amp: 11, ph: 1 },
      { c: 103.3e6, sig: 0.4e6, amp: 10, ph: 2 },
    ];
  } else {
    peakDefs = [
      { c: 2441e6, sig: 8e6, amp: 18, ph: 0 },
      { c: 2412e6, sig: 6e6, amp: 12, ph: 1.5 },
      { c: 2462e6, sig: 7e6, amp: 9, ph: 2.2 },
    ];
  }

  const out = [];
  const breathe = 1 + 0.08 * Math.sin(timeSec * 1.1);

  for (let i = 0; i < n; i++) {
    const f = p.f0 + i * df;
    let y =
      66 +
      5 * Math.sin(timeSec * 0.55 + f * 8e-9) * breathe +
      hashNoise(f) +
      0.6 * Math.sin(timeSec * 2.3 + i * 0.03);

    for (const pk of peakDefs) {
      const wobble = 1 + 0.12 * Math.sin(timeSec * 2.8 + pk.ph);
      y += pk.amp * wobble * gaussian(f, pk.c, pk.sig);
    }

    out.push({ frequency: f, amplitude: y });
  }
  return out;
}

function getSyntheticMeta(preset) {
  const map = {
    b0: {
      f0: 10e3,
      f1: 160e3,
      label: "Synthetic B0-style sweep",
    },
    fm: {
      f0: 87e6,
      f1: 108e6,
      label: "Synthetic FM broadcast window",
    },
    wifi: {
      f0: 2390e6,
      f1: 2490e6,
      label: "Synthetic 2.4 GHz ISM window",
    },
  };
  const m = map[preset] || map.b0;
  return {
    xUnit: "Hz",
    yUnit: "dBuV/m",
    startFreq: m.f0,
    stopFreq: m.f1,
    rbw: null,
    nPoints: preset === "b0" ? 2200 : preset === "fm" ? 2000 : 1800,
    syntheticLabel: m.label,
    "Swept SA": "Synthetic (demo)",
  };
}

/** Single-trace Keysight-shaped CSV (~512 pts, B0 span) for instant sample */
function buildEmbeddedSampleCsv() {
  const lines = [
    "AllTrace",
    "Swept SA",
    "Demo sample,,",
    "X Axis Units,Hz",
    "Y Axis Units,dBuV/m",
    "Start Frequency,10000",
    "Stop Frequency,160000",
    "Number of Points,512",
    "RBW,300",
    "DATA",
  ];
  for (let i = 0; i < 512; i++) {
    const f = 10000 + (150000 * i) / 511;
    const y =
      72 +
      11 * gaussian(f, 60e3, 7e3) +
      7 * gaussian(f, 118e3, 5e3) +
      4 * gaussian(f, 38e3, 4e3) +
      hashNoise(f) * 0.6;
    lines.push(f.toFixed(6) + "," + y.toFixed(4));
  }
  return lines.join("\n");
}

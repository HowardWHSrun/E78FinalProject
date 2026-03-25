/**
 * Keysight / Agilent-style swept-spectrum CSV (AllTrace, DATA section).
 */
function parseKeysightTraceCsv(text) {
  const lines = text.split(/\r?\n/);
  let dataStart = -1;
  const meta = {};

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (trimmed === "DATA") {
      dataStart = i + 1;
      break;
    }
    const comma = raw.indexOf(",");
    if (comma > 0) {
      const key = raw.slice(0, comma).trim();
      const val = raw.slice(comma + 1).trim();
      if (key) meta[key] = val;
    }
  }

  if (dataStart < 0) {
    throw new Error('No DATA marker found. Expected Keysight-style export with a "DATA" line.');
  }

  const rows = [];
  for (let i = dataStart; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(",").map((p) => p.trim());
    const freq = parseFloat(parts[0]);
    if (!Number.isFinite(freq)) continue;
    const traces = [];
    for (let c = 1; c < parts.length; c++) {
      const v = parseFloat(parts[c]);
      traces.push(Number.isFinite(v) ? v : NaN);
    }
    rows.push({ frequency: freq, traces });
  }

  const xUnit = (meta["X Axis Units"] || "Hz").trim();
  const yUnit = (meta["Y Axis Units"] || "dB").trim();
  const startFreq = parseFloat(meta["Start Frequency"]);
  const stopFreq = parseFloat(meta["Stop Frequency"]);
  const rbw = meta["RBW"] ? parseFloat(meta["RBW"]) : null;
  const nPoints = meta["Number of Points"] ? parseInt(meta["Number of Points"], 10) : rows.length;

  return {
    meta: {
      ...meta,
      xUnit,
      yUnit,
      startFreq: Number.isFinite(startFreq) ? startFreq : null,
      stopFreq: Number.isFinite(stopFreq) ? stopFreq : null,
      rbw: Number.isFinite(rbw) ? rbw : null,
      nPoints: Number.isFinite(nPoints) ? nPoints : rows.length,
    },
    rows,
  };
}

/** Keysight often uses ~-893 dB as empty trace placeholder */
const INVALID_AMPLITUDE_THRESHOLD = -400;

function isValidAmplitude(a) {
  return Number.isFinite(a) && a > INVALID_AMPLITUDE_THRESHOLD;
}

/**
 * @returns {{ frequency: number, amplitude: number }[]} valid points for one trace index (0-based)
 */
function extractTraceSeries(parsed, traceIndex) {
  const out = [];
  for (const r of parsed.rows) {
    const a = r.traces[traceIndex];
    if (!isValidAmplitude(a)) continue;
    out.push({ frequency: r.frequency, amplitude: a });
  }
  return out;
}

function countValidTraces(parsed) {
  if (!parsed.rows.length) return 0;
  const n = parsed.rows[0].traces.length;
  const valid = [];
  for (let t = 0; t < n; t++) {
    let hits = 0;
    for (const r of parsed.rows) {
      if (isValidAmplitude(r.traces[t])) hits++;
    }
    if (hits > parsed.rows.length * 0.1) valid.push(t);
  }
  return valid;
}

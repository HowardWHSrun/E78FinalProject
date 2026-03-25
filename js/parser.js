function normalizeXAxisUnit(unit) {
  const raw = String(unit || "Hz").trim();
  return raw || "Hz";
}

function detectXAxisUnit(text, fallbackUnit) {
  const raw = String(text || "");
  if (/\bghz\b/i.test(raw)) return "GHz";
  if (/\bmhz\b/i.test(raw)) return "MHz";
  if (/\bkhz\b/i.test(raw)) return "kHz";
  if (/\bhz\b/i.test(raw)) return "Hz";
  return normalizeXAxisUnit(fallbackUnit);
}

function toHzFrequency(value, unit) {
  const n = parseFloat(value);
  if (!Number.isFinite(n)) return NaN;
  const normalized = normalizeXAxisUnit(unit).toLowerCase();
  if (normalized === "ghz") return n * 1e9;
  if (normalized === "mhz") return n * 1e6;
  if (normalized === "khz") return n * 1e3;
  return n;
}

function normalizeMeta(meta, rows) {
  const displayXUnit = normalizeXAxisUnit(
    meta["X Axis Units"] || meta.displayXUnit || meta.xUnit || meta.frequencyUnit
  );
  const yUnit = String(meta["Y Axis Units"] || meta.yUnit || "dB").trim() || "dB";
  const startFreqRaw = parseFloat(meta["Start Frequency"] ?? meta.startFreq);
  const stopFreqRaw = parseFloat(meta["Stop Frequency"] ?? meta.stopFreq);
  const rbw = meta["RBW"] != null ? parseFloat(meta["RBW"]) : parseFloat(meta.rbw);
  const nPoints =
    meta["Number of Points"] != null
      ? parseInt(meta["Number of Points"], 10)
      : parseInt(meta.nPoints, 10);

  const derivedStart = rows.length ? rows[0].frequency : null;
  const derivedStop = rows.length ? rows[rows.length - 1].frequency : null;

  return {
    ...meta,
    xUnit: "Hz",
    displayXUnit,
    yUnit,
    startFreq: Number.isFinite(startFreqRaw) ? toHzFrequency(startFreqRaw, displayXUnit) : derivedStart,
    stopFreq: Number.isFinite(stopFreqRaw) ? toHzFrequency(stopFreqRaw, displayXUnit) : derivedStop,
    rbw: Number.isFinite(rbw) ? rbw : null,
    nPoints: Number.isFinite(nPoints) ? nPoints : rows.length,
  };
}

function buildParsedPayload(meta, rows) {
  if (!Array.isArray(rows) || !rows.length) {
    throw new Error("No valid frequency/amplitude rows were found in the file.");
  }
  return {
    meta: normalizeMeta(meta || {}, rows),
    rows,
  };
}

function parseNumericRows(lines, startIndex, xUnit) {
  const rows = [];
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line
      .split(/[\s,;]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length < 2) continue;

    const frequency = toHzFrequency(parts[0], xUnit);
    if (!Number.isFinite(frequency)) continue;

    const traces = [];
    for (let c = 1; c < parts.length; c++) {
      const value = parseFloat(parts[c]);
      traces.push(Number.isFinite(value) ? value : NaN);
    }
    if (traces.length) rows.push({ frequency, traces });
  }
  return rows;
}

/**
 * Keysight / Agilent-style swept-spectrum CSV plus generic frequency/amplitude CSVs.
 */
function parseKeysightTraceCsv(text) {
  const lines = text.split(/\r?\n/);
  let dataStart = -1;
  const meta = {};

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed) continue;
    if (trimmed.toUpperCase() === "DATA") {
      dataStart = i + 1;
      break;
    }
    const comma = raw.indexOf(",");
    if (comma > 0) {
      const key = raw.slice(0, comma).trim();
      const val = raw.slice(comma + 1).trim();
      if (key && /[a-z]/i.test(key) && !/^[+-]?\d/.test(key)) {
        meta[key] = val;
      }
    }
  }

  if (dataStart >= 0) {
    const xUnit = meta["X Axis Units"] || meta.xUnit || "Hz";
    return buildParsedPayload(meta, parseNumericRows(lines, dataStart, xUnit));
  }

  let headerIndex = -1;
  let detectedUnit = meta["X Axis Units"] || meta.xUnit || "Hz";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cells = line
      .split(/[\s,;]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (!cells.length) continue;

    const looksNumeric = cells
      .slice(0, Math.min(2, cells.length))
      .every((cell) => Number.isFinite(parseFloat(cell)));
    if (looksNumeric) {
      headerIndex = i;
      break;
    }
    if (cells.some((cell) => /freq|hz|trace|amp|level|db/i.test(cell))) {
      detectedUnit = detectXAxisUnit(line, detectedUnit);
      headerIndex = i + 1;
    }
  }

  if (headerIndex < 0) {
    throw new Error(
      'Unsupported file format. Provide a Keysight CSV with a "DATA" block, a generic frequency/amplitude CSV, or JSON sweep data.'
    );
  }

  return buildParsedPayload(
    { ...meta, xUnit: detectedUnit, displayXUnit: detectedUnit },
    parseNumericRows(lines, headerIndex, detectedUnit)
  );
}

function normalizeTraceMatrix(rows, fallbackUnit) {
  return rows
    .map((row) => {
      if (Array.isArray(row)) {
        if (row.length < 2) return null;
        const frequency = toHzFrequency(row[0], fallbackUnit);
        if (!Number.isFinite(frequency)) return null;
        const traces = row
          .slice(1)
          .map((value) => parseFloat(value))
          .map((value) => (Number.isFinite(value) ? value : NaN));
        return traces.length ? { frequency, traces } : null;
      }
      if (!row || typeof row !== "object") return null;

      const rowUnit =
        row.frequencyUnit ||
        row.frequencyUnits ||
        row.xUnit ||
        row.displayXUnit ||
        row.unit ||
        fallbackUnit;
      const rawFrequency =
        row.frequency ?? row.freq ?? row.f ?? row.x ?? row.hz ?? row.frequencyHz ?? row.frequency_hz;
      const frequency = toHzFrequency(rawFrequency, rowUnit);
      if (!Number.isFinite(frequency)) return null;

      const directAmplitude = parseFloat(
        row.amplitude ?? row.level ?? row.value ?? row.y ?? row.db ?? row.dbuv ?? row.dbuvm
      );
      if (Number.isFinite(directAmplitude)) {
        return { frequency, traces: [directAmplitude] };
      }

      const traceValues = [];
      const traceKeys = Object.keys(row).filter((key) => /^(trace|amplitude|level|value)\d*$/i.test(key));
      traceKeys.sort();
      for (const key of traceKeys) {
        const value = parseFloat(row[key]);
        traceValues.push(Number.isFinite(value) ? value : NaN);
      }
      return traceValues.length ? { frequency, traces: traceValues } : null;
    })
    .filter(Boolean);
}

function rowsFromFrequencyArrays(frequencies, traces, fallbackUnit) {
  if (!Array.isArray(frequencies) || !Array.isArray(traces) || !traces.length) return [];
  return frequencies
    .map((frequencyValue, index) => {
      const frequency = toHzFrequency(frequencyValue, fallbackUnit);
      if (!Number.isFinite(frequency)) return null;
      const rowTraces = traces.map((trace) => {
        const value = Array.isArray(trace) ? parseFloat(trace[index]) : NaN;
        return Number.isFinite(value) ? value : NaN;
      });
      return rowTraces.length ? { frequency, traces: rowTraces } : null;
    })
    .filter(Boolean);
}

function parseJsonSweep(text) {
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (err) {
    throw new Error("JSON live/file input could not be parsed.");
  }

  let rows = [];
  let meta = {};
  let fallbackUnit = "Hz";

  if (Array.isArray(payload)) {
    rows = normalizeTraceMatrix(payload, fallbackUnit);
  } else if (payload && typeof payload === "object") {
    meta = payload.meta && typeof payload.meta === "object" ? { ...payload.meta } : {};
    fallbackUnit =
      meta["X Axis Units"] ||
      meta.displayXUnit ||
      meta.xUnit ||
      payload.xUnit ||
      payload.frequencyUnit ||
      fallbackUnit;

    if (Array.isArray(payload.rows)) {
      rows = normalizeTraceMatrix(payload.rows, fallbackUnit);
    } else if (Array.isArray(payload.points)) {
      rows = normalizeTraceMatrix(payload.points, fallbackUnit);
    } else if (Array.isArray(payload.series)) {
      rows = normalizeTraceMatrix(payload.series, fallbackUnit);
    } else if (Array.isArray(payload.frequencies)) {
      const traceArrays = [];
      if (Array.isArray(payload.amplitudes) && payload.amplitudes.length) {
        if (Array.isArray(payload.amplitudes[0])) traceArrays.push(...payload.amplitudes);
        else traceArrays.push(payload.amplitudes);
      }
      if (Array.isArray(payload.traces)) {
        for (const trace of payload.traces) {
          if (Array.isArray(trace)) traceArrays.push(trace);
        }
      }
      rows = rowsFromFrequencyArrays(payload.frequencies, traceArrays, fallbackUnit);
    }
  }

  return buildParsedPayload({ ...meta, xUnit: fallbackUnit, displayXUnit: fallbackUnit }, rows);
}

function parseSpectrumData(text, fileName) {
  const sourceName = String(fileName || "").toLowerCase();
  const trimmed = String(text || "").trim();
  if (!trimmed) throw new Error("The provided file/source is empty.");

  if (sourceName.endsWith(".json") || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return parseJsonSweep(trimmed);
  }
  return parseKeysightTraceCsv(trimmed);
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
  if (!parsed.rows.length) return [];
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

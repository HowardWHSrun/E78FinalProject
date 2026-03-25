/**
 * Peak identification using frequency allocation records
 * (startFreq/endFreq + unit, primaryService, description, …).
 */

function findAllocationsForFrequencyMHz(freqMHz, dbRows) {
  const out = [];
  for (let i = 0; i < dbRows.length; i++) {
    const r = dbRows[i];
    if (freqMHz >= r.startMHz && freqMHz <= r.endMHz) {
      out.push(r.allocation);
    }
  }
  return out;
}

/**
 * Heuristic likelihood: amplitude tiers + service keywords + common anchor bands.
 * Uses description + primaryService for keyword matching.
 */
function calculateLikelihoodReda(allocation, amplitudeDb, freqMHz) {
  let score = 0.5;
  if (amplitudeDb > 40) score += 0.2;
  else if (amplitudeDb > 20) score += 0.1;

  const text = (
    (allocation.description || "") +
    " " +
    (allocation.primaryService || "") +
    " " +
    (allocation.secondaryService || "")
  ).toLowerCase();

  if (
    text.includes("broadcasting") ||
    text.includes("broadcast") ||
    /\bfm\b/.test(text) ||
    /\bam\b/.test(text)
  ) {
    score += 0.3;
  }
  if (
    text.includes("cellular") ||
    text.includes("mobile") ||
    text.includes("pcs")
  ) {
    score += 0.25;
  }
  if (
    text.includes("wifi") ||
    text.includes("ism") ||
    text.includes("bluetooth")
  ) {
    score += 0.2;
  }
  if (text.includes("amateur") || text.includes("ham")) {
    score += 0.15;
  }
  if (text.includes("aviation") || text.includes("maritime")) {
    score += 0.1;
  }

  if (freqMHz >= 88 && freqMHz <= 108) score += 0.3;
  if (freqMHz >= 2400 && freqMHz <= 2485) score += 0.25;
  if (freqMHz >= 5150 && freqMHz <= 5925) score += 0.2;

  return Math.min(1, Math.max(0, score));
}

function allocationToHzBounds(allocation) {
  const u = (allocation.unit || "MHz").toLowerCase();
  let s = allocation.startFreq;
  let e = allocation.endFreq;
  if (u === "khz") {
    s *= 1000;
    e *= 1000;
  } else if (u === "mhz") {
    s *= 1e6;
    e *= 1e6;
  } else if (u === "ghz") {
    s *= 1e9;
    e *= 1e9;
  } else {
    s *= 1e6;
    e *= 1e6;
  }
  return { startHz: Math.min(s, e), endHz: Math.max(s, e) };
}

/**
 * @returns {Array<{frequency:number, amplitude:number, startFreq:number, endFreq:number, primaryService:string, secondaryService:string, description:string, band:string, fccPart:string, usAllocations:string, notes:string, likelihood:number}>}
 */
function identifyPeak(freqHz, amplitudeDb) {
  const dbRows = window.PEAK_SERVICE_DB_ROWS;
  if (!Array.isArray(dbRows) || dbRows.length === 0) {
    return [];
  }

  const freqMHz = freqHz / 1e6;
  const matches = findAllocationsForFrequencyMHz(freqMHz, dbRows);
  const hits = [];

  for (let i = 0; i < matches.length; i++) {
    const a = matches[i];
    const { startHz, endHz } = allocationToHzBounds(a);
    hits.push({
      frequency: freqHz,
      amplitude: amplitudeDb,
      startFreq: startHz,
      endFreq: endHz,
      primaryService: a.primaryService || "",
      secondaryService: a.secondaryService || "",
      description: a.description || "",
      band: a.band || "",
      fccPart: a.fccPart || "",
      usAllocations: a.usAllocations || "",
      notes: a.notes || "",
      likelihood: calculateLikelihoodReda(a, amplitudeDb, freqMHz),
    });
  }

  hits.sort((x, y) => y.likelihood - x.likelihood);
  return hits;
}

function dedupeIdentifications(rows) {
  const seen = new Set();
  return rows.filter((r) => {
    const key = `${r.frequency}|${r.primaryService}|${r.description}|${r.startFreq}|${r.endFreq}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

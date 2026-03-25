/**
 * Merges peak identification band data (window.peakIdentificationBand0..7)
 * into a single MHz-normalized index for lookup.
 */
(function () {
  function toMHzRange(allocation) {
    const u = (allocation.unit || "MHz").toLowerCase();
    let s = allocation.startFreq;
    let e = allocation.endFreq;
    if (u === "khz") {
      s /= 1000;
      e /= 1000;
    } else if (u === "ghz") {
      s *= 1000;
      e *= 1000;
    }
    return {
      startMHz: Math.min(s, e),
      endMHz: Math.max(s, e),
    };
  }

  const rows = [];
  let bandsLoaded = 0;
  for (let bi = 0; bi <= 7; bi++) {
    const key = "peakIdentificationBand" + bi;
    const arr = window[key];
    if (!Array.isArray(arr)) continue;
    bandsLoaded++;
    for (let i = 0; i < arr.length; i++) {
      const a = arr[i];
      const { startMHz, endMHz } = toMHzRange(a);
      rows.push({ startMHz, endMHz, allocation: a, bandIndex: bi });
    }
  }

  rows.sort((x, y) => x.startMHz - y.startMHz || x.endMHz - y.endMHz);

  window.PEAK_SERVICE_DB_ROWS = rows;
  window.PEAK_SERVICE_DB_STATS = {
    segments: rows.length,
    bandsLoaded: bandsLoaded,
  };
})();

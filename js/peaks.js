function calculateProminence(amplitudes, index) {
  const peak = amplitudes[index];
  let leftMin = peak;
  for (let i = index - 1; i >= 0; i--) {
    if (amplitudes[i] < leftMin) leftMin = amplitudes[i];
    if (amplitudes[i] > peak) break;
  }
  let rightMin = peak;
  for (let i = index + 1; i < amplitudes.length; i++) {
    if (amplitudes[i] < rightMin) rightMin = amplitudes[i];
    if (amplitudes[i] > peak) break;
  }
  return peak - Math.max(leftMin, rightMin);
}

/**
 * @param {{ frequency: number, amplitude: number }[]} points sorted by frequency
 */
function detectPeaks(points, options) {
  const opt = {
    minProminence: 3,
    minHeight: -120,
    minDistance: 10,
    maxPeaks: 50,
    ...options,
  };

  if (points.length < 3) return [];

  const amps = points.map((p) => p.amplitude);
  const freqsMHz = points.map((p) => p.frequency / 1e6);
  const raw = [];

  for (let i = 1; i < points.length - 1; i++) {
    const y = amps[i];
    const yPrev = amps[i - 1];
    const yNext = amps[i + 1];
    if (y > yPrev && y > yNext && y >= opt.minHeight) {
      const prom = calculateProminence(amps, i);
      if (prom >= opt.minProminence) {
        raw.push({
          frequency: points[i].frequency,
          frequencyMHz: freqsMHz[i],
          amplitude: y,
          index: i,
          prominence: prom,
        });
      }
    }
  }

  raw.sort((a, b) => b.prominence - a.prominence);
  const chosen = [];
  for (const p of raw) {
    if (chosen.length >= opt.maxPeaks) break;
    const clash = chosen.some(
      (c) => Math.abs(c.index - p.index) < opt.minDistance
    );
    if (!clash) chosen.push(p);
  }
  return chosen;
}

/**
 * Evenly decimate for chart rendering (full data still used for peaks).
 */
function decimateSeries(points, maxPoints) {
  if (points.length <= maxPoints) return points;
  const step = points.length / maxPoints;
  const out = [];
  for (let i = 0; i < maxPoints; i++) {
    const idx = Math.min(Math.floor(i * step), points.length - 1);
    out.push(points[idx]);
  }
  return out;
}

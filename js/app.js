(function () {
  const el = {
    dropzone: document.getElementById("dropzone"),
    fileInput: document.getElementById("file-input"),
    fileName: document.getElementById("file-name"),
    metaPanel: document.getElementById("meta-panel"),
    traceSelect: document.getElementById("trace-select"),
    peakTable: document.getElementById("peak-table-body"),
    identifyTable: document.getElementById("identify-table-body"),
    exportBtn: document.getElementById("export-json"),
    minHeight: document.getElementById("min-height"),
    minProminence: document.getElementById("min-prominence"),
    minDistance: document.getElementById("min-distance"),
    maxPeaks: document.getElementById("max-peaks"),
    status: document.getElementById("status-line"),
    modeFile: document.getElementById("mode-file"),
    modeLive: document.getElementById("mode-live"),
    btnLiveToggle: document.getElementById("btn-live-toggle"),
    livePreset: document.getElementById("live-preset"),
    btnSample: document.getElementById("btn-sample"),
    liveBadge: document.getElementById("live-badge"),
    body: document.body,
  };

  let chart = null;
  let lastParsed = null;
  let lastSeries = null;
  let lastMeta = null;
  let lastPeaks = [];
  let lastIdentifications = [];
  let lastFileName = "";
  let mode = "file";
  let liveRunning = false;
  let liveRaf = 0;
  let lastIdentifyAt = 0;
  const LIVE_IDENTIFY_MS = 280;

  function setStatus(msg) {
    el.status.textContent = msg;
  }

  function formatFreq(fHz, xUnit) {
    const u = (xUnit || "Hz").toLowerCase();
    if (u === "hz") {
      if (fHz >= 1e9) return (fHz / 1e9).toFixed(6) + " GHz";
      if (fHz >= 1e6) return (fHz / 1e6).toFixed(6) + " MHz";
      if (fHz >= 1e3) return (fHz / 1e3).toFixed(3) + " kHz";
      return fHz.toFixed(1) + " Hz";
    }
    return String(fHz) + " " + xUnit;
  }

  function renderMeta(parsed, fileName, extraRows) {
    const m = parsed.meta || parsed;
    const pointCount =
      m.nPoints != null
        ? String(m.nPoints)
        : parsed && Array.isArray(parsed.rows)
          ? String(parsed.rows.length)
          : lastSeries
            ? String(lastSeries.length)
            : "—";
    const rows = [
      ["Source", fileName],
      ["Instrument / context", m["A.40.09"] || m["Swept SA"] || "—"],
      [
        "Sweep",
        `${formatFreq(m.startFreq || 0, m.xUnit)} → ${formatFreq(m.stopFreq || 0, m.xUnit)}`,
      ],
      ["Points", pointCount],
      ["RBW", m.rbw != null ? `${m.rbw} Hz` : "—"],
      ["Y axis", m.yUnit || "—"],
    ];
    if (extraRows) rows.push(...extraRows);
    el.metaPanel.innerHTML = rows
      .map(
        ([k, v]) =>
          `<div class="meta-row"><span class="meta-k">${escapeHtml(k)}</span><span class="meta-v">${escapeHtml(v)}</span></div>`
      )
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function truncate(s, max) {
    const t = String(s || "");
    return t.length <= max ? t : t.slice(0, max - 1) + "…";
  }

  function addMdSelectOption(selectEl, value, headline, selected) {
    const opt = document.createElement("md-select-option");
    opt.value = String(value);
    const head = document.createElement("div");
    head.slot = "headline";
    head.textContent = headline;
    opt.appendChild(head);
    if (selected) opt.selected = true;
    selectEl.appendChild(opt);
  }

  function syncModePills() {
    el.modeFile.classList.toggle("is-selected", mode === "file");
    el.modeLive.classList.toggle("is-selected", mode === "live");
  }

  function getLivePresetLabel() {
    const v = el.livePreset.value;
    if (v === "b0") return "B0-style (10–160 kHz)";
    if (v === "fm") return "FM window (87–108 MHz)";
    if (v === "wifi") return "2.4 GHz ISM slice";
    return v;
  }

  function fillTraceSelect(validIndices, defaultIdx) {
    el.traceSelect.replaceChildren();
    validIndices.forEach((t) => {
      addMdSelectOption(el.traceSelect, String(t), `Trace ${t + 1}`, t === defaultIdx);
    });
    el.traceSelect.value = String(defaultIdx);
    el.traceSelect.disabled = false;
  }

  function setSyntheticTraceSelect() {
    el.traceSelect.replaceChildren();
    addMdSelectOption(el.traceSelect, "0", "Synthetic trace", true);
    el.traceSelect.disabled = true;
  }

  function destroyChart() {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  }

  function renderChart(series, peaks, meta, animate) {
    const display = decimateSeries(series, 4500);
    const xUnit = meta.xUnit || "Hz";
    const yUnit = meta.yUnit || "dB";
    const grid =
      getComputedStyle(document.documentElement).getPropertyValue("--chart-grid").trim() ||
      "rgba(255,255,255,0.06)";
    const lineColor = getComputedStyle(document.documentElement).getPropertyValue("--chart-line").trim() || "rgba(0,255,209,0.85)";
    const peakColor = getComputedStyle(document.documentElement).getPropertyValue("--chart-peak").trim() || "rgba(255,106,213,0.95)";
    const tickColor = getComputedStyle(document.documentElement).getPropertyValue("--chart-tick").trim() || "#94a3b8";

    const ds0 = display.map((p) => ({ x: p.frequency, y: p.amplitude }));
    const ds1 = peaks.map((p) => ({ x: p.frequency, y: p.amplitude }));

    if (!chart) {
      const ctx = document.getElementById("spectrum-chart").getContext("2d");
      chart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: `Spectrum (${yUnit})`,
              data: ds0,
              borderColor: lineColor,
              backgroundColor: "rgba(0,255,209,0.06)",
              borderWidth: 1.4,
              pointRadius: 0,
              tension: 0,
              fill: false,
            },
            {
              label: "Detected peaks",
              data: ds1,
              borderColor: peakColor,
              backgroundColor: peakColor,
              pointRadius: 5,
              pointHoverRadius: 8,
              showLine: false,
            },
          ],
        },
        options: {
          animation: animate ? { duration: 500, easing: "easeOutQuart" } : false,
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "nearest", intersect: false },
          plugins: {
            legend: {
              labels: {
                color: tickColor,
                font: { family: "'Roboto', sans-serif", size: 12, weight: "500" },
              },
            },
            tooltip: {
              callbacks: {
                title(items) {
                  const x = items[0].parsed.x;
                  return formatFreq(x, xUnit);
                },
              },
            },
          },
          scales: {
            x: {
              type: "linear",
              title: {
                display: true,
                text: `Frequency (${xUnit})`,
                color: tickColor,
                font: { weight: "600" },
              },
              ticks: { color: tickColor, maxTicksLimit: 12 },
              grid: { color: grid },
            },
            y: {
              title: {
                display: true,
                text: yUnit,
                color: tickColor,
                font: { weight: "600" },
              },
              ticks: { color: tickColor },
              grid: { color: grid },
            },
          },
        },
      });
    } else {
      chart.data.datasets[0].data = ds0;
      chart.data.datasets[1].data = ds1;
      chart.data.datasets[0].label = `Spectrum (${yUnit})`;
      chart.options.scales.x.title.text = `Frequency (${xUnit})`;
      chart.options.scales.y.title.text = yUnit;
      chart.update(animate ? "default" : "none");
    }
  }

  function readPeakOptions() {
    const h = parseFloat(el.minHeight.value);
    const p = parseFloat(el.minProminence.value);
    const d = parseInt(el.minDistance.value, 10);
    const m = parseInt(el.maxPeaks.value, 10);
    return {
      minHeight: Number.isFinite(h) ? h : -120,
      minProminence: Number.isFinite(p) ? p : 3,
      minDistance: Number.isFinite(d) ? d : 10,
      maxPeaks: Number.isFinite(m) ? m : 50,
    };
  }

  function runTables(peaks, deduped) {
    el.peakTable.innerHTML = "";
    if (!peaks.length) {
      el.peakTable.innerHTML =
        '<tr><td colspan="4" class="empty">No peaks with current thresholds.</td></tr>';
    } else {
      peaks.forEach((p, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${formatFreq(p.frequency, lastMeta.xUnit)}</td>
          <td>${p.amplitude.toFixed(2)}</td>
          <td>${p.prominence.toFixed(2)}</td>`;
        el.peakTable.appendChild(tr);
      });
    }

    el.identifyTable.innerHTML = "";
    if (!deduped.length) {
      el.identifyTable.innerHTML =
        '<tr><td colspan="6" class="empty">No allocation matches for this frequency range.</td></tr>';
    } else {
      deduped.forEach((r) => {
        const tr = document.createElement("tr");
        const pct = (100 * r.likelihood).toFixed(0);
        const svc = truncate(r.primaryService, 48);
        const desc = truncate(r.description, 56);
        const fcc = r.fccPart ? truncate(r.fccPart, 24) : "—";
        tr.innerHTML = `
          <td>${formatFreq(r.frequency, lastMeta.xUnit)}</td>
          <td title="${escapeHtml(r.primaryService)}">${escapeHtml(svc)}</td>
          <td title="${escapeHtml(r.description)}">${escapeHtml(desc)}</td>
          <td>${escapeHtml(r.band)}</td>
          <td title="${escapeHtml(r.fccPart)}">${escapeHtml(fcc)}</td>
          <td><span class="likelihood">${pct}%</span></td>`;
        el.identifyTable.appendChild(tr);
      });
    }
  }

  function computeIdentification(peaks) {
    const idRows = [];
    for (const p of peaks) {
      const hits = identifyPeak(p.frequency, p.amplitude);
      for (const h of hits.slice(0, 3)) {
        idRows.push({ ...h, peakProminence: p.prominence });
      }
    }
    return dedupeIdentifications(idRows).slice(0, 80);
  }

  /**
   * @param {{ full?: boolean, animateChart?: boolean }} opt
   */
  function runAnalysis(opt) {
    const full = !opt || opt.full !== false;
    const animateChart = opt && opt.animateChart;

    if (!lastSeries || !lastMeta) return;

    const opts = readPeakOptions();
    const peaks = detectPeaks(lastSeries, opts);
    lastPeaks = peaks;
    const deduped = full ? computeIdentification(peaks) : lastIdentifications;
    if (full) lastIdentifications = deduped;

    renderChart(lastSeries, peaks, lastMeta, animateChart);
    if (full) {
      runTables(peaks, deduped);
      setStatus(
        `${mode === "live" ? "● Live · " : ""}${peaks.length} peaks · ${deduped.length} ID rows · ${lastSeries.length} points`
      );
    }
  }

  function liveTick(ts) {
    if (!liveRunning) return;
    const preset = el.livePreset.value;
    lastSeries = generateSyntheticSpectrum(ts * 0.001, preset);
    lastMeta = getSyntheticMeta(preset);

    const peaks = detectPeaks(lastSeries, readPeakOptions());
    lastPeaks = peaks;
    renderChart(lastSeries, peaks, lastMeta, false);

    if (ts - lastIdentifyAt >= LIVE_IDENTIFY_MS) {
      lastIdentifyAt = ts;
      lastIdentifications = computeIdentification(peaks);
      runTables(peaks, lastIdentifications);
      setStatus(
        `● Live · ${peaks.length} peaks · ${lastIdentifications.length} ID rows · ${preset.toUpperCase()} demo`
      );
    }

    liveRaf = requestAnimationFrame(liveTick);
  }

  function stopLive() {
    liveRunning = false;
    if (liveRaf) cancelAnimationFrame(liveRaf);
    liveRaf = 0;
    el.body.classList.remove("is-live");
    el.liveBadge.classList.remove("live-badge--on");
    el.btnLiveToggle.textContent = "Start live demo";
    el.btnLiveToggle.classList.remove("live-toggle--stop");
  }

  function startLive() {
    stopLive();
    mode = "live";
    lastParsed = null;
    lastFileName = "Live synthetic";
    el.fileName.textContent = lastFileName;
    setSyntheticTraceSelect();
    const preset = el.livePreset.value;
    lastMeta = getSyntheticMeta(preset);
    renderMeta({ meta: lastMeta, rows: [] }, "Live synthetic", [["Preset", getLivePresetLabel()]]);

    liveRunning = true;
    el.body.classList.add("is-live");
    el.liveBadge.classList.add("live-badge--on");
    el.btnLiveToggle.textContent = "Stop live";
    el.btnLiveToggle.classList.add("live-toggle--stop");
    syncModePills();
    el.dropzone.classList.add("dropzone--muted");

    lastIdentifyAt = 0;
    liveRaf = requestAnimationFrame(liveTick);
  }

  function setModeFile() {
    stopLive();
    mode = "file";
    syncModePills();
    el.dropzone.classList.remove("dropzone--muted");
    if (!lastParsed && !lastSeries) {
      el.metaPanel.innerHTML = "";
      el.fileName.textContent = "";
      destroyChart();
      el.peakTable.innerHTML = "";
      el.identifyTable.innerHTML = "";
      el.traceSelect.replaceChildren();
      addMdSelectOption(el.traceSelect, "__", "Load CSV or sample…", true);
      el.traceSelect.disabled = true;
      const stats = window.PEAK_SERVICE_DB_STATS;
      if (stats && stats.segments > 0) {
        setStatus(
          `Service allocation database ready (${stats.segments} segments). Load CSV, sample, or live demo.`
        );
      }
    }
  }

  function loadParsed(parsed, fileName) {
    stopLive();
    setModeFile();
    lastParsed = parsed;
    lastFileName = fileName;
    el.fileName.textContent = fileName;
    renderMeta(parsed, fileName);

    const valid = countValidTraces(parsed);
    if (!valid.length) {
      setStatus("No valid trace columns (all amplitudes look empty).");
      lastSeries = null;
      destroyChart();
      return;
    }

    const defaultTrace = valid[0];
    fillTraceSelect(valid, defaultTrace);
    lastSeries = extractTraceSeries(parsed, defaultTrace);
    lastMeta = parsed.meta;
    setStatus(`Loaded ${lastSeries.length} points · ${valid.length} trace(s)`);
    runAnalysis({ animateChart: true });
  }

  function loadSample() {
    stopLive();
    setModeFile();
    try {
      const csv = buildEmbeddedSampleCsv();
      const parsed = parseKeysightTraceCsv(csv);
      loadParsed(parsed, "Embedded sample (B0-style)");
    } catch (e) {
      setStatus("Sample error: " + (e.message || String(e)));
      console.error(e);
    }
  }

  function onTraceChange() {
    if (!lastParsed || mode === "live") return;
    const raw = el.traceSelect.value;
    if (raw === "" || raw == null || raw === "__") return;
    const t = parseInt(raw, 10);
    if (!Number.isFinite(t)) return;
    lastSeries = extractTraceSeries(lastParsed, t);
    runAnalysis({ animateChart: false });
  }

  async function handleFile(file) {
    if (!file || !file.name.toLowerCase().endsWith(".csv")) {
      setStatus("Please choose a .csv file.");
      return;
    }
    const text = await file.text();
    try {
      const parsed = parseKeysightTraceCsv(text);
      loadParsed(parsed, file.name);
    } catch (e) {
      setStatus("Error: " + (e.message || String(e)));
      console.error(e);
    }
  }

  el.fileInput.addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) handleFile(f);
  });

  ["dragenter", "dragover"].forEach((ev) => {
    el.dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      if (mode === "live") return;
      el.dropzone.classList.add("dropzone--active");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    el.dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      el.dropzone.classList.remove("dropzone--active");
    });
  });
  el.dropzone.addEventListener("drop", (e) => {
    if (mode === "live") {
      setStatus("Stop live demo first, or switch to File mode.");
      return;
    }
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  });
  el.dropzone.addEventListener("click", () => {
    if (mode === "live") {
      setStatus("Stop live demo to load a file, or click File mode.");
      return;
    }
    el.fileInput.click();
  });

  el.traceSelect.addEventListener("change", onTraceChange);
  ["minHeight", "minProminence", "minDistance", "maxPeaks"].forEach((id) => {
    const node = document.getElementById(id);
    const onPeakParamInput = () => {
      if (!lastSeries) return;
      if (liveRunning) lastIdentifyAt = 0;
      if (!liveRunning) runAnalysis({ animateChart: false });
    };
    node.addEventListener("change", onPeakParamInput);
    node.addEventListener("input", onPeakParamInput);
  });

  el.exportBtn.addEventListener("click", () => {
    if (!lastSeries || !lastMeta) return;
    const payload = {
      file: lastFileName,
      mode: mode,
      meta: lastMeta,
      traceIndex:
        mode === "file" && el.traceSelect.value && el.traceSelect.value !== "__"
          ? parseInt(el.traceSelect.value, 10)
          : 0,
      peakOptions: readPeakOptions(),
      peaks: lastPeaks,
      identifications: lastIdentifications,
      exportedAt: new Date().toISOString(),
    };
    if (lastParsed) payload.keysightMeta = lastParsed.meta;
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (lastFileName || "spectrum").replace(/[^\w.-]+/g, "_") + "_peaks.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  el.modeFile.addEventListener("click", () => {
    setModeFile();
    syncModePills();
  });
  el.modeLive.addEventListener("click", () => {
    mode = "live";
    syncModePills();
    if (!liveRunning) setStatus("Choose a preset and press Start live demo.");
  });

  el.btnLiveToggle.addEventListener("click", () => {
    if (liveRunning) stopLive();
    else startLive();
  });

  el.livePreset.addEventListener("change", () => {
    if (liveRunning) {
      lastIdentifyAt = 0;
      const preset = el.livePreset.value;
      lastMeta = getSyntheticMeta(preset);
      renderMeta({ meta: lastMeta, rows: [] }, "Live synthetic", [["Preset", getLivePresetLabel()]]);
    }
  });

  el.btnSample.addEventListener("click", loadSample);

  el.traceSelect.replaceChildren();
  addMdSelectOption(el.traceSelect, "__", "Load CSV or sample…", true);
  el.traceSelect.disabled = true;
  syncModePills();

  const stats = window.PEAK_SERVICE_DB_STATS;
  if (stats && stats.segments > 0) {
    setStatus(
      `Service allocation database ready (${stats.segments} segments). Load CSV, sample, or live demo.`
    );
  } else {
    setStatus("Warning: service allocation database not loaded.");
  }
})();

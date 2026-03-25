(function () {
  const el = {
    dropzone: document.getElementById("dropzone"),
    fileInput: document.getElementById("file-input"),
    fileName: document.getElementById("file-name"),
    metaPanel: document.getElementById("meta-panel"),
    traceSelect: document.getElementById("trace-select"),
    peakTable: document.getElementById("peak-table-body"),
    identifyTable: document.getElementById("identify-table-body"),
    minHeight: document.querySelector('[data-peak-param="minHeight"]'),
    minProminence: document.querySelector('[data-peak-param="minProminence"]'),
    minDistance: document.querySelector('[data-peak-param="minDistance"]'),
    maxPeaks: document.querySelector('[data-peak-param="maxPeaks"]'),
    status: document.getElementById("status-line"),
    modeFile: document.getElementById("mode-file"),
    modeLive: document.getElementById("mode-live"),
    btnLiveToggle: document.getElementById("btn-live-toggle"),
    livePreset: document.getElementById("live-preset"),
    liveUrl: document.getElementById("live-url"),
    livePollMs: document.getElementById("live-poll-ms"),
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
  let activeTraceIndex = 0;
  let mode = "file";
  let liveRunning = false;
  let liveRaf = 0;
  let liveTimer = 0;
  let liveSessionId = 0;
  let liveSource = "synthetic";
  let liveSourceUrl = "";
  let lastIdentifyAt = 0;

  const LIVE_IDENTIFY_MS = 280;
  const MIN_LIVE_POLL_MS = 250;
  const DEFAULT_LIVE_POLL_MS = 1500;

  function setStatus(msg) {
    if (el.status) el.status.textContent = msg;
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

  function getDisplayXUnit(meta) {
    return String(meta?.displayXUnit || meta?.xUnit || "Hz");
  }

  function normalizeUnitLabel(unit) {
    const raw = String(unit || "Hz").trim();
    const lower = raw.toLowerCase();
    if (lower === "ghz") return "GHz";
    if (lower === "mhz") return "MHz";
    if (lower === "khz") return "kHz";
    return "Hz";
  }

  function formatFreq(fHz, xUnit) {
    const unit = normalizeUnitLabel(xUnit);
    if (!Number.isFinite(fHz)) return "—";
    if (unit === "GHz") return (fHz / 1e9).toFixed(6) + " GHz";
    if (unit === "MHz") return (fHz / 1e6).toFixed(6) + " MHz";
    if (unit === "kHz") return (fHz / 1e3).toFixed(3) + " kHz";
    if (fHz >= 1e9) return (fHz / 1e9).toFixed(6) + " GHz";
    if (fHz >= 1e6) return (fHz / 1e6).toFixed(6) + " MHz";
    if (fHz >= 1e3) return (fHz / 1e3).toFixed(3) + " kHz";
    return fHz.toFixed(1) + " Hz";
  }

  function formatAxisTick(fHz, xUnit) {
    const unit = normalizeUnitLabel(xUnit);
    if (!Number.isFinite(fHz)) return "";
    if (unit === "GHz") return (fHz / 1e9).toFixed(3);
    if (unit === "MHz") return (fHz / 1e6).toFixed(3);
    if (unit === "kHz") return (fHz / 1e3).toFixed(1);
    if (Math.abs(fHz) >= 1e9) return (fHz / 1e9).toFixed(2) + "G";
    if (Math.abs(fHz) >= 1e6) return (fHz / 1e6).toFixed(1) + "M";
    if (Math.abs(fHz) >= 1e3) return (fHz / 1e3).toFixed(0) + "k";
    return fHz.toFixed(0);
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
    el.modeFile?.classList.toggle("is-selected", mode === "file");
    el.modeLive?.classList.toggle("is-selected", mode === "live");
  }

  function getLivePresetLabel() {
    const value = el.livePreset?.value || "b0";
    if (value === "b0") return "B0-style (10–160 kHz)";
    if (value === "fm") return "FM window (87–108 MHz)";
    if (value === "wifi") return "2.4 GHz ISM slice";
    return value;
  }

  function setTraceSelectPlaceholder(label) {
    el.traceSelect.replaceChildren();
    addMdSelectOption(el.traceSelect, "__", label, true);
    el.traceSelect.disabled = true;
  }

  function fillTraceSelect(validIndices, selectedIdx) {
    el.traceSelect.replaceChildren();
    validIndices.forEach((traceIndex) => {
      addMdSelectOption(
        el.traceSelect,
        String(traceIndex),
        `Trace ${traceIndex + 1}`,
        traceIndex === selectedIdx
      );
    });
    el.traceSelect.value = String(selectedIdx);
    el.traceSelect.disabled = false;
  }

  function setSingleTraceSelect(label) {
    el.traceSelect.replaceChildren();
    addMdSelectOption(el.traceSelect, "0", label, true);
    el.traceSelect.value = "0";
    el.traceSelect.disabled = true;
  }

  function getLiveUrlValue() {
    return String(el.liveUrl?.value || "").trim();
  }

  function readLivePollMs() {
    const raw = parseInt(el.livePollMs?.value || "", 10);
    return Number.isFinite(raw) ? Math.max(MIN_LIVE_POLL_MS, raw) : DEFAULT_LIVE_POLL_MS;
  }

  function getLiveSourceLabel() {
    return liveSource === "remote" ? "Live URL feed" : "Live synthetic";
  }

  function inferLiveSourceName(url) {
    if (!url) return getLiveSourceLabel();
    try {
      const parsed = new URL(url, window.location.href);
      const path = parsed.pathname.split("/").filter(Boolean);
      return path.length ? path[path.length - 1] : parsed.host || getLiveSourceLabel();
    } catch (_err) {
      return url;
    }
  }

  function buildLivePlaceholderMeta() {
    return {
      xUnit: "Hz",
      displayXUnit: "Hz",
      yUnit: "dB",
      startFreq: null,
      stopFreq: null,
      rbw: null,
      nPoints: null,
      "Swept SA": liveSource === "remote" ? "Polled live feed" : "Synthetic (demo)",
    };
  }

  function buildLiveExtraRows(parsed) {
    if (liveSource === "remote") {
      const rows = [
        ["URL", liveSourceUrl || "—"],
        ["Poll interval", `${readLivePollMs()} ms`],
      ];
      const valid = parsed ? countValidTraces(parsed) : [];
      if (valid.length > 1) {
        rows.push(["Active trace", `Trace ${activeTraceIndex + 1} of ${valid.length}`]);
      }
      return rows;
    }
    return [["Preset", getLivePresetLabel()]];
  }

  function renderMeta(parsed, fileName, extraRows) {
    const meta = parsed?.meta || parsed || {};
    const displayXUnit = getDisplayXUnit(meta);
    const pointCount =
      meta.nPoints != null
        ? String(meta.nPoints)
        : parsed && Array.isArray(parsed.rows)
          ? String(parsed.rows.length)
          : lastSeries
            ? String(lastSeries.length)
            : "—";
    const sweepStart = meta.startFreq != null ? formatFreq(meta.startFreq, displayXUnit) : "—";
    const sweepStop = meta.stopFreq != null ? formatFreq(meta.stopFreq, displayXUnit) : "—";
    const rows = [
      ["Source", fileName || "—"],
      ["Instrument / context", meta["A.40.09"] || meta["Swept SA"] || "—"],
      ["Sweep", `${sweepStart} → ${sweepStop}`],
      ["Points", pointCount],
      ["RBW", meta.rbw != null ? `${meta.rbw} Hz` : "—"],
      ["Y axis", meta.yUnit || "—"],
    ];
    if (Array.isArray(extraRows)) rows.push(...extraRows);
    el.metaPanel.innerHTML = rows
      .map(
        ([k, v]) =>
          `<div class="meta-row"><span class="meta-k">${escapeHtml(k)}</span><span class="meta-v">${escapeHtml(v)}</span></div>`
      )
      .join("");
  }

  function destroyChart() {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  }

  function renderChart(series, peaks, meta, animate) {
    const display = decimateSeries(series, 4500);
    const displayXUnit = getDisplayXUnit(meta);
    const yUnit = meta.yUnit || "dB";
    const grid =
      getComputedStyle(document.documentElement).getPropertyValue("--chart-grid").trim() ||
      "rgba(255,255,255,0.06)";
    const lineColor =
      getComputedStyle(document.documentElement).getPropertyValue("--chart-line").trim() ||
      "rgba(0,255,209,0.85)";
    const peakColor =
      getComputedStyle(document.documentElement).getPropertyValue("--chart-peak").trim() ||
      "rgba(255,106,213,0.95)";
    const tickColor =
      getComputedStyle(document.documentElement).getPropertyValue("--chart-tick").trim() || "#94a3b8";

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
                  return formatFreq(items[0].parsed.x, displayXUnit);
                },
              },
            },
          },
          scales: {
            x: {
              type: "linear",
              title: {
                display: true,
                text: `Frequency (${normalizeUnitLabel(displayXUnit)})`,
                color: tickColor,
                font: { weight: "600" },
              },
              ticks: {
                color: tickColor,
                maxTicksLimit: 12,
                callback(value) {
                  return formatAxisTick(Number(value), displayXUnit);
                },
              },
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
      chart.options.scales.x.title.text = `Frequency (${normalizeUnitLabel(displayXUnit)})`;
      chart.options.scales.x.ticks.callback = (value) => formatAxisTick(Number(value), displayXUnit);
      chart.options.scales.y.title.text = yUnit;
      chart.update(animate ? "default" : "none");
    }
  }

  function readPeakOptions() {
    const gv = (node, fallback) => {
      if (!node || node.value == null || node.value === "") return fallback;
      const n = parseFloat(node.value);
      return Number.isFinite(n) ? n : fallback;
    };
    const gi = (node, fallback) => {
      if (!node || node.value == null || node.value === "") return fallback;
      const n = parseInt(node.value, 10);
      return Number.isFinite(n) ? n : fallback;
    };
    return {
      minHeight: gv(el.minHeight, -120),
      minProminence: gv(el.minProminence, 3),
      minDistance: gi(el.minDistance, 10),
      maxPeaks: gi(el.maxPeaks, 50),
    };
  }

  function runTables(peaks, rows) {
    el.peakTable.innerHTML = "";
    if (!peaks.length) {
      el.peakTable.innerHTML =
        '<tr><td colspan="4" class="empty">No peaks with current thresholds.</td></tr>';
    } else {
      const displayXUnit = getDisplayXUnit(lastMeta);
      peaks.forEach((peak, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${formatFreq(peak.frequency, displayXUnit)}</td>
          <td>${peak.amplitude.toFixed(2)}</td>
          <td>${peak.prominence.toFixed(2)}</td>`;
        el.peakTable.appendChild(tr);
      });
    }

    el.identifyTable.innerHTML = "";
    if (!rows.length) {
      el.identifyTable.innerHTML =
        '<tr><td colspan="6" class="empty">No allocation matches for this frequency range.</td></tr>';
    } else {
      const displayXUnit = getDisplayXUnit(lastMeta);
      rows.forEach((row) => {
        const tr = document.createElement("tr");
        const pct = (row.likelihood * 100).toFixed(0);
        const svc = truncate(row.primaryService, 48);
        const desc = truncate(row.description, 56);
        const fcc = row.fccPart ? truncate(row.fccPart, 24) : "—";
        tr.innerHTML = `
          <td>${formatFreq(row.frequency, displayXUnit)}</td>
          <td title="${escapeHtml(row.primaryService)}">${escapeHtml(svc)}</td>
          <td title="${escapeHtml(row.description)}">${escapeHtml(desc)}</td>
          <td>${escapeHtml(row.band)}</td>
          <td title="${escapeHtml(row.fccPart)}">${escapeHtml(fcc)}</td>
          <td><span class="likelihood">${pct}%</span></td>`;
        el.identifyTable.appendChild(tr);
      });
    }
  }

  function computeIdentification(peaks) {
    const rows = [];
    for (const peak of peaks) {
      const hits = identifyPeak(peak.frequency, peak.amplitude);
      for (const hit of hits.slice(0, 3)) {
        rows.push({ ...hit, peakProminence: peak.prominence });
      }
    }
    return dedupeIdentifications(rows).slice(0, 80);
  }

  function runAnalysis(opt) {
    const options = opt || {};
    const full = options.full !== false;
    const animateChart = !!options.animateChart;
    if (!lastSeries || !lastMeta) return;

    const peaks = detectPeaks(lastSeries, readPeakOptions());
    lastPeaks = peaks;
    if (full) lastIdentifications = computeIdentification(peaks);

    renderChart(lastSeries, peaks, lastMeta, animateChart);

    if (full) {
      runTables(peaks, lastIdentifications);
      const sourceLabel =
        mode === "live" ? (liveSource === "remote" ? "● Live URL" : "● Live demo") : "Loaded";
      const detail = options.statusDetail ? ` · ${options.statusDetail}` : "";
      setStatus(
        `${sourceLabel} · ${peaks.length} peaks · ${lastIdentifications.length} ID rows · ${lastSeries.length} points${detail}`
      );
    }
  }

  function clearAnalysisViews() {
    destroyChart();
    lastParsed = null;
    lastSeries = null;
    lastMeta = null;
    lastPeaks = [];
    lastIdentifications = [];
    lastFileName = "";
    activeTraceIndex = 0;
    el.fileName.textContent = "";
    el.metaPanel.innerHTML = "";
    runTables([], []);
    setTraceSelectPlaceholder("Load CSV, JSON, or sample…");
  }

  function setReadyStatus() {
    const stats = window.PEAK_SERVICE_DB_STATS;
    if (stats && stats.segments > 0) {
      setStatus(
        `Service allocation database ready (${stats.segments} segments). Load CSV, JSON, sample data, or a live feed.`
      );
    } else {
      setStatus("Warning: service allocation database not loaded.");
    }
  }

  function setLiveUiState() {
    el.body.classList.add("is-live");
    el.liveBadge.classList.add("live-badge--on");
    el.btnLiveToggle.textContent = "Stop live feed";
    el.btnLiveToggle.classList.add("live-toggle--stop");
    el.dropzone.classList.add("dropzone--muted");
    mode = "live";
    syncModePills();
  }

  function clearLiveUiState() {
    el.body.classList.remove("is-live");
    el.liveBadge.classList.remove("live-badge--on");
    el.btnLiveToggle.textContent = "Start live feed";
    el.btnLiveToggle.classList.remove("live-toggle--stop");
    el.dropzone.classList.remove("dropzone--muted");
  }

  function stopLive() {
    liveRunning = false;
    liveSessionId += 1;
    if (liveRaf) cancelAnimationFrame(liveRaf);
    if (liveTimer) clearTimeout(liveTimer);
    liveRaf = 0;
    liveTimer = 0;
    clearLiveUiState();
  }

  function applyParsedData(parsed, sourceLabel, options) {
    const config = options || {};
    const valid = countValidTraces(parsed);
    lastParsed = parsed;
    lastFileName = sourceLabel;
    el.fileName.textContent = sourceLabel;
    lastMeta = parsed.meta;

    if (!valid.length) {
      lastSeries = null;
      lastPeaks = [];
      lastIdentifications = [];
      renderMeta(parsed, sourceLabel, config.extraRowsBuilder ? config.extraRowsBuilder(parsed) : config.extraRows);
      destroyChart();
      runTables([], []);
      setTraceSelectPlaceholder("No valid traces");
      setStatus("No valid trace columns were found in this data set.");
      return false;
    }

    const preferredTrace =
      config.preferredTraceIndex != null ? config.preferredTraceIndex : activeTraceIndex;
    activeTraceIndex = valid.includes(preferredTrace) ? preferredTrace : valid[0];

    if (config.disableTraceSelect) {
      setSingleTraceSelect(config.singleTraceLabel || "Trace 1");
    } else if (valid.length === 1 && config.singleTraceLabel) {
      setSingleTraceSelect(config.singleTraceLabel);
    } else {
      fillTraceSelect(valid, activeTraceIndex);
    }

    lastSeries = extractTraceSeries(parsed, activeTraceIndex);
    renderMeta(parsed, sourceLabel, config.extraRowsBuilder ? config.extraRowsBuilder(parsed) : config.extraRows);
    runAnalysis({
      animateChart: !!config.animateChart,
      statusDetail: config.statusDetail || "",
    });
    return true;
  }

  function loadParsedFile(parsed, fileName) {
    stopLive();
    mode = "file";
    syncModePills();
    clearLiveUiState();
    applyParsedData(parsed, fileName, { animateChart: true });
  }

  function updateLivePlaceholder() {
    const label = getLiveSourceLabel();
    const sourceName =
      liveSource === "remote" ? inferLiveSourceName(liveSourceUrl) : "Live synthetic";
    lastFileName = sourceName;
    el.fileName.textContent = sourceName;
    renderMeta({ meta: buildLivePlaceholderMeta(), rows: [] }, label, buildLiveExtraRows(null));
  }

  function liveTick(ts) {
    if (!liveRunning || liveSource !== "synthetic") return;
    const preset = el.livePreset?.value || "b0";
    lastParsed = null;
    lastMeta = getSyntheticMeta(preset);
    lastFileName = "Live synthetic";
    el.fileName.textContent = lastFileName;
    lastSeries = generateSyntheticSpectrum(ts * 0.001, preset);

    const full = ts - lastIdentifyAt >= LIVE_IDENTIFY_MS;
    if (full) lastIdentifyAt = ts;

    runAnalysis({
      full,
      animateChart: false,
      statusDetail: getLivePresetLabel(),
    });

    liveRaf = requestAnimationFrame(liveTick);
  }

  function appendCacheBust(url) {
    const join = url.includes("?") ? "&" : "?";
    return `${url}${join}_ts=${Date.now()}`;
  }

  async function pollLiveRemote(sessionId) {
    if (!liveRunning || liveSource !== "remote" || sessionId !== liveSessionId) return;
    try {
      const response = await fetch(appendCacheBust(liveSourceUrl), {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const text = await response.text();
      const parsed = parseSpectrumData(text, liveSourceUrl);
      if (!liveRunning || sessionId !== liveSessionId) return;

      applyParsedData(parsed, inferLiveSourceName(liveSourceUrl), {
        animateChart: true,
        extraRowsBuilder: buildLiveExtraRows,
        statusDetail: inferLiveSourceName(liveSourceUrl),
      });
    } catch (err) {
      if (!liveRunning || sessionId !== liveSessionId) return;
      setStatus(
        `Live fetch error: ${err && err.message ? err.message : String(err)}. Check the URL and CORS settings.`
      );
      console.error(err);
    } finally {
      if (liveRunning && liveSource === "remote" && sessionId === liveSessionId) {
        liveTimer = window.setTimeout(() => {
          pollLiveRemote(sessionId);
        }, readLivePollMs());
      }
    }
  }

  function startLive() {
    stopLive();
    liveSourceUrl = getLiveUrlValue();
    liveSource = liveSourceUrl ? "remote" : "synthetic";
    liveRunning = true;
    liveSessionId += 1;
    const sessionId = liveSessionId;
    setLiveUiState();
    lastIdentifyAt = 0;

    if (liveSource === "remote") {
      updateLivePlaceholder();
      setTraceSelectPlaceholder("Waiting for live data…");
      setStatus("Polling live URL…");
      pollLiveRemote(sessionId);
      return;
    }

    activeTraceIndex = 0;
    setSingleTraceSelect("Synthetic trace");
    lastMeta = getSyntheticMeta(el.livePreset?.value || "b0");
    updateLivePlaceholder();
    setStatus("Starting live demo…");
    liveRaf = requestAnimationFrame(liveTick);
  }

  function setModeFile(clearView) {
    stopLive();
    mode = "file";
    syncModePills();
    clearLiveUiState();
    if (clearView) {
      clearAnalysisViews();
      setReadyStatus();
    }
  }

  function loadSample() {
    try {
      const csv = buildEmbeddedSampleCsv();
      const parsed = parseSpectrumData(csv, "embedded-sample.csv");
      loadParsedFile(parsed, "Embedded sample (B0-style)");
    } catch (err) {
      setStatus(`Sample error: ${err && err.message ? err.message : String(err)}`);
      console.error(err);
    }
  }

  function onTraceChange() {
    if (!lastParsed) return;
    const raw = el.traceSelect?.value;
    if (!raw || raw === "__") return;
    const traceIndex = parseInt(raw, 10);
    if (!Number.isFinite(traceIndex)) return;
    activeTraceIndex = traceIndex;
    lastSeries = extractTraceSeries(lastParsed, activeTraceIndex);
    if (mode === "live" && liveSource === "remote") {
      renderMeta(lastParsed, lastFileName, buildLiveExtraRows(lastParsed));
    }
    runAnalysis({ animateChart: false });
  }

  async function handleFile(file) {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseSpectrumData(text, file.name);
      loadParsedFile(parsed, file.name);
      if (el.fileInput) el.fileInput.value = "";
    } catch (err) {
      setStatus(`Error: ${err && err.message ? err.message : String(err)}`);
      console.error(err);
    }
  }

  function performExport() {
    if (!lastSeries || !lastMeta) return;
    const payload = {
      file: lastFileName,
      mode,
      liveSource: mode === "live" ? liveSource : null,
      liveUrl: mode === "live" && liveSource === "remote" ? liveSourceUrl : null,
      meta: lastMeta,
      traceIndex: activeTraceIndex,
      peakOptions: readPeakOptions(),
      peaks: lastPeaks,
      identifications: lastIdentifications,
      exportedAt: new Date().toISOString(),
    };
    if (lastParsed) payload.sourceMeta = lastParsed.meta;
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (lastFileName || "spectrum").replace(/[^\w.-]+/g, "_") + "_peaks.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function onLivePresetChange() {
    if (!liveRunning || liveSource !== "synthetic") return;
    lastMeta = getSyntheticMeta(el.livePreset?.value || "b0");
    renderMeta({ meta: lastMeta, rows: [] }, "Live synthetic", buildLiveExtraRows(null));
    lastIdentifyAt = 0;
  }

  function onPeakParamInput() {
    if (!lastSeries) return;
    if (liveRunning && liveSource === "synthetic") {
      lastIdentifyAt = 0;
    }
    runAnalysis({ animateChart: false });
  }

  if (el.fileInput) {
    el.fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) handleFile(file);
    });
  }

  if (el.dropzone) {
    ["dragenter", "dragover"].forEach((eventName) => {
      el.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        if (mode === "live") return;
        el.dropzone.classList.add("dropzone--active");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      el.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        el.dropzone.classList.remove("dropzone--active");
      });
    });

    el.dropzone.addEventListener("drop", (e) => {
      if (mode === "live") {
        setStatus("Stop the live feed first, or switch to File mode.");
        return;
      }
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) handleFile(file);
    });

    el.dropzone.addEventListener("click", () => {
      if (mode === "live") {
        setStatus("Stop the live feed to load a file, or switch to File mode.");
        return;
      }
      el.fileInput?.click();
    });

    el.dropzone.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (mode === "live") {
        setStatus("Stop the live feed to load a file, or switch to File mode.");
        return;
      }
      el.fileInput?.click();
    });
  }

  /**
   * Material Web components use shadow DOM; clicks often target inner nodes so
   * host-level listeners miss. Route by composedPath() in capture phase.
   */
  document.addEventListener(
    "click",
    (e) => {
      for (const node of e.composedPath()) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) continue;
        const id = node.id;
        if (!id) continue;

        if (id === "btn-sample") {
          e.preventDefault();
          loadSample();
          return;
        }
        if (id === "export-json") {
          e.preventDefault();
          performExport();
          return;
        }
        if (id === "btn-live-toggle") {
          e.preventDefault();
          if (liveRunning) stopLive();
          else startLive();
          return;
        }
        if (id === "mode-file") {
          e.preventDefault();
          setModeFile(true);
          return;
        }
        if (id === "mode-live") {
          e.preventDefault();
          mode = "live";
          syncModePills();
          if (!liveRunning) {
            setStatus("Choose a preset or URL and press Start live feed.");
          }
          return;
        }
      }
    },
    true
  );

  document.addEventListener(
    "change",
    (e) => {
      for (const node of e.composedPath()) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.id === "trace-select") {
          onTraceChange();
          return;
        }
        if (node.id === "live-preset") {
          onLivePresetChange();
          return;
        }
      }
    },
    true
  );

  document.addEventListener(
    "input",
    (e) => {
      for (const node of e.composedPath()) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.getAttribute && node.getAttribute("data-peak-param")) {
          onPeakParamInput();
          return;
        }
      }
    },
    true
  );

  setTraceSelectPlaceholder("Load CSV, JSON, or sample…");
  syncModePills();
  setReadyStatus();
})();

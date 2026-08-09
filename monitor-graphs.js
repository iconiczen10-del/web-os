/* === FILE: monitor-graphs.js === */
/**
 * WebOS v0.7.1.1 Graph Renderer Helpers (Pure CSS/Div Charts)
 */
(function () {
  const MAX_POINTS = 60;

  function pushDataPoint(historyArray, val) {
    if (!Array.isArray(historyArray)) historyArray = [];
    historyArray.push(val);
    if (historyArray.length > MAX_POINTS) {
      historyArray.shift();
    }
    return historyArray;
  }

  function renderHistoryBars(containerEl, dataPoints, maxVal = 100, barColor = "#007aff", isArea = false) {
    if (!containerEl) return;
    const points = dataPoints && dataPoints.length > 0
      ? dataPoints
      : Array.from({ length: 30 }, () => 10);

    const barsHtml = points.map((val) => {
      const pct = Math.min(Math.max((val / maxVal) * 100, 4), 100);
      const opacity = isArea ? 0.35 + (pct / 100) * 0.65 : 0.85;
      return `<div class="mon-chart-bar" style="height: ${pct}%; background-color: ${barColor}; opacity: ${opacity};"></div>`;
    }).join("");

    containerEl.innerHTML = `<div class="mon-chart-inner">${barsHtml}</div>`;
  }

  function renderProgressBar(containerEl, pct, barColor = "#007aff", heightPx = 12) {
    if (!containerEl) return;
    const clampedPct = Math.min(Math.max(pct, 0), 100);
    containerEl.innerHTML = `
      <div class="mon-progress-track" style="height:${heightPx}px;">
        <div class="mon-progress-fill" style="width:${clampedPct}%; background-color:${barColor};"></div>
      </div>
    `;
  }

  function getMetricColor(pct) {
    if (pct < 50) return "#30d158"; // green
    if (pct <= 80) return "#ff9f0a"; // amber
    return "#ff453a"; // red
  }

  window.monitorGraphs = {
    pushDataPoint,
    renderHistoryBars,
    renderProgressBar,
    getMetricColor
  };
})();

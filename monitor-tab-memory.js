/* === FILE: monitor-tab-memory.js === */
/**
 * WebOS v0.7.1.1 Monitor Tab - Memory
 */
(function () {
  let ramHistory = Array.from({ length: 60 }, () => 1.2 + Math.random() * 0.3);

  function renderMemoryTab(containerEl) {
    containerEl.innerHTML = `
      <div class="mon-tab-page">
        <div class="mon-header-card">
          <div class="mon-header-title">Black U5000 RAM</div>
          <div class="mon-header-sub">8 GB DDR4 @ 5000 MHz • Dual Channel (2×4GB) • 1.2V</div>
        </div>

        <div class="mon-section-card">
          <div class="mon-stat-large">
            <span class="mon-val-num" id="ram-val-num">0.0 GB</span>
            <span class="mon-val-label">Used / 8.0 GB Total</span>
          </div>
          <div id="ram-main-bar"></div>
        </div>

        <div class="mon-section-card">
          <div class="mon-card-title">Memory Composition & Breakdown</div>
          <div class="mon-mem-breakdown">
            <div class="mon-mem-box">
              <div class="mon-mem-lbl">App Memory (Used)</div>
              <div class="mon-mem-val" id="ram-used-val">0.0 GB</div>
            </div>
            <div class="mon-mem-box">
              <div class="mon-mem-lbl">System Cache</div>
              <div class="mon-mem-val" id="ram-cached-val">1.2 GB</div>
            </div>
            <div class="mon-mem-box">
              <div class="mon-mem-lbl">Free Memory</div>
              <div class="mon-mem-val" id="ram-free-val">5.6 GB</div>
            </div>
          </div>
        </div>

        <div class="mon-section-card">
          <div class="mon-card-title">Memory History (60s)</div>
          <div class="mon-chart-container" id="ram-history-chart"></div>
        </div>

        <div class="mon-section-card">
          <div class="mon-card-title">Top Processes by Memory Usage</div>
          <table class="monitor-table mini">
            <thead><tr><th>Name</th><th>PID</th><th>Memory (MB)</th></tr></thead>
            <tbody id="ram-top-procs"></tbody>
          </table>
        </div>
      </div>
    `;
  }

  function updateMemoryTab(containerEl, totals) {
    if (!containerEl) return;
    const { ram } = totals; // in MB
    const ramGB = ram / 1024;
    const ramPct = (ram / 8192) * 100;

    if (window.monitorGraphs) {
      ramHistory = window.monitorGraphs.pushDataPoint(ramHistory, ramGB);
    }

    const valNumEl = containerEl.querySelector("#ram-val-num");
    if (valNumEl) valNumEl.textContent = `${ramGB.toFixed(1)} GB`;

    const mainBarEl = containerEl.querySelector("#ram-main-bar");
    if (mainBarEl && window.monitorGraphs) {
      window.monitorGraphs.renderProgressBar(mainBarEl, ramPct, "#007aff", 14);
    }

    // Breakdown
    const cachedGB = parseFloat((1.1 + (ram % 300) / 1000).toFixed(1));
    const freeGB = Math.max(parseFloat((8.0 - ramGB - cachedGB).toFixed(1)), 0);

    const usedEl = containerEl.querySelector("#ram-used-val");
    if (usedEl) usedEl.textContent = `${ramGB.toFixed(1)} GB`;

    const cachedEl = containerEl.querySelector("#ram-cached-val");
    if (cachedEl) cachedEl.textContent = `${cachedGB} GB`;

    const freeEl = containerEl.querySelector("#ram-free-val");
    if (freeEl) freeEl.textContent = `${freeGB} GB`;

    const chartEl = containerEl.querySelector("#ram-history-chart");
    if (chartEl && window.monitorGraphs) {
      window.monitorGraphs.renderHistoryBars(chartEl, ramHistory, 8.0, "#007aff", true);
    }

    const topProcsEl = containerEl.querySelector("#ram-top-procs");
    if (topProcsEl && window.monitorProcess) {
      const topList = window.monitorProcess.getTopProcesses("ram", 5);
      topProcsEl.innerHTML = topList.map(p => `
        <tr><td><strong>${p.name}</strong></td><td>${p.pid}</td><td>${p.ram} MB</td></tr>
      `).join("");
    }
  }

  window.monitorTabMemory = {
    renderMemoryTab,
    updateMemoryTab
  };
})();

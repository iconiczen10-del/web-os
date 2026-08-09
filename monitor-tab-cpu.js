/* === FILE: monitor-tab-cpu.js === */
/**
 * WebOS v0.7.1.1 Monitor Tab - CPU
 */
(function () {
  let cpuHistory = Array.from({ length: 60 }, () => Math.floor(Math.random() * 15) + 5);

  function renderCPUTab(containerEl) {
    containerEl.innerHTML = `
      <div class="mon-tab-page">
        <div class="mon-header-card">
          <div class="mon-header-title">Cyclone 1st Gen X9</div>
          <div class="mon-header-sub">2.1 GHz Base / 2.7 GHz Boost • 2 Cores / 4 Threads • 14nm FinFET</div>
        </div>

        <div class="mon-section-card">
          <div class="mon-stat-large">
            <span class="mon-val-num" id="cpu-val-num">0%</span>
            <span class="mon-val-label">CPU Utilization</span>
          </div>
          <div id="cpu-main-bar"></div>
        </div>

        <div class="mon-section-card">
          <div class="mon-card-title">CPU Usage History (60s)</div>
          <div class="mon-chart-container" id="cpu-history-chart"></div>
        </div>

        <div class="mon-two-col">
          <div class="mon-section-card">
            <div class="mon-card-title">Per-Core Breakdown</div>
            <div class="mon-core-row">
              <div class="mon-core-label">Core 1 (Physical)</div>
              <div id="cpu-core1-bar"></div>
              <span class="mon-core-val" id="cpu-core1-val">0%</span>
            </div>
            <div class="mon-core-row" style="margin-top: 10px;">
              <div class="mon-core-label">Core 2 (Physical)</div>
              <div id="cpu-core2-bar"></div>
              <span class="mon-core-val" id="cpu-core2-val">0%</span>
            </div>
          </div>

          <div class="mon-section-card">
            <div class="mon-card-title">Top Processes by CPU</div>
            <table class="monitor-table mini">
              <thead><tr><th>Name</th><th>PID</th><th>CPU %</th></tr></thead>
              <tbody id="cpu-top-procs"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function updateCPUTab(containerEl, totals) {
    if (!containerEl) return;
    const { cpu } = totals;

    if (window.monitorGraphs) {
      cpuHistory = window.monitorGraphs.pushDataPoint(cpuHistory, cpu);
    }

    const valNumEl = containerEl.querySelector("#cpu-val-num");
    if (valNumEl) valNumEl.textContent = `${cpu}%`;

    const color = window.monitorGraphs ? window.monitorGraphs.getMetricColor(cpu) : "#007aff";

    const mainBarEl = containerEl.querySelector("#cpu-main-bar");
    if (mainBarEl && window.monitorGraphs) {
      window.monitorGraphs.renderProgressBar(mainBarEl, cpu, color, 14);
    }

    const chartEl = containerEl.querySelector("#cpu-history-chart");
    if (chartEl && window.monitorGraphs) {
      window.monitorGraphs.renderHistoryBars(chartEl, cpuHistory, 100, color, false);
    }

    // Core 1 & 2
    const c1Pct = Math.min(Math.round(cpu * (0.55 + (Math.random() * 0.1 - 0.05))), 100);
    const c2Pct = Math.min(Math.round(cpu * (0.45 + (Math.random() * 0.1 - 0.05))), 100);

    const c1BarEl = containerEl.querySelector("#cpu-core1-bar");
    const c1ValEl = containerEl.querySelector("#cpu-core1-val");
    if (c1BarEl && window.monitorGraphs) {
      window.monitorGraphs.renderProgressBar(c1BarEl, c1Pct, color, 8);
      if (c1ValEl) c1ValEl.textContent = `${c1Pct}%`;
    }

    const c2BarEl = containerEl.querySelector("#cpu-core2-bar");
    const c2ValEl = containerEl.querySelector("#cpu-core2-val");
    if (c2BarEl && window.monitorGraphs) {
      window.monitorGraphs.renderProgressBar(c2BarEl, c2Pct, color, 8);
      if (c2ValEl) c2ValEl.textContent = `${c2Pct}%`;
    }

    // Top 5 processes
    const topProcsEl = containerEl.querySelector("#cpu-top-procs");
    if (topProcsEl && window.monitorProcess) {
      const topList = window.monitorProcess.getTopProcesses("cpu", 5);
      topProcsEl.innerHTML = topList.map(p => `
        <tr><td><strong>${p.name}</strong></td><td>${p.pid}</td><td>${p.cpu}%</td></tr>
      `).join("");
    }
  }

  window.monitorTabCPU = {
    renderCPUTab,
    updateCPUTab
  };
})();

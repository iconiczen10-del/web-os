/* === FILE: monitor-tab-gpu.js === */
/**
 * WebOS v0.7.1.1 Monitor Tab - GPU
 */
(function () {
  let gpuHistory = Array.from({ length: 60 }, () => Math.floor(Math.random() * 10) + 5);

  function renderGPUTab(containerEl) {
    containerEl.innerHTML = `
      <div class="mon-tab-page">
        <div class="mon-header-card">
          <div class="mon-header-title">Star R Pro GPU</div>
          <div class="mon-header-sub">2 GB GDDR5 • Star Kepler Architecture • 640 Cores</div>
        </div>

        <div class="mon-section-card">
          <div class="mon-stat-large">
            <span class="mon-val-num" id="gpu-val-num">0%</span>
            <span class="mon-val-label">GPU Utilization</span>
          </div>
          <div id="gpu-main-bar"></div>
        </div>

        <div class="mon-section-card">
          <div class="mon-card-title">GPU History (60s)</div>
          <div class="mon-chart-container" id="gpu-history-chart"></div>
        </div>

        <div class="mon-two-col">
          <div class="mon-section-card">
            <div class="mon-card-title">Hardware Telemetry</div>
            <div class="mon-telemetry-grid">
              <div class="mon-telemetry-box">
                <div class="mon-tel-label">VRAM Usage</div>
                <div class="mon-tel-val" id="gpu-vram-val">0.3 / 2.0 GB</div>
              </div>
              <div class="mon-telemetry-box">
                <div class="mon-tel-label">GPU Temperature</div>
                <div class="mon-tel-val" id="gpu-temp-val">45°C</div>
              </div>
              <div class="mon-telemetry-box">
                <div class="mon-tel-label">Cooling Fan Speed</div>
                <div class="mon-tel-val" id="gpu-fan-val">1200 RPM</div>
              </div>
            </div>
          </div>

          <div class="mon-section-card">
            <div class="mon-card-title">Top Processes by GPU & VRAM</div>
            <table class="monitor-table mini">
              <thead><tr><th>Name</th><th>PID</th><th>GPU %</th><th>VRAM</th></tr></thead>
              <tbody id="gpu-top-procs"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function updateGPUTab(containerEl, totals) {
    if (!containerEl) return;
    const { gpu, vramGB } = totals;

    if (window.monitorGraphs) {
      gpuHistory = window.monitorGraphs.pushDataPoint(gpuHistory, gpu);
    }

    const valNumEl = containerEl.querySelector("#gpu-val-num");
    if (valNumEl) valNumEl.textContent = `${gpu}%`;

    const mainBarEl = containerEl.querySelector("#gpu-main-bar");
    if (mainBarEl && window.monitorGraphs) {
      window.monitorGraphs.renderProgressBar(mainBarEl, gpu, "#af52de", 14);
    }

    const chartEl = containerEl.querySelector("#gpu-history-chart");
    if (chartEl && window.monitorGraphs) {
      window.monitorGraphs.renderHistoryBars(chartEl, gpuHistory, 100, "#af52de", true);
    }

    // VRAM, Temp, Fan
    const tempC = Math.round(45 + (gpu * 0.3));
    const fanRPM = Math.round(1200 + ((tempC - 45) * 58));

    const vramEl = containerEl.querySelector("#gpu-vram-val");
    if (vramEl) vramEl.textContent = `${vramGB} / 2.0 GB`;

    const tempEl = containerEl.querySelector("#gpu-temp-val");
    if (tempEl) tempEl.textContent = `${tempC}°C`;

    const fanEl = containerEl.querySelector("#gpu-fan-val");
    if (fanEl) fanEl.textContent = `${fanRPM} RPM`;

    const topProcsEl = containerEl.querySelector("#gpu-top-procs");
    if (topProcsEl && window.monitorProcess) {
      const topList = window.monitorProcess.getTopProcesses("gpu", 5);
      topProcsEl.innerHTML = topList.map(p => `
        <tr><td><strong>${p.name}</strong></td><td>${p.pid}</td><td>${p.gpu}%</td><td>${p.vram || 0} MB</td></tr>
      `).join("");
    }
  }

  window.monitorTabGPU = {
    renderGPUTab,
    updateGPUTab
  };
})();

/* === FILE: monitor-tab-overview.js === */
/**
 * WebOS v0.7.1.1 Monitor Tab - Overview
 */
(function () {
  function renderOverviewTab(containerEl) {
    containerEl.innerHTML = `
      <div class="mon-overview-wrap">
        <div class="monitor-stats">
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Cyclone X9 (CPU)</div>
            <div class="monitor-stat-value" id="ov-cpu">0%</div>
            <div class="monitor-stat-sub">2C/4T @ 2.7 GHz</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Black U5000 (RAM)</div>
            <div class="monitor-stat-value" id="ov-ram">0.0 GB</div>
            <div class="monitor-stat-sub" id="ov-ram-sub">DDR4 @ 5000 MHz</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Star R Pro (GPU)</div>
            <div class="monitor-stat-value" id="ov-gpu">0%</div>
            <div class="monitor-stat-sub">2GB GDDR5</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Bolt NV-256 (SSD)</div>
            <div class="monitor-stat-value" id="ov-storage">89 GB</div>
            <div class="monitor-stat-sub">256 GB NVMe</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">BoltLink Wi-Fi 5</div>
            <div class="monitor-stat-value" id="ov-net">Online</div>
            <div class="monitor-stat-sub">Bluetooth 4.2</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">System Uptime</div>
            <div class="monitor-stat-value" id="ov-uptime">00:00:00</div>
            <div class="monitor-stat-sub">WebOS v0.7.1.1.A</div>
          </div>
        </div>

        <div class="monitor-table-section">
          <div class="mon-table-header">
            <div class="monitor-table-title">Active Processes</div>
            <button class="mon-btn-danger" id="mon-end-all-btn">End All Processes</button>
          </div>
          <table class="monitor-table">
            <thead>
              <tr><th>Process Name</th><th>PID</th><th>CPU %</th><th>Memory</th><th>GPU %</th></tr>
            </thead>
            <tbody id="ov-process-rows"></tbody>
          </table>
        </div>
      </div>
    `;

    if (window.monitorOverviewActions) {
      window.monitorOverviewActions.bindOverviewEvents(containerEl);
    }
  }

  function updateOverviewTab(containerEl, totals) {
    if (!containerEl) return;
    const { cpu, ram, gpu, procs } = totals;

    const cpuEl = containerEl.querySelector("#ov-cpu");
    if (cpuEl) cpuEl.textContent = `${cpu}%`;

    const ramEl = containerEl.querySelector("#ov-ram");
    if (ramEl) ramEl.textContent = `${(ram / 1024).toFixed(1)} GB`;

    const gpuEl = containerEl.querySelector("#ov-gpu");
    if (gpuEl) gpuEl.textContent = `${gpu}%`;

    const uptimeEl = containerEl.querySelector("#ov-uptime");
    if (uptimeEl && window.monitorSystem) {
      uptimeEl.textContent = window.monitorSystem.getUptime().formatted;
    }

    const rowsEl = containerEl.querySelector("#ov-process-rows");
    if (rowsEl) {
      const activeDetails = new Set(
        Array.from(rowsEl.querySelectorAll(".mon-detail-row"))
          .map(r => r.getAttribute("data-pid"))
      );

      rowsEl.innerHTML = procs.map((p) => {
        let rowClass = "";
        if (p.cpu >= 80) rowClass = "row-danger";
        else if (p.cpu >= 60) rowClass = "row-warning";

        const hasDetail = activeDetails.has(String(p.pid));
        const runningSecs = Math.floor((Date.now() - p.startTime) / 1000);

        let rowHtml = `
          <tr class="mon-proc-row ${rowClass}" data-pid="${p.pid}">
            <td><strong>${p.name}</strong></td>
            <td>${p.pid}</td>
            <td>${p.cpu}%</td>
            <td>${p.ram} MB</td>
            <td>${p.gpu}%</td>
          </tr>
        `;

        if (hasDetail) {
          rowHtml += `
            <tr class="mon-detail-row" data-pid="${p.pid}">
              <td colspan="5">
                <div class="mon-detail-panel">
                  <div><strong>Process:</strong> ${p.name} (${p.appName})</div>
                  <div><strong>PID:</strong> ${p.pid} | <strong>Threads:</strong> ${Math.floor((p.pid % 5) + 2)}</div>
                  <div><strong>Uptime:</strong> ${runningSecs}s | <strong>RAM:</strong> ${p.ram} MB</div>
                  <div><button class="mon-btn-small mon-btn-close-detail" data-pid="${p.pid}">Close Details</button></div>
                </div>
              </td>
            </tr>
          `;
        }
        return rowHtml;
      }).join("");
    }
  }

  window.monitorTabOverview = {
    renderOverviewTab,
    updateOverviewTab
  };
})();

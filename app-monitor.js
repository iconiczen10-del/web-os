/* === FILE: app-monitor.js === */
/**
 * WebOS v0.6.4 System Monitor Application
 * Renders live CPU chart, custom hardware stats, and active process monitor.
 */
(function () {
  let pidCounter = 1010;
  const windowPidMap = new Map();

  function getWindowPID(winEl) {
    if (!windowPidMap.has(winEl)) {
      pidCounter += Math.floor(Math.random() * 5) + 1;
      windowPidMap.set(winEl, pidCounter);
    }
    return windowPidMap.get(winEl);
  }

  window.initMonitor = function (windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.innerHTML = `
      <div class="monitor-container">
        <div class="monitor-stats">
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Cyclone X9 (CPU)</div>
            <div class="monitor-stat-value" id="mon-stat-cpu">0%</div>
            <div class="monitor-stat-sub">2C/4T @ 2.7 GHz</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Black U5000 (RAM)</div>
            <div class="monitor-stat-value" id="mon-stat-ram">0.0 GB</div>
            <div class="monitor-stat-sub" id="mon-stat-ram-sub">DDR4 @ 5000 MHz</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Star R Pro (GPU)</div>
            <div class="monitor-stat-value" id="mon-stat-gpu">2 GB</div>
            <div class="monitor-stat-sub" id="mon-stat-gpu-sub">GDDR5 (Star Kepler)</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">Bolt NV-256 (SSD)</div>
            <div class="monitor-stat-value" id="mon-stat-storage">89 GB</div>
            <div class="monitor-stat-sub" id="mon-stat-storage-sub">NVMe M.2 SSD</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">BoltLink Wi-Fi 5</div>
            <div class="monitor-stat-value" id="mon-stat-net">Online</div>
            <div class="monitor-stat-sub">Bluetooth 4.2</div>
          </div>
          <div class="monitor-stat-card">
            <div class="monitor-stat-label">System Uptime</div>
            <div class="monitor-stat-value" id="mon-stat-uptime">00:00:00</div>
            <div class="monitor-stat-sub">WebOS v0.6.4</div>
          </div>
        </div>

        <div class="monitor-chart-section">
          <div class="monitor-chart-title">Cyclone 1st Gen X9 — CPU History</div>
          <div class="monitor-chart-bars" id="mon-chart-bars"></div>
        </div>

        <div class="monitor-table-section">
          <div class="monitor-table-title">Active Processes</div>
          <table class="monitor-table">
            <thead>
              <tr><th>Process Name</th><th>PID</th><th>CPU %</th><th>Memory</th></tr>
            </thead>
            <tbody id="mon-process-rows"></tbody>
          </table>
        </div>
      </div>
    `;

    function refresh() {
      // 1. CPU
      const cpuVal = window.monitorCPU ? window.monitorCPU.getCPUUsage() : 12;
      const cpuEl = contentEl.querySelector("#mon-stat-cpu");
      if (cpuEl) cpuEl.textContent = `${cpuVal}%`;

      // 2. RAM
      if (window.monitorMemory) {
        const ram = window.monitorMemory.getRAMUsage();
        const ramEl = contentEl.querySelector("#mon-stat-ram");
        const ramSubEl = contentEl.querySelector("#mon-stat-ram-sub");
        if (ramEl) ramEl.textContent = ram.usedStr;
        if (ramSubEl) ramSubEl.textContent = `${ram.formatted} (DDR4)`;
      }

      // 3. Storage
      if (window.monitorSystem) {
        window.monitorSystem.getStorageInfo((info) => {
          const storageEl = contentEl.querySelector("#mon-stat-storage");
          if (storageEl && info) storageEl.textContent = info.short || "89 GB / 256 GB";
        });
      }

      // 4. CPU Chart
      const barsEl = contentEl.querySelector("#mon-chart-bars");
      if (barsEl && window.monitorCPU) {
        const history = window.monitorCPU.getCPUHistory();
        barsEl.innerHTML = history.map((val) => {
          const color = window.monitorCPU.getCPUColor(val);
          return `<div class="monitor-bar" style="height: ${Math.max(val, 6)}%; background: ${color};"></div>`;
        }).join("");
      }

      // 5. Processes
      const rowsEl = contentEl.querySelector("#mon-process-rows");
      if (rowsEl) {
        const windows = Array.from(document.querySelectorAll(".window-container"));
        rowsEl.innerHTML = windows.map((win) => {
          const name = win.getAttribute("data-app") || "process";
          const pid = getWindowPID(win);
          const cpu = window.monitorCPU ? window.monitorCPU.getProcessCPU(name + pid) : 2.5;
          const mem = window.monitorMemory ? window.monitorMemory.getProcessMemory(name + pid) : "85 MB";
          return `<tr><td><strong>${name.charAt(0).toUpperCase() + name.slice(1)}</strong></td><td>${pid}</td><td>${cpu}%</td><td>${mem}</td></tr>`;
        }).join("");
      }
    }

    function refreshUptime() {
      if (window.monitorSystem) {
        const uptime = window.monitorSystem.getUptime();
        const uptimeEl = contentEl.querySelector("#mon-stat-uptime");
        if (uptimeEl) uptimeEl.textContent = uptime.formatted;
      }
    }

    refresh();
    refreshUptime();

    if (windowEl._monitorInterval) clearInterval(windowEl._monitorInterval);
    windowEl._monitorInterval = setInterval(() => {
      refresh();
      refreshUptime();
    }, 500);
  };
})();


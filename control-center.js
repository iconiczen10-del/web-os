/* === FILE: control-center.js === */
/**
 * WebOS v0.9.1 iOS-Style Control Center Panel
 * Manages quick toggles, sliders, and real-time live system stats monitoring.
 */
(function () {
  let panelEl = null;
  let isOpen = false;
  let statsTimer = null;

  function createPanel() {
    if (panelEl) return panelEl;
    panelEl = document.createElement("div");
    panelEl.id = "control-center-panel";
    panelEl.className = "ios-panel cc-panel";
    document.body.appendChild(panelEl);
    return panelEl;
  }

  function getSystemMetrics() {
    let cpu = 22;
    if (window.monitorCpu && typeof window.monitorCpu.getCurrentUsage === "function") {
      cpu = window.monitorCpu.getCurrentUsage();
    } else {
      cpu = Math.floor(18 + Math.random() * 10);
    }

    let ramUsed = 4.2;
    let ramTotal = 16;
    if (window.monitorMemory && typeof window.monitorMemory.getCurrentUsage === "function") {
      const mem = window.monitorMemory.getCurrentUsage();
      if (mem && mem.usedGB) ramUsed = mem.usedGB;
    }

    let gpu = window._gameModeEnabled ? Math.floor(68 + Math.random() * 15) : Math.floor(16 + Math.random() * 8);
    if (window._gpuDisabled) gpu = 0;

    return {
      cpu: Math.min(100, Math.round(cpu)),
      ramUsed: ramUsed.toFixed(1),
      ramTotal,
      ramPct: Math.min(100, Math.round((ramUsed / ramTotal) * 100)),
      gpu: Math.min(100, Math.round(gpu))
    };
  }

  function renderStats(container) {
    if (!container) return;
    const m = getSystemMetrics();

    container.innerHTML = `
      <div class="cc-stats-box">
        <div class="cc-stats-title">📊 SYSTEM RESOURCE MONITOR</div>
        <div class="cc-stat-row">
          <div class="cc-stat-lbl"><span>CPU Load</span><strong>${m.cpu}%</strong></div>
          <div class="cc-stat-bar"><div class="cc-stat-fill cpu" style="width: ${m.cpu}%;"></div></div>
        </div>
        <div class="cc-stat-row">
          <div class="cc-stat-lbl"><span>RAM Allocated</span><strong>${m.ramUsed} GB / ${m.ramTotal} GB</strong></div>
          <div class="cc-stat-bar"><div class="cc-stat-fill ram" style="width: ${m.ramPct}%;"></div></div>
        </div>
        <div class="cc-stat-row">
          <div class="cc-stat-lbl"><span>GPU Raster</span><strong>${m.gpu}% ${window._gameModeEnabled ? '(BOOST)' : ''}</strong></div>
          <div class="cc-stat-bar"><div class="cc-stat-fill gpu" style="width: ${m.gpu}%;"></div></div>
        </div>
      </div>
    `;
  }

  function render() {
    if (!panelEl) return;
    panelEl.innerHTML = `
      <div class="cc-header">
        <div class="cc-title"><span class="cc-icon">🎛️</span> CONTROL CENTER</div>
      </div>
      <div class="cc-section" id="cc-toggles-container"></div>
      <div class="cc-section" id="cc-sliders-container"></div>
      <div class="cc-section" id="cc-stats-container"></div>
    `;

    const togglesBox = panelEl.querySelector("#cc-toggles-container");
    if (togglesBox && window.controlToggles) {
      window.controlToggles.renderToggles(togglesBox, () => render());
    }

    const slidersBox = panelEl.querySelector("#cc-sliders-container");
    if (slidersBox && window.controlSliders) {
      window.controlSliders.renderSliders(slidersBox);
    }

    const statsBox = panelEl.querySelector("#cc-stats-container");
    if (statsBox) {
      renderStats(statsBox);
    }
  }

  function openControlCenter() {
    if (window.closeNotificationCenter) window.closeNotificationCenter();
    createPanel();
    render();
    panelEl.classList.add("open");
    isOpen = true;

    if (statsTimer) clearInterval(statsTimer);
    statsTimer = setInterval(() => {
      if (isOpen && panelEl) {
        const statsBox = panelEl.querySelector("#cc-stats-container");
        if (statsBox) renderStats(statsBox);
      }
    }, 1000);
  }

  function closeControlCenter() {
    if (panelEl) panelEl.classList.remove("open");
    isOpen = false;
    if (statsTimer) clearInterval(statsTimer);
  }

  function toggleControlCenter() {
    if (isOpen) closeControlCenter();
    else openControlCenter();
  }

  document.addEventListener("click", (e) => {
    if (!isOpen) return;
    if (panelEl && !panelEl.contains(e.target) && !e.target.closest("#topbar-controls-trigger") && !e.target.closest(".topbar-controls-trigger")) {
      closeControlCenter();
    }
  });

  window.openControlCenter = openControlCenter;
  window.closeControlCenter = closeControlCenter;
  window.toggleControlCenter = toggleControlCenter;
  window.controlCenter = { open: openControlCenter, close: closeControlCenter, toggle: toggleControlCenter };
})();

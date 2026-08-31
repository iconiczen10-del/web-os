/* === FILE: vt-optimizer.js === */
/**
 * WebOS v0.9.2 VT-Optimizer Dropdown Panel & Scan Orchestration
 */
(function () {
  let isOptimized = false;
  let isScanning = false;
  let dropdownEl = null;

  function getCanvas() {
    return document.getElementById("topbar-vt-canvas");
  }

  function initIcon() {
    const canvas = getCanvas();
    if (canvas && window.vtIcon) {
      window.vtIcon.drawVTIcon(canvas, isOptimized ? "optimized" : "idle");
    }
  }

  function toggleDropdown() {
    if (dropdownEl && dropdownEl.classList.contains("open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function openDropdown() {
    if (!dropdownEl) createDropdown();
    renderDropdownContent();
    dropdownEl.classList.add("open");
    setTimeout(() => { document.addEventListener("click", onDocClick); }, 10);
  }

  function closeDropdown() {
    if (dropdownEl) dropdownEl.classList.remove("open");
    document.removeEventListener("click", onDocClick);
  }

  function onDocClick(e) {
    if (dropdownEl && !dropdownEl.contains(e.target) && !e.target.closest("#topbar-vt-container")) {
      closeDropdown();
    }
  }

  function createDropdown() {
    dropdownEl = document.createElement("div");
    dropdownEl.id = "vt-optimizer-dropdown";
    dropdownEl.className = "vt-dropdown-panel";
    document.body.appendChild(dropdownEl);
  }

  function renderDropdownContent(scanProgress = null, comparisonData = null) {
    if (!dropdownEl || !window.vtOptimizerRender) return;

    let bodyHTML = "";
    if (isScanning && scanProgress !== null) {
      bodyHTML = window.vtOptimizerRender.getScanningHTML(scanProgress);
    } else if (comparisonData) {
      bodyHTML = window.vtOptimizerRender.getComparisonHTML(comparisonData);
    } else if (isOptimized) {
      bodyHTML = window.vtOptimizerRender.getActiveHTML();
    } else {
      bodyHTML = window.vtOptimizerRender.getIdleHTML();
    }

    dropdownEl.innerHTML = window.vtOptimizerRender.getPanelHTML(bodyHTML, isScanning, isOptimized);

    const closeBtn = dropdownEl.querySelector("#vt-close-btn");
    if (closeBtn) closeBtn.onclick = closeDropdown;

    const optBtn = dropdownEl.querySelector("#vt-opt-button");
    if (optBtn && !isScanning) optBtn.onclick = runOptimization;
  }

  function runOptimization() {
    if (isScanning) return;
    isScanning = true;
    const canvas = getCanvas();
    if (window.vtIcon && canvas) window.vtIcon.startScanningPulse(canvas);

    const apps = [
      { name: "Video Editor", before: 20, now: 15 },
      { name: "Game Center", before: 15, now: 10 },
      { name: "Browser", before: 8, now: 3 },
      { name: "AI Chat", before: 5, now: 0 },
      { name: "Music Player", before: 4, now: 0 }
    ];

    let step = 0;
    const totalSteps = 10;
    const interval = setInterval(() => {
      step++;
      const current = Math.min(Math.round((step / totalSteps) * 17), 17);
      const percent = Math.round((step / totalSteps) * 100);
      renderDropdownContent({ current, total: 17, percent });

      if (step >= totalSteps) {
        clearInterval(interval);
        isScanning = false;
        isOptimized = true;

        if (window.vtIcon && canvas) {
          window.vtIcon.stopScanningPulse();
          window.vtIcon.drawVTIcon(canvas, "optimized");
        }
        if (window.updateEffects) {
          window.updateEffects.setCPUOptimized(true);
        }
        if (window.notificationBus) {
          window.notificationBus.notify("VT-Optimizer", "CPU optimization active (-5% across all apps)", "⚡", "VT-Optimizer", "monitor");
        }
        renderDropdownContent(null, { items: apps, totalBefore: 52, totalNow: 32, saved: 20 });
      }
    }, 200);
  }

  window.vtOptimizer = {
    initIcon,
    toggleDropdown,
    openDropdown,
    closeDropdown,
    runOptimization
  };
})();

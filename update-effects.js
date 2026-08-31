/* === FILE: update-effects.js === */
/**
 * WebOS v0.9.2 Real Update Effects Engine
 * Connects installed system updates to process monitor and hardware metrics.
 */
(function () {
  let cpuOptimized = false;

  function isCPUOptimized() {
    return cpuOptimized;
  }

  function setCPUOptimized(state) {
    cpuOptimized = !!state;
    if (window.monitorProcess && typeof window.monitorProcess.setCPUOptimized === "function") {
      window.monitorProcess.setCPUOptimized(cpuOptimized);
    }
  }

  function applyVT23x() {
    if (window.topbarManager && typeof window.topbarManager.showVTIcon === "function") {
      window.topbarManager.showVTIcon();
    }
    if (window.vtOptimizer && typeof window.vtOptimizer.initIcon === "function") {
      window.vtOptimizer.initIcon();
    }
  }

  window.updateEffects = {
    isCPUOptimized,
    setCPUOptimized,
    applyVT23x
  };
})();

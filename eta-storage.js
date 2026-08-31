/* === FILE: eta-storage.js === */
/**
 * WebOS v0.10.0 ETA Storage Check Module
 * Validates available disk space before initiating download.
 */
(function () {
  function checkStorage(sizeMB) {
    const fs = window.webosFS;
    const requiredMB = Number(sizeMB) || 0;
    const freeMB = fs && typeof fs.getFreeSpaceMB === "function" ? fs.getFreeSpaceMB() : 30000;
    const passed = freeMB >= requiredMB;

    return {
      passed,
      requiredMB,
      freeMB,
      status: passed ? "pass" : "fail",
      icon: passed ? "✅" : "❌",
      message: passed
        ? `Free: ${(freeMB / 1024).toFixed(1)} GB (Needs ${(requiredMB / 1024).toFixed(2)} GB)`
        : `Insufficient Space: ${(freeMB / 1024).toFixed(1)} GB available, ${(requiredMB / 1024).toFixed(2)} GB needed`
    };
  }

  window.etaStorage = { checkStorage };
})();

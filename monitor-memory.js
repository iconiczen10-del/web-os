/* === FILE: monitor-memory.js === */
/**
 * WebOS v0.7.2.2 System Monitor - Memory Management & Black U5000 Specs
 */
(function () {
  function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  function getRAMInfo() {
    return {
      brand: "Black",
      model: "U5000",
      speed: "5000 MHz",
      totalGB: 8,
      type: "DDR4",
      configuration: "2×4GB Dual Channel",
      formatted: "Black U5000 — 8GB DDR4 @ 5000 MHz"
    };
  }

  function getRAMUsage() {
    const totalMB = 8192; // 8 GB
    let usedMB = 3500; // default idle

    if (performance && performance.memory) {
      const heapUsedMB = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
      usedMB = Math.min(1500 + heapUsedMB * 2, totalMB - 500);
    } else {
      const windowCount = document.querySelectorAll(".window-container").length;
      usedMB = 1500 + (windowCount * 180) + Math.floor(Math.random() * 30);
    }

    const usedGBStr = (usedMB / 1024).toFixed(1) + " GB";
    const totalGBStr = "8 GB";

    return {
      usedMB,
      totalMB,
      usedStr: usedGBStr,
      totalStr: totalGBStr,
      formatted: `${usedGBStr} / ${totalGBStr}`,
      percent: Math.round((usedMB / totalMB) * 100)
    };
  }

  function getProcessMemory(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const base = Math.abs(hash % 120) + 30;
    const jitter = Math.floor(Math.random() * 12);
    return `${base + jitter} MB`;
  }

  window.monitorMemory = {
    formatBytes,
    getRAMInfo,
    getRAMUsage,
    getProcessMemory
  };
})();


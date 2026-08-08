/* === FILE: monitor-cpu.js === */
/**
 * WebOS v0.6.4 System Monitor - CPU Logic & Hardware Info
 */
(function () {
  const HISTORY_LIMIT = 20;
  let cpuHistory = Array.from({ length: HISTORY_LIMIT }, () => Math.floor(Math.random() * 25) + 10);
  let lastCpu = cpuHistory[cpuHistory.length - 1];

  function getCPUInfo() {
    return {
      name: "Cyclone 1st Gen X9",
      shortName: "Cyclone X9",
      cores: "2C/4T",
      baseClock: "2.1 GHz",
      boostClock: "2.7 GHz",
      formatted: "Cyclone 1st Gen X9 (2C/4T) @ 2.7 GHz"
    };
  }

  function getCPUUsage() {
    const delta = (Math.random() * 20) - 10;
    lastCpu = Math.min(Math.max(Math.round(lastCpu + delta), 5), 95);
    cpuHistory.push(lastCpu);
    if (cpuHistory.length > HISTORY_LIMIT) {
      cpuHistory.shift();
    }
    return lastCpu;
  }

  function getCPUHistory() {
    return cpuHistory;
  }

  function getCPUColor(value) {
    if (value < 50) return "#30d158";
    if (value <= 80) return "#ff9f0a";
    return "#ff453a";
  }

  function getProcessCPU(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const base = Math.abs(hash % 100) / 10;
    const jitter = Math.random() * 3;
    return parseFloat((base + jitter + 0.5).toFixed(1));
  }

  window.monitorCPU = {
    getCPUInfo,
    getCPUUsage,
    getCPUHistory,
    getCPUColor,
    getProcessCPU
  };
})();


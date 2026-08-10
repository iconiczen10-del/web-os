/* === FILE: monitor-process.js === */
/**
 * WebOS v0.7.1.1 Monitor Process Tracking & Resource Table
 */
(function () {
  const APP_RESOURCES = {
    finder: { cpu: [1, 3], ram: [45, 65], gpu: [2, 5] },
    notes: { cpu: [0.5, 2], ram: [25, 40], gpu: [1, 2] },
    calculator: { cpu: [0.5, 1], ram: [20, 30], gpu: [1, 2] },
    settings: { cpu: [1, 2], ram: [35, 50], gpu: [2, 4] },
    monitor: { cpu: [3, 5], ram: [40, 55], gpu: [5, 8] },
    store: { cpu: [2, 4], ram: [55, 80], gpu: [5, 10] },
    browser: { cpu: [3, 8], ram: [80, 150], gpu: [8, 15] },
    weather: { cpu: [1, 2], ram: [30, 45], gpu: [2, 3] },
    terminal: { cpu: [0.5, 1], ram: [15, 25], gpu: [1, 2] },
    music: { cpu: [2, 4], ram: [50, 70], gpu: [4, 6] },
    paint: { cpu: [3, 6], ram: [60, 90], gpu: [8, 12] },
    clock: { cpu: [0.5, 1], ram: [20, 30], gpu: [2, 3] },
    calendar: { cpu: [1, 2], ram: [35, 50], gpu: [3, 5] },
    gamecenter: { cpu: [8, 15], ram: [150, 250], gpu: [15, 25] },
    videoeditor: { cpu: [10, 20], ram: [200, 350], gpu: [20, 35] },
    wallpapers: { cpu: [2, 5], ram: [60, 100], gpu: [8, 12] },
    aichat: { cpu: [2, 5], ram: [50, 85], gpu: [3, 6] }
  };

  const winMetaMap = new WeakMap();
  let globalPidCounter = 1000;

  function getProcessMeta(winEl) {
    if (!winMetaMap.has(winEl)) {
      globalPidCounter += Math.floor(Math.random() * 3) + 1;
      winMetaMap.set(winEl, {
        pid: globalPidCounter,
        startTime: Date.now()
      });
    }
    return winMetaMap.get(winEl);
  }

  function getAppUsage(appName) {
    const key = (appName || "").toLowerCase();
    const config = APP_RESOURCES[key] || { cpu: [1, 3], ram: [35, 50], gpu: [2, 5] };
    const rand = (min, max) => min + Math.random() * (max - min);
    return {
      cpu: parseFloat((rand(config.cpu[0], config.cpu[1])).toFixed(1)),
      ram: Math.round(rand(config.ram[0], config.ram[1])),
      gpu: parseFloat((rand(config.gpu[0], config.gpu[1])).toFixed(1))
    };
  }

  function getProcessList() {
    const windows = Array.from(document.querySelectorAll(".window-container"));
    return windows.map((windowEl) => {
      const rawName = windowEl.getAttribute("data-app") || "process";
      const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      const meta = getProcessMeta(windowEl);
      const usage = getAppUsage(rawName);
      return {
        name,
        appName: rawName,
        pid: meta.pid,
        cpu: usage.cpu,
        ram: usage.ram,
        gpu: usage.gpu,
        windowEl,
        startTime: meta.startTime
      };
    });
  }

  function getTotals() {
    const procs = getProcessList();
    let cpu = 3.0; // base idle
    let ram = 1200; // base idle 1.2 GB
    let gpu = 5.0; // base idle

    procs.forEach((p) => {
      cpu += p.cpu;
      ram += p.ram;
      gpu += p.gpu;
    });

    cpu = Math.min(Math.round(cpu * 10) / 10, 100);
    ram = Math.min(ram, 8192);
    gpu = Math.min(Math.round(gpu * 10) / 10, 100);
    const vramGB = Math.min(parseFloat((0.3 + (gpu * 0.05 / 100) * 1.7).toFixed(2)), 2.0);

    return { cpu, ram, gpu, vramGB, procs };
  }

  function getTopProcesses(metric, count = 5) {
    const procs = getProcessList();
    return procs.sort((a, b) => b[metric] - a[metric]).slice(0, count);
  }

  window.monitorProcess = {
    getProcessList,
    getTotals,
    getTopProcesses,
    getAppUsage
  };
})();

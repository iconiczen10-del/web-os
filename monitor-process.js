/* === FILE: monitor-process.js === */
/**
 * WebOS v0.7.2.2 Monitor Process Tracking & Resource Table
 */
(function () {
  const APP_RESOURCES = {
    finder: { cpu: [1, 3], ram: [70, 120], gpu: [2, 5], vram: [30, 60] },
    notes: { cpu: [0.5, 2], ram: [40, 80], gpu: [1, 2], vram: [20, 40] },
    calculator: { cpu: [0.5, 1], ram: [30, 50], gpu: [1, 2], vram: [10, 25] },
    settings: { cpu: [1, 2], ram: [60, 100], gpu: [2, 4], vram: [30, 60] },
    monitor: { cpu: [3, 5], ram: [80, 120], gpu: [5, 8], vram: [50, 100] },
    store: { cpu: [2, 4], ram: [100, 180], gpu: [5, 10], vram: [60, 120] },
    browser: { cpu: [3, 8], ram: [200, 400], gpu: [8, 15], vram: [120, 250] },
    weather: { cpu: [1, 2], ram: [50, 90], gpu: [2, 3], vram: [25, 50] },
    terminal: { cpu: [0.5, 1], ram: [25, 45], gpu: [1, 2], vram: [15, 30] },
    music: { cpu: [2, 4], ram: [80, 150], gpu: [4, 6], vram: [40, 90] },
    paint: { cpu: [3, 6], ram: [100, 200], gpu: [8, 12], vram: [80, 160] },
    clock: { cpu: [0.5, 1], ram: [30, 60], gpu: [2, 3], vram: [15, 35] },
    calendar: { cpu: [1, 2], ram: [60, 100], gpu: [3, 5], vram: [30, 60] },
    gamecenter: { cpu: [8, 15], ram: [350, 550], gpu: [15, 25], vram: [250, 450] },
    videoeditor: { cpu: [10, 20], ram: [450, 750], gpu: [20, 35], vram: [350, 600] },
    wallpapers: { cpu: [2, 5], ram: [120, 250], gpu: [8, 12], vram: [90, 180] },
    aichat: { cpu: [25, 30], ram: [400, 700], gpu: [10, 15], vram: [200, 300] }
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
    const config = APP_RESOURCES[key] || { cpu: [1, 3], ram: [60, 100], gpu: [2, 5], vram: [30, 60] };
    const rand = (min, max) => min + Math.random() * (max - min);
    return {
      cpu: parseFloat((rand(config.cpu[0], config.cpu[1])).toFixed(1)),
      ram: Math.round(rand(config.ram[0], config.ram[1])),
      gpu: parseFloat((rand(config.gpu[0], config.gpu[1])).toFixed(1)),
      vram: config.vram ? Math.round(rand(config.vram[0], config.vram[1])) : Math.round(rand(30, 60))
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
        vram: usage.vram,
        windowEl,
        startTime: meta.startTime
      };
    });
  }

  function getTotals() {
    const procs = getProcessList();
    let cpu = 3.0; // base idle
    let ram = 1500; // base idle 1.5 GB
    let gpu = 5.0; // base idle
    let vramMB = 300; // base idle 300 MB

    procs.forEach((p) => {
      cpu += p.cpu;
      ram += p.ram;
      gpu += p.gpu;
      if (p.vram) vramMB += p.vram;
    });

    cpu = Math.min(Math.round(cpu * 10) / 10, 100);
    ram = Math.min(ram, 8192);
    gpu = Math.min(Math.round(gpu * 10) / 10, 100);
    const vramGB = Math.min(parseFloat((vramMB / 1024).toFixed(2)), 2.0);

    return { cpu, ram, gpu, vramGB, vramMB, procs };
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

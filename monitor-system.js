/* === FILE: monitor-system.js === */
/**
 * WebOS v0.6.5 System Monitor - GPU, Storage, Network & Uptime Hardware Specs
 */
(function () {
  const startTime = Date.now();
  let cachedWebGL = null;

  function getWebGLRenderer() {
    if (cachedWebGL) return cachedWebGL;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          cachedWebGL = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        } else {
          cachedWebGL = gl.getParameter(gl.RENDERER);
        }
      }
    } catch (e) {
      cachedWebGL = "WebGL Accelerated";
    }
    if (!cachedWebGL) cachedWebGL = "WebGL Hardware Renderer";
    return cachedWebGL;
  }

  function getGPUInfo() {
    const webgl = getWebGLRenderer();
    return {
      name: "Star R Pro",
      vram: "2GB GDDR5",
      architecture: "Star Kepler",
      streamProcessors: "640",
      renderer: webgl,
      formatted: "Star R Pro — 2GB GDDR5",
      toString: function () { return "Star R Pro"; }
    };
  }

  function getStorageInfo(callback) {
    let usedGB = "89.0";
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((estimate) => {
        const estGB = (estimate.usage / (1024 * 1024 * 1024)).toFixed(1);
        if (parseFloat(estGB) > 0) usedGB = estGB;
        const res = {
          brand: "Bolt",
          model: "NV-256",
          type: "NVMe M.2 SSD",
          totalGB: 256,
          readSpeed: "3,500 MB/s",
          writeSpeed: "2,400 MB/s",
          usedGB: usedGB,
          formatted: `${usedGB} GB / 256 GB (Bolt NV-256)`,
          short: `${usedGB} GB / 256 GB`
        };
        if (callback) callback(res);
      }).catch(() => {
        const res = {
          brand: "Bolt",
          model: "NV-256",
          type: "NVMe M.2 SSD",
          totalGB: 256,
          readSpeed: "3,500 MB/s",
          writeSpeed: "2,400 MB/s",
          usedGB: "89.0",
          formatted: "89 GB / 256 GB (Bolt NV-256)",
          short: "89 GB / 256 GB"
        };
        if (callback) callback(res);
      });
      return { formatted: "89 GB / 256 GB (Bolt NV-256)", short: "89 GB / 256 GB" };
    }

    const res = {
      brand: "Bolt",
      model: "NV-256",
      type: "NVMe M.2 SSD",
      totalGB: 256,
      readSpeed: "3,500 MB/s",
      writeSpeed: "2,400 MB/s",
      usedGB: "89.0",
      formatted: "89 GB / 256 GB (Bolt NV-256)",
      short: "89 GB / 256 GB"
    };
    if (callback) callback(res);
    return res;
  }

  function getNetworkInfo() {
    return {
      name: "BoltLink Wi-Fi 5",
      type: "Wi-Fi 5",
      bluetooth: "4.2",
      speed: "Online",
      formatted: "BoltLink Wi-Fi 5 + Bluetooth 4.2"
    };
  }

  function getUptime() {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(elapsedSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((elapsedSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
    return { hours, minutes, seconds, formatted: `${hours}:${minutes}:${seconds}` };
  }

  function getDisplayInfo() {
    const width = screen.width;
    const height = screen.height;
    return {
      name: "WebOS Retina",
      resolution: `${width}×${height}`,
      ppi: 220,
      formatted: `15.6" WebOS Retina — ${width}×${height} @ 220 PPI`
    };
  }

  window.monitorSystem = {
    getGPUInfo,
    getStorageInfo,
    getNetworkInfo,
    getUptime,
    getDisplayInfo
  };
})();


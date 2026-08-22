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
    if (window.storageManager) {
      const details = window.storageManager.getStorageDetails();
      const res = {
        brand: details.brand,
        model: details.model,
        type: details.type,
        totalGB: details.totalGB,
        systemGB: details.systemGB,
        readSpeed: "2,800 MB/s",
        writeSpeed: "1,800 MB/s",
        usedGB: details.usedGB.toFixed(1),
        freeGB: details.freeGB.toFixed(1),
        formatted: details.formatted,
        short: details.short
      };
      if (callback) callback(res);
      return res;
    }

    const fallbackRes = {
      brand: "Bolt",
      model: "NV-64",
      type: "NVMe M.2 SSD",
      totalGB: 64,
      systemGB: 12,
      readSpeed: "2,800 MB/s",
      writeSpeed: "1,800 MB/s",
      usedGB: "12.1",
      freeGB: "51.9",
      formatted: "12.1 GB / 64 GB (Bolt NV-64)",
      short: "12.1 GB / 64 GB"
    };
    if (callback) callback(fallbackRes);
    return fallbackRes;
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


/* === FILE: device-operations.js === */
/**
 * WebOS v0.8.2 Device Manager 5-Second Operations & Real-Time Effects
 */
(function () {
  let activeTimer = null;

  function applyDeviceEffects(deviceId) {
    const dev = window.devicesData ? window.devicesData.getDevice(deviceId) : null;
    const isWorking = dev && dev.installed && dev.status === "working";

    if (deviceId === "wifi") {
      window._wifiDisabled = !isWorking;
      const netIndicator = document.getElementById("topbar-wifi-indicator");
      if (netIndicator) netIndicator.textContent = isWorking ? "📶" : "❌";
    } else if (deviceId === "gpu") {
      window._gpuDisabled = !isWorking;
      if (!isWorking) {
        document.body.classList.add("basic-renderer");
      } else {
        document.body.classList.remove("basic-renderer");
      }
    } else if (deviceId === "audio") {
      window._audioDisabled = !isWorking;
    } else if (deviceId === "mouse") {
      window._mouseUninstalled = !isWorking;
      document.body.style.cursor = isWorking ? "default" : "crosshair";
    } else if (deviceId === "battery") {
      window._batteryDisabled = !isWorking;
      const batEl = document.getElementById("topbar-battery");
      if (batEl) batEl.title = isWorking ? "highcell Power Cell: 94%" : "On AC Power";
    }
  }

  function start5SecOperation(config) {
    // config: { title, steps, onProgress, onComplete, onCancel }
    if (activeTimer) clearInterval(activeTimer);
    let progress = 0;
    const intervalMs = 50; // 5000ms / 100 steps
    const stepItems = config.steps || [
      { pct: 0, text: "Starting..." },
      { pct: 20, text: "Processing..." },
      { pct: 60, text: "Applying changes..." },
      { pct: 100, text: "Complete" }
    ];

    function getStepText(pct) {
      let currentText = stepItems[0].text;
      for (let s of stepItems) {
        if (pct >= s.pct) currentText = s.text;
      }
      return currentText;
    }

    activeTimer = setInterval(() => {
      progress += 1;
      const statusText = getStepText(progress);
      if (typeof config.onProgress === "function") {
        config.onProgress(progress, statusText);
      }
      if (progress >= 100) {
        clearInterval(activeTimer);
        activeTimer = null;
        if (typeof config.onComplete === "function") config.onComplete();
      }
    }, intervalMs);

    return {
      cancel: () => {
        if (activeTimer) {
          clearInterval(activeTimer);
          activeTimer = null;
        }
        if (typeof config.onCancel === "function") config.onCancel();
      }
    };
  }

  function getOperationSteps(opType, targetDev) {
    if (opType === "disable") {
      return [
        { pct: 0, text: "Starting disable..." },
        { pct: 20, text: "Stopping device..." },
        { pct: 40, text: "Releasing resources..." },
        { pct: 60, text: "Updating system config..." },
        { pct: 80, text: "Verifying changes..." },
        { pct: 100, text: "✅ Device disabled" }
      ];
    }
    if (opType === "enable") {
      return [
        { pct: 0, text: "Starting enable..." },
        { pct: 20, text: "Initializing device..." },
        { pct: 40, text: "Allocating resources..." },
        { pct: 60, text: "Configuring drivers..." },
        { pct: 80, text: "Verifying device..." },
        { pct: 100, text: "✅ Device enabled" }
      ];
    }
    if (opType === "update") {
      return [
        { pct: 0, text: "Starting update..." },
        { pct: 15, text: "Downloading driver package..." },
        { pct: 40, text: "Extracting files..." },
        { pct: 60, text: "Installing driver..." },
        { pct: 80, text: "Registering driver..." },
        { pct: 100, text: `✅ Driver updated to ${targetDev ? targetDev.nextVersion || 'v1.1.0.0' : 'v1.1.0.0'}` }
      ];
    }
    if (opType === "rollback") {
      return [
        { pct: 0, text: "Starting rollback..." },
        { pct: 25, text: "Locating previous driver..." },
        { pct: 50, text: "Restoring driver..." },
        { pct: 75, text: "Reconfiguring device..." },
        { pct: 100, text: "✅ Driver rolled back to v1.0.0.0" }
      ];
    }
    if (opType === "uninstall") {
      return [
        { pct: 0, text: "Starting uninstall..." },
        { pct: 20, text: "Removing driver files..." },
        { pct: 45, text: "Unregistering device..." },
        { pct: 70, text: "Cleaning system registry..." },
        { pct: 90, text: "Finalizing removal..." },
        { pct: 100, text: "✅ Device uninstalled" }
      ];
    }
    // scan
    return [
      { pct: 0, text: "Scanning hardware..." },
      { pct: 20, text: "Checking USB bus..." },
      { pct: 40, text: "Checking PCI bus..." },
      { pct: 60, text: "Checking system devices..." },
      { pct: 80, text: "Comparing with registry..." },
      { pct: 100, text: "✅ Scan complete — all devices found" }
    ];
  }

  window.deviceOperations = {
    start5SecOperation,
    getOperationSteps,
    applyDeviceEffects,
    cancelCurrent: () => {
      if (activeTimer) {
        clearInterval(activeTimer);
        activeTimer = null;
      }
    }
  };
})();

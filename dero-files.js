/* === FILE: dero-files.js === */
/**
 * WebOS v0.9.2.1.2 DER-0 File System Injection (3.2 GB) & Deletion Interceptor
 */
(function () {
  const brokenState = {
    mainDeleted: false,
    configDeleted: false,
    serviceDeleted: false,
    cacheDeleted: false,
    networkDeleted: false,
    der00Deleted: false
  };

  function createDER0Folder() {
    if (!window.webosFS) return;
    const existing = window.webosFS.getFolder("/DER-0");
    if (!existing) {
      window.webosFS.createFolder("", "DER-0", "☣️");
    }

    const files = [
      { name: "DER-main.der", sizeMB: 850, type: "DER Infiltration Engine", icon: "⚠️" },
      { name: "DER-config.der", sizeMB: 400, type: "DER Config Override", icon: "⚙️" },
      { name: "DER-service.der", sizeMB: 550, type: "DER Host Service", icon: "⚡" },
      { name: "DER-cache.der", sizeMB: 300, type: "DER Memory Cache Block", icon: "📦" },
      { name: "DER-network.der", sizeMB: 500, type: "DER Telemetry Socket", icon: "🌐" },
      { name: "DER-00", sizeMB: 600, type: "DER Master Core Payload", icon: "☣️" }
    ];

    const currentFiles = window.webosFS.getFiles("/DER-0");
    files.forEach(f => {
      if (!currentFiles.some(cf => cf.name === f.name)) {
        window.webosFS.createFile("/DER-0", f.name, f.type, f.sizeMB, f.icon);
      }
    });
  }

  function handleDERFileDelete(file) {
    if (!file) return;
    const name = file.name;

    if (name === "DER-00") {
      brokenState.der00Deleted = true;
      if (window.deroUpdate) window.deroUpdate.stopDER0Corruption();
      if (window.notificationBus) {
        window.notificationBus.notify("Threat Eliminated", "DER-00 payload purged. System corruption halted.", "🛡️", "WebOS Defender", "settings");
      }
      return;
    }

    if (name === "DER-main.der") {
      brokenState.mainDeleted = true;
      if (window.notificationBus) {
        window.notificationBus.notify("Core Malfunction", "DER-main removed. Native apps (Weather, Music, Paint) broken.", "⚠️", "System Core", "settings");
      }
    } else if (name === "DER-config.der") {
      brokenState.configDeleted = true;
      if (window.deroErrors) window.deroErrors.showError("der-config-crash");
    } else if (name === "DER-service.der") {
      brokenState.serviceDeleted = true;
      if (window.deroErrors) window.deroErrors.showError("der-service-stop");
    } else if (name === "DER-cache.der") {
      brokenState.cacheDeleted = true;
      if (window.deroEffects) window.deroEffects.screenGlitch();
    } else if (name === "DER-network.der") {
      brokenState.networkDeleted = true;
      if (window.notificationBus) {
        window.notificationBus.notify("Network Severed", "DER-network removed. Browser connection dead.", "🌐", "Network Daemon", "browser");
      }
    }
  }

  function isAppCorrupted(appName) {
    if (brokenState.mainDeleted && ["weather", "music", "paint"].includes(appName)) return true;
    if (brokenState.networkDeleted && appName === "browser") return true;
    return false;
  }

  window.deroFiles = {
    createDER0Folder,
    handleDERFileDelete,
    isAppCorrupted,
    brokenState
  };
})();

/* === FILE: storage-manager.js === */
/**
 * WebOS v0.8.0 Storage Manager & Disk Space Guardian
 */
(function () {
  function getStorageDetails() {
    const fs = window.webosFS;
    const totalGB = fs ? fs.TOTAL_STORAGE : 64;
    const systemGB = fs ? fs.SYSTEM_SIZE : 12;
    const usedGB = fs ? fs.getUsedSpaceGB() : 12.1;
    const freeGB = fs ? fs.getFreeSpaceGB() : 51.9;
    const usedMB = fs ? fs.getUsedSpaceMB() : 12390;
    const freeMB = fs ? fs.getFreeSpaceMB() : 53130;

    return {
      brand: "Bolt",
      model: "NV-64",
      type: "NVMe M.2 SSD",
      totalGB,
      systemGB,
      usedGB: parseFloat(usedGB.toFixed(2)),
      freeGB: parseFloat(freeGB.toFixed(2)),
      usedMB: parseFloat(usedMB.toFixed(1)),
      freeMB: parseFloat(freeMB.toFixed(1)),
      usedPercent: Math.min(100, Math.round((usedGB / totalGB) * 100)),
      formatted: `${usedGB.toFixed(1)} GB / ${totalGB} GB (Bolt NV-64)`,
      short: `${usedGB.toFixed(1)} GB / ${totalGB} GB`
    };
  }

  function getUsedSpace() {
    return getStorageDetails().usedGB;
  }

  function getFreeSpace() {
    return getStorageDetails().freeGB;
  }

  function canInstall(sizeInMB) {
    const freeMB = window.webosFS ? window.webosFS.getFreeSpaceMB() : 50000;
    // Hard check: minimum 500 MB required after install
    return (freeMB - sizeInMB) >= 500;
  }

  function checkStorageWarnings() {
    const freeGB = getFreeSpace();
    if (freeGB < 0.5) {
      return { level: "blocked", message: "❌ Cannot install — insufficient storage", icon: "❌" };
    }
    if (freeGB < 2.0) {
      return { level: "critical", message: "🔴 Critically low disk space", icon: "🔴" };
    }
    if (freeGB < 5.0) {
      return { level: "low", message: "⚠️ Low disk space warning", icon: "⚠️" };
    }
    if (freeGB < 10.0) {
      return { level: "info", message: "ℹ️ Storage getting full", icon: "ℹ️" };
    }
    return null;
  }

  function installApp(appName, sizeMB, appIcon = "📦") {
    if (!canInstall(sizeMB)) {
      return { success: false, reason: "Insufficient storage (Less than 500 MB remaining)" };
    }

    if (window.webosFS) {
      const fileName = `${appName.replace(/\s+/g, "-")}.wapp`;
      const created = window.webosFS.createFile(
        "/Applications",
        fileName,
        "WebOS Application Package",
        sizeMB,
        appIcon
      );
      return { success: true, file: created };
    }
    return { success: true };
  }

  function uninstallApp(appName) {
    if (window.webosFS) {
      const files = window.webosFS.getFiles("/Applications");
      const cleanTarget = appName.toLowerCase().replace(/\s+/g, "-");
      const targetFile = files.find(f => 
        f.name.toLowerCase().startsWith(cleanTarget) ||
        f.name.toLowerCase().includes(appName.toLowerCase())
      );
      if (targetFile) {
        return window.webosFS.deleteFile(targetFile.id);
      }
    }
    return { success: true };
  }

  window.storageManager = {
    getStorageDetails,
    getUsedSpace,
    getFreeSpace,
    canInstall,
    checkStorageWarnings,
    installApp,
    uninstallApp
  };
})();

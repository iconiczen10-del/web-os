/* === FILE: store-install.js === */
/**
 * WebOS v0.8.0 App Installation & Dock/Desktop Sync Engine
 */
(function () {
  let installedAppIds = [];

  function getInstalledAppIds() { return installedAppIds; }

  function performActualInstall(appId) {
    if (window.storeApps) {
      const app = window.storeApps.find(a => a.id === appId);
      if (app) {
        app.isInstalled = true;
        if (window.storageManager) {
          window.storageManager.installApp(app.name, app.sizeMB || 50, app.icon || "📦");
        }
      }
    }

    if (!installedAppIds.includes(appId)) installedAppIds.push(appId);
    addAppToDock(appId);
    if (typeof window.addAppShortcut === "function") window.addAppShortcut(appId);
    if (typeof window.refreshStoreGrid === "function") window.refreshStoreGrid();
  }

  function installApp(appId, skipDownload = false) {
    const appData = window.storeApps ? window.storeApps.find(a => a.id === appId) : null;
    if (appData && window.storageManager && !window.storageManager.canInstall(appData.sizeMB || 50)) {
      if (window.storeDownload && window.storeDownload.showToast) {
        window.storeDownload.showToast("❌ Cannot install — insufficient storage", "❌");
      }
      return;
    }

    if (!skipDownload && window.storeDownload && appData) {
      window.storeDownload.startDownload(appData, () => performActualInstall(appId));
    } else {
      performActualInstall(appId);
    }
  }

  function uninstallApp(appId) {
    if (appId === "browser") return;

    if (window.windowManager && Array.isArray(window.windowManager.openWindows)) {
      const openWin = window.windowManager.openWindows.find(w => w.getAttribute("data-app") === appId);
      if (openWin) window.windowManager.closeWindow(openWin);
    }

    if (window.storeApps) {
      const app = window.storeApps.find(a => a.id === appId);
      if (app) {
        app.isInstalled = false;
        if (window.storageManager) window.storageManager.uninstallApp(app.name);
      }
    }

    const dockIcon = document.querySelector(`#dock .dock-icon[data-app="${appId}"]`);
    if (dockIcon) dockIcon.remove();

    if (typeof window.removeAppShortcut === "function") {
      window.removeAppShortcut(appId);
    } else {
      const shortcut = document.querySelector(`.desktop-shortcut[data-app="${appId}"]`);
      if (shortcut) shortcut.remove();
    }

    installedAppIds = installedAppIds.filter(id => id !== appId);
    if (typeof window.refreshStoreGrid === "function") window.refreshStoreGrid();
  }

  function addAppToDock(appId) {
    const dock = document.getElementById("dock");
    if (!dock || dock.querySelector(`.dock-icon[data-app="${appId}"]`)) return;

    const appData = window.storeApps ? window.storeApps.find(a => a.id === appId) : null;
    const iconEmoji = appData ? appData.icon : "📦";
    const appName = appData ? appData.name : appId;

    const iconEl = document.createElement("div");
    iconEl.className = "dock-icon";
    iconEl.setAttribute("data-app", appId);
    iconEl.innerHTML = `<span class="icon-emoji">${iconEmoji}</span><span class="os-label">${appName}</span><div class="dock-dot"></div>`;

    const separator = dock.querySelector(".dock-separator");
    const trash = dock.querySelector('.dock-icon[data-app="trash"]');
    if (separator) dock.insertBefore(iconEl, separator);
    else if (trash) dock.insertBefore(iconEl, trash);
    else dock.appendChild(iconEl);
  }

  function loadInstalledApps() {
    if (window.storeApps) {
      window.storeApps.forEach(app => {
        if (installedAppIds.includes(app.id)) {
          app.isInstalled = true;
          addAppToDock(app.id);
          if (typeof window.addAppShortcut === "function") window.addAppShortcut(app.id);
        } else {
          app.isInstalled = false;
        }
      });
    }
  }

  function downloadAllApps() {
    if (!window.storeApps) return 0;
    let count = 0;
    window.storeApps.forEach(app => {
      if (!installedAppIds.includes(app.id)) {
        performActualInstall(app.id);
        count++;
      }
    });
    return count;
  }

  window.installApp = installApp;
  window.downloadAllApps = downloadAllApps;
  window.uninstallApp = uninstallApp;
  window.loadInstalledApps = loadInstalledApps;
  window.addAppToDock = addAppToDock;
})();


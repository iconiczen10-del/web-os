/* === FILE: store-install.js === */
/**
 * WebOS v0.7 App Installation & Dock/Desktop Sync Engine
 * In-memory app installation state. Wiped on refresh.
 */
(function () {
  let installedAppIds = [];

  function getInstalledAppIds() {
    return installedAppIds;
  }

  function performActualInstall(appId) {
    if (window.storeApps) {
      const app = window.storeApps.find(a => a.id === appId);
      if (app) app.isInstalled = true;
    }

    if (!installedAppIds.includes(appId)) {
      installedAppIds.push(appId);
    }

    addAppToDock(appId);
    addAppToDesktop(appId);

    if (typeof window.refreshStoreGrid === "function") {
      window.refreshStoreGrid();
    }
  }

  function installApp(appId, skipDownload = false) {
    const appData = window.storeApps ? window.storeApps.find(a => a.id === appId) : null;
    if (!skipDownload && window.storeDownload && appData) {
      window.storeDownload.startDownload(appData, () => {
        performActualInstall(appId);
      });
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
      if (app) app.isInstalled = false;
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

    if (typeof window.refreshStoreGrid === "function") {
      window.refreshStoreGrid();
    }
  }

  function addAppToDock(appId) {
    const dock = document.getElementById("dock");
    if (!dock) return;

    if (dock.querySelector(`.dock-icon[data-app="${appId}"]`)) return;

    const appData = window.storeApps ? window.storeApps.find(a => a.id === appId) : null;
    const iconEmoji = appData ? appData.icon : "📦";
    const appName = appData ? appData.name : appId;

    const iconEl = document.createElement("div");
    iconEl.className = "dock-icon";
    iconEl.setAttribute("data-app", appId);
    iconEl.innerHTML = `
      <span class="icon-emoji">${iconEmoji}</span>
      <span class="os-label">${appName}</span>
      <div class="dock-dot"></div>
    `;

    const separator = dock.querySelector(".dock-separator");
    const trash = dock.querySelector('.dock-icon[data-app="trash"]');
    if (separator) {
      dock.insertBefore(iconEl, separator);
    } else if (trash) {
      dock.insertBefore(iconEl, trash);
    } else {
      dock.appendChild(iconEl);
    }
  }

  function addAppToDesktop(appId) {
    if (typeof window.addAppShortcut === "function") {
      window.addAppShortcut(appId);
    }
  }

  function loadInstalledApps() {
    if (window.storeApps) {
      window.storeApps.forEach(app => {
        if (installedAppIds.includes(app.id)) {
          app.isInstalled = true;
          addAppToDock(app.id);
          addAppToDesktop(app.id);
        } else {
          app.isInstalled = false;
        }
      });
    }
  }

  window.installApp = installApp;
  window.uninstallApp = uninstallApp;
  window.loadInstalledApps = loadInstalledApps;
  window.addAppToDock = addAppToDock;
})();

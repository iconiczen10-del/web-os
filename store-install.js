/* === FILE: store-install.js === */
/**
 * WebOS v0.6 App Installation & Dock/Desktop Sync Engine
 */
(function () {
  const STORAGE_KEY = "webos-installed-apps";

  function getInstalledAppIds() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return ["mbank"]; // Mbank preinstalled
    try {
      const parsed = JSON.parse(saved);
      if (!parsed.includes("mbank")) parsed.push("mbank");
      return parsed;
    } catch (e) {
      return ["mbank"];
    }
  }

  function saveInstalledAppIds(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  function installApp(appId) {
    if (window.storeApps) {
      const app = window.storeApps.find(a => a.id === appId);
      if (app) app.isInstalled = true;
    }

    const ids = getInstalledAppIds();
    if (!ids.includes(appId)) {
      ids.push(appId);
      saveInstalledAppIds(ids);
    }

    addAppToDock(appId);
    addAppToDesktop(appId);

    // Refresh store grid cards if store app is currently open
    if (typeof window.refreshStoreGrid === "function") {
      window.refreshStoreGrid();
    }
  }

  function uninstallApp(appId) {
    if (appId === "mbank") return; // Protection for Mbank system app

    // Close open window if app is currently open
    if (window.windowManager && Array.isArray(window.windowManager.openWindows)) {
      const openWin = window.windowManager.openWindows.find(w => w.getAttribute("data-app") === appId);
      if (openWin) {
        window.windowManager.closeWindow(openWin);
      }
    }

    // Set isInstalled = false
    if (window.storeApps) {
      const app = window.storeApps.find(a => a.id === appId);
      if (app) app.isInstalled = false;
    }

    // Remove dock icon
    const dockIcon = document.querySelector(`#dock .dock-icon[data-app="${appId}"]`);
    if (dockIcon) dockIcon.remove();

    // Remove desktop shortcut
    if (typeof window.removeAppShortcut === "function") {
      window.removeAppShortcut(appId);
    } else {
      const shortcut = document.querySelector(`.desktop-shortcut[data-app="${appId}"]`);
      if (shortcut) shortcut.remove();
    }

    // Update localStorage
    const remainingIds = getInstalledAppIds().filter(id => id !== appId);
    saveInstalledAppIds(remainingIds);

    // Refresh store grid cards if open
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
    const installedIds = getInstalledAppIds();
    if (window.storeApps) {
      window.storeApps.forEach(app => {
        if (installedIds.includes(app.id)) {
          app.isInstalled = true;
          addAppToDock(app.id);
          addAppToDesktop(app.id);
        }
      });
    }
  }

  window.installApp = installApp;
  window.uninstallApp = uninstallApp;
  window.loadInstalledApps = loadInstalledApps;
  window.addAppToDock = addAppToDock;
})();

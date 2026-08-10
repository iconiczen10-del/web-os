/* === FILE: desktop.js === */
/**
 * WebOS v0.7 Desktop Interactivity Shell
 */

const DEFAULT_WALLPAPER = "linear-gradient(135deg, #0a0a2e 0%, #1a0a2e 50%, #0d1b3e 100%)";

function applyDesktopWallpaper(gradientStr) {
  const desktop = document.getElementById("desktop");
  if (desktop && gradientStr) {
    desktop.style.background = gradientStr;
  }
}
window.applyDesktopWallpaper = applyDesktopWallpaper;

function initDesktop() {
  if (window._desktopInitialized) return;
  window._desktopInitialized = true;

  console.log("WebOS v0.7.2.3 booted — Fresh start");

  // Initialize Top Bar and Context Menu
  if (window.topbarManager && typeof window.topbarManager.initTopbar === "function") {
    window.topbarManager.initTopbar();
  }

  if (window.contextMenuManager && typeof window.contextMenuManager.initContextMenu === "function") {
    window.contextMenuManager.initContextMenu();
  }

  if (typeof window.initDockReorder === "function") {
    window.initDockReorder();
  }

  if (typeof window.initDesktopShortcuts === "function") {
    window.initDesktopShortcuts();
  }

  if (typeof window.initTrash === "function") {
    window.initTrash();
  }

  if (typeof window.loadInstalledApps === "function") {
    window.loadInstalledApps();
  }

  // Always apply default Sequoia wallpaper on fresh boot
  applyDesktopWallpaper(DEFAULT_WALLPAPER);

  // Dock icon click triggers window manager / restore
  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("click", (e) => {
      const icon = e.target.closest(".dock-icon");
      if (!icon) return;
      const appName = icon.getAttribute("data-app");
      if (!appName || appName === "trash" || !window.windowManager) return;

      const existingWin = window.windowManager.openWindows.find(
        (w) => w.getAttribute("data-app") === appName
      );

      if (existingWin) {
        if (existingWin.style.display === "none" && typeof window.restoreWindow === "function") {
          window.restoreWindow(existingWin);
        }
        window.windowManager.bringToFront(existingWin);
      } else {
        window.windowManager.openWindow(appName);
      }
    });
  }
}

function startDesktopApp() {
  const fallbackTimer = setTimeout(() => {
    if (!window._desktopInitialized) {
      console.warn("Boot screen timeout, force-initializing desktop");
      initDesktop();
    }
  }, 5000);

  if (typeof window.initBootScreen === "function") {
    window.initBootScreen(() => {
      clearTimeout(fallbackTimer);
      initDesktop();
    });
  } else {
    clearTimeout(fallbackTimer);
    initDesktop();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startDesktopApp);
} else {
  startDesktopApp();
}


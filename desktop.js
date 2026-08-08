/* === FILE: desktop.js === */
/**
 * WebOS v0.6.3 Desktop Interactivity Shell
 */

function initDesktop() {
  if (window._desktopInitialized) return;
  window._desktopInitialized = true;

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

document.addEventListener("DOMContentLoaded", () => {
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
});


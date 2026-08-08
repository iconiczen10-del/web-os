/* === FILE: window-minimize.js === */
/**
 * WebOS v0.4 Window Minimize & Restore Utilities
 * Handles smooth animation states and dock indicator dot visibility.
 */
(function () {
  function showDockDot(appName) {
    if (!appName) return;
    const dockIcon = document.querySelector(`.dock-icon[data-app="${appName}"]`);
    if (dockIcon) {
      dockIcon.classList.add("has-dot");
    }
  }

  function hideDockDot(appName) {
    if (!appName) return;
    const dockIcon = document.querySelector(`.dock-icon[data-app="${appName}"]`);
    if (dockIcon) {
      dockIcon.classList.remove("has-dot");
    }
  }

  function minimizeWindow(windowEl) {
    if (!windowEl || windowEl.style.display === "none") return;

    windowEl.classList.add("minimizing");
    const appName = windowEl.getAttribute("data-app");

    setTimeout(() => {
      windowEl.style.display = "none";
      windowEl.classList.remove("minimizing");
      showDockDot(appName);
    }, 300);
  }

  function restoreWindow(windowEl) {
    if (!windowEl) return;

    const appName = windowEl.getAttribute("data-app");
    windowEl.style.display = "flex";
    windowEl.classList.add("restoring");

    hideDockDot(appName);

    setTimeout(() => {
      windowEl.classList.remove("restoring");
    }, 300);
  }

  window.minimizeWindow = minimizeWindow;
  window.restoreWindow = restoreWindow;
  window.showDockDot = showDockDot;
  window.hideDockDot = hideDockDot;
})();

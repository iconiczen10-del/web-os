/* === FILE: app-finder.js === */
/**
 * WebOS v0.8.0 Finder Application Entry Point
 */
(function () {
  function initFinder(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.style.overflow = "hidden";

    if (window.webosFS && typeof window.webosFS.initFileSystem === "function") {
      // Ensure filesystem is ready
    }

    if (typeof window.renderFinderUI === "function") {
      window.renderFinderUI(contentEl);
    }
  }

  window.initFinder = initFinder;
})();


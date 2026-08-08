/* === FILE: window-maximize.js === */
/**
 * WebOS v0.4 Window Maximize Utilities
 * Toggles window fullscreen desktop bounds with state memory restoration.
 */
(function () {
  function toggleMaximize(windowEl) {
    if (!windowEl) return;

    if (windowEl.classList.contains("maximized")) {
      // Restore previous size and position
      windowEl.classList.remove("maximized");
      if (windowEl.dataset.prevTop) windowEl.style.top = windowEl.dataset.prevTop;
      if (windowEl.dataset.prevLeft) windowEl.style.left = windowEl.dataset.prevLeft;
      if (windowEl.dataset.prevWidth) windowEl.style.width = windowEl.dataset.prevWidth;
      if (windowEl.dataset.prevHeight) windowEl.style.height = windowEl.dataset.prevHeight;
    } else {
      // Save current geometry and maximize
      windowEl.dataset.prevTop = windowEl.style.top;
      windowEl.dataset.prevLeft = windowEl.style.left;
      windowEl.dataset.prevWidth = windowEl.style.width || `${windowEl.offsetWidth}px`;
      windowEl.dataset.prevHeight = windowEl.style.height || `${windowEl.offsetHeight}px`;

      windowEl.classList.add("maximized");
    }
  }

  window.toggleMaximize = toggleMaximize;
})();

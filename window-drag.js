/* === FILE: window-drag.js === */
/**
 * WebOS v0.5 Window Drag Handling Utility with Edge Snapping
 */
(function () {
  function initWindowDrag(windowManager) {
    let activeWin = null, startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

    const startDrag = (e) => {
      const titlebar = e.target.closest(".window-titlebar");
      if (!titlebar || e.target.classList.contains("traffic-light")) return;

      activeWin = titlebar.closest(".window-container");
      windowManager.bringToFront(activeWin);

      if (activeWin.classList.contains("snapped") && window.windowSnap) {
        window.windowSnap.unsnapWindow(activeWin);
      }

      activeWin.classList.add("dragging");

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      initialLeft = activeWin.offsetLeft;
      initialTop = activeWin.offsetTop;

      e.preventDefault();
    };

    const onDrag = (e) => {
      if (!activeWin) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      activeWin.style.left = `${initialLeft + (clientX - startX)}px`;
      activeWin.style.top = `${initialTop + (clientY - startY)}px`;

      if (window.windowSnap) {
        const zone = window.windowSnap.getSnapZone(clientX, clientY);
        window.windowSnap.showSnapZone(zone);
        activeWin._currentSnapZone = zone;
      }
    };

    const stopDrag = () => {
      if (activeWin) {
        if (activeWin._currentSnapZone && window.windowSnap) {
          window.windowSnap.snapWindow(activeWin, activeWin._currentSnapZone);
          delete activeWin._currentSnapZone;
        }
        if (window.windowSnap) {
          window.windowSnap.hideSnapZones();
        }
        activeWin.classList.remove("dragging");
        activeWin = null;
      }
    };

    document.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);
  }

  window.initWindowDrag = initWindowDrag;
})();

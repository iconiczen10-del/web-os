/* === FILE: window-resize.js === */
/**
 * WebOS v0.4 Window Resize Drag Handler
 * Enables corner drag resizing with strict min/max boundary constraints.
 */
(function () {
  function addResizeHandle(windowEl) {
    if (!windowEl || windowEl.querySelector(".window-resize-handle")) return;

    const handle = document.createElement("div");
    handle.className = "window-resize-handle";
    handle.innerHTML = "◢";
    windowEl.appendChild(handle);

    let isResizing = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;

    const onStart = (e) => {
      e.stopPropagation();
      e.preventDefault();
      isResizing = true;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;
      startWidth = windowEl.offsetWidth;
      startHeight = windowEl.offsetHeight;

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onStop);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onStop);
    };

    const onMove = (e) => {
      if (!isResizing) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const topbarHeight = window.topbarManager ? window.topbarManager.getTopbarHeight() : 28;
      const maxW = Math.max(320, window.innerWidth - 40);
      const maxH = Math.max(240, window.innerHeight - topbarHeight - 110);

      const newWidth = Math.min(Math.max(320, startWidth + deltaX), maxW);
      const newHeight = Math.min(Math.max(240, startHeight + deltaY), maxH);

      windowEl.style.width = `${newWidth}px`;
      windowEl.style.height = `${newHeight}px`;
    };

    const onStop = () => {
      if (isResizing) {
        isResizing = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onStop);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onStop);
      }
    };

    handle.addEventListener("mousedown", onStart);
    handle.addEventListener("touchstart", onStart, { passive: false });
  }

  window.addResizeHandle = addResizeHandle;
})();

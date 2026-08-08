/* === FILE: desktop-shortcuts-drag.js === */
/**
 * WebOS v0.5 Desktop Shortcuts Drag & Drop Logic
 */
(function () {
  function startShortcutDrag(e, shortcut, saveShortcuts) {
    e.stopPropagation();
    const el = document.getElementById(`shortcut-${shortcut.id}`);
    if (!el) return;

    el.classList.add("dragging");
    const startX = e.touches ? e.touches[0].clientX : e.clientX;
    const startY = e.touches ? e.touches[0].clientY : e.clientY;
    const initialLeft = shortcut.x;
    const initialTop = shortcut.y;

    const onMove = (moveEvt) => {
      const curX = moveEvt.touches ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const curY = moveEvt.touches ? moveEvt.touches[0].clientY : moveEvt.clientY;

      let newX = Math.round((initialLeft + (curX - startX)) / 20) * 20;
      let newY = Math.round((initialTop + (curY - startY)) / 20) * 20;

      newX = Math.max(10, Math.min(newX, window.innerWidth - 90));
      newY = Math.max(35, Math.min(newY, window.innerHeight - 100));

      shortcut.x = newX;
      shortcut.y = newY;
      el.style.left = `${newX}px`;
      el.style.top = `${newY}px`;
    };

    const onStop = (stopEvt) => {
      el.classList.remove("dragging");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onStop);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onStop);

      const endX = stopEvt.changedTouches ? stopEvt.changedTouches[0].clientX : stopEvt.clientX;
      const endY = stopEvt.changedTouches ? stopEvt.changedTouches[0].clientY : stopEvt.clientY;

      const trashEl = document.querySelector('.dock-icon[data-app="trash"]');
      if (trashEl) {
        const rect = trashEl.getBoundingClientRect();
        if (endX >= rect.left && endX <= rect.right && endY >= rect.top && endY <= rect.bottom) {
          if (window.moveShortcutToTrash) {
            window.moveShortcutToTrash(shortcut);
            return;
          }
        }
      }

      if (typeof saveShortcuts === "function") saveShortcuts();
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onStop);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onStop);
  }

  window.startShortcutDrag = startShortcutDrag;
})();

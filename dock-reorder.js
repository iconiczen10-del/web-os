/* === FILE: dock-reorder.js === */
/**
 * WebOS v0.7 Dock Icon Reordering
 * In-memory dock order for session. Always starts with default order.
 */
(function () {
  let sessionDockOrder = [];

  function saveDockOrder() {
    const dock = document.getElementById("dock");
    if (!dock) return;
    const icons = Array.from(dock.querySelectorAll(".dock-icon[data-app]"))
      .filter(icon => icon.getAttribute("data-app") !== "trash");
    sessionDockOrder = icons.map(icon => icon.getAttribute("data-app"));
  }

  function loadDockOrder() {
    // Default dock order on fresh boot
  }

  function initDockReorder() {
    loadDockOrder();
    const dock = document.getElementById("dock");
    if (!dock) return;

    let draggedIcon = null;
    let ghost = null;
    let startX = 0;
    let isDragging = false;

    const onMouseDown = (e) => {
      const icon = e.target.closest(".dock-icon");
      if (!icon || icon.getAttribute("data-app") === "trash") return;

      draggedIcon = icon;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      isDragging = false;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!draggedIcon) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - startX;

      if (!isDragging && Math.abs(deltaX) > 5) {
        isDragging = true;
        draggedIcon.classList.add("dock-dragging");

        ghost = draggedIcon.cloneNode(true);
        ghost.classList.add("drag-ghost");
        document.body.appendChild(ghost);
      }

      if (isDragging && ghost) {
        ghost.style.left = `${clientX - 25}px`;
        ghost.style.top = `${clientY - 30}px`;

        const siblings = Array.from(dock.querySelectorAll(".dock-icon[data-app]"))
          .filter(i => i !== draggedIcon && i.getAttribute("data-app") !== "trash");

        const separator = dock.querySelector(".dock-separator");
        const trash = dock.querySelector('.dock-icon[data-app="trash"]');

        for (let sibling of siblings) {
          const rect = sibling.getBoundingClientRect();
          const midX = rect.left + rect.width / 2;
          if (clientX < midX) {
            dock.insertBefore(draggedIcon, sibling);
            break;
          } else {
            if (separator) dock.insertBefore(draggedIcon, separator);
            else if (trash) dock.insertBefore(draggedIcon, trash);
            else dock.appendChild(draggedIcon);
          }
        }
      }
    };

    const onMouseUp = () => {
      if (ghost) {
        ghost.remove();
        ghost = null;
      }
      if (draggedIcon) {
        draggedIcon.classList.remove("dock-dragging");
        if (isDragging) {
          saveDockOrder();
        }
        draggedIcon = null;
      }
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };

    dock.addEventListener("mousedown", onMouseDown);
    dock.addEventListener("touchstart", onMouseDown, { passive: false });
  }

  window.initDockReorder = initDockReorder;
})();

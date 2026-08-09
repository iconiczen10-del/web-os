/* === FILE: trash.js === */
/**
 * WebOS v0.7 Trash Dock Icon Manager
 * In-memory trash state. Starts empty on boot.
 */
(function () {
  let trashItems = [];

  function updateTrashVisual() {
    const trashEl = document.querySelector('.dock-icon[data-app="trash"]');
    if (!trashEl) return;

    if (trashItems.length > 0) {
      trashEl.classList.add("trash-full");
      trashEl.setAttribute("title", `Trash (${trashItems.length} items)`);
    } else {
      trashEl.classList.remove("trash-full");
      trashEl.setAttribute("title", "Trash (Empty)");
    }
  }

  function moveShortcutToTrash(shortcut) {
    if (window.deleteShortcut) {
      window.deleteShortcut(shortcut.id);
    }
    trashItems.push(shortcut);
    updateTrashVisual();
    console.log(`Moved '${shortcut.name}' to Trash`);
  }

  function emptyTrash() {
    if (trashItems.length === 0) {
      console.log("Trash is empty");
      return;
    }

    if (confirm(`Empty Trash? (${trashItems.length} item${trashItems.length > 1 ? "s" : ""})`)) {
      trashItems = [];
      updateTrashVisual();
      console.log("Trash emptied");
    }
  }

  function initTrash() {
    updateTrashVisual();

    const trashEl = document.querySelector('.dock-icon[data-app="trash"]');
    if (!trashEl) return;

    trashEl.addEventListener("click", (e) => {
      e.stopPropagation();
      emptyTrash();
    });
  }

  window.moveShortcutToTrash = moveShortcutToTrash;
  window.initTrash = initTrash;
})();

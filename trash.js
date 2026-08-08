/* === FILE: trash.js === */
/**
 * WebOS v0.5 Trash Dock Icon Manager
 */
(function () {
  const STORAGE_KEY = "webos-trash-items";
  let trashItems = [];

  function loadTrashState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        trashItems = JSON.parse(saved);
      } catch (e) {
        trashItems = [];
      }
    }
    updateTrashVisual();
  }

  function saveTrashState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trashItems));
    updateTrashVisual();
  }

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
    saveTrashState();
    console.log(`Moved '${shortcut.name}' to Trash`);
  }

  function emptyTrash() {
    if (trashItems.length === 0) {
      console.log("Trash is empty");
      return;
    }

    if (confirm(`Empty Trash? (${trashItems.length} item${trashItems.length > 1 ? "s" : ""})`)) {
      trashItems = [];
      saveTrashState();
      console.log("Trash emptied");
    }
  }

  function initTrash() {
    loadTrashState();

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

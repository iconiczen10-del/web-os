/* === FILE: desktop-shortcuts.js === */
/**
 * WebOS v0.5 Desktop Shortcuts Manager
 */
(function () {
  const STORAGE_KEY = "webos-desktop-shortcuts";
  let desktopShortcuts = [];

  function loadShortcuts() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        desktopShortcuts = JSON.parse(saved);
      } catch (e) {
        desktopShortcuts = [];
      }
    }
  }

  function saveShortcuts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(desktopShortcuts));
  }

  function renderShortcut(shortcut) {
    let el = document.getElementById(`shortcut-${shortcut.id}`);
    if (!el) {
      el = document.createElement("div");
      el.id = `shortcut-${shortcut.id}`;
      el.className = "desktop-shortcut";
      el.setAttribute("data-id", shortcut.id);

      el.innerHTML = `
        <div class="shortcut-icon">${shortcut.icon || "📁"}</div>
        <div class="shortcut-label">${shortcut.name}</div>
      `;

      el.addEventListener("mousedown", (e) => {
        if (typeof window.startShortcutDrag === "function") {
          window.startShortcutDrag(e, shortcut, saveShortcuts);
        }
      });
      el.addEventListener("touchstart", (e) => {
        if (typeof window.startShortcutDrag === "function") {
          window.startShortcutDrag(e, shortcut, saveShortcuts);
        }
      }, { passive: false });

      el.addEventListener("contextmenu", (e) => {
        if (typeof window.showShortcutContextMenu === "function") {
          window.showShortcutContextMenu(e, el);
        } else {
          e.preventDefault();
          e.stopPropagation();
          if (confirm(`Delete '${shortcut.name}'?`)) {
            if (window.deleteShortcut) {
              window.deleteShortcut(shortcut.id);
            }
          }
        }
      });

      document.getElementById("desktop").appendChild(el);
    }

    el.style.left = `${shortcut.x}px`;
    el.style.top = `${shortcut.y}px`;
  }

  window.deleteShortcut = function (id) {
    const index = desktopShortcuts.findIndex(s => s.id === id);
    if (index !== -1) {
      const shortcut = desktopShortcuts[index];
      desktopShortcuts.splice(index, 1);
      const el = document.getElementById(`shortcut-${id}`);
      if (el) el.remove();
      saveShortcuts();
      return shortcut;
    }
    return null;
  };

  function createNewShortcut(x, y) {
    const existingFolders = desktopShortcuts.filter(s => s.name.startsWith("New Folder"));
    let name = "New Folder";
    if (existingFolders.length > 0) {
      name = `New Folder ${existingFolders.length + 1}`;
    }

    const gridX = Math.round((x - 40) / 20) * 20;
    const gridY = Math.round((y - 40) / 20) * 20;

    const newShortcut = {
      id: Date.now().toString(),
      name,
      icon: "📁",
      x: Math.max(20, gridX),
      y: Math.max(40, gridY)
    };

    desktopShortcuts.push(newShortcut);
    renderShortcut(newShortcut);
    saveShortcuts();
  }

  function initDesktopShortcuts() {
    loadShortcuts();
    desktopShortcuts.forEach(renderShortcut);

    const desktop = document.getElementById("desktop");
    if (!desktop) return;

    desktop.addEventListener("dblclick", (e) => {
      if (e.target.id === "desktop" || e.target.classList.contains("desktop-shortcuts")) {
        createNewShortcut(e.clientX, e.clientY);
      }
    });
  }

  window.initDesktopShortcuts = initDesktopShortcuts;
})();

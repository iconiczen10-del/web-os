/* === FILE: desktop-shortcuts-context.js === */
/**
 * WebOS v0.6.1 Desktop Shortcuts Context Menu Manager
 */
(function () {
  function showShortcutContextMenu(e, shortcutEl) {
    e.preventDefault();
    e.stopPropagation();

    const existingMenu = document.querySelector(".context-menu");
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement("div");
    menu.className = "context-menu";

    const type = shortcutEl.getAttribute("data-type");
    const appId = shortcutEl.getAttribute("data-app");
    const shortcutId = shortcutEl.getAttribute("data-id");

    let itemsHtml = "";

    if (type === "app") {
      const isMbank = appId === "mbank";
      itemsHtml = `
        <div class="context-menu-item" id="cm-open">Open App</div>
        ${!isMbank ? '<div class="context-menu-item" id="cm-uninstall" style="color: #ff453a;">Uninstall</div>' : ''}
      `;
    } else {
      itemsHtml = `
        <div class="context-menu-item" id="cm-delete" style="color: #ff453a;">Delete</div>
      `;
    }

    menu.innerHTML = itemsHtml;
    document.body.appendChild(menu);

    const rect = menu.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;
    if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 8;
    if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 8;
    menu.style.left = `${Math.max(8, x)}px`;
    menu.style.top = `${Math.max(8, y)}px`;

    const openBtn = menu.querySelector("#cm-open");
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        menu.remove();
        if (window.windowManager && appId) {
          window.windowManager.openWindow(appId);
        }
      });
    }

    const uninstallBtn = menu.querySelector("#cm-uninstall");
    if (uninstallBtn) {
      uninstallBtn.addEventListener("click", () => {
        menu.remove();
        const appData = window.storeApps ? window.storeApps.find(a => a.id === appId) : null;
        if (appData && typeof window.showUninstallDialog === "function") {
          window.showUninstallDialog(appData, () => {
            if (typeof window.uninstallApp === "function") {
              window.uninstallApp(appData.id);
            }
          });
        }
      });
    }

    const deleteBtn = menu.querySelector("#cm-delete");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        menu.remove();
        if (window.deleteShortcut && shortcutId) {
          window.deleteShortcut(shortcutId);
        }
      });
    }

    const dismiss = (evt) => {
      if (!menu.contains(evt.target)) {
        menu.remove();
        document.removeEventListener("click", dismiss);
      }
    };
    setTimeout(() => document.addEventListener("click", dismiss), 10);
  }

  window.showShortcutContextMenu = showShortcutContextMenu;
})();

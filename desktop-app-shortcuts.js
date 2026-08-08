/* === FILE: desktop-app-shortcuts.js === */
/**
 * WebOS v0.6 Desktop App Shortcuts Manager
 */
(function () {
  function addAppShortcut(appId) {
    const desktop = document.getElementById("desktop");
    if (!desktop) return;

    const existing = desktop.querySelector(`.desktop-shortcut[data-app="${appId}"]`);
    if (existing) return;

    const appData = window.storeApps ? window.storeApps.find(a => a.id === appId) : null;
    const iconEmoji = appData ? appData.icon : "📦";
    const appName = appData ? appData.name : appId;

    const el = document.createElement("div");
    el.className = "desktop-shortcut app-shortcut";
    el.setAttribute("data-type", "app");
    el.setAttribute("data-app", appId);

    el.innerHTML = `
      <div class="shortcut-icon" style="position: relative;">
        ${iconEmoji}
        <div style="position: absolute; bottom: -2px; right: -2px; width: 10px; height: 10px; background: #007aff; border-radius: 50%; border: 1.5px solid #fff;"></div>
      </div>
      <div class="shortcut-label">${appName}</div>
    `;

    // Calculate position based on existing app shortcuts count
    const existingCount = desktop.querySelectorAll('.desktop-shortcut[data-type="app"]').length;
    const col = Math.floor(existingCount / 5);
    const row = existingCount % 5;
    const posX = 120 + col * 90;
    const posY = 50 + row * 90;

    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;

    el.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      if (window.windowManager) {
        window.windowManager.openWindow(appId);
      }
    });

    el.addEventListener("mousedown", (e) => {
      if (typeof window.startShortcutDrag === "function") {
        window.startShortcutDrag(e, { id: `app-${appId}`, x: posX, y: posY }, () => {});
      }
    });

    el.addEventListener("contextmenu", (e) => {
      if (typeof window.showShortcutContextMenu === "function") {
        window.showShortcutContextMenu(e, el);
      }
    });

    desktop.appendChild(el);
  }

  function removeAppShortcut(appId) {
    const el = document.querySelector(`.desktop-shortcut[data-app="${appId}"]`);
    if (el) el.remove();
  }

  window.addAppShortcut = addAppShortcut;
  window.removeAppShortcut = removeAppShortcut;
})();

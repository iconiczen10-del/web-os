/* === FILE: context-menu.js === */
/**
 * WebOS v0.4 Desktop Context Menu
 * Right-click context menu with wallpaper cycling and desktop actions.
 */
(function () {
  const WALLPAPERS = [
    "linear-gradient(135deg, #0a0a2e 0%, #1a0a2e 50%, #0d1b3e 100%)",
    "linear-gradient(135deg, #2e0a1e 0%, #3e1b0d 50%, #1a0a2e 100%)",
    "linear-gradient(135deg, #0a2e1b 0%, #0d3e2e 50%, #0a1e2e 100%)"
  ];

  let currentWallpaperIndex = parseInt(localStorage.getItem("webos-wallpaper-index") || "0", 10);
  let activeMenuEl = null;

  function applyWallpaper(index) {
    const desktopEl = document.getElementById("desktop");
    if (desktopEl && WALLPAPERS[index]) {
      desktopEl.style.background = WALLPAPERS[index];
    }
  }

  function cycleWallpaper() {
    currentWallpaperIndex = (currentWallpaperIndex + 1) % WALLPAPERS.length;
    localStorage.setItem("webos-wallpaper-index", currentWallpaperIndex.toString());
    applyWallpaper(currentWallpaperIndex);
  }

  function dismissMenu() {
    if (activeMenuEl) {
      activeMenuEl.remove();
      activeMenuEl = null;
    }
  }

  function showContextMenu(e) {
    e.preventDefault();
    dismissMenu();

    const menu = document.createElement("div");
    menu.className = "context-menu";
    menu.innerHTML = `
      <div class="context-menu-item" id="cm-wallpaper">Change Wallpaper</div>
      <div class="context-menu-divider"></div>
      <div class="context-menu-item" id="cm-refresh">Refresh</div>
    `;

    document.body.appendChild(menu);
    activeMenuEl = menu;

    // Viewport overflow bounds calculation
    const rect = menu.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;

    if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 8;
    if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 8;

    menu.style.left = `${Math.max(8, x)}px`;
    menu.style.top = `${Math.max(8, y)}px`;

    menu.querySelector("#cm-wallpaper").addEventListener("click", () => {
      cycleWallpaper();
      dismissMenu();
    });

    menu.querySelector("#cm-refresh").addEventListener("click", () => {
      console.log("Desktop refreshed");
      dismissMenu();
    });
  }

  function initContextMenu() {
    const desktopEl = document.getElementById("desktop");
    if (desktopEl) {
      applyWallpaper(currentWallpaperIndex);
      desktopEl.addEventListener("contextmenu", showContextMenu);
    }

    document.addEventListener("click", (e) => {
      if (activeMenuEl && !activeMenuEl.contains(e.target)) {
        dismissMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") dismissMenu();
    });
  }

  window.contextMenuManager = {
    initContextMenu,
    cycleWallpaper
  };
})();

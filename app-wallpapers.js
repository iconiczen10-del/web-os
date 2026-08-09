/* === FILE: app-wallpapers.js === */
/**
 * WebOS v0.6.6.1 Wallpapers PCS Application Orchestrator
 */
(function () {
  function initWallpapers(winContainer) {
    if (!winContainer) return;
    const contentEl = winContainer.querySelector(".window-content");
    if (!contentEl) return;

    if (window.wallpapersRender && typeof window.wallpapersRender.renderApp === "function") {
      window.wallpapersRender.renderApp(contentEl, () => {
        initWallpapers(winContainer);
      });
    } else {
      contentEl.innerHTML = `<div style="padding: 20px; color: #fff;">Wallpapers PCS renderer loading error.</div>`;
    }
  }

  window.initWallpapers = initWallpapers;
})();

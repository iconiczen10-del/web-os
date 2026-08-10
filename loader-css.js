/* === FILE: loader-css.js === */
/**
 * WebOS v0.7 CSS Dynamic Loader
 */
(function () {
  const cssFiles = [
    "boot-screen-animations.css",
    "window.css",
    "window-states.css",
    "app-finder.css",
    "app-calculator.css",
    "app-settings-layout.css",
    "app-settings-about.css",
    "app-settings-changelog.css",
    "settings-lock.css",
    "settings-developer-layout.css",
    "settings-developer-components.css",
    "settings-about-os-layout.css",
    "settings-about-os-components.css",
    "app-monitor.css",
    "app-monitor-tabs.css",
    "app-monitor-details.css",
    "snap-zone.css",
    "desktop-shortcut.css",
    "dock-extras.css",
    "topbar.css",
    "context-menu.css",
    "app-store.css",
    "store-detail.css",
    "store-download.css",
    "browser-mbank.css",
    "browser-mbank-card.css",
    "browser-buynet.css",
    "browser-buynet-cards.css",
    "app-wallpapers.css",
    "app-wallpapers-modal.css",
    "browser-papersforpc.css",
    "browser-papersforpc-components.css",
    "app-aichat-layout.css",
    "app-aichat-components.css",
    "app-aichat-marketing.css",
    "app-aichat-topics.css",
    "browser-aitalks.css",
    "browser-news-layout.css",
    "browser-news-cards.css",
    "browser-news-modal.css",
    "uninstall-dialog.css"
  ];

  cssFiles.forEach((file) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = file;
    document.head.appendChild(link);
  });
})();

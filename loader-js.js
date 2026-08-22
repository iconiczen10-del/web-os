/* === FILE: loader-js.js === */
/**
 * WebOS v0.8.2 JS Dynamic Loader & DOM Injector
 */
(function () {
  function injectHTML() {
    const desktop = document.getElementById("desktop");
    if (desktop && !desktop.querySelector(".desktop-shortcuts")) {
      const shortcutsDiv = document.createElement("div");
      shortcutsDiv.className = "desktop-shortcuts";
      desktop.insertBefore(shortcutsDiv, desktop.firstChild);
    }

    const dock = document.getElementById("dock");
    if (dock && dock.children.length === 0) {
      dock.innerHTML = `
        <div class="dock-icon" data-app="finder"><span class="icon-emoji">📁</span><span class="os-label">Finder</span><div class="dock-dot"></div></div>
        <div class="dock-icon" data-app="notes"><span class="icon-emoji">📝</span><span class="os-label">Notes</span><div class="dock-dot"></div></div>
        <div class="dock-icon" data-app="calculator"><span class="icon-emoji">🧮</span><span class="os-label">Calculator</span><div class="dock-dot"></div></div>
        <div class="dock-icon" data-app="settings"><span class="icon-emoji">⚙️</span><span class="os-label">Settings</span><div class="dock-dot"></div></div>
        <div class="dock-icon" data-app="monitor"><span class="icon-emoji">📊</span><span class="os-label">Monitor</span><div class="dock-dot"></div></div>
        <div class="dock-icon" data-app="store"><span class="icon-emoji">🛒</span><span class="os-label">Store</span><div class="dock-dot"></div></div>
        <div class="dock-icon" data-app="browser"><span class="icon-emoji">🌐</span><span class="os-label">Browser</span><div class="dock-dot"></div></div>
        <div class="dock-separator"></div>
        <div class="dock-icon" data-app="trash"><span class="icon-emoji">🗑️</span><span class="os-label">Trash</span><div class="dock-dot"></div></div>
      `;
    }
  }

  function startLoading() {
    injectHTML();

    const jsFiles = [
      "filesystem-data.js", "filesystem.js", "storage-manager.js",
      "devices-data.js", "device-operations.js", "device-manager-props.js", "device-manager.js",
      "finder-render.js", "finder-getinfo.js", "finder-operations.js",
      "finder-template.js", "finder-events.js", "finder-ui.js",
      "uninstall-dialog.js", "window-drag.js", "window-minimize.js", "window-maximize.js",
      "window-resize.js", "window-snap.js", "dock-reorder.js", "trash.js",
      "desktop-shortcuts-drag.js", "desktop-shortcuts.js", "desktop-app-shortcuts.js", "desktop-shortcuts-context.js",
      "topbar.js", "context-menu.js", "app-dispatcher.js", "window.js",
      "app-finder.js", "app-notes.js", "app-calculator-logic.js", "app-calculator.js",
      "settings-general.js", "settings-about-pc.js", "settings-changelog-data-early.js", "settings-changelog-data-v74.js", "settings-changelog-v83.js", "settings-changelog-data-v82.js", "settings-changelog-data-v81.js", "settings-changelog-data-v80.js", "settings-changelog-data-late.js", "settings-changelog-data.js", "settings-changelog.js",
      "settings-version-history.js", "settings-about-os-hero.js", "settings-about-os-sections.js", "settings-about-os.js",
      "settings-metrics-data.js", "settings-metrics-groups.js", "settings-metrics-groups-2.js", "settings-metrics-files.js",
      "settings-developer-history.js", "settings-developer-metrics.js", "dev-terminal.js", "settings-developer.js",
      "app-settings.js", "settings-apps.js", "monitor-cpu.js", "monitor-memory.js",
      "monitor-system.js", "monitor-process.js", "monitor-graphs.js", "monitor-alerts.js",
      "monitor-tab-overview.js", "monitor-tab-overview-actions.js", "monitor-tab-cpu.js",
      "monitor-tab-memory.js", "monitor-tab-gpu.js", "monitor-refresh.js", "app-monitor.js", "store-data.js", "store-wallet.js",
      "store-detail.js", "store-purchase.js", "store-download.js", "store-install.js",
      "app-store.js", "app-weather.js", "app-terminal-commands.js", "app-terminal.js",
      "app-music.js", "app-paint.js", "app-clock.js", "browser-bookmarks.js",
      "browser-search-data.js", "browser-search.js", "browser-mbank.js", "browser-buynet.js",
      "browser-dmanager-data.js", "browser-dmanager-tabs.js", "browser-dmanager.js",
      "community-data-general.js", "community-data-apps.js", "community-data-hardware.js", "community-data-bugs.js", "community-data-tips.js", "community-data-custom.js", "community-data-future.js", "community-data-all.js", "community-live.js",
      "community-render-home.js", "community-render-thread.js", "community-render-pages.js", "browser-community.js",
      "browser-news-data-1.js", "browser-news-data-2.js", "browser-news-data-3.js", "browser-news-modal.js", "browser-news-render.js",
      "browser-navigation.js", "browser-renderer.js", "app-browser.js", "app-calendar.js",
      "app-gamecenter.js", "app-videoeditor.js", "wallpapers-data.js", "wallpapers-login.js",
      "wallpapers-subscription.js", "wallpapers-modal.js", "wallpapers-render.js", "app-wallpapers.js",
      "browser-papersforpc-pages.js", "browser-papersforpc.js",
      "webtube-data.js", "webtube-tiers.js", "webtube-scenes-1.js", "webtube-scenes-2.js", "webtube-scenes.js",
      "webtube-player-core.js", "webtube-player-ui.js", "webtube-player.js",
      "webtube-payment-steps.js", "webtube-payment.js", "app-webtube-comments.js", "app-webtube-views.js", "app-webtube.js",
      "browser-webtube-ads.js", "browser-webtube.js",
      "aichat-knowledge-free.js", "aichat-knowledge-plus.js", "aichat-knowledge-pro.js", "aichat-knowledge.js",
      "aichat-math.js", "aichat-personality.js", "aichat-fallback.js", "aichat-commands.js", "aichat-matching.js", "aichat-marketing.js", "aichat-engine.js", "aichat-subscription.js", "aichat-payment.js",
      "aichat-login.js", "aichat-subscription-ui.js", "aichat-topics-view.js",
      "aichat-browser-data-1.js", "aichat-browser-data-2.js", "aichat-browser-data-3.js", "aichat-browser-data.js", "aichat-browser-render.js", "aichat-browser.js",
      "aitalks-tracker.js", "aichat-maxdb.js", "aichat-maxdb-gates.js", "aichat-maxdb-pay.js", "aichat-maxdb-view.js",
      "aichat-teaser-cards.js", "aichat-teaser.js",
      "app-aichat-ui.js", "app-aichat.js",
      "browser-aitalks-pages.js", "browser-aitalks-pages-2.js", "browser-aitalks.js",
      "browser-dev-login.js", "browser-dev-quiz.js", "browser-dev-egg.js", "browser-dev-pay.js", "browser-dev-tabs.js", "browser-dev-portal.js", "browser-dev-metrics.js", "browser-dev.js",
      "boot-screen-progress.js", "boot-screen.js",
      "desktop.js"
    ];

    const targetContainer = document.body || document.head;
    jsFiles.forEach((file) => {
      const script = document.createElement("script");
      script.src = file;
      script.defer = true;
      script.async = false;
      targetContainer.appendChild(script);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoading);
  } else {
    startLoading();
  }
})();

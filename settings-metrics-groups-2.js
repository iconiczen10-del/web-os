/* === FILE: settings-metrics-groups-2.js === */
/**
 * WebOS v0.7.2.2 System Metrics File Groups (Part 2)
 */
(function () {
  window.systemMetrics = window.systemMetrics || {};
  window.systemMetrics.fileGroups = (window.systemMetrics.fileGroups || []).concat([
    {
      name: "Apps", icon: "📱", count: 22,
      files: [
        { name: "app-finder.js", lines: 120, type: "JS" },
        { name: "app-finder.css", lines: 98, type: "CSS" },
        { name: "app-notes.js", lines: 110, type: "JS" },
        { name: "app-calculator.js", lines: 85, type: "JS" },
        { name: "app-calculator-logic.js", lines: 72, type: "JS" },
        { name: "app-calculator.css", lines: 80, type: "CSS" },
        { name: "app-weather.js", lines: 105, type: "JS" },
        { name: "app-terminal.js", lines: 92, type: "JS" },
        { name: "app-terminal-commands.js", lines: 84, type: "JS" },
        { name: "app-music.js", lines: 131, type: "JS" },
        { name: "app-paint.js", lines: 125, type: "JS" },
        { name: "app-clock.js", lines: 98, type: "JS" },
        { name: "app-calendar.js", lines: 108, type: "JS" },
        { name: "app-gamecenter.js", lines: 122, type: "JS" },
        { name: "app-videoeditor.js", lines: 128, type: "JS" },
        { name: "settings-changelog.js", lines: 65, type: "JS" },
        { name: "settings-changelog-data.js", lines: 13, type: "JS" },
        { name: "settings-version-history.js", lines: 131, type: "JS" },
        { name: "settings-lock.css", lines: 78, type: "CSS" },
        { name: "uninstall-dialog.js", lines: 82, type: "JS" },
        { name: "uninstall-dialog.css", lines: 65, type: "CSS" },
        { name: "store-wallet.js", lines: 52, type: "JS" }
      ]
    },
    {
      name: "Wallpapers PCS", icon: "🖼️", count: 7,
      files: [
        { name: "app-wallpapers.js", lines: 115, type: "JS" },
        { name: "app-wallpapers.css", lines: 95, type: "CSS" },
        { name: "app-wallpapers-modal.css", lines: 75, type: "CSS" },
        { name: "wallpapers-data.js", lines: 68, type: "JS" },
        { name: "wallpapers-login.js", lines: 82, type: "JS" },
        { name: "wallpapers-subscription.js", lines: 78, type: "JS" },
        { name: "wallpapers-render.js", lines: 105, type: "JS" }
      ]
    },
    {
      name: "AI Chat", icon: "🤖", count: 8,
      files: [
        { name: "app-aichat.js", lines: 125, type: "JS" },
        { name: "app-aichat.css", lines: 110, type: "CSS" },
        { name: "aichat-engine.js", lines: 131, type: "JS" },
        { name: "aichat-knowledge.js", lines: 145, type: "JS" },
        { name: "aichat-subscription.js", lines: 95, type: "JS" },
        { name: "aichat-login.js", lines: 88, type: "JS" },
        { name: "aichat-knowledge-free.js", lines: 86, type: "JS" },
        { name: "aichat-knowledge-pro.js", lines: 56, type: "JS" }
      ]
    },
    {
      name: "Company Sites", icon: "🏢", count: 6,
      files: [
        { name: "browser-papersforpc.js", lines: 118, type: "JS" },
        { name: "browser-papersforpc.css", lines: 92, type: "CSS" },
        { name: "browser-papersforpc-pages.js", lines: 110, type: "JS" },
        { name: "browser-aitalks.js", lines: 115, type: "JS" },
        { name: "browser-aitalks.css", lines: 88, type: "CSS" },
        { name: "browser-aitalks-pages.js", lines: 102, type: "JS" }
      ]
    },
    {
      name: "Boot Screen", icon: "🎨", count: 5,
      files: [
        { name: "boot-screen.js", lines: 97, type: "JS" },
        { name: "boot-screen.css", lines: 85, type: "CSS" },
        { name: "boot-screen-layout.css", lines: 65, type: "CSS" },
        { name: "boot-screen-animations.css", lines: 50, type: "CSS" },
        { name: "boot-screen-progress.js", lines: 72, type: "JS" }
      ]
    },
    {
      name: "Other", icon: "🔔", count: 6,
      files: [
        { name: "topbar.js", lines: 85, type: "JS" },
        { name: "topbar.css", lines: 75, type: "CSS" },
        { name: "context-menu.js", lines: 92, type: "JS" },
        { name: "context-menu.css", lines: 68, type: "CSS" },
        { name: "monitor-tab-cpu.js", lines: 95, type: "JS" },
        { name: "monitor-tab-overview.js", lines: 129, type: "JS" }
      ]
    }
  ]);
})();

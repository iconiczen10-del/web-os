/* === FILE: settings-metrics-groups.js === */
/**
 * WebOS v0.7.2.2 System Metrics File Groups (Part 1)
 */
(function () {
  window.systemMetrics = window.systemMetrics || {};
  window.systemMetrics.fileGroups = [
    {
      name: "Core System", icon: "🏠", count: 8,
      files: [
        { name: "index.html", lines: 25, type: "HTML" },
        { name: "style.css", lines: 48, type: "CSS" },
        { name: "desktop.js", lines: 22, type: "JS" },
        { name: "loader-css.js", lines: 35, type: "JS" },
        { name: "loader-js.js", lines: 98, type: "JS" },
        { name: "boot-screen.js", lines: 97, type: "JS" },
        { name: "boot-screen-progress.js", lines: 72, type: "JS" },
        { name: "boot-screen.css", lines: 85, type: "CSS" }
      ]
    },
    {
      name: "Window System", icon: "🪟", count: 10,
      files: [
        { name: "window.js", lines: 142, type: "JS" },
        { name: "window-drag.js", lines: 65, type: "JS" },
        { name: "window-minimize.js", lines: 45, type: "JS" },
        { name: "window-maximize.js", lines: 50, type: "JS" },
        { name: "window-resize.js", lines: 78, type: "JS" },
        { name: "window-snap.js", lines: 88, type: "JS" },
        { name: "window.css", lines: 115, type: "CSS" },
        { name: "window-states.css", lines: 62, type: "CSS" },
        { name: "snap-zone.css", lines: 40, type: "CSS" },
        { name: "app-dispatcher.js", lines: 18, type: "JS" }
      ]
    },
    {
      name: "Desktop & Dock", icon: "🖥️", count: 8,
      files: [
        { name: "dock-reorder.js", lines: 92, type: "JS" },
        { name: "trash.js", lines: 54, type: "JS" },
        { name: "desktop-shortcuts.js", lines: 84, type: "JS" },
        { name: "desktop-shortcuts-drag.js", lines: 76, type: "JS" },
        { name: "desktop-shortcuts-context.js", lines: 68, type: "JS" },
        { name: "desktop-app-shortcuts.js", lines: 82, type: "JS" },
        { name: "desktop-shortcut.css", lines: 70, type: "CSS" },
        { name: "dock-extras.css", lines: 45, type: "CSS" }
      ]
    },
    {
      name: "System Monitor", icon: "📊", count: 9,
      files: [
        { name: "app-monitor.js", lines: 71, type: "JS" },
        { name: "app-monitor.css", lines: 145, type: "CSS" },
        { name: "monitor-cpu.js", lines: 88, type: "JS" },
        { name: "monitor-memory.js", lines: 70, type: "JS" },
        { name: "monitor-system.js", lines: 129, type: "JS" },
        { name: "monitor-process.js", lines: 103, type: "JS" },
        { name: "monitor-graphs.js", lines: 95, type: "JS" },
        { name: "monitor-alerts.js", lines: 64, type: "JS" },
        { name: "monitor-refresh.js", lines: 36, type: "JS" }
      ]
    },
    {
      name: "Settings", icon: "⚙️", count: 12,
      files: [
        { name: "app-settings.js", lines: 60, type: "JS" },
        { name: "app-settings-layout.css", lines: 85, type: "CSS" },
        { name: "app-settings-about.css", lines: 95, type: "CSS" },
        { name: "app-settings-changelog.css", lines: 110, type: "CSS" },
        { name: "settings-general.js", lines: 75, type: "JS" },
        { name: "settings-about-pc.js", lines: 59, type: "JS" },
        { name: "settings-about-os.js", lines: 82, type: "JS" },
        { name: "settings-about-os-hero.js", lines: 74, type: "JS" },
        { name: "settings-about-os-sections.js", lines: 137, type: "JS" },
        { name: "settings-about-os-layout.css", lines: 138, type: "CSS" },
        { name: "settings-about-os-components.css", lines: 112, type: "CSS" },
        { name: "settings-apps.js", lines: 95, type: "JS" }
      ]
    },
    {
      name: "App Store", icon: "🛒", count: 8,
      files: [
        { name: "app-store.js", lines: 115, type: "JS" },
        { name: "app-store.css", lines: 138, type: "CSS" },
        { name: "store-data.js", lines: 88, type: "JS" },
        { name: "store-detail.js", lines: 128, type: "JS" },
        { name: "store-detail.css", lines: 138, type: "CSS" },
        { name: "store-purchase.js", lines: 72, type: "JS" },
        { name: "store-download.js", lines: 85, type: "JS" },
        { name: "store-install.js", lines: 66, type: "JS" }
      ]
    },
    {
      name: "Browser", icon: "🌐", count: 9,
      files: [
        { name: "app-browser.js", lines: 112, type: "JS" },
        { name: "browser-renderer.js", lines: 143, type: "JS" },
        { name: "browser-navigation.js", lines: 78, type: "JS" },
        { name: "browser-bookmarks.js", lines: 55, type: "JS" },
        { name: "browser-search.js", lines: 88, type: "JS" },
        { name: "browser-search-data.js", lines: 64, type: "JS" },
        { name: "browser-mbank.js", lines: 122, type: "JS" },
        { name: "browser-buynet.js", lines: 118, type: "JS" },
        { name: "browser-mbank.css", lines: 105, type: "CSS" }
      ]
    }
  ];
})();

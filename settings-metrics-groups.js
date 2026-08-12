/* === FILE: settings-metrics-groups.js === */
/**
 * WebOS v0.7.4 System Metrics File Groups (Part 1)
 */
(function () {
  window.systemMetrics = window.systemMetrics || {};
  window.systemMetrics.fileGroups = [
    {
      name: "Core System", icon: "🏠", count: 9,
      files: [
        { name: "boot-screen-animations.css", lines: 48, type: "CSS" },
        { name: "boot-screen-layout.css", lines: 126, type: "CSS" },
        { name: "boot-screen-progress.js", lines: 86, type: "JS" },
        { name: "boot-screen.js", lines: 96, type: "JS" },
        { name: "desktop.js", lines: 99, type: "JS" },
        { name: "index.html", lines: 16, type: "HTML" },
        { name: "loader-css.js", lines: 56, type: "JS" },
        { name: "loader-js.js", lines: 80, type: "JS" },
        { name: "style.css", lines: 134, type: "CSS" }
      ]
    },
    {
      name: "Window System", icon: "🪟", count: 10,
      files: [
        { name: "app-dispatcher.js", lines: 39, type: "JS" },
        { name: "snap-zone.css", lines: 42, type: "CSS" },
        { name: "window-drag.js", lines: 70, type: "JS" },
        { name: "window-maximize.js", lines: 29, type: "JS" },
        { name: "window-minimize.js", lines: 54, type: "JS" },
        { name: "window-resize.js", lines: 73, type: "JS" },
        { name: "window-snap.js", lines: 106, type: "JS" },
        { name: "window-states.css", lines: 62, type: "CSS" },
        { name: "window.css", lines: 93, type: "CSS" },
        { name: "window.js", lines: 121, type: "JS" }
      ]
    },
    {
      name: "Desktop & Dock", icon: "🖥️", count: 8,
      files: [
        { name: "desktop-app-shortcuts.js", lines: 69, type: "JS" },
        { name: "desktop-shortcut.css", lines: 45, type: "CSS" },
        { name: "desktop-shortcuts-context.js", lines: 90, type: "JS" },
        { name: "desktop-shortcuts-drag.js", lines: 64, type: "JS" },
        { name: "desktop-shortcuts.js", lines: 113, type: "JS" },
        { name: "dock-extras.css", lines: 26, type: "CSS" },
        { name: "dock-reorder.js", lines: 109, type: "JS" },
        { name: "trash.js", lines: 58, type: "JS" }
      ]
    },
    {
      name: "System Monitor", icon: "📊", count: 16,
      files: [
        { name: "app-monitor-details.css", lines: 98, type: "CSS" },
        { name: "app-monitor-tabs.css", lines: 120, type: "CSS" },
        { name: "app-monitor.css", lines: 145, type: "CSS" },
        { name: "app-monitor.js", lines: 70, type: "JS" },
        { name: "monitor-alerts.js", lines: 75, type: "JS" },
        { name: "monitor-cpu.js", lines: 60, type: "JS" },
        { name: "monitor-graphs.js", lines: 54, type: "JS" },
        { name: "monitor-memory.js", lines: 69, type: "JS" },
        { name: "monitor-process.js", lines: 102, type: "JS" },
        { name: "monitor-refresh.js", lines: 35, type: "JS" },
        { name: "monitor-system.js", lines: 129, type: "JS" },
        { name: "monitor-tab-cpu.js", lines: 111, type: "JS" },
        { name: "monitor-tab-gpu.js", lines: 107, type: "JS" },
        { name: "monitor-tab-memory.js", lines: 107, type: "JS" },
        { name: "monitor-tab-overview-actions.js", lines: 148, type: "JS" },
        { name: "monitor-tab-overview.js", lines: 128, type: "JS" }
      ]
    },
    {
      name: "Settings & Developer", icon: "⚙️", count: 22,
      files: [
        { name: "app-settings-about.css", lines: 115, type: "CSS" },
        { name: "app-settings-changelog.css", lines: 49, type: "CSS" },
        { name: "app-settings-layout.css", lines: 50, type: "CSS" },
        { name: "app-settings.js", lines: 59, type: "JS" },
        { name: "settings-about-os-components.css", lines: 101, type: "CSS" },
        { name: "settings-about-os-hero.js", lines: 73, type: "JS" },
        { name: "settings-about-os-layout.css", lines: 138, type: "CSS" },
        { name: "settings-about-os-sections.js", lines: 137, type: "JS" },
        { name: "settings-about-os.js", lines: 31, type: "JS" },
        { name: "settings-about-pc.js", lines: 58, type: "JS" },
        { name: "settings-apps.js", lines: 78, type: "JS" },
        { name: "settings-developer-components.css", lines: 132, type: "CSS" },
        { name: "settings-developer-history.js", lines: 52, type: "JS" },
        { name: "settings-developer-layout.css", lines: 116, type: "CSS" },
        { name: "settings-developer-metrics.js", lines: 123, type: "JS" },
        { name: "settings-developer.js", lines: 127, type: "JS" },
        { name: "settings-general.js", lines: 71, type: "JS" },
        { name: "settings-lock.css", lines: 108, type: "CSS" },
        { name: "settings-metrics-data.js", lines: 18, type: "JS" },
        { name: "settings-metrics-files.js", lines: 26, type: "JS" },
        { name: "settings-metrics-groups-2.js", lines: 93, type: "JS" },
        { name: "settings-metrics-groups.js", lines: 108, type: "JS" }
      ]
    },
    {
      name: "App Store", icon: "🛒", count: 10,
      files: [
        { name: "app-store.css", lines: 138, type: "CSS" },
        { name: "app-store.js", lines: 103, type: "JS" },
        { name: "store-data.js", lines: 18, type: "JS" },
        { name: "store-detail.css", lines: 138, type: "CSS" },
        { name: "store-detail.js", lines: 128, type: "JS" },
        { name: "store-download.css", lines: 98, type: "CSS" },
        { name: "store-download.js", lines: 117, type: "JS" },
        { name: "store-install.js", lines: 126, type: "JS" },
        { name: "store-purchase.js", lines: 121, type: "JS" },
        { name: "store-wallet.js", lines: 66, type: "JS" }
      ]
    }
  ];
})();

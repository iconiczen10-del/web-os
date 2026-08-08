/* === FILE: settings-changelog-data.js === */
/**
 * WebOS Version History & Changelog Data
 */
(function () {
  const changelog = [
    {
      version: "v0.6.4",
      date: "August 2026",
      features: [
        "Custom hardware branding across OS",
        "Cyclone 1st Gen X9 CPU (2C/4T @ 2.7 GHz)",
        "Star R Pro GPU (2GB GDDR5, Star Kepler)",
        "Black U5000 RAM (8GB DDR4 @ 5000 MHz)",
        "Bolt NV-256 Storage (256GB NVMe M.2 SSD)",
        "Bolt B350-M Motherboard & Volt 450W PSU",
        "Updated System Monitor, About PC, Terminal neofetch, and Boot Messages"
      ]
    },
    {
      version: "v0.6.3",
      date: "August 2026",
      features: [
        "Realistic boot screen on page load with 3.2 second sequence",
        "CSS-drawn WebOS window logo with pulsing glow",
        "Animated progress bar with non-linear timing and shimmer effect",
        "Boot message log showing system initialization steps",
        "Fade transition from boot screen to desktop",
        "Input blocking during boot sequence"
      ]
    },

    {
      version: "v0.6.2",
      date: "August 2026",
      features: [
        "Redesigned About OS with CSS-drawn window logo",
        "Detailed system information table with live uptime",
        "Credit cards with roles and descriptions",
        "MIT License display in scrollable block",
        "Version History extracted to its own Settings tab",
        "Easter egg: click logo 5 times for surprise"
      ]
    },
    {
      version: "v0.6.1",
      date: "August 2026",
      features: [
        "App uninstall system via App Store, desktop right-click, and Settings",
        "Custom styled confirmation dialog",
        "Mbank protection from uninstallation",
        "Paid app uninstall note (no refunds)",
        "Version history updated"
      ]
    },
    {
      version: "v0.6",
      date: "August 2026",
      features: [
        "App Store with 10 virtual web applications",
        "Mbank Virtual Wallet payment gateway & balance tracking",
        "App installation engine syncing Dock and Desktop",
        "Web applications: Weather, Terminal, Music, Paint, Clock, Browser, Calendar, Game Center, Video Editor"
      ]
    },
    {
      version: "v0.5.1",
      date: "August 2026",
      features: [
        "Settings sidebar navigation",
        "About PC section with live hardware specs",
        "About OS section with branding",
        "Full version changelog"
      ]
    },
    {
      version: "v0.5",
      date: "July 2026",
      features: [
        "Window edge snapping to half/full screen",
        "Snap zone overlays while dragging",
        "Dock icon drag-to-reorder with smooth animations",
        "Desktop shortcuts with grid snapping",
        "Trash dock icon with drag-to-delete",
        "Spring-like dock animations"
      ]
    },
    {
      version: "v0.4.1",
      date: "July 2026",
      features: [
        "System Monitor app with live CPU/RAM/GPU/Storage/Network metrics",
        "Real-time CPU bar chart",
        "Process table showing open apps",
        "Simulated performance data with visual indicators"
      ]
    },
    {
      version: "v0.4",
      date: "June 2026",
      features: [
        "Top menu bar with live clock and active app name",
        "Window minimize/maximize with animations",
        "Desktop right-click context menu",
        "Window focus visual states",
        "Window resize handles"
      ]
    },
    {
      version: "v0.3",
      date: "June 2026",
      features: [
        "Finder app with sidebar and file browsing",
        "Notes app with localStorage persistence",
        "Calculator app with full arithmetic",
        "Settings app with toggle switches"
      ]
    },
    {
      version: "v0.2",
      date: "June 2026",
      features: [
        "Window system with title bar and traffic lights",
        "Window dragging and z-index stacking",
        "Multiple app windows",
        "Glassmorphism window styling"
      ]
    },
    {
      version: "v0.1",
      date: "May 2026",
      features: [
        "Desktop with gradient wallpaper",
        "Bottom dock with app icons",
        "Dock hover animations",
        "Core project structure"
      ]
    }
  ];

  window.CHANGELOG_DATA = changelog;
  window.changelogData = changelog;
})();

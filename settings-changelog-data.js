/* === FILE: settings-changelog-data.js === */
/**
 * WebOS Version History & Changelog Data
 */
(function () {
  const changelog = [
    {
      version: "v0.7.1.1",
      date: "August 2026",
      features: [
        "System Monitor redesigned with 4 tabs: Overview, CPU, Memory, GPU",
        "Live CPU graph with per-core breakdown for Cyclone X9",
        "Live RAM graph with used/cached/free breakdown",
        "Live GPU graph with VRAM, temperature, and fan speed",
        "Real-time resource tracking — opening apps increases CPU/RAM/GPU",
        "Process table with End Process, Force Quit, and detail panel",
        "End All Processes button to close all windows",
        "Resource alerts for high CPU, memory, and GPU usage",
        "Process details panel showing PID, threads, uptime",
        "All graphs animate live every 500ms as OS is used",
        "Global version sync to v0.7.1.1"
      ]
    },
    {
      version: "v0.7.1",
      date: "August 2026",
      features: [
        "Global version number sync across entire OS",
        "Updated version strings in boot screen, About OS, About PC, Terminal, System Monitor, Browser, and desktop",
        "Consistent branding everywhere"
      ]
    },
    {
      version: "v0.7",
      date: "August 2026",
      features: [
        "Complete data wipe on every page refresh — true fresh start",
        "Mbank balance resets to $50.00 on every boot",
        "No persistence: all localStorage removed for user data",
        "Default internet speed: 200 KB/s (1.6 Mbps) with no BUYNET plan",
        "BUYNET plans now provide speed upgrades (6x to 625x)",
        "Version History re-locks every time you leave the tab",
        "Clean desktop with no shortcuts on every boot",
        "System apps only in dock on fresh boot",
        "All settings reset to defaults on refresh"
      ]
    },
    {
      version: "v0.6.6.3",
      date: "August 2026",
      features: [
        "Password-protected Version History tab in Settings",
        "Hardcoded password lock (9610) on changelog access",
        "Shake animation on incorrect password attempt",
        "Smooth fade transition on successful unlock"
      ]
    },
    {
      version: "v0.6.6.2",
      date: "August 2026",
      features: [
        "Split index.html into 3 files to prevent 150-line cap breach",
        "loader-css.js dynamically loads all CSS files in correct cascade order",
        "loader-js.js dynamically loads all JS files in dependency order"
      ]
    },
    {
      version: "v0.6.6.1",
      date: "August 2026",
      features: [
        "Wallpapers PCS app with 10 wallpapers (38MB–100MB each)",
        "Papers For PC Inc. company website (www.papersforpc.webos)"
      ]
    },
    {
      version: "v0.6.5",
      date: "August 2026",
      features: [
        "Browser system app transformation & pre-installed dock item",
        "Mbank migrated to online web service (www.mbank.webos)",
        "BUYNET high-speed ISP service & subscription tiers (www.buynet.webos)"
      ]
    },
    {
      version: "v0.6.4 - v0.1",
      date: "May - August 2026",
      features: [
        "Cyclone X9 CPU & Star R GPU branding",
        "Boot screen sequence & About OS branding",
        "App Store with 10 virtual web applications & Mbank wallet",
        "Window manager, snapping, dock, top bar, and desktop shortcuts"
      ]
    }
  ];

  window.CHANGELOG_DATA = changelog;
  window.changelogData = changelog;
})();

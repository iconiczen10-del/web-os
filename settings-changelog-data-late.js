/* === FILE: settings-changelog-data-late.js === */
/**
 * WebOS Changelog Data - Late Versions (v0.6.6.1 to v0.7.2.3)
 */
(function () {
  window.CHANGELOG_LATE = [
    {
      version: "v0.7.2.3",
      features: [
        "Tech Chronicle News Portal with 20 realistic WebOS news articles",
        "Category filtering (OS Release, Hardware, App Store, Security, AI, Fintech, Dev, Design)",
        "Real-time news article search across titles, categories, and summaries",
        "Featured Lead Story spotlight card with badge and reading time",
        "Full Article Reader Modal view with rich multi-paragraph realistic coverage",
        "Ecosystem coverage: Cyclone X9 CPU, Mbank, BUYNET Fiber, AI Talks Inc., Papers For PC Inc.",
        "Modular architecture: split into data, render, modal, and CSS sub-modules"
      ]
    },
    {
      version: "v0.7.2.2",
      features: [
        "New For Developers tab in Settings (password 9610)",
        "Developer tab with two sub-tabs: Version History and System Metrics",
        "Version History moved into Developer tab (no longer standalone)",
        "System Metrics shows total files (138), code lines (12,042), file types",
        "File groups with expandable file lists (13 groups)",
        "Full file list table with per-file line counts and type badges",
        "Settings sidebar cleaned up — 5 items instead of 6",
        "Developer tab re-locks every visit"
      ]
    },
    {
      version: "v0.7.2.1",
      features: [
        "Increased RAM consumption across all 17 apps",
        "Base system RAM increased from 1.2 GB to 1.5 GB",
        "Video Editor now uses 450-750 MB (was 200-350 MB)",
        "Game Center now uses 350-550 MB (was 150-250 MB)",
        "Browser now uses 200-400 MB (was 80-150 MB)",
        "AI Chat now uses 150-300 MB (was 50-85 MB)",
        "All apps RAM increased by 1.5x to 3x",
        "8 GB RAM limit now realistically reachable with multiple apps",
        "System feels heavier — closing apps frees noticeable RAM"
      ]
    },
    {
      version: "v0.7.2",
      features: [
        "AI Chat system app with 106+ knowledge base entries across Free, Plus, and Pro tiers",
        "Tier-gated math expression engine (+/- for Free, +/*/% for Plus, scientific functions for Pro)",
        "Pro Tier custom AI personalities: Friendly 😊, Professional 💼, and Sarcastic 🙄",
        "Mbank 3-step payment flow ($100 Plus, $300 Pro) with wallet validation",
        "In-memory user authentication system (Sign Up, Sign In, Sign Out)",
        "AI Talks Inc. official company website (www.aitalks.webos) with 300-word company profile",
        "Global OS version sync to v0.7.2"
      ]
    },
    {
      version: "v0.7.1.1.A",
      features: [
        "Version history rebuilt — every version as individual entry, no merged versions",
        "Additive changelog enforced — entries never modified or merged",
        "Global version sync to v0.7.1.1.A"
      ]
    },
    {
      version: "v0.7.1.1",
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
      features: [
        "Global version number sync across entire OS",
        "Updated version strings in boot screen, About OS, About PC, Terminal, System Monitor, Browser, desktop",
        "Consistent branding everywhere"
      ]
    },
    {
      version: "v0.7",
      features: [
        "Complete data wipe on every page refresh — true fresh start",
        "Mbank balance resets to $50.00 on every boot",
        "No persistence: all localStorage removed for user data",
        "Default internet speed: 200 KB/s with no BUYNET plan",
        "Version History re-locks every time you leave the tab",
        "Clean desktop with no shortcuts on every boot",
        "System apps only in dock on fresh boot"
      ]
    },
    {
      version: "v0.6.6.3",
      features: [
        "Password-protected Version History tab in Settings",
        "Hardcoded password lock (9610) on changelog access",
        "Shake animation on incorrect password attempt",
        "Smooth fade transition on successful unlock",
        "Session-only lock state (resets on page reload)"
      ]
    },
    {
      version: "v0.6.6.2",
      features: [
        "Split index.html into 3 files to prevent 150-line cap breach",
        "index.html is now a minimal skeleton (~25 lines)",
        "loader-css.js dynamically loads all CSS files in correct cascade order",
        "loader-js.js dynamically loads all JS files in dependency order",
        "Dock HTML and desktop shortcuts injected by loader-js.js"
      ]
    },
    {
      version: "v0.6.6.1",
      features: [
        "Wallpapers PCS app with 10 wallpapers (38MB–100MB each)",
        "Free tier (4 wallpapers) and Pro tier ($4.99/month for all 10)",
        "Dummy login/signup system",
        "Real Mbank payment integration for Pro subscription",
        "Wallpaper preview and one-click apply to desktop",
        "Papers For PC Inc. company website (www.papersforpc.webos)",
        "Company website with Home, About, Products, Contact, Press, Careers pages"
      ]
    }
  ];
})();

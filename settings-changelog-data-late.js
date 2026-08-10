/* === FILE: settings-changelog-data-late.js === */
/**
 * WebOS Changelog Data - Late Versions (v0.6 to v0.7.1.1.A)
 */
(function () {
  window.CHANGELOG_LATE = [
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
    },
    {
      version: "v0.6.5",
      features: [
        "Browser upgraded to built-in system app",
        "Mbank moved to browser as website (www.mbank.webos)",
        "BUYNET internet plans website with 5 subscription tiers",
        "Browser address bar with URL navigation and routing",
        "Browser bookmarks bar with quick links",
        "Browser search engine with results page",
        "Browser history with back/forward navigation",
        "Realistic App Store download system with progress bars",
        "Download speeds based on active BUYNET plan",
        "App sizes updated to realistic values (45MB–2.1GB)"
      ]
    },
    {
      version: "v0.6.4",
      features: [
        "Custom hardware branding across entire OS",
        "Cyclone 1st Gen X9 CPU (2C/4T @ 2.7 GHz)",
        "Star R Pro GPU (2GB GDDR5, Star Kepler architecture)",
        "Black U5000 RAM (8GB DDR4 @ 5000 MHz)",
        "Bolt NV-256 Storage (256GB NVMe M.2 SSD)",
        "Updated System Monitor, About PC, Terminal neofetch, boot messages"
      ]
    },
    {
      version: "v0.6.3",
      features: [
        "Realistic boot screen with logo, progress bar, and boot messages",
        "CSS-drawn WebOS window logo with pulsing glow",
        "Animated progress bar with shimmer effect",
        "Input blocking during boot sequence"
      ]
    },
    {
      version: "v0.6.2",
      features: [
        "Redesigned About OS with CSS-drawn window logo",
        "Detailed system information table with live uptime",
        "Credit cards with roles and descriptions",
        "MIT License display in scrollable block",
        "Version History extracted to its own Settings tab",
        "Easter egg: click logo 5 times for surprise"
      ]
    }
  ];
})();

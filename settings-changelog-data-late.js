/* === FILE: settings-changelog-data-late.js === */
/**
 * WebOS Changelog Data - Late Versions (v0.6.6.1 to v0.7.4)
 */
(function () {
  window.CHANGELOG_LATE = [
    {
      version: "v0.7.4.1",
      features: [
        "New Developer Portal website at www.dev.webos with 5-stage gate",
        "Stage 1: Dummy login/signup system with field validation",
        "Stage 2: 5-question WebOS knowledge verification quiz",
        "Stage 3: Easter egg discovery challenge",
        "Stage 4: $40 payment via Mbank (4-step transaction)",
        "Stage 5: Full access with 7 tabs (Home, Docs, Puzzle, Metrics, Secrets, FAQ, Owner)",
        "Puzzle tab with 4 clues for finding the developer password",
        "Metrics tab with file counts, line counts, and file groups",
        "Secrets tab listing all hidden commands and easter eggs",
        "Owner tab with creator credit and project stats",
        "Removed all HH1 Architecture mentions from user-visible OS text"
      ]
    },
    {
      version: "v0.7.4",
      features: [
        "AI Chat Knowledge Topics tab for Pro Tier subscribers",
        "System Metrics updated to 158 total files and 13,542 code lines across 13 file groups",
        "AI Chat welcome message shows all knowledge categories",
        "Smart word matching: scans every word in user input for matches",
        "Priority-based match system (hardware > webos > commands > general > coding)",
        "Multiple match handling: shows best match + suggests other found topics",
        "Zero dead ends: unknown input always returns help topics",
        "Tier-aware help command showing available/locked features",
        "Free tier: heavy marketing with ads every 2 messages and upgrade prompts",
        "Plus tier: light Pro marketing, no banner ads",
        "Pro tier: completely clean, no marketing, all features",
        "topics, examples, and category browsing commands",
        "AI typing indicator with tier-based delays",
        "Message counter with color warnings near limits"
      ]
    },
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
        "Live CPU, RAM, and GPU graphs with real-time resource tracking",
        "Process table with End Process, Force Quit, and End All Processes",
        "Resource alerts for high CPU, memory, and GPU usage",
        "Global version sync to v0.7.1.1"
      ]
    },
    {
      version: "v0.7.1",
      features: [
        "Global version number sync across entire OS",
        "Updated version strings in boot screen, About OS, About PC, Terminal, System Monitor, Browser, desktop"
      ]
    },
    {
      version: "v0.7",
      features: [
        "Complete data wipe on every page refresh — true fresh start",
        "Mbank balance resets to $50.00 on every boot",
        "No persistence: all localStorage removed for user data"
      ]
    },
    {
      version: "v0.7.1.1.A",
      features: ["Additive changelog enforced — entries never modified or merged"]
    }
  ];
})();

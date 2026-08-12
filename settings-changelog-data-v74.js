/* === FILE: settings-changelog-data-v74.js === */
/**
 * WebOS Changelog Data - v0.7.4.x Versions
 */
(function () {
  window.CHANGELOG_V74 = [
    {
      version: "v0.7.4.3",
      features: [
        "Developer Terminal v1 added as 3rd sub-tab in Settings → For Developers (password 9610)",
        "Commands: money-[amount], download-all, help, clear, exit",
        "Quick Numbers 1-4 for fast terminal navigation and execution",
        "Mbank wallet deposit API (depositFunds with custom descriptions)",
        "Instant batch application installation (downloadAllApps)",
        "Dark monospace terminal UI with command history arrow cycling",
        "Global OS version sync to v0.7.4.3 across Boot, Terminal, Settings, and About"
      ]
    },
    {
      version: "v0.7.4.2",
      features: [
        "AI Chat Knowledge Browser tab with 90 topics and 463+ question variants",
        "Tier-gated Knowledge Browser access (Free 15%, Plus 60%, Pro 100%)",
        "Category collapsible sections with topic counts, search bar, and access progress bars",
        "Click-to-ask question variants with auto-sending to AI Chat",
        "Locked question 🔒 badges with tier requirements and upgrade flow",
        "Max AI Database 4th subscription tier ($600 base price)",
        "3 Verification Gates: Security Qs, Ultimate 1 Gbps BUYNET plan, Website exploration",
        "AI Talks website tab visit tracking integration",
        "1-Minute Live Countdown Timer with warning transitions and overlay",
        "Price escalation formula: 3x per purchase ($600, $1,800, $5,400, $16,200...)",
        "Tier expiry reasons and maximum access limit protection",
        "Global OS version sync to v0.7.4.2 across Boot, Terminal, Settings, and About"
      ]
    },
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
        "Owner tab with creator credit and project stats"
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
        "Pro tier: completely clean, no marketing, all features"
      ]
    }
  ];
})();

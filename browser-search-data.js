/* === FILE: browser-search-data.js === */
/**
 * WebOS v0.7 Search Index Data
 */
(function () {
  const SEARCH_DATABASE = [
    {
      title: "Mbank Virtual Banking",
      url: "www.mbank.webos",
      description: "Manage your virtual funds, top up your wallet balance, view real-time card transactions, and transfer money securely inside WebOS.",
      keywords: ["mbank", "bank", "money", "wallet", "balance", "card", "deposit", "transfer", "finance"]
    },
    {
      title: "BUYNET — WebOS High-Speed Internet ISP",
      url: "www.buynet.webos",
      description: "Upgrade your internet connection speed up to 1 Gbps. Choose from 5 subscription tiers using your Mbank wallet balance.",
      keywords: ["buynet", "internet", "isp", "speed", "plan", "wifi", "network", "bandwidth", "subscribe", "download"]
    },
    {
      title: "WebOS App Store",
      url: "www.store.webos",
      description: "Discover, download, and purchase games, productivity apps, and utilities designed for WebOS.",
      keywords: ["store", "apps", "app store", "games", "download", "purchase", "install", "utilities"]
    },
    {
      title: "About WebOS Ecosystem",
      url: "webos://about",
      description: "Learn about the architecture of WebOS v0.7 — an offline-first modular operating system running entirely in your browser.",
      keywords: ["about", "webos", "system", "os", "architecture", "version", "offline"]
    },
    {
      title: "Tech Chronicle — WebOS News",
      url: "webos://news",
      description: "Read the latest release updates, release notes, and tech news regarding the WebOS browser ecosystem.",
      keywords: ["news", "tech", "updates", "changelog", "release", "chronicle"]
    },
    {
      title: "Game Center Hub",
      url: "www.store.webos#gamecenter",
      description: "Premium gaming suite for WebOS featuring player achievements, global leaderboards, and game stats.",
      keywords: ["game", "games", "gamecenter", "gaming", "play", "leaderboards"]
    },
    {
      title: "Papers For PC Inc.",
      url: "www.papersforpc.webos",
      description: "Official company website of Papers For PC Inc., creators of Wallpapers PCS for WebOS.",
      keywords: ["papers", "papersforpc", "pc papers", "company", "wallpapers", "about", "careers"]
    },
    {
      title: "Wallpapers PCS — Desktop Background Suite",
      url: "www.store.webos#wallpapers",
      description: "Beautiful wallpapers for your desktop. Browse 10 stunning gradient designs with free and pro tiers.",
      keywords: ["wallpapers", "backgrounds", "desktop wallpaper", "desktop", "images", "pcs", "free", "pro"]
    }
  ];

  window.browserSearchData = {
    getDatabase: function () {
      return SEARCH_DATABASE;
    }
  };
})();

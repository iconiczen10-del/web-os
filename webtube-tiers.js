/* === FILE: webtube-tiers.js === */
/**
 * WebOS v0.8.3 WebTube Subscription Tier Model & Feature Access System
 */
(function () {
  const TIERS = {
    free: {
      id: "free",
      name: "Free",
      price: 0,
      badge: "FREE",
      color: "#8e8e93",
      adsIntensity: 9,
      videoAccessPct: 30, // 3 videos
      accessibleCount: 3,
      maxQuality: "360p",
      maxFps: 20,
      comments: "none",
      likes: false,
      downloads: false,
      playlists: false,
      earlyAccess: false,
      customTheme: false
    },
    pro: {
      id: "pro",
      name: "Pro",
      price: 49.99,
      badge: "PRO",
      color: "#0a84ff",
      adsIntensity: 7,
      videoAccessPct: 50, // 5 videos
      accessibleCount: 5,
      maxQuality: "720p",
      maxFps: 30,
      comments: "read",
      likes: true,
      downloads: false,
      playlists: false,
      earlyAccess: false,
      customTheme: false
    },
    master: {
      id: "master",
      name: "Master",
      price: 149.99,
      badge: "MASTER",
      color: "#ffd700",
      adsIntensity: 5,
      videoAccessPct: 75, // 7 videos
      accessibleCount: 7,
      maxQuality: "1080p",
      maxFps: 45,
      comments: "write",
      likes: true,
      downloads: true,
      playlists: true,
      earlyAccess: false,
      customTheme: false
    },
    max: {
      id: "max",
      name: "Max",
      price: 299.99,
      badge: "MAX",
      color: "#ff2020",
      adsIntensity: 2,
      videoAccessPct: 100, // 10 videos (all)
      accessibleCount: 10,
      maxQuality: "4K",
      maxFps: 60,
      comments: "premium",
      likes: true,
      downloads: true,
      playlists: true,
      earlyAccess: true,
      customTheme: true
    }
  };

  let currentTier = "free";
  let activeTheme = "gold"; // 'gold' or 'red'

  function getCurrentTier() {
    return TIERS[currentTier] || TIERS.free;
  }

  function setTier(tierId) {
    if (TIERS[tierId]) {
      currentTier = tierId;
      localStorage.setItem("webos_webtube_tier", tierId);
    }
  }

  function initTier() {
    const saved = localStorage.getItem("webos_webtube_tier");
    if (saved && TIERS[saved]) {
      currentTier = saved;
    }
  }

  function isVideoAccessible(tierId, videoIndex) {
    const t = TIERS[tierId] || getCurrentTier();
    return videoIndex < t.accessibleCount;
  }

  function getQualityCapped(tierQuality, internetSpeedMbps) {
    // Speed restrictions
    let speedCap = "360p";
    if (internetSpeedMbps >= 1000) speedCap = "4K";
    else if (internetSpeedMbps >= 250) speedCap = "1440p";
    else if (internetSpeedMbps >= 100) speedCap = "1080p";
    else if (internetSpeedMbps >= 50) speedCap = "720p";
    else if (internetSpeedMbps >= 10) speedCap = "480p";
    else speedCap = "360p";

    const qualityRank = { "360p": 1, "480p": 2, "720p": 3, "1080p": 4, "1440p": 5, "4K": 6 };
    const tierRank = qualityRank[tierQuality] || 1;
    const netRank = qualityRank[speedCap] || 1;

    const finalRank = Math.min(tierRank, netRank);
    const revLookup = ["360p", "480p", "720p", "1080p", "1440p", "4K"];
    return revLookup[finalRank - 1];
  }

  function getFpsForQuality(quality) {
    const fpsMap = { "360p": 20, "480p": 24, "720p": 30, "1080p": 45, "1440p": 55, "4K": 60 };
    return fpsMap[quality] || 30;
  }

  initTier();

  window.webtubeTiers = {
    TIERS,
    getCurrentTier,
    setTier,
    isVideoAccessible,
    getQualityCapped,
    getFpsForQuality,
    getActiveTheme: () => activeTheme,
    setActiveTheme: (th) => { activeTheme = th; }
  };
})();

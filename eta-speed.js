/* === FILE: eta-speed.js === */
/**
 * WebOS v0.10.0 ETA Speed Provider
 * Reads BUYNET plan and returns network speed in MB/s.
 */
(function () {
  const SPEED_MAP = {
    none: { speedMBps: 0.2, speedMbps: 1.6, label: "Default (200 KB/s)" },
    starter: { speedMBps: 1.25, speedMbps: 10, label: "Starter (1.25 MB/s)" },
    everyday: { speedMBps: 6.25, speedMbps: 50, label: "Everyday (6.25 MB/s)" },
    performance: { speedMBps: 12.5, speedMbps: 100, label: "Performance (12.5 MB/s)" },
    pro: { speedMBps: 31.25, speedMbps: 250, label: "Pro (31.25 MB/s)" },
    ultimate: { speedMBps: 125.0, speedMbps: 1000, label: "Ultimate (125 MB/s)" }
  };

  function getCurrentSpeed() {
    if (window._wifiDisabled) {
      return { speedMBps: 0, speedMbps: 0, label: "Disconnected (Wi-Fi Disabled)", planName: "Offline", isOffline: true };
    }

    const buynet = window.buynetManager;
    const plan = buynet && typeof buynet.getActivePlan === "function" ? buynet.getActivePlan() : null;

    if (!plan || !plan.id) {
      return { ...SPEED_MAP.none, planName: "No Plan (Default)", planId: "none" };
    }

    const planId = plan.id.toLowerCase();
    const mapped = SPEED_MAP[planId] || { speedMBps: (plan.speedMbps || 10) / 8, speedMbps: plan.speedMbps || 10, label: plan.speedStr || "10 Mbps" };
    return { ...mapped, planName: plan.name || "Custom Plan", planId };
  }

  function getRecommendation(sizeMB) {
    const current = getCurrentSpeed();
    if (current.isOffline) return "Enable BoltLink Wi-Fi adapter in Device Manager to proceed.";
    if (current.speedMBps < 5 && sizeMB > 500) {
      return "💡 Tip: Upgrade to Everyday (6.25 MB/s) or Ultimate (125 MB/s) on BUYNET for instant downloads.";
    }
    if (current.speedMBps < 15 && sizeMB > 2000) {
      return "💡 Tip: Pro & Ultimate plans download multi-gigabyte files in seconds.";
    }
    return "⚡ Network bandwidth optimal for this request.";
  }

  window.etaSpeed = {
    getCurrentSpeed,
    getRecommendation,
    SPEED_MAP
  };
})();

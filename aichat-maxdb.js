/* === FILE: aichat-maxdb.js === */
/**
 * Max AI Database - State, Price Escalation, and Entry Point Orchestrator
 */
(function () {
  let purchaseCount = 0;
  let activeTimer = null;
  let remainingSeconds = 60;
  let activeViewMode = "closed"; // "gates", "payment", "active", "expired", "locked"

  const EXPIRY_REASONS = [
    "📈 HIGH DEMAND: Unprecedented demand. Limited server capacity. Prices adjusted to manage load.",
    "🖥️ SERVER LOAD: Repeated access has strained infrastructure. Adjusted to maintain performance.",
    "💎 PREMIUM EXCLUSIVITY: Now a premium exclusive tier. Fewer users. Better experience.",
    "🔧 DATA MAINTENANCE: Knowledge base expansion requires investment. You're paying for growth.",
    "🛡️ ANTI-ABUSE MEASURES: Frequent access triggered security protocols. Premium anti-abuse pricing.",
    "🔒 ACCESS RESTRICTED: Maximum individual access limit reached. Contact support@aitalks.webos."
  ];

  function getPurchaseCount() { return purchaseCount; }

  function getCurrentPrice() {
    if (purchaseCount >= 6) return -1; // Locked
    return 600 * Math.pow(3, purchaseCount);
  }

  function getExpiryReason(count) {
    const idx = typeof count === "number" ? count : Math.max(0, purchaseCount - 1);
    if (idx >= EXPIRY_REASONS.length) return EXPIRY_REASONS[EXPIRY_REASONS.length - 1];
    return EXPIRY_REASONS[idx];
  }

  function getTransactionDescription(count) {
    const c = count || (purchaseCount + 1);
    if (c === 1) return "Max AI Database — $600.00";
    if (c === 2) return "Max AI Database (2nd access) — $1,800.00";
    if (c === 3) return "Max AI Database (3rd access) — $5,400.00";
    if (c === 4) return "Max AI Database (4th access) — $16,200.00";
    if (c === 5) return "Max AI Database (5th access) — $48,600.00";
    if (c === 6) return "Max AI Database (6th access) — $145,800.00";
    return "Max AI Database Access";
  }

  function recordPurchase() {
    purchaseCount++;
  }

  function getRemainingSeconds() { return remainingSeconds; }
  function setRemainingSeconds(sec) { remainingSeconds = sec; }

  window.maxDB = {
    getPurchaseCount,
    getCurrentPrice,
    getExpiryReason,
    getTransactionDescription,
    recordPurchase,
    getRemainingSeconds,
    setRemainingSeconds
  };
})();

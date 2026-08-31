/* === FILE: eta-balance.js === */
/**
 * WebOS v0.10.0 ETA Balance Check Module
 * Validates Mbank virtual wallet balance for priced downloads.
 */
(function () {
  function checkBalance(price) {
    const cost = Number(price) || 0;
    if (cost <= 0) {
      return { passed: true, cost: 0, status: "pass", icon: "✅", message: "Free Download ($0.00)" };
    }

    const wallet = window.storeWallet;
    const balance = wallet ? wallet.getBalance() : 0;
    const passed = balance >= cost;

    return {
      passed,
      cost,
      balance,
      status: passed ? "pass" : "fail",
      icon: passed ? "✅" : "❌",
      message: passed
        ? `Sufficient Funds: $${balance.toFixed(2)} ($${cost.toFixed(2)} charge)`
        : `Insufficient Funds: $${balance.toFixed(2)} available, $${cost.toFixed(2)} required`
    };
  }

  window.etaBalance = { checkBalance };
})();

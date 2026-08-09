/* === FILE: wallpapers-subscription.js === */
/**
 * WebOS v0.7 Wallpapers PCS Subscription Manager
 * Fully in-memory state. Resets on boot (free tier default).
 */
(function () {
  const PRO_PRICE = 4.99;
  let subscription = null;

  function getSubscription() {
    if (subscription && subscription.tier === "pro" && !isExpired(subscription)) {
      return subscription;
    }
    return null;
  }

  function isExpired(sub) {
    if (!sub || !sub.expiresAt) return true;
    return Date.now() > sub.expiresAt;
  }

  function isPro() {
    return getSubscription() !== null;
  }

  function subscribeToPro() {
    if (isPro()) {
      return { success: true, message: "You are already a Pro subscriber!" };
    }

    if (!window.storeWallet || typeof window.storeWallet.canAfford !== "function") {
      return { success: false, message: "Mbank Wallet system unavailable." };
    }

    if (!window.storeWallet.canAfford(PRO_PRICE)) {
      const current = typeof window.storeWallet.getBalance === "function" ? window.storeWallet.getBalance() : 0;
      return {
        success: false,
        message: `Insufficient Mbank wallet balance ($${current.toFixed(2)}). Pro subscription costs $${PRO_PRICE.toFixed(2)}. Please top up your wallet in Mbank.`,
        needTopUp: true
      };
    }

    const deducted = window.storeWallet.deductFunds(PRO_PRICE, "Wallpapers PCS Pro Subscription");
    if (!deducted) {
      return { success: false, message: "Payment processing failed in Mbank Wallet." };
    }

    const now = Date.now();
    subscription = {
      tier: "pro",
      subscribedAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000
    };

    return { success: true, message: "Welcome to Pro! All 10 wallpapers are now unlocked.", subscription };
  }

  function cancelSubscription() {
    subscription = null;
    return { success: true, message: "Subscription cancelled." };
  }

  function getExpiryDate() {
    const sub = getSubscription();
    if (!sub) return null;
    return new Date(sub.expiresAt).toLocaleDateString();
  }

  window.wallpapersSubscription = {
    PRO_PRICE,
    getSubscription,
    isPro,
    subscribeToPro,
    cancelSubscription,
    getExpiryDate
  };
})();

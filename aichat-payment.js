/* === FILE: aichat-payment.js === */
/**
 * AI Chat Mbank 3-Step Payment Processor
 */
(function () {
  function generateTxId() {
    return "#AI-" + Math.floor(10000 + Math.random() * 90000);
  }

  function checkCanAfford(tier) {
    const tierInfo = window.aiSubscription ? window.aiSubscription.getTierInfo(tier) : { price: 0 };
    if (!tierInfo || tierInfo.price === 0) return true;
    if (window.storeWallet && typeof window.storeWallet.canAfford === "function") {
      return window.storeWallet.canAfford(tierInfo.price);
    }
    return false;
  }

  function getWalletBalance() {
    if (window.storeWallet && typeof window.storeWallet.getBalance === "function") {
      return window.storeWallet.getBalance();
    }
    return 50.00;
  }

  async function processPayment(tier) {
    const tierInfo = window.aiSubscription ? window.aiSubscription.getTierInfo(tier) : { name: "Unknown", price: 0 };
    const price = tierInfo.price;

    if (price > 0) {
      if (!checkCanAfford(tier)) {
        return {
          success: false,
          error: `Insufficient Mbank wallet balance. Price: $${price.toFixed(2)}, Current Balance: $${getWalletBalance().toFixed(2)}. Top up your wallet on www.mbank.webos!`
        };
      }

      if (window.storeWallet && typeof window.storeWallet.deductFunds === "function") {
        window.storeWallet.deductFunds(price, `AI Chat Subscription — ${tierInfo.name}`);
      }
    }

    if (window.aiSubscription) {
      window.aiSubscription.setTier(tier);
    }

    const txId = generateTxId();
    const newBalance = getWalletBalance();

    return {
      success: true,
      txId: txId,
      tierName: tierInfo.name,
      price: price,
      newBalance: newBalance
    };
  }

  window.aiPayment = {
    checkCanAfford,
    getWalletBalance,
    processPayment
  };
})();

/* === FILE: aichat-subscription.js === */
/**
 * AI Chat Subscription Manager
 */
(function () {
  let activeTier = "free";

  const TIERS = {
    free: {
      id: "free",
      name: "Free Plan",
      price: 0,
      messages: 5,
      delay: "1.5s",
      features: [
        "5 messages per session",
        "30 knowledge base entries",
        "Basic addition & subtraction only",
        "3 programming jokes",
        "1.5s response delay",
        "Banner ads included"
      ]
    },
    plus: {
      id: "plus",
      name: "Plus Plan",
      price: 100,
      messages: 50,
      delay: "0.5s",
      features: [
        "50 messages per session",
        "70 knowledge base entries",
        "Advanced math (+, -, *, /, %)",
        "Basic coding tips & quotes",
        "0.5s response delay",
        "Ad-free experience"
      ]
    },
    pro: {
      id: "pro",
      name: "Pro Plan",
      price: 300,
      messages: "Unlimited",
      delay: "0s (Instant)",
      features: [
        "Unlimited messages",
        "106+ complete knowledge base",
        "Scientific math (sqrt, pow, sin, cos, etc.)",
        "Full code generation suite",
        "Custom AI personalities (Friendly, Professional, Sarcastic)",
        "Instant 0ms responses",
        "Premium Pro badge & ad-free"
      ]
    }
  };

  function getCurrentTier() { return activeTier; }
  function setTier(tier) { if (TIERS[tier]) activeTier = tier; }
  function getTierInfo(tier) { return TIERS[tier] || TIERS.free; }
  function getAllTiers() { return TIERS; }

  window.aiSubscription = {
    getCurrentTier,
    setTier,
    getTierInfo,
    getAllTiers
  };
})();

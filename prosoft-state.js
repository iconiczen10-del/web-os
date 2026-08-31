/* === FILE: prosoft-state.js === */
/**
 * WebOS v0.9.0 ProSoft Inc. State Store
 * Manages user purchases, waitlist status, and perks.
 */
(function () {
  let purchasedTier = null; // 'priority' | 'early' | 'dev' | 'founder'
  let waitlistPosition = 4827;
  let userEmail = "";
  let isWaitlisted = false;

  const PRODUCTS = [
    {
      id: "priority",
      name: "Priority Waitlist",
      price: 25,
      period: "One-time",
      desc: "Skip the queue directly to VIP spot #47 and receive launch alerts.",
      perks: ["Move from #4,827 → #47", "Instant launch notification", "Exclusive launch discount"]
    },
    {
      id: "early",
      name: "Early Access Pass",
      price: 99,
      period: "One-time",
      desc: "Instant access to private V3D v1 beta builds and demo scenes.",
      perks: ["Beta builds access", "Private demo scenes", "Early documentation", "Early Access badge"]
    },
    {
      id: "dev",
      name: "Developer Preview",
      price: 499,
      period: "One-time",
      desc: "Pre-release V3D SDK, 1-on-1 engineer support, and name in credits.",
      perks: ["Everything in Early Access", "Pre-release Dev Kit", "1-on-1 support", "Name in V3D credits"]
    },
    {
      id: "founder",
      name: "Founder's Edition",
      price: 999,
      period: "Lifetime",
      desc: "All-inclusive lifetime license, unlimited updates, and roadmap votes.",
      perks: ["Lifetime Dev Kit license", "Free updates forever", "Vote on engine roadmap", "Founder's Lounge access"]
    }
  ];

  function getProducts() {
    return PRODUCTS;
  }

  function getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
  }

  function getPurchasedTier() {
    return purchasedTier;
  }

  function setPurchasedTier(tierId) {
    purchasedTier = tierId;
    if (tierId === "priority" || tierId === "early" || tierId === "dev" || tierId === "founder") {
      waitlistPosition = 47;
      isWaitlisted = true;
    }
  }

  function getWaitlistInfo() {
    return {
      position: waitlistPosition,
      email: userEmail,
      isWaitlisted: isWaitlisted,
      isPriority: waitlistPosition <= 47 || purchasedTier !== null
    };
  }

  function joinWaitlist(email) {
    userEmail = email;
    isWaitlisted = true;
    return getWaitlistInfo();
  }

  function upgradeToPriority() {
    waitlistPosition = 47;
    isWaitlisted = true;
    if (!purchasedTier) purchasedTier = "priority";
    return getWaitlistInfo();
  }

  window.prosoftState = {
    getProducts,
    getProductById,
    getPurchasedTier,
    setPurchasedTier,
    getWaitlistInfo,
    joinWaitlist,
    upgradeToPriority
  };
})();

/* === FILE: browser-buynet.js === */
/**
 * WebOS v0.8.2 BUYNET Internet ISP Website & Manager
 * Default Speed: 200 KB/s (1.6 Mbps) when no plan is active.
 */
(function () {
  const DEFAULT_SPEED_MBPS = 1.6;
  let activePlan = null;

  const PLANS = [
    { id: "starter", name: "Starter", speedMbps: 10, speedStr: "10 Mbps", dataStr: "50 GB/mo", price: 9.99, features: "Basic browsing, email, messaging" },
    { id: "everyday", name: "Everyday", speedMbps: 50, speedStr: "50 Mbps", dataStr: "200 GB/mo", price: 19.99, features: "HD streaming, social media, online shopping" },
    { id: "performance", name: "Performance", speedMbps: 100, speedStr: "100 Mbps", dataStr: "500 GB/mo", price: 29.99, features: "4K streaming, online gaming, video calls" },
    { id: "pro", name: "Pro", speedMbps: 250, speedStr: "250 Mbps", dataStr: "1 TB/mo", price: 49.99, features: "Multi-device streaming, priority support, no throttling" },
    { id: "ultimate", name: "Ultimate", speedMbps: 1000, speedStr: "1 Gbps", dataStr: "Unlimited Data", price: 79.99, features: "Everything unlimited, VPN included, dedicated IP" }
  ];

  function getActivePlan() {
    return activePlan;
  }

  function getInternetSpeed() {
    if (window._wifiDisabled) return 0;
    return activePlan && activePlan.speedMbps ? activePlan.speedMbps : DEFAULT_SPEED_MBPS;
  }

  function renderBuynetPage(containerEl, onNavigate) {
    if (!containerEl) return;
    let messageHtml = "";

    function renderContent() {
      if (window._wifiDisabled) {
        containerEl.innerHTML = `
          <div class="buynet-page" style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 40px; margin-bottom: 8px;">📡❌</div>
            <div style="font-size: 20px; font-weight: 700; color: #ff453a; margin-bottom: 6px;">Connection Lost</div>
            <div style="font-size: 13px; color: #8e8e93; margin-bottom: 16px;">BoltLink Wi-Fi 5 adapter is disabled in Device Manager.</div>
            <button id="buynet-fix-btn" style="padding: 8px 16px; border-radius: 6px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer;">Open Device Manager</button>
          </div>
        `;
        const fBtn = containerEl.querySelector("#buynet-fix-btn");
        if (fBtn) fBtn.onclick = () => { if (typeof window.openApp === "function") window.openApp("settings"); };
        return;
      }

      const currentActive = getActivePlan();
      const cardsHtml = PLANS.map((p) => {
        const isActive = currentActive && currentActive.id === p.id;
        return `
          <div class="buynet-card ${isActive ? 'active' : ''}">
            ${isActive ? '<div class="buynet-active-badge">Active Plan</div>' : ''}
            <div>
              <div class="buynet-plan-name">${p.name}</div>
              <div class="buynet-plan-speed">${p.speedStr}</div>
              <div class="buynet-plan-data">${p.dataStr}</div>
              <div class="buynet-plan-price">$${p.price.toFixed(2)}<span style="font-size: 11px; color: #8e8e93; font-weight: normal;">/mo</span></div>
              <div class="buynet-plan-features">${p.features}</div>
            </div>
            <button class="buynet-subscribe-btn" data-plan-id="${p.id}" ${isActive ? 'disabled' : ''}>
              ${isActive ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        `;
      }).join("");

      containerEl.innerHTML = `
        <div class="buynet-page">
          <div class="buynet-header">
            <div class="buynet-logo-title">📡 BUYNET ISP</div>
            <div class="buynet-subtitle">High-Speed Fiber Internet for WebOS • Default Speed: 200 KB/s (No Plan)</div>
          </div>
          <div id="buynet-msg-area">${messageHtml}</div>
          <div class="buynet-grid">${cardsHtml}</div>
        </div>
      `;

      containerEl.querySelectorAll(".buynet-subscribe-btn:not(:disabled)").forEach((btn) => {
        btn.addEventListener("click", () => {
          const planId = btn.getAttribute("data-plan-id");
          const plan = PLANS.find((p) => p.id === planId);
          if (!plan) return;

          const wallet = window.storeWallet;
          if (wallet && wallet.canAfford(plan.price)) {
            wallet.deductFunds(plan.price, `BUYNET ${plan.name} Plan (${plan.speedStr})`);
            activePlan = {
              id: plan.id,
              name: plan.name,
              speedMbps: plan.speedMbps,
              speedStr: plan.speedStr,
              price: plan.price,
              subscribedAt: new Date().toISOString()
            };

            messageHtml = `
              <div class="buynet-alert buynet-alert-success">
                <span>✅ Successfully subscribed to <strong>${plan.name} (${plan.speedStr})</strong>! Your connection is active.</span>
              </div>
            `;
            renderContent();
          } else {
            const currentBal = wallet ? wallet.getBalance() : 0;
            const needMore = (plan.price - currentBal).toFixed(2);
            messageHtml = `
              <div class="buynet-alert buynet-alert-error">
                <span>⚠️ Insufficient Mbank balance ($${currentBal.toFixed(2)}). You need $${needMore} more.</span>
                <button id="buynet-goto-mbank" style="background: #ff453a; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px;">Open Mbank</button>
              </div>
            `;
            renderContent();
            const gotoBtn = containerEl.querySelector("#buynet-goto-mbank");
            if (gotoBtn) {
              gotoBtn.addEventListener("click", () => {
                if (typeof onNavigate === "function") onNavigate("www.mbank.webos");
              });
            }
          }
        });
      });
    }

    renderContent();
  }

  window.buynetManager = {
    getActivePlan,
    getInternetSpeed,
    renderBuynetPage
  };
})();

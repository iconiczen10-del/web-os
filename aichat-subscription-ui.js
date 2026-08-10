/* === FILE: aichat-subscription-ui.js === */
/**
 * AI Chat Subscription & Modal UI Orchestrator
 */
(function () {
  function renderPlanSelection(containerEl, onSelectPlan, onClose) {
    const tiers = window.aiSubscription ? window.aiSubscription.getAllTiers() : {};
    const current = window.aiSubscription ? window.aiSubscription.getCurrentTier() : "free";

    const cardsHtml = Object.keys(tiers).map(key => {
      const t = tiers[key];
      const isActive = current === key;
      const isFree = t.price === 0;

      return `
        <div style="background: rgba(22,27,34,0.9); border: 1px solid ${isActive ? '#238636' : 'rgba(255,255,255,0.1)'}; border-radius: 12px; padding: 14px; margin-bottom: 10px; position: relative;">
          ${isActive ? '<span style="position: absolute; top: 10px; right: 10px; background: #238636; color: #fff; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px;">CURRENT PLAN</span>' : ''}
          <div style="font-size: 16px; font-weight: 700; color: #fff;">${t.name}</div>
          <div style="font-size: 22px; font-weight: 800; color: #58a6ff; margin: 4px 0;">${isFree ? 'Free' : '$' + t.price.toFixed(2)}</div>
          <ul style="margin: 8px 0; padding-left: 18px; font-size: 11px; color: #8b949e; line-height: 1.5;">
            ${t.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <button class="aichat-btn ${isActive ? 'aichat-btn-secondary' : 'aichat-btn-primary'}" data-plan="${key}" ${isActive ? 'disabled style="opacity:0.5; cursor:default;"' : ''} style="width: 100%; margin-top: 6px;">
            ${isActive ? 'Active Plan' : 'Subscribe for $' + t.price}
          </button>
        </div>
      `;
    }).join('');

    containerEl.innerHTML = `
      <div style="padding: 16px; height: 100%; overflow-y: auto; box-sizing: border-box; background: #0d1117; color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; color: #fff;">Choose AI Chat Subscription</h3>
          <button id="close-sub-btn" class="aichat-btn aichat-btn-secondary">Back to Chat</button>
        </div>
        ${cardsHtml}
      </div>
    `;

    const closeBtn = containerEl.querySelector("#close-sub-btn");
    if (closeBtn) closeBtn.addEventListener("click", onClose);

    containerEl.querySelectorAll("button[data-plan]").forEach(btn => {
      btn.addEventListener("click", () => {
        const p = btn.getAttribute("data-plan");
        if (p && p !== current && typeof onSelectPlan === "function") {
          onSelectPlan(p);
        }
      });
    });
  }

  function renderPaymentConfirm(containerEl, tier, onConfirm, onCancel) {
    const tierInfo = window.aiSubscription ? window.aiSubscription.getTierInfo(tier) : { name: tier, price: 0 };
    const walletBal = window.aiPayment ? window.aiPayment.getWalletBalance() : 50;
    const isAffordable = window.aiPayment ? window.aiPayment.checkCanAfford(tier) : true;

    containerEl.innerHTML = `
      <div style="padding: 20px; text-align: center; background: #0d1117; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; color: #fff;">
        <div style="font-size: 36px; margin-bottom: 8px;">🏦</div>
        <h3 style="margin: 0 0 6px 0;">Confirm Mbank Payment</h3>
        <p style="font-size: 13px; color: #8b949e; margin-bottom: 16px;">Upgrading to <strong>${tierInfo.name}</strong></p>
        
        <div style="background: rgba(22,27,34,0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px; width: 100%; max-width: 280px; margin-bottom: 16px; text-align: left; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: #8b949e;">Subscription Price:</span>
            <span style="font-weight: 700; color: #fff;">$${tierInfo.price.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: #8b949e;">Mbank Wallet:</span>
            <span style="color: #30d158; font-weight: 600;">$${walletBal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
            <span style="color: #8b949e;">Remaining Balance:</span>
            <span style="font-weight: 700; color: ${isAffordable ? '#58a6ff' : '#ff7b72'};">$${Math.max(0, walletBal - tierInfo.price).toFixed(2)}</span>
          </div>
        </div>

        ${!isAffordable ? '<div style="color: #ff7b72; font-size: 11px; margin-bottom: 12px;">⚠️ Insufficient Mbank balance. Please top up on www.mbank.webos</div>' : ''}

        <div style="display: flex; gap: 8px; width: 100%; max-width: 280px;">
          <button id="p-cancel-btn" class="aichat-btn aichat-btn-secondary" style="flex: 1;">Cancel</button>
          <button id="p-confirm-btn" class="aichat-btn aichat-btn-primary" style="flex: 1;" ${!isAffordable ? 'disabled style="opacity:0.5; cursor:default;"' : ''}>Confirm Payment</button>
        </div>
      </div>
    `;

    const cancelBtn = containerEl.querySelector("#p-cancel-btn");
    const confirmBtn = containerEl.querySelector("#p-confirm-btn");

    if (cancelBtn) cancelBtn.addEventListener("click", onCancel);
    if (confirmBtn && isAffordable) confirmBtn.addEventListener("click", onConfirm);
  }

  window.aiSubscriptionUI = {
    renderPlanSelection,
    renderPaymentConfirm
  };
})();

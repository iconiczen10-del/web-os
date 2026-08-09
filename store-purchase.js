/* === FILE: store-purchase.js === */
/**
 * WebOS v0.6 Store Purchase Flow Manager
 */
(function () {
  function initiatePurchase(appData) {
    if (typeof window.closeAppDetail === "function") {
      window.closeAppDetail();
    }

    const overlay = document.createElement("div");
    overlay.className = "store-modal-overlay";
    overlay.id = "purchase-modal-overlay";

    overlay.innerHTML = `
      <div class="store-modal" onclick="event.stopPropagation()">
        <div class="store-modal-header" style="padding-bottom: 20px;">
          <div style="font-size: 40px; margin-bottom: 12px; animation: spin 1s infinite linear;">🔄</div>
          <div class="store-modal-name">Authorizing Payment...</div>
          <div class="store-modal-category">Connecting with Mbank secure gateway</div>
        </div>
      </div>
      <style>
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
      const wallet = window.storeWallet;
      if (wallet && wallet.canAfford(appData.price)) {
        wallet.deductFunds(appData.price, `App Store: ${appData.name}`);
        if (typeof window.installApp === "function") {
          window.installApp(appData.id);
        }
        showPurchaseSuccess(appData);
      } else {
        const bal = wallet ? wallet.getBalance() : 0;
        showPurchaseFailed(appData, bal);
      }
    }, 1500);
  }

  function showPurchaseSuccess(appData) {
    const overlay = document.createElement("div");
    overlay.className = "store-modal-overlay";

    const bal = window.storeWallet ? window.storeWallet.getBalance() : 0;

    overlay.innerHTML = `
      <div class="store-modal" onclick="event.stopPropagation()">
        <div class="store-modal-header">
          <div style="font-size: 56px; margin-bottom: 12px;">✅</div>
          <div class="store-modal-name">Purchase Complete</div>
          <div class="store-modal-category">App successfully purchased & installed</div>
        </div>
        <div class="store-modal-desc">
          <div style="font-size: 15px; color: #ffffff; font-weight: 600; margin-bottom: 6px;">${appData.name}</div>
          <div>Charged: <span style="color: #30d158; font-weight: 600;">$${appData.price.toFixed(2)}</span></div>
          <div style="margin-top: 4px; font-size: 11px; color: #888888;">Remaining Mbank Balance: $${bal.toFixed(2)}</div>
        </div>
        <div class="store-modal-actions">
          <button class="store-modal-btn store-modal-btn-primary" id="success-open-btn">Open App</button>
          <button class="store-modal-btn store-modal-btn-secondary" id="success-close-btn">Back to Store</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector("#success-close-btn").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#success-open-btn").addEventListener("click", () => {
      overlay.remove();
      if (window.windowManager) {
        window.windowManager.openWindow(appData.id);
      }
    });
  }

  function showPurchaseFailed(appData, currentBalance) {
    const overlay = document.createElement("div");
    overlay.className = "store-modal-overlay";

    const shortfall = appData.price - currentBalance;

    overlay.innerHTML = `
      <div class="store-modal" onclick="event.stopPropagation()">
        <div class="store-modal-header">
          <div style="font-size: 56px; margin-bottom: 12px;">⚠️</div>
          <div class="store-modal-name" style="color: #ff453a;">Insufficient Funds</div>
          <div class="store-modal-category">Your Mbank balance is too low</div>
        </div>
        <div class="store-modal-desc">
          <div>Price: <strong>$${appData.price.toFixed(2)}</strong> | Mbank Balance: <strong>$${currentBalance.toFixed(2)}</strong></div>
          <div style="color: #ff9f0a; margin-top: 6px;">Need $${shortfall.toFixed(2)} more to complete purchase.</div>
        </div>
        <div class="store-modal-actions">
          <button class="store-modal-btn store-modal-btn-primary" id="fail-mbank-btn">Open Mbank to Add Funds</button>
          <button class="store-modal-btn store-modal-btn-secondary" id="fail-close-btn">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector("#fail-close-btn").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#fail-mbank-btn").addEventListener("click", () => {
      overlay.remove();
      if (window.windowManager) {
        window.windowManager.openWindow("browser");
        if (window.browserNavigation) {
          window.browserNavigation.navigate("www.mbank.webos");
        }
      }
    });
  }

  window.initiatePurchase = initiatePurchase;
})();

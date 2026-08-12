/* === FILE: aichat-maxdb-pay.js === */
/**
 * Max AI Database - 4-Step Payment Flow Component
 */
(function () {
  function startPaymentFlow(containerEl, onPaymentSuccess, onCancel) {
    let step = 1;
    const price = window.maxDB ? window.maxDB.getCurrentPrice() : 600;
    const desc = window.maxDB ? window.maxDB.getTransactionDescription() : "Max AI Database Access";

    function draw() {
      const balance = window.storeWallet ? window.storeWallet.getBalance() : 10000;
      const canAfford = balance >= price;

      if (step === 1) {
        containerEl.innerHTML = `
          <div class="maxdb-pay-wrap">
            <div class="maxdb-pay-card">
              <h3>💳 Max AI Database Payment</h3>
              <div class="maxdb-pay-amount">$${price.toLocaleString("en-US", {minimumFractionDigits:2})}</div>
              <p class="maxdb-pay-sub">${desc} • 1 Minute Full Access</p>
              <div class="maxdb-pay-method"><input type="radio" checked disabled /> 🏦 Mbank Wallet (Available: $${balance.toFixed(2)})</div>
              <div class="maxdb-pay-actions">
                <button id="pay-cancel" class="maxdb-btn secondary">Cancel</button>
                <button id="pay-next" class="maxdb-btn primary">Review Order</button>
              </div>
            </div>
          </div>
        `;
        containerEl.querySelector("#pay-cancel").onclick = onCancel;
        containerEl.querySelector("#pay-next").onclick = () => { step = 2; draw(); };
      } else if (step === 2) {
        containerEl.innerHTML = `
          <div class="maxdb-pay-wrap">
            <div class="maxdb-pay-card">
              <h3>🛒 Confirm Order</h3>
              <div class="maxdb-pay-row"><span>Item:</span><span>${desc}</span></div>
              <div class="maxdb-pay-row"><span>Access Duration:</span><span>60 Seconds (1 Minute)</span></div>
              <div class="maxdb-pay-row"><span>Mbank Balance:</span><span>$${balance.toFixed(2)}</span></div>
              <div class="maxdb-pay-row highlight"><span>Amount Due:</span><span>$${price.toFixed(2)}</span></div>
              ${!canAfford ? `<div class="maxdb-pay-err">❌ Insufficient funds in Mbank Wallet. Need $${(price - balance).toFixed(2)} more.</div>` : ''}
              <div class="maxdb-pay-actions">
                <button id="pay-back" class="maxdb-btn secondary">Back</button>
                <button id="pay-confirm" class="maxdb-btn primary" ${!canAfford ? 'disabled' : ''}>Confirm & Pay $${price.toFixed(2)}</button>
              </div>
            </div>
          </div>
        `;
        containerEl.querySelector("#pay-back").onclick = () => { step = 1; draw(); };
        if (canAfford) {
          containerEl.querySelector("#pay-confirm").onclick = () => {
            if (window.storeWallet) window.storeWallet.deductFunds(price, desc);
            step = 3;
            draw();
          };
        }
      } else if (step === 3) {
        containerEl.innerHTML = `
          <div class="maxdb-pay-wrap center">
            <div class="maxdb-spinner"></div>
            <h3>Processing $${price.toFixed(2)} Mbank Transaction...</h3>
            <p>Unlocking Max AI Database Raw Access...</p>
          </div>
        `;
        setTimeout(() => {
          if (window.maxDB) window.maxDB.recordPurchase();
          step = 4;
          draw();
        }, 2000);
      } else if (step === 4) {
        const txId = "#MAX-" + Math.floor(100000 + Math.random() * 900000);
        containerEl.innerHTML = `
          <div class="maxdb-pay-wrap center">
            <div class="maxdb-success-icon">✅</div>
            <h2>Transaction Successful!</h2>
            <p>ID: <strong>${txId}</strong></p>
            <p>60-Second Max AI Database Access Activated!</p>
            <button id="pay-enter" class="maxdb-btn primary">Enter Max AI Database</button>
          </div>
        `;
        containerEl.querySelector("#pay-enter").onclick = onPaymentSuccess;
      }
    }

    draw();
  }

  window.maxDBPay = { startPaymentFlow };
})();

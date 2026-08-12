/* === FILE: browser-dev-pay.js === */
/**
 * Developer Portal Stage 4 - Payment Handler ($40 Mbank)
 */
(function () {
  function renderPaymentPage(containerEl, onSuccess) {
    let step = 1;

    function draw() {
      const balance = window.storeWallet ? window.storeWallet.getBalance() : 100.00;

      if (step === 1) {
        containerEl.innerHTML = `
          <div class="dev-stage-wrap">
            <div class="dev-stage-header">
              <h1 class="dev-stage-title">💳 Developer Access Pass</h1>
              <p class="dev-stage-sub">One-time payment required for full portal access.</p>
            </div>
            <div class="dev-pay-card">
              <div class="dev-pay-amount">$40.00</div>
              <div class="dev-pay-label">Lifetime Developer Portal Membership</div>
              <div class="dev-pay-methods">
                <label class="dev-pay-method selected"><input type="radio" checked name="pay" value="mbank" /> 🏦 Mbank Wallet (Available: $${balance.toFixed(2)})</label>
                <label class="dev-pay-method disabled"><input type="radio" disabled name="pay" value="card" /> 💳 Credit Card (Offline)</label>
              </div>
              <button class="dev-btn-primary" id="pay-btn-next">Review Order</button>
            </div>
          </div>
        `;
        containerEl.querySelector("#pay-btn-next").onclick = () => { step = 2; draw(); };
      } else if (step === 2) {
        const canAfford = balance >= 40.00;
        containerEl.innerHTML = `
          <div class="dev-stage-wrap">
            <div class="dev-stage-header"><h1 class="dev-stage-title">🛒 Order Review</h1></div>
            <div class="dev-pay-card">
              <div class="dev-order-row"><span>Developer Pass</span><span>$40.00</span></div>
              <div class="dev-order-row"><span>Payment Method</span><span>Mbank Wallet</span></div>
              <div class="dev-order-row"><span>Current Balance</span><span>$${balance.toFixed(2)}</span></div>
              <div class="dev-order-row highlight"><span>Balance After</span><span>$${(balance - 40).toFixed(2)}</span></div>
              ${!canAfford ? `<div class="dev-pay-err">❌ Insufficient funds in Mbank wallet. Deposit funds in Mbank app first.</div>` : ""}
              <div class="dev-pay-actions">
                <button class="dev-btn-sec" id="pay-btn-back">Back</button>
                <button class="dev-btn-primary" id="pay-btn-confirm" ${!canAfford ? 'disabled' : ''}>Confirm & Pay $40.00</button>
              </div>
            </div>
          </div>
        `;
        containerEl.querySelector("#pay-btn-back").onclick = () => { step = 1; draw(); };
        if (canAfford) {
          containerEl.querySelector("#pay-btn-confirm").onclick = () => {
            if (window.storeWallet && typeof window.storeWallet.deductFunds === "function") {
              window.storeWallet.deductFunds(40.00, "Developer Access Pass");
            }
            step = 3;
            draw();
          };
        }
      } else if (step === 3) {
        containerEl.innerHTML = `
          <div class="dev-stage-wrap">
            <div class="dev-pay-card center">
              <div class="dev-spinner"></div>
              <h3>Processing Transaction...</h3>
              <p>Deducting $40.00 from Mbank Wallet...</p>
            </div>
          </div>
        `;
        setTimeout(() => { step = 4; draw(); }, 2000);
      } else if (step === 4) {
        const newBal = window.storeWallet ? window.storeWallet.getBalance() : 60.00;
        const txId = "#DEV-" + Math.floor(1000 + Math.random() * 9000);
        containerEl.innerHTML = `
          <div class="dev-stage-wrap">
            <div class="dev-pay-card center">
              <div class="dev-success-icon">✅</div>
              <h2>Payment Successful!</h2>
              <p>Transaction ID: ${txId}</p>
              <p>Amount Paid: $40.00 | New Balance: $${newBal.toFixed(2)}</p>
              <div class="dev-pass-badge">🔓 DEVELOPER ACCESS GRANTED</div>
              <button class="dev-btn-primary" id="pay-btn-enter">Enter Developer Portal</button>
            </div>
          </div>
        `;
        containerEl.querySelector("#pay-btn-enter").onclick = onSuccess;
      }
    }

    draw();
  }

  window.devPortalPay = { renderPaymentPage };
})();

/* === FILE: prosoft-payment.js === */
/**
 * WebOS v0.9.0 ProSoft 3-Step Mbank Payment Flow
 * Validates wallet funds, handles 2s processing animation, and updates tier.
 */
(function () {
  function openPaymentModal(product, onSuccess) {
    if (!product) return;

    const modal = document.createElement("div");
    modal.className = "ps-modal-backdrop";

    const wallet = window.storeWallet;
    const currentBalance = wallet ? wallet.getBalance() : 50.00;

    modal.innerHTML = `
      <div class="ps-modal-box">
        <div class="ps-modal-header">
          <span class="ps-modal-title">💎 ProSoft Store Checkout</span>
          <button class="ps-modal-close" id="ps-modal-close">✕</button>
        </div>
        <div class="ps-modal-body" id="ps-modal-body">
          <div class="ps-checkout-product">
            <div class="ps-checkout-name">${product.name}</div>
            <div class="ps-checkout-price">$${product.price}.00 <span class="ps-period">/ ${product.period}</span></div>
            <div class="ps-checkout-desc">${product.desc}</div>
          </div>
          <div class="ps-wallet-status">
            <span>Mbank Card Balance:</span>
            <strong class="${currentBalance >= product.price ? 'ps-text-green' : 'ps-text-red'}">$${currentBalance.toFixed(2)}</strong>
          </div>
          <div class="ps-modal-actions" id="ps-step1-actions">
            <button class="ps-btn ps-btn-secondary" id="ps-btn-cancel">Cancel</button>
            <button class="ps-btn ps-btn-primary" id="ps-btn-confirm">Confirm & Pay $${product.price}.00</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector("#ps-modal-close");
    const cancelBtn = modal.querySelector("#ps-btn-cancel");
    const confirmBtn = modal.querySelector("#ps-btn-confirm");
    const bodyEl = modal.querySelector("#ps-modal-body");

    function closeModal() {
      modal.remove();
    }

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        // Step 2: Balance Check
        const balance = wallet ? wallet.getBalance() : 0;
        if (balance < product.price) {
          const needed = (product.price - balance).toFixed(2);
          bodyEl.innerHTML = `
            <div class="ps-checkout-error">
              <div class="ps-error-icon">⚠️</div>
              <div class="ps-error-title">Insufficient Mbank Balance</div>
              <div class="ps-error-desc">You need $${product.price}.00, but your balance is $${balance.toFixed(2)}. Short by <strong>$${needed}</strong>.</div>
              <div class="ps-modal-actions">
                <button class="ps-btn ps-btn-secondary" id="ps-err-close">Close</button>
                <button class="ps-btn ps-btn-primary" id="ps-btn-topup">Open Mbank & Deposit</button>
              </div>
            </div>
          `;
          const errClose = bodyEl.querySelector("#ps-err-close");
          const topupBtn = bodyEl.querySelector("#ps-btn-topup");
          if (errClose) errClose.onclick = closeModal;
          if (topupBtn) {
            topupBtn.onclick = () => {
              closeModal();
              if (window.browserRenderer && typeof window._browserNavigate === "function") {
                window._browserNavigate("www.mbank.webos");
              }
            };
          }
          return;
        }

        // Step 3: Processing (2s)
        bodyEl.innerHTML = `
          <div class="ps-processing-state">
            <div class="ps-spinner"></div>
            <div class="ps-proc-title">Contacting Mbank 256-bit Gateway...</div>
            <div class="ps-proc-desc">Authorizing transaction for ${product.name}...</div>
          </div>
        `;

        setTimeout(() => {
          const success = wallet.deductFunds(product.price, `ProSoft Inc — ${product.name}`);
          if (success) {
            if (window.prosoftState) window.prosoftState.setPurchasedTier(product.id);
            const newBal = wallet.getBalance();
            const txId = "PS-" + Math.floor(100000 + Math.random() * 900000);

            bodyEl.innerHTML = `
              <div class="ps-success-state">
                <div class="ps-success-icon">✨</div>
                <div class="ps-success-title">Payment Successful!</div>
                <div class="ps-success-desc">You have unlocked <strong>${product.name}</strong>.</div>
                <div class="ps-tx-details">
                  <div><span>Transaction ID:</span> <code>${txId}</code></div>
                  <div><span>Remaining Mbank Balance:</span> <strong>$${newBal.toFixed(2)}</strong></div>
                </div>
                <div class="ps-modal-actions">
                  <button class="ps-btn ps-btn-primary" id="ps-success-done">Done</button>
                </div>
              </div>
            `;
            const doneBtn = bodyEl.querySelector("#ps-success-done");
            if (doneBtn) {
              doneBtn.onclick = () => {
                closeModal();
                if (typeof onSuccess === "function") onSuccess(product);
              };
            }
          }
        }, 2000);
      };
    }
  }

  window.prosoftPayment = {
    openPaymentModal
  };
})();

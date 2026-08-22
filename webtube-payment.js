/* === FILE: webtube-payment.js === */
/**
 * WebOS v0.8.3 WebTube 7-Step Subscription Payment Orchestrator
 */
(function () {
  function startWebTubePayment(containerEl, targetTierId, onSuccess) {
    if (!containerEl) return;
    let step = 1;
    const allTiers = window.webtubeTiers.TIERS;
    let selectedTier = allTiers[targetTierId] || allTiers.pro;

    function render() {
      const wallet = window.storeWallet;
      const balance = wallet ? wallet.getBalance() : 0;

      containerEl.innerHTML = `
        <div class="webtube-pay-modal">
          <div class="webtube-pay-header">
            <div class="webtube-pay-header-title">👑 WebTube Subscription Checkout</div>
            <button class="webtube-pay-close">✕</button>
          </div>
          <div class="webtube-pay-body">
            ${window.webtubePaymentSteps.getStepHTML(step, selectedTier, balance)}
          </div>
          <div class="webtube-pay-footer">
            ${step > 1 && step < 6 ? '<button id="webtube-pay-back" class="webtube-btn-secondary">Back</button>' : ''}
            ${step < 6 ? '<button id="webtube-pay-next" class="webtube-btn-primary">Continue</button>' : ''}
            ${step === 7 ? '<button id="webtube-pay-done" class="webtube-btn-primary">Start Watching</button>' : ''}
          </div>
        </div>
      `;

      containerEl.querySelector(".webtube-pay-close").onclick = () => { containerEl.innerHTML = ""; };

      if (step === 1) {
        containerEl.querySelectorAll(".webtube-tier-card").forEach(c => {
          c.onclick = () => {
            selectedTier = allTiers[c.getAttribute("data-tier")];
            render();
          };
        });
      }

      const btnBack = containerEl.querySelector("#webtube-pay-back");
      if (btnBack) btnBack.onclick = () => { step--; render(); };

      const btnNext = containerEl.querySelector("#webtube-pay-next");
      if (btnNext) {
        btnNext.onclick = () => {
          if (step === 4) {
            // Check Mbank balance
            if (wallet && !wallet.canAfford(selectedTier.price)) {
              alert(`Insufficient Mbank balance ($${balance.toFixed(2)}). You need $${(selectedTier.price - balance).toFixed(2)} more.`);
              return;
            }
          }
          if (step === 5) {
            const input = containerEl.querySelector("#webtube-verify-input");
            if (!input || input.value.trim().toUpperCase() !== "CONFIRM") {
              alert("Please type CONFIRM to verify your purchase.");
              return;
            }
            // Advance to step 6 (processing)
            step = 6;
            render();
            setTimeout(() => {
              if (wallet && selectedTier.price > 0) {
                wallet.deductFunds(selectedTier.price, `WebTube ${selectedTier.name} Subscription`);
              }
              window.webtubeTiers.setTier(selectedTier.id);
              step = 7;
              render();
            }, 3000);
            return;
          }
          step++;
          render();
        };
      }

      const btnDone = containerEl.querySelector("#webtube-pay-done");
      if (btnDone) {
        btnDone.onclick = () => {
          containerEl.innerHTML = "";
          if (typeof onSuccess === "function") onSuccess();
        };
      }
    }

    render();
  }

  window.startWebTubePayment = startWebTubePayment;
})();

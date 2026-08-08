/* === FILE: app-mbank.js === */
/**
 * WebOS v0.6 Mbank Banking App UI Manager
 */
(function () {
  function initMbank(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";

    function render() {
      const wallet = window.storeWallet;
      const balance = wallet ? wallet.getBalance() : 50.00;
      const transactions = wallet ? wallet.getTransactions() : [];

      contentEl.innerHTML = `
        <div class="mbank-container">
          <div class="mbank-card">
            <div class="mbank-logo">
              <span>🏦</span> Mbank Platinum Digital
            </div>
            <div class="mbank-balance-label">Total Balance</div>
            <div class="mbank-balance">$${balance.toFixed(2)}</div>
            <div class="mbank-card-number">•••• •••• •••• 3829</div>
            <div class="mbank-card-expiry">VALID THRU 12/28 • WEBOS USER</div>
          </div>

          <div class="mbank-actions">
            <button class="mbank-btn mbank-btn-primary" id="mbank-deposit-btn">💰 Add Funds (+$20)</button>
            <button class="mbank-btn mbank-btn-secondary" id="mbank-transfer-btn">💸 Transfer</button>
          </div>

          <div class="mbank-section-title">Recent Transactions</div>
          <div class="mbank-tx-list">
            ${
              transactions.length === 0
                ? `<div class="mbank-empty">No transactions yet.</div>`
                : transactions.map(tx => {
                    const isCredit = tx.type === "deposit";
                    const sign = isCredit ? "+" : "-";
                    const amtClass = isCredit ? "mbank-tx-credit" : "mbank-tx-debit";
                    const icon = isCredit ? "💰" : "💳";
                    return `
                      <div class="mbank-transaction">
                        <div class="mbank-tx-left">
                          <div class="mbank-tx-name">${icon} ${tx.description}</div>
                          <div class="mbank-tx-date">${tx.formattedDate || tx.date}</div>
                        </div>
                        <div class="mbank-tx-amount ${amtClass}">
                          ${sign}$${tx.amount.toFixed(2)}
                        </div>
                      </div>
                    `;
                  }).join("")
            }
          </div>
        </div>
      `;

      const depBtn = contentEl.querySelector("#mbank-deposit-btn");
      if (depBtn) {
        depBtn.addEventListener("click", () => {
          if (window.storeWallet) {
            window.storeWallet.depositFunds(20);
            render();
          }
        });
      }

      const trsBtn = contentEl.querySelector("#mbank-transfer-btn");
      if (trsBtn) {
        trsBtn.addEventListener("click", () => {
          alert("Transfer feature is ready. WebOS P2P payments active.");
        });
      }
    }

    render();
  }

  window.initMbank = initMbank;
})();

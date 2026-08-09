/* === FILE: browser-mbank.js === */
/**
 * WebOS v0.7 Mbank Virtual Banking Website
 */
(function () {
  function renderMbankPage(containerEl, onNavigate) {
    if (!containerEl) return;
    const wallet = window.storeWallet;
    const balance = wallet ? wallet.getBalance() : 50.00;
    const txs = wallet ? wallet.getTransactions() : [];

    let txRowsHtml = "";
    if (txs.length === 0) {
      txRowsHtml = `<div style="padding: 16px; text-align: center; color: #8e8e93; font-size: 12px;">No transaction history yet.</div>`;
    } else {
      txRowsHtml = txs.map((tx) => {
        const isDeposit = tx.type === "deposit";
        const sign = isDeposit ? "+" : "-";
        const cls = isDeposit ? "deposit" : "purchase";
        return `
          <div class="mbank-tx-item">
            <div>
              <div class="mbank-tx-desc">${tx.description}</div>
              <div class="mbank-tx-date">${tx.formattedDate || tx.date}</div>
            </div>
            <div class="mbank-tx-amount ${cls}">${sign}$${tx.amount.toFixed(2)}</div>
          </div>
        `;
      }).join("");
    }

    containerEl.innerHTML = `
      <div class="mbank-page">
        <div class="mbank-header">
          <div class="mbank-logo">
            <span class="mbank-logo-icon">🏦</span>
            <span class="mbank-title">Mbank Online Banking</span>
          </div>
          <span class="mbank-badge">🔒 Encrypted 256-bit</span>
        </div>

        <div class="mbank-card">
          <div class="mbank-card-label">Virtual Card Balance</div>
          <div class="mbank-balance">$${balance.toFixed(2)}</div>
          <div class="mbank-card-num">●●●● ●●●● ●●●● 3829</div>
          <div class="mbank-actions">
            <button class="mbank-btn mbank-btn-primary" id="mbank-add-funds">+$20.00 Add Funds</button>
            <button class="mbank-btn mbank-btn-secondary" id="mbank-transfer">Transfer</button>
          </div>
        </div>

        <div class="mbank-section-title">Recent Transactions</div>
        <div class="mbank-tx-list">${txRowsHtml}</div>
      </div>
    `;

    const addBtn = containerEl.querySelector("#mbank-add-funds");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        if (wallet && typeof wallet.depositFunds === "function") {
          wallet.depositFunds(20);
          renderMbankPage(containerEl, onNavigate);
        }
      });
    }

    const transferBtn = containerEl.querySelector("#mbank-transfer");
    if (transferBtn) {
      transferBtn.addEventListener("click", () => {
        alert("Virtual Transfer: Feature active for internal WebOS transactions.");
      });
    }
  }

  window.browserMbank = {
    renderMbankPage
  };
})();

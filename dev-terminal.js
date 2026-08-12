/* === FILE: dev-terminal.js === */
/**
 * WebOS v0.7.4.3 Developer Terminal Component
 */
(function () {
  let cmdHistory = [];
  let historyIdx = -1;

  function renderDevTerminal(containerEl) {
    if (!containerEl) return;

    containerEl.innerHTML = `
      <div class="dev-term-wrap">
        <div class="dev-term-header">
          <span>>_ WebOS Developer Terminal v1.0 (v0.7.4.3)</span>
          <span class="dev-term-badge">SYS_ADMIN</span>
        </div>
        <div class="dev-term-output" id="dev-term-output">
          <div class="dev-term-line">WebOS DevTerminal [Version 0.7.4.3]</div>
          <div class="dev-term-line">Type "help" or numbers 1-4 for available commands.</div>
          <div class="dev-term-line">--------------------------------------------------</div>
        </div>
        <div class="dev-term-input-line">
          <span class="dev-term-prompt">webos@dev:~$</span>
          <input type="text" id="dev-term-input" class="dev-term-input" placeholder="Type command..." autofocus autocomplete="off" />
        </div>
      </div>
    `;

    const output = containerEl.querySelector("#dev-term-output");
    const input = containerEl.querySelector("#dev-term-input");

    function printLine(text, type = "normal") {
      const div = document.createElement("div");
      div.className = `dev-term-line ${type}`;
      div.textContent = text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    }

    function processCommand(raw) {
      const val = raw.trim();
      if (!val) return;

      printLine(`webos@dev:~$ ${val}`, "cmd");
      cmdHistory.push(val);
      historyIdx = cmdHistory.length;

      const lower = val.toLowerCase();

      if (lower === "1") {
        const amtStr = prompt("Enter amount to deposit into Mbank ($):", "5000");
        if (amtStr) {
          const amt = parseFloat(amtStr);
          if (!isNaN(amt) && amt > 0) {
            handleMoney(amt);
          } else {
            printLine("[ERROR] Invalid amount specified.", "error");
          }
        }
        return;
      } else if (lower === "2") {
        handleDownloadAll();
        return;
      } else if (lower === "3" || lower === "clear") {
        output.innerHTML = "";
        return;
      } else if (lower === "4" || lower === "exit") {
        printLine("[SYSTEM] Session terminated.", "info");
        if (typeof window.renderDevVersionHistory === "function") {
          setTimeout(() => {
            const historyTab = containerEl.closest(".dev-container")?.querySelector('.dev-subtab[data-tab="history"]');
            if (historyTab) historyTab.click();
          }, 300);
        }
        return;
      }

      if (lower === "help") {
        printLine("Developer Terminal v1.0 Commands:");
        printLine(" 1. money-[amount]  - Deposit funds to Mbank (e.g. money-5000)");
        printLine(" 2. download-all   - Install all App Store apps instantly");
        printLine(" 3. clear          - Clear terminal screen");
        printLine(" 4. exit           - Exit developer terminal");
        printLine("Quick Numbers: Type 1, 2, 3, or 4 for quick execution.");
      } else if (lower.startsWith("money")) {
        const match = lower.match(/^money[- ]?(\d+)/);
        if (match) {
          handleMoney(parseFloat(match[1]));
        } else {
          printLine("[ERROR] Usage: money-[amount] (e.g. money-5000)", "error");
        }
      } else if (lower === "download-all") {
        handleDownloadAll();
      } else {
        printLine(`[ERROR] Unknown command: "${val}". Type "help" for command list.`, "error");
      }
    }

    function handleMoney(amount) {
      if (window.storeWallet && typeof window.storeWallet.depositFunds === "function") {
        const newBal = window.storeWallet.depositFunds(amount, "Dev Terminal Grant");
        printLine(`[SUCCESS] Deposited $${amount.toLocaleString()} into Mbank. Balance: $${newBal.toLocaleString(undefined, {minimumFractionDigits: 2})}`, "success");
      } else {
        printLine("[ERROR] Mbank wallet service unavailable.", "error");
      }
    }

    function handleDownloadAll() {
      if (typeof window.downloadAllApps === "function") {
        const count = window.downloadAllApps();
        printLine(`[SUCCESS] Installed ${count} new app(s). All App Store apps are installed!`, "success");
      } else {
        printLine("[ERROR] App Store install service unavailable.", "error");
      }
    }

    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const v = input.value;
          input.value = "";
          processCommand(v);
        } else if (e.key === "ArrowUp") {
          if (cmdHistory.length > 0 && historyIdx > 0) {
            historyIdx--;
            input.value = cmdHistory[historyIdx] || "";
          }
        } else if (e.key === "ArrowDown") {
          if (historyIdx < cmdHistory.length - 1) {
            historyIdx++;
            input.value = cmdHistory[historyIdx] || "";
          } else {
            historyIdx = cmdHistory.length;
            input.value = "";
          }
        }
      });
      setTimeout(() => input.focus(), 50);
    }
  }

  window.renderDevTerminal = renderDevTerminal;
})();

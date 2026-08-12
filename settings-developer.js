/* === FILE: settings-developer.js === */
/**
 * WebOS v0.7.2.2 Developer Settings Tab Orchestrator & Lock Screen
 */
(function () {
  let developerUnlocked = false;

  function renderDeveloperTab(containerEl) {
    if (!containerEl) return;
    developerUnlocked = false; // Reset lock state on every visit
    renderLockScreen(containerEl);
  }

  function renderLockScreen(containerEl) {
    containerEl.innerHTML = "";

    const lockContainer = document.createElement("div");
    lockContainer.className = "dev-lock-container";

    const iconEl = document.createElement("div");
    iconEl.className = "dev-lock-icon";
    iconEl.textContent = "🔒";

    const titleEl = document.createElement("div");
    titleEl.className = "dev-lock-title";
    titleEl.textContent = "Developer Settings are Locked";

    const subtitleEl = document.createElement("div");
    subtitleEl.className = "dev-lock-subtitle";
    subtitleEl.textContent = "Enter password to access version history and system metrics.";

    const inputEl = document.createElement("input");
    inputEl.type = "password";
    inputEl.className = "dev-lock-input";
    inputEl.placeholder = "Enter password";

    const errorEl = document.createElement("div");
    errorEl.className = "dev-lock-error";
    errorEl.textContent = "Incorrect password. Try again.";

    const btnEl = document.createElement("button");
    btnEl.className = "dev-lock-btn";
    btnEl.textContent = "Unlock";

    let errorTimer = null;

    function attemptUnlock() {
      const val = inputEl.value;
      if (val === "9610") {
        iconEl.textContent = "🔓";
        developerUnlocked = true;
        lockContainer.classList.add("fading-out");
        setTimeout(() => {
          renderSubTabs(containerEl);
        }, 250);
      } else {
        inputEl.classList.add("error");
        errorEl.classList.add("visible");
        if (errorTimer) clearTimeout(errorTimer);
        errorTimer = setTimeout(() => {
          inputEl.value = "";
          inputEl.classList.remove("error");
          errorEl.classList.remove("visible");
        }, 2000);
      }
    }

    btnEl.addEventListener("click", attemptUnlock);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") attemptUnlock();
    });

    lockContainer.appendChild(iconEl);
    lockContainer.appendChild(titleEl);
    lockContainer.appendChild(subtitleEl);
    lockContainer.appendChild(inputEl);
    lockContainer.appendChild(errorEl);
    lockContainer.appendChild(btnEl);

    containerEl.appendChild(lockContainer);
    setTimeout(() => inputEl.focus(), 50);
  }

  function renderSubTabs(containerEl) {
    containerEl.innerHTML = `
      <div class="dev-container fading-in">
        <div class="dev-subtabs">
          <div class="dev-subtab active" data-tab="history">Version History</div>
          <div class="dev-subtab" data-tab="metrics">System Metrics</div>
          <div class="dev-subtab" data-tab="terminal">Dev Terminal</div>
        </div>
        <div class="dev-tab-content"></div>
      </div>
    `;

    const subtabs = containerEl.querySelectorAll(".dev-subtab");
    const contentArea = containerEl.querySelector(".dev-tab-content");

    function loadSubTab(tabName) {
      if (!contentArea) return;
      subtabs.forEach(t => {
        if (t.getAttribute("data-tab") === tabName) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });

      if (tabName === "history" && typeof window.renderDevVersionHistory === "function") {
        window.renderDevVersionHistory(contentArea);
      } else if (tabName === "metrics" && typeof window.renderDevSystemMetrics === "function") {
        window.renderDevSystemMetrics(contentArea);
      } else if (tabName === "terminal" && typeof window.renderDevTerminal === "function") {
        window.renderDevTerminal(contentArea);
      }
    }

    subtabs.forEach(t => {
      t.addEventListener("click", () => {
        const tab = t.getAttribute("data-tab");
        loadSubTab(tab);
      });
    });

    // Default to history sub-tab
    loadSubTab("history");
  }

  window.renderDeveloperTab = renderDeveloperTab;
})();

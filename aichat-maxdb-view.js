/* === FILE: aichat-maxdb-view.js === */
/**
 * Max AI Database - Raw Database Browser & Expiry Overlay
 */
(function () {
  let timerInterval = null;
  let remainingSeconds = 60;
  let searchQuery = "";

  function startDatabaseView(containerEl, onExpired, onExit) {
    if (!containerEl) return;
    remainingSeconds = 60;
    if (timerInterval) clearInterval(timerInterval);

    function updateTimerUI() {
      const badge = containerEl.querySelector("#maxdb-timer-badge");
      if (badge) {
        let cls = remainingSeconds <= 10 ? "danger" : (remainingSeconds <= 30 ? "warning" : "normal");
        badge.className = `maxdb-timer-badge ${cls}`;
        badge.textContent = `⏱ ${remainingSeconds}s`;
      }
      const pulse = containerEl.querySelector("#maxdb-pulse-wrap");
      if (pulse) {
        pulse.innerHTML = remainingSeconds <= 5 ? `
          <div class="maxdb-pulse-overlay"><div class="maxdb-pulse-box">
            <div class="maxdb-pulse-num">${remainingSeconds}</div><div>EXPIRING SOON</div>
          </div></div>` : "";
      }
    }

    function renderListOnly() {
      const allTopics = window.aiBrowserData ? window.aiBrowserData.getAllTopics() : [];
      const categories = window.aiBrowserData ? window.aiBrowserData.getCategories() : [];
      const q = searchQuery.toLowerCase();

      const filtered = allTopics.filter(t => !q || t.name.toLowerCase().includes(q) || t.answer.toLowerCase().includes(q) || t.variants.some(v => v.toLowerCase().includes(q)));

      const catHtml = categories.map(cat => {
        const catTopics = filtered.filter(t => t.catId === cat.id);
        if (catTopics.length === 0 && searchQuery) return "";
        const cards = catTopics.map(t => `
          <div class="maxdb-topic-card">
            <div class="maxdb-topic-title">${t.icon} ${t.name} <span class="maxdb-cat-tag">${cat.name}</span></div>
            <div class="maxdb-variants-inline"><strong>Questions:</strong> ${t.variants.join(" • ")}</div>
            <div class="maxdb-answer-box"><strong>Raw Answer:</strong><br/>${t.answer.replace(/\n/g, '<br/>')}</div>
          </div>
        `).join("");
        return `<div class="maxdb-category-block"><div class="maxdb-cat-header">${cat.icon} ${cat.name} (${catTopics.length} entries)</div><div class="maxdb-cat-list">${cards}</div></div>`;
      }).join("");

      const bodyEl = containerEl.querySelector("#maxdb-content-body");
      if (bodyEl) bodyEl.innerHTML = catHtml || '<div class="maxdb-empty">No matching knowledge entries.</div>';
    }

    function renderFull() {
      let cls = remainingSeconds <= 10 ? "danger" : (remainingSeconds <= 30 ? "warning" : "normal");
      containerEl.innerHTML = `
        <div class="maxdb-main-container">
          <div class="maxdb-top-bar">
            <div class="maxdb-title-area">
              <span style="font-size:20px;">🧠</span>
              <div><div class="maxdb-app-name">Max AI Database</div><div class="maxdb-sub-name">Raw Knowledge Base Access</div></div>
            </div>
            <div class="maxdb-timer-badge ${cls}" id="maxdb-timer-badge">⏱ ${remainingSeconds}s</div>
            <button id="maxdb-exit-btn" class="maxdb-btn secondary" style="padding:4px 8px; font-size:10px;">Exit</button>
          </div>
          <div class="maxdb-search-bar">
            <input type="text" id="maxdb-search-input" placeholder="Search 90 topics, questions, and raw answers..." value="${searchQuery}" />
          </div>
          <div class="maxdb-content-body" id="maxdb-content-body"></div>
          <div id="maxdb-pulse-wrap"></div>
        </div>
      `;
      renderListOnly();

      const searchIn = containerEl.querySelector("#maxdb-search-input");
      if (searchIn) {
        searchIn.addEventListener("input", (e) => {
          searchQuery = e.target.value;
          renderListOnly();
        });
      }

      const exitBtn = containerEl.querySelector("#maxdb-exit-btn");
      if (exitBtn) {
        exitBtn.addEventListener("click", () => {
          if (confirm("Timer is running! Are you sure you want to exit Max Database?")) {
            if (timerInterval) clearInterval(timerInterval);
            if (typeof onExit === "function") onExit();
          }
        });
      }
    }

    renderFull();

    timerInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        renderExpiryModal(containerEl, onExpired);
      } else {
        updateTimerUI();
      }
    }, 1000);
  }

  function renderExpiryModal(containerEl, onDone) {
    const pCount = window.maxDB ? window.maxDB.getPurchaseCount() : 1;
    const reason = window.maxDB ? window.maxDB.getExpiryReason(pCount - 1) : "Session expired.";
    const nextPrice = window.maxDB ? window.maxDB.getCurrentPrice() : 1800;
    const isLocked = nextPrice < 0;

    containerEl.innerHTML = `
      <div class="maxdb-expired-wrap">
        <div class="maxdb-expired-card">
          <div style="font-size:36px; margin-bottom:8px;">⏱️</div>
          <h2>1-Minute Max Access Expired</h2>
          <p class="maxdb-reason-text">${reason}</p>
          <div class="maxdb-next-price">
            ${isLocked ? '🔒 ACCESS RESTRICTED: Max limit reached' : `Next Access Price: <strong>$${nextPrice.toLocaleString("en-US", {minimumFractionDigits:2})}</strong>`}
          </div>
          <button id="expired-close-btn" class="maxdb-btn primary" style="width:100%; margin-top:12px;">Return to AI Chat</button>
        </div>
      </div>
    `;
    containerEl.querySelector("#expired-close-btn").onclick = onDone;
  }

  window.maxDBView = { startDatabaseView };
})();

/* === FILE: aichat-topics-view.js === */
/**
 * AI Chat Pro Tier Knowledge Topics Browser Tab Component
 */
(function () {
  let currentCategory = "all";
  let searchQuery = "";

  function getCategoryLabel(cat) {
    const c = (cat || "").toLowerCase();
    if (c === "webos" || c === "hardware") return "🏠 WebOS & Hardware";
    if (c === "general") return "🧠 Knowledge";
    if (c === "joke") return "😂 Jokes";
    if (c === "quote") return "💡 Quotes";
    if (c === "coding") return "💻 Coding";
    if (c === "about") return "🤖 About AI";
    return "📁 " + (cat || "General");
  }

  function renderLockedTeaser() {
    return `
      <div class="aichat-topics-container">
        <div class="aichat-topics-locked">
          <div style="font-size: 36px; margin-bottom: 12px;">🔒</div>
          <h3 style="margin: 0 0 8px 0; color: #ffffff; font-size: 18px;">Pro Tier Exclusive Feature</h3>
          <p style="color: #8b949e; font-size: 13px; max-width: 380px; margin: 0 auto 20px auto; line-height: 1.5;">
            The complete Knowledge Base Browser with all 106+ topics, category filters, and direct topic prompts is unlocked exclusively for <strong>Pro Tier</strong> subscribers.
          </p>
          <button class="aichat-btn aichat-btn-primary" id="topics-tab-upgrade-btn" style="background: #8b5cf6; padding: 8px 18px; font-size: 13px;">
            🚀 Unlock Pro Tier ($300)
          </button>
        </div>
      </div>
    `;
  }

  function renderProBrowser() {
    const knowledge = window.aiKnowledge || [];
    const categories = ["all", "webos", "general", "joke", "quote", "coding", "about"];

    let filtered = knowledge.filter(entry => {
      const catMatch = currentCategory === "all" || (entry.category || "").toLowerCase() === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return catMatch;

      const kwMatch = (entry.keywords || []).some(k => k.toLowerCase().includes(q));
      const respMatch = (entry.responses || []).some(r => r.toLowerCase().includes(q));
      const catTextMatch = (entry.category || "").toLowerCase().includes(q);

      return catMatch && (kwMatch || respMatch || catTextMatch);
    });

    const categoryBtnsHTML = categories.map(cat => {
      const activeCls = currentCategory === cat ? "active" : "";
      const label = cat === "all" ? "🌐 All Topics" : getCategoryLabel(cat);
      return `<button class="aichat-topic-cat-btn ${activeCls}" data-cat="${cat}">${label}</button>`;
    }).join("");

    const topicCardsHTML = filtered.map((entry, idx) => {
      const title = (entry.keywords && entry.keywords[0]) ? entry.keywords[0] : "Topic #" + (idx + 1);
      const previewText = (entry.responses && entry.responses[0]) ? entry.responses[0] : "";
      const kwTags = (entry.keywords || []).slice(0, 4).map(k => `<span class="aichat-topic-kw">${k}</span>`).join(" ");

      return `
        <div class="aichat-topic-card">
          <div class="aichat-topic-card-header">
            <span class="aichat-topic-cat-tag">${getCategoryLabel(entry.category)}</span>
            <span class="aichat-topic-tier-tag">${(entry.tier || "free").toUpperCase()}</span>
          </div>
          <div class="aichat-topic-title">${title}</div>
          <div class="aichat-topic-preview">${previewText}</div>
          <div class="aichat-topic-kws">${kwTags}</div>
          <button class="aichat-btn aichat-btn-secondary aichat-ask-topic-btn" data-prompt="${title}" style="margin-top: 8px; width: 100%; font-size: 11px;">
            🤖 Ask AI About This
          </button>
        </div>
      `;
    }).join("");

    return `
      <div class="aichat-topics-container">
        <div class="aichat-topics-toolbar">
          <input type="text" id="aichat-topics-search" class="aichat-input" placeholder="🔍 Search 106+ Pro topics..." value="${searchQuery}" />
          <div class="aichat-topics-cats">${categoryBtnsHTML}</div>
        </div>
        <div class="aichat-topics-count" style="padding: 4px 16px; font-size: 11px; color: #8b949e;">
          Showing ${filtered.length} of ${knowledge.length} Pro Knowledge Topics
        </div>
        <div class="aichat-topics-grid">
          ${filtered.length > 0 ? topicCardsHTML : '<div style="grid-column: 1/-1; text-align: center; color: #8b949e; padding: 30px;">No matching topics found.</div>'}
        </div>
      </div>
    `;
  }

  function getTopicsTabHTML(tier) {
    if (tier !== "pro") {
      return renderLockedTeaser();
    }
    return renderProBrowser();
  }

  function bindTopicsEvents(container, onAskPrompt, onUpgradeReq) {
    const searchInput = container.querySelector("#aichat-topics-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        container.innerHTML = getTopicsTabHTML("pro");
        bindTopicsEvents(container, onAskPrompt, onUpgradeReq);
      });
    }

    const catBtns = container.querySelectorAll(".aichat-topic-cat-btn");
    catBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        currentCategory = btn.getAttribute("data-cat");
        container.innerHTML = getTopicsTabHTML("pro");
        bindTopicsEvents(container, onAskPrompt, onUpgradeReq);
      });
    });

    const askBtns = container.querySelectorAll(".aichat-ask-topic-btn");
    askBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const prompt = btn.getAttribute("data-prompt");
        if (prompt && typeof onAskPrompt === "function") {
          onAskPrompt(prompt);
        }
      });
    });

    const upgradeBtn = container.querySelector("#topics-tab-upgrade-btn");
    if (upgradeBtn && typeof onUpgradeReq === "function") {
      upgradeBtn.addEventListener("click", onUpgradeReq);
    }
  }

  window.aiTopicsView = {
    getTopicsTabHTML,
    bindTopicsEvents
  };
})();

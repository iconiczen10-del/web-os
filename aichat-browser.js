/* === FILE: aichat-browser.js === */
/**
 * AI Chat Knowledge Browser - Orchestrator & Controller
 */
(function () {
  let collapsedCategories = {};
  let searchQuery = "";

  function getAccessPercentage(tier) {
    const t = (tier || "free").toLowerCase();
    if (t === "pro" || t === "maxdb") return 100;
    if (t === "plus") return 60;
    return 15;
  }

  function isTopicLocked(topic, tier) {
    const t = (tier || "free").toLowerCase();
    if (t === "pro" || t === "maxdb") return false;
    if (t === "plus") return topic.minTier === "pro";
    return topic.minTier !== "free";
  }

  function renderKnowledgeBrowser(containerEl, tier, onAskQuestion, onUpgradeClick) {
    if (!containerEl) return;
    const allTopics = window.aiBrowserData ? window.aiBrowserData.getAllTopics() : [];
    const categories = window.aiBrowserData ? window.aiBrowserData.getCategories() : [];
    const currentTier = (tier || "free").toLowerCase();
    const accessPct = getAccessPercentage(currentTier);

    function draw() {
      const filtered = allTopics.filter(topic => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return topic.name.toLowerCase().includes(q) ||
          topic.variants.some(v => v.toLowerCase().includes(q)) ||
          topic.catName.toLowerCase().includes(q);
      });

      const catSectionsHtml = categories.map(cat => {
        const isCollapsed = collapsedCategories[cat.id] === true;
        return window.aiBrowserRender ? window.aiBrowserRender.generateCategoryHTML(cat, filtered, allTopics, currentTier, isCollapsed) : "";
      }).join("");

      containerEl.innerHTML = `
        <div class="kb-container">
          <div class="kb-teaser-top-slot" id="kb-teaser-top-slot"></div>
          <div class="kb-header-bar">
            <input type="text" id="kb-search-input" class="kb-search-input" placeholder="Search 90 topics and 463+ questions..." value="${searchQuery}" />
          </div>
          <div class="kb-content-list">${catSectionsHtml || '<div class="kb-empty-msg">No matching topics found.</div>'}</div>
          <div class="kb-teaser-bottom-slot" id="kb-teaser-bottom-slot"></div>
          <div class="kb-access-footer">
            <div class="kb-access-info">
              <span>Overall Knowledge Access: <strong>${accessPct}%</strong> (${currentTier.toUpperCase()})</span>
              <div class="kb-global-progress"><div class="kb-global-fill" style="width:${accessPct}%;"></div></div>
            </div>
            ${currentTier !== "pro" && currentTier !== "maxdb" ? `<button id="kb-upgrade-btn" class="kb-upgrade-btn">🚀 Upgrade Tier</button>` : ''}
          </div>
        </div>
      `;

      const topSlot = containerEl.querySelector("#kb-teaser-top-slot");
      if (topSlot && window.aiChatTeaserCards) {
        window.aiChatTeaserCards.renderFlipCards(topSlot);
      }

      const botSlot = containerEl.querySelector("#kb-teaser-bottom-slot");
      if (botSlot && window.aiChatTeaserCards) {
        window.aiChatTeaserCards.startCountdown(botSlot, false);
      }

      const searchInput = containerEl.querySelector("#kb-search-input");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value;
          draw();
          const newInput = containerEl.querySelector("#kb-search-input");
          if (newInput) { newInput.focus(); newInput.setSelectionRange(searchQuery.length, searchQuery.length); }
        });
      }

      containerEl.querySelectorAll(".kb-category-header").forEach(hdr => {
        hdr.addEventListener("click", () => {
          const catId = hdr.getAttribute("data-cat");
          collapsedCategories[catId] = !collapsedCategories[catId];
          draw();
        });
      });

      containerEl.querySelectorAll(".kb-question-item").forEach(item => {
        item.addEventListener("click", () => {
          const qText = item.getAttribute("data-question");
          const isLocked = item.getAttribute("data-locked") === "true";
          if (isLocked) { if (typeof onUpgradeClick === "function") onUpgradeClick(); }
          else { if (typeof onAskQuestion === "function") onAskQuestion(qText); }
        });
      });

      const upgBtn = containerEl.querySelector("#kb-upgrade-btn");
      if (upgBtn) upgBtn.addEventListener("click", () => { if (typeof onUpgradeClick === "function") onUpgradeClick(); });
    }

    draw();
  }

  window.aiKnowledgeBrowser = { renderKnowledgeBrowser, getAccessPercentage, isTopicLocked };
})();

/* === FILE: aichat-browser.js === */
/**
 * AI Chat Knowledge Browser - Orchestrator & Controller
 */
(function () {
  let state = {
    collapsedCategories: {},
    searchQuery: "",
    selectedCategory: "all",
    lastScrollTop: 0
  };

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

    function draw(preserveScroll = true) {
      const oldList = containerEl.querySelector("#kb-content-list");
      if (oldList && preserveScroll) {
        state.lastScrollTop = oldList.scrollTop;
      }

      const filtered = allTopics.filter(topic => {
        const catMatch = state.selectedCategory === "all" || topic.catId === state.selectedCategory;
        if (!catMatch) return false;
        if (!state.searchQuery) return true;
        const q = state.searchQuery.toLowerCase();
        return topic.name.toLowerCase().includes(q) ||
          topic.variants.some(v => v.toLowerCase().includes(q)) ||
          topic.catName.toLowerCase().includes(q);
      });

      const activeCategories = state.selectedCategory === "all"
        ? categories
        : categories.filter(c => c.id === state.selectedCategory);

      const catSectionsHtml = activeCategories.map(cat => {
        const isCollapsed = state.collapsedCategories[cat.id] === true;
        return window.aiBrowserRender ? window.aiBrowserRender.generateCategoryHTML(cat, filtered, allTopics, currentTier, isCollapsed) : "";
      }).filter(Boolean).join("");

      const categoryPillsHtml = [
        { id: "all", name: `All (${allTopics.length})`, icon: "🌐" },
        ...categories.map(c => {
          const count = allTopics.filter(t => t.catId === c.id).length;
          return { id: c.id, name: `${c.name} (${count})`, icon: c.icon };
        })
      ].map(c => `
        <button class="kb-filter-pill ${state.selectedCategory === c.id ? 'active' : ''}" data-cat="${c.id}">
          <span>${c.icon}</span> <span>${c.name}</span>
        </button>
      `).join("");

      containerEl.innerHTML = `
        <div class="kb-container">
          <div class="kb-header-bar">
            <div class="kb-search-row">
              <input type="text" id="kb-search-input" class="kb-search-input" placeholder="🔍 Search all 90 topics and 463+ questions..." value="${state.searchQuery}" />
              ${state.searchQuery ? `<button id="kb-clear-search" class="kb-clear-btn" title="Clear Search">✕</button>` : ''}
            </div>
            <div class="kb-pills-bar">
              ${categoryPillsHtml}
            </div>
            <div class="kb-sub-toolbar">
              <div class="kb-topics-stat">
                📚 Showing <strong>${filtered.length}</strong> of <strong>${allTopics.length}</strong> Topics
              </div>
              <div class="kb-toggle-tools">
                <button id="kb-expand-all" class="kb-tool-btn">Expand All</button>
                <button id="kb-collapse-all" class="kb-tool-btn">Collapse All</button>
              </div>
            </div>
          </div>

          <div class="kb-content-list" id="kb-content-list">
            ${catSectionsHtml || '<div class="kb-empty-msg">No matching topics found for your search.</div>'}
            <div class="kb-teaser-bottom-slot" id="kb-teaser-bottom-slot"></div>
          </div>

          <div class="kb-access-footer">
            <div class="kb-access-info">
              <span>Overall Knowledge Access: <strong>${accessPct}%</strong> (${currentTier.toUpperCase()})</span>
              <div class="kb-global-progress"><div class="kb-global-fill" style="width:${accessPct}%;"></div></div>
            </div>
            ${currentTier !== "pro" && currentTier !== "maxdb" ? `<button id="kb-upgrade-btn" class="kb-upgrade-btn">🚀 Upgrade Tier</button>` : ''}
          </div>
        </div>
      `;

      const newList = containerEl.querySelector("#kb-content-list");
      if (newList) {
        newList.addEventListener("scroll", () => {
          state.lastScrollTop = newList.scrollTop;
        });
        if (preserveScroll && state.lastScrollTop > 0) {
          newList.scrollTop = state.lastScrollTop;
        }
      }

      const botSlot = containerEl.querySelector("#kb-teaser-bottom-slot");
      if (botSlot && window.aiChatTeaserCards) {
        window.aiChatTeaserCards.renderFlipCards(botSlot);
        window.aiChatTeaserCards.startCountdown(botSlot, false);
      }

      if (window.aiBrowserEvents) {
        window.aiBrowserEvents.bindBrowserEvents(containerEl, state, {
          onDraw: draw,
          onAskQuestion,
          onUpgradeClick
        });
      }
    }

    draw(true);
  }

  window.aiKnowledgeBrowser = { renderKnowledgeBrowser, getAccessPercentage, isTopicLocked };
})();

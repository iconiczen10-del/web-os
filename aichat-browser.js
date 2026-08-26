/* === FILE: aichat-browser.js === */
/**
 * AI Chat Knowledge Browser - Orchestrator & Controller
 */
(function () {
  let collapsedCategories = {};
  let searchQuery = "";
  let selectedCategory = "all";

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
        const catMatch = selectedCategory === "all" || topic.catId === selectedCategory;
        if (!catMatch) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return topic.name.toLowerCase().includes(q) ||
          topic.variants.some(v => v.toLowerCase().includes(q)) ||
          topic.catName.toLowerCase().includes(q);
      });

      const activeCategories = selectedCategory === "all"
        ? categories
        : categories.filter(c => c.id === selectedCategory);

      const catSectionsHtml = activeCategories.map(cat => {
        const isCollapsed = collapsedCategories[cat.id] === true;
        return window.aiBrowserRender ? window.aiBrowserRender.generateCategoryHTML(cat, filtered, allTopics, currentTier, isCollapsed) : "";
      }).filter(Boolean).join("");

      const categoryPillsHtml = [
        { id: "all", name: `All (${allTopics.length})`, icon: "🌐" },
        ...categories.map(c => {
          const count = allTopics.filter(t => t.catId === c.id).length;
          return { id: c.id, name: `${c.name} (${count})`, icon: c.icon };
        })
      ].map(c => `
        <button class="kb-filter-pill ${selectedCategory === c.id ? 'active' : ''}" data-cat="${c.id}">
          <span>${c.icon}</span> <span>${c.name}</span>
        </button>
      `).join("");

      containerEl.innerHTML = `
        <div class="kb-container">
          <div class="kb-header-bar">
            <div class="kb-search-row">
              <input type="text" id="kb-search-input" class="kb-search-input" placeholder="🔍 Search all 90 topics and 463+ questions..." value="${searchQuery}" />
              ${searchQuery ? `<button id="kb-clear-search" class="kb-clear-btn" title="Clear Search">✕</button>` : ''}
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

      const botSlot = containerEl.querySelector("#kb-teaser-bottom-slot");
      if (botSlot && window.aiChatTeaserCards) {
        window.aiChatTeaserCards.renderFlipCards(botSlot);
        window.aiChatTeaserCards.startCountdown(botSlot, false);
      }

      const searchInput = containerEl.querySelector("#kb-search-input");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value;
          draw();
          const newInput = containerEl.querySelector("#kb-search-input");
          if (newInput) {
            newInput.focus();
            newInput.setSelectionRange(searchQuery.length, searchQuery.length);
          }
        });
      }

      const clearBtn = containerEl.querySelector("#kb-clear-search");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          searchQuery = "";
          draw();
        });
      }

      containerEl.querySelectorAll(".kb-filter-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          selectedCategory = pill.getAttribute("data-cat");
          draw();
        });
      });

      const expandBtn = containerEl.querySelector("#kb-expand-all");
      if (expandBtn) {
        expandBtn.addEventListener("click", () => {
          collapsedCategories = {};
          draw();
        });
      }

      const collapseBtn = containerEl.querySelector("#kb-collapse-all");
      if (collapseBtn) {
        collapseBtn.addEventListener("click", () => {
          categories.forEach(c => { collapsedCategories[c.id] = true; });
          draw();
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
          if (isLocked) {
            if (typeof onUpgradeClick === "function") onUpgradeClick();
          } else {
            if (typeof onAskQuestion === "function") onAskQuestion(qText);
          }
        });
      });

      const upgBtn = containerEl.querySelector("#kb-upgrade-btn");
      if (upgBtn) {
        upgBtn.addEventListener("click", () => {
          if (typeof onUpgradeClick === "function") onUpgradeClick();
        });
      }
    }

    draw();
  }

  window.aiKnowledgeBrowser = { renderKnowledgeBrowser, getAccessPercentage, isTopicLocked };
})();

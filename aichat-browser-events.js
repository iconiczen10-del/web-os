/* === FILE: aichat-browser-events.js === */
/**
 * AI Chat Knowledge Browser - DOM Event Handlers
 */
(function () {
  function bindBrowserEvents(containerEl, state, callbacks) {
    if (!containerEl) return;
    const { onDraw, onAskQuestion, onUpgradeClick } = callbacks;

    const searchInput = containerEl.querySelector("#kb-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        onDraw(false);
        const newInput = containerEl.querySelector("#kb-search-input");
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(state.searchQuery.length, state.searchQuery.length);
        }
      });
    }

    const clearBtn = containerEl.querySelector("#kb-clear-search");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.searchQuery = "";
        onDraw(false);
      });
    }

    containerEl.querySelectorAll(".kb-filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        state.selectedCategory = pill.getAttribute("data-cat");
        onDraw(false);
      });
    });

    const expandBtn = containerEl.querySelector("#kb-expand-all");
    if (expandBtn) {
      expandBtn.addEventListener("click", () => {
        state.collapsedCategories = {};
        onDraw(true);
      });
    }

    const collapseBtn = containerEl.querySelector("#kb-collapse-all");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        const categories = window.aiBrowserData ? window.aiBrowserData.getCategories() : [];
        categories.forEach(c => { state.collapsedCategories[c.id] = true; });
        onDraw(true);
      });
    }

    containerEl.querySelectorAll(".kb-category-header").forEach(hdr => {
      hdr.addEventListener("click", () => {
        const catId = hdr.getAttribute("data-cat");
        state.collapsedCategories[catId] = !state.collapsedCategories[catId];
        onDraw(true);
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

  window.aiBrowserEvents = { bindBrowserEvents };
})();

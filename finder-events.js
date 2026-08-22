/* === FILE: finder-events.js === */
/**
 * WebOS v0.8.0 Finder Navigation & UI Event Handlers
 */
(function () {
  function bindFinderEvents(state, refs, refreshUI, navigateTo) {
    const { btnBack, btnFwd, btnGrid, btnList, searchInput, sidebarItems, contentView, containerEl } = refs;

    sidebarItems.forEach(item => {
      item.addEventListener("click", () => {
        const path = item.getAttribute("data-path");
        if (path) navigateTo(path);
      });
    });

    if (btnBack) {
      btnBack.addEventListener("click", () => {
        if (state.historyIndex > 0) {
          state.historyIndex--;
          state.currentPath = state.history[state.historyIndex];
          state.selectedId = null;
          refreshUI();
        }
      });
    }

    if (btnFwd) {
      btnFwd.addEventListener("click", () => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          state.currentPath = state.history[state.historyIndex];
          state.selectedId = null;
          refreshUI();
        }
      });
    }

    if (btnGrid) {
      btnGrid.addEventListener("click", () => {
        state.viewMode = "grid";
        btnGrid.classList.add("active");
        btnList.classList.remove("active");
        refreshUI();
      });
    }

    if (btnList) {
      btnList.addEventListener("click", () => {
        state.viewMode = "list";
        btnList.classList.add("active");
        btnGrid.classList.remove("active");
        refreshUI();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        refreshUI();
      });
    }

    contentView.addEventListener("contextmenu", (e) => {
      if (e.target === contentView || e.target.classList.contains("finder-empty-state")) {
        e.preventDefault();
        window.finderOperations.showContextMenu(e, null, state.currentPath, containerEl, refreshUI);
      }
    });

    contentView.addEventListener("click", () => {
      if (state.selectedId) {
        state.selectedId = null;
        refreshUI();
      }
    });
  }

  window.bindFinderEvents = bindFinderEvents;
})();

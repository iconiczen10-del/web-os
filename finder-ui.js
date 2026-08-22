/* === FILE: finder-ui.js === */
/**
 * WebOS v0.8.0 Finder User Interface Component
 */
(function () {
  function renderFinderUI(containerEl) {
    if (!containerEl) return;

    const state = {
      currentPath: "/Documents",
      history: ["/Documents"],
      historyIndex: 0,
      viewMode: "grid",
      searchQuery: "",
      selectedId: null,
      sortCol: "name",
      sortAsc: true
    };

    containerEl.innerHTML = window.getFinderHTML ? window.getFinderHTML(state.currentPath) : "";

    const contentView = containerEl.querySelector("#f-content-view");
    const crumbText = containerEl.querySelector("#f-crumb-text");
    const searchInput = containerEl.querySelector("#f-search-input");
    const btnBack = containerEl.querySelector("#f-btn-back");
    const btnFwd = containerEl.querySelector("#f-btn-fwd");
    const btnGrid = containerEl.querySelector("#f-btn-grid");
    const btnList = containerEl.querySelector("#f-btn-list");
    const sidebarItems = containerEl.querySelectorAll(".finder-sidebar-item");

    function refreshUI() {
      if (crumbText) crumbText.textContent = state.currentPath.replace(/^\//, "");
      if (searchInput) searchInput.placeholder = `Search in ${state.currentPath}...`;
      if (btnBack) btnBack.disabled = state.historyIndex <= 0;
      if (btnFwd) btnFwd.disabled = state.historyIndex >= state.history.length - 1;

      sidebarItems.forEach(item => {
        if (item.getAttribute("data-path") === state.currentPath) item.classList.add("active");
        else item.classList.remove("active");
      });

      if (window.storageManager) {
        const stats = window.storageManager.getStorageDetails();
        const pctEl = containerEl.querySelector("#f-storage-pct");
        const barEl = containerEl.querySelector("#f-storage-bar");
        const subEl = containerEl.querySelector("#f-storage-sub");
        const freeEl = containerEl.querySelector("#f-status-free");
        if (pctEl) pctEl.textContent = `${stats.usedPercent}%`;
        if (barEl) barEl.style.width = `${stats.usedPercent}%`;
        if (subEl) subEl.textContent = `${stats.usedGB.toFixed(1)} GB / ${stats.totalGB} GB`;
        if (freeEl) freeEl.textContent = `${stats.freeGB.toFixed(1)} GB available`;
      }

      let items = window.webosFS ? window.webosFS.getFiles(state.currentPath) : [];
      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase();
        items = items.filter(it => it.name.toLowerCase().includes(q));
      }

      const countEl = containerEl.querySelector("#f-status-items");
      if (countEl) countEl.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

      if (state.viewMode === "grid") {
        window.finderRender.renderGrid(
          contentView, items, state.selectedId,
          (item) => { state.selectedId = item.id; refreshUI(); },
          (item) => handleOpen(item),
          (e, item) => window.finderOperations.showContextMenu(e, item, state.currentPath, containerEl, refreshUI)
        );
      } else {
        window.finderRender.renderList(
          contentView, items, state.selectedId, state.sortCol, state.sortAsc,
          (col) => {
            if (state.sortCol === col) state.sortAsc = !state.sortAsc;
            else { state.sortCol = col; state.sortAsc = true; }
            refreshUI();
          },
          (item) => { state.selectedId = item.id; refreshUI(); },
          (item) => handleOpen(item),
          (e, item) => window.finderOperations.showContextMenu(e, item, state.currentPath, containerEl, refreshUI)
        );
      }
    }

    function navigateTo(path) {
      if (state.currentPath === path) return;
      state.currentPath = path;
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(path);
      state.historyIndex++;
      state.selectedId = null;
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      refreshUI();
    }

    function handleOpen(item) {
      if (item.ext === ".wapp" || item.name.endsWith(".wapp")) {
        const appId = item.name.replace(".wapp", "").toLowerCase().replace(/-/g, "");
        if (window.windowManager) window.windowManager.openWindow(appId);
      } else if (window.showFinderGetInfo) {
        window.showFinderGetInfo(item, containerEl);
      }
    }

    if (window.bindFinderEvents) {
      window.bindFinderEvents(
        state,
        { btnBack, btnFwd, btnGrid, btnList, searchInput, sidebarItems, contentView, containerEl },
        refreshUI,
        navigateTo
      );
    }

    refreshUI();
  }

  window.renderFinderUI = renderFinderUI;
})();

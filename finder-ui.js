/* === FILE: finder-ui.js === */
/**
 * WebOS v0.9.2.1.2 Finder UI Component (Nested Subfolders & Real System Navigation)
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
      if (crumbText) crumbText.textContent = state.currentPath.replace(/^\//, "") || "Root";
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

      const subfolders = window.webosFS ? window.webosFS.getSubfolders(state.currentPath) : [];
      const subItems = subfolders.map(sub => ({
        id: sub.id, name: sub.name, path: sub.path, ext: ".wfolder",
        type: "Folder", sizeMB: 0, sizeLabel: "--", icon: sub.icon || "📁",
        isFolder: true, created: sub.created || "2026-01-01", modified: sub.created || "2026-01-01"
      }));
      const rawFiles = window.webosFS ? window.webosFS.getFiles(state.currentPath) : [];
      let items = [...subItems, ...rawFiles];

      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase();
        items = items.filter(it => it.name.toLowerCase().includes(q));
      }

      const countEl = containerEl.querySelector("#f-status-items");
      if (countEl) countEl.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

      const onSelect = (item) => { state.selectedId = item.id; refreshUI(); };
      const onOpen = (item) => handleOpen(item);
      const onCtx = (e, item) => window.finderOperations.showContextMenu(e, item, state.currentPath, containerEl, refreshUI);

      if (state.viewMode === "grid") {
        window.finderRender.renderGrid(contentView, items, state.selectedId, onSelect, onOpen, onCtx);
      } else {
        window.finderRender.renderList(
          contentView, items, state.selectedId, state.sortCol, state.sortAsc,
          (col) => {
            if (state.sortCol === col) state.sortAsc = !state.sortAsc;
            else { state.sortCol = col; state.sortAsc = true; }
            refreshUI();
          }, onSelect, onOpen, onCtx
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
      if (item.isFolder || item.ext === ".wfolder" || item.path) {
        navigateTo(item.path || `${state.currentPath.replace(/\/$/, "")}/${item.name}`);
      } else if (item.ext === ".wapp" || item.name.endsWith(".wapp")) {
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

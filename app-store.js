/* === FILE: app-store.js === */
/**
 * WebOS v0.6 App Store Manager
 */
(function () {
  let activeCategory = "All";

  function initStore(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.innerHTML = `
      <div class="store-layout">
        <div class="store-sidebar">
          <div class="store-nav-item active" data-cat="All">🏷️ All</div>
          <div class="store-nav-item" data-cat="Productivity">💼 Productivity</div>
          <div class="store-nav-item" data-cat="Entertainment">🎮 Entertainment</div>
          <div class="store-nav-item" data-cat="Utilities">🛠️ Utilities</div>
          <div class="store-nav-item" data-cat="Finance">🏦 Finance</div>
        </div>
        <div class="store-grid-area">
          <div class="store-grid" id="store-grid-container"></div>
        </div>
      </div>
    `;

    const navItems = contentEl.querySelectorAll(".store-nav-item");
    const gridContainer = contentEl.querySelector("#store-grid-container");

    function renderGrid() {
      if (!gridContainer) return;
      gridContainer.innerHTML = "";

      const apps = window.storeApps || [];
      const filtered = activeCategory === "All"
        ? apps
        : apps.filter(a => a.category === activeCategory);

      filtered.forEach(app => {
        const card = document.createElement("div");
        card.className = `store-card ${app.isInstalled ? 'installed' : ''}`;

        let btnLabel = "";
        let btnClass = "";
        if (app.isInstalled) {
          btnLabel = "✓ Installed";
          btnClass = "store-btn-installed";
        } else if (app.price === 0) {
          btnLabel = "Get";
          btnClass = "store-btn-install";
        } else {
          btnLabel = `$${app.price.toFixed(2)}`;
          btnClass = "store-btn-price";
        }

        card.innerHTML = `
          <div class="store-card-icon">${app.icon}</div>
          <div class="store-card-name">${app.name}</div>
          <div class="store-card-category">${app.category}</div>
          <div class="store-card-price ${app.price > 0 ? 'paid' : ''}">
            ${app.price === 0 ? 'Free' : '$' + app.price.toFixed(2)}
          </div>
          <button class="store-btn ${btnClass}">${btnLabel}</button>
        `;

        card.addEventListener("click", () => {
          if (typeof window.showAppDetail === "function") {
            window.showAppDetail(app);
          }
        });

        const btn = card.querySelector(".store-btn");
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (app.isInstalled) {
            if (window.windowManager) window.windowManager.openWindow(app.id);
          } else if (app.price === 0) {
            if (typeof window.installApp === "function") window.installApp(app.id);
          } else {
            if (typeof window.initiatePurchase === "function") window.initiatePurchase(app);
          }
        });

        gridContainer.appendChild(card);
      });
    }

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");
        activeCategory = item.getAttribute("data-cat");
        renderGrid();
      });
    });

    window.refreshStoreGrid = renderGrid;
    renderGrid();
  }

  window.initStore = initStore;
})();

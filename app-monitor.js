/* === FILE: app-monitor.js === */
/**
 * WebOS v0.7.1.1 System Monitor Application
 * 4-Tab Real Task Manager & Live Hardware Monitor
 */
(function () {
  window.initMonitor = function (windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";

    let activeTab = "overview";

    contentEl.innerHTML = `
      <div class="mon-app-shell">
        <div class="monitor-tab-bar">
          <button class="mon-tab-btn active" data-tab="overview">Overview</button>
          <button class="mon-tab-btn" data-tab="cpu">CPU</button>
          <button class="mon-tab-btn" data-tab="memory">Memory</button>
          <button class="mon-tab-btn" data-tab="gpu">GPU</button>
        </div>
        <div class="mon-tab-page-wrap"></div>
      </div>
    `;

    const pageWrap = contentEl.querySelector(".mon-tab-page-wrap");

    function renderTab(tabKey) {
      activeTab = tabKey;
      pageWrap.innerHTML = "";

      if (tabKey === "overview" && window.monitorTabOverview) {
        window.monitorTabOverview.renderOverviewTab(pageWrap);
      } else if (tabKey === "cpu" && window.monitorTabCPU) {
        window.monitorTabCPU.renderCPUTab(pageWrap);
      } else if (tabKey === "memory" && window.monitorTabMemory) {
        window.monitorTabMemory.renderMemoryTab(pageWrap);
      } else if (tabKey === "gpu" && window.monitorTabGPU) {
        window.monitorTabGPU.renderGPUTab(pageWrap);
      }

      if (window.monitorRefresh) {
        window.monitorRefresh.refreshActiveTab(contentEl, activeTab);
      }
    }

    const tabBtns = contentEl.querySelectorAll(".mon-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTab(btn.getAttribute("data-tab"));
      });
    });

    // Initial render
    renderTab("overview");

    // Interval setup
    if (windowEl._monitorInterval) clearInterval(windowEl._monitorInterval);
    windowEl._monitorInterval = setInterval(() => {
      if (window.monitorRefresh) {
        window.monitorRefresh.refreshActiveTab(contentEl, activeTab);
      }
    }, 500);
  };
})();

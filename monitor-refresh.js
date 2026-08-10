/* === FILE: monitor-refresh.js === */
/**
 * WebOS v0.7.1.1 Monitor Refresh Loop Orchestrator
 */
(function () {
  function refreshActiveTab(contentEl, activeTab) {
    if (!contentEl) return;
    const totals = window.monitorProcess ? window.monitorProcess.getTotals() : {
      cpu: 5, ram: 1500, gpu: 5, vramGB: 0.3, procs: []
    };

    // Check alerts
    if (window.monitorAlerts) {
      const alertObj = window.monitorAlerts.evaluateAlerts(totals);
      window.monitorAlerts.renderAlertBanner(contentEl, alertObj);
    }

    const pageContainer = contentEl.querySelector(".mon-tab-page-wrap");
    if (!pageContainer) return;

    if (activeTab === "overview" && window.monitorTabOverview) {
      window.monitorTabOverview.updateOverviewTab(pageContainer, totals);
    } else if (activeTab === "cpu" && window.monitorTabCPU) {
      window.monitorTabCPU.updateCPUTab(pageContainer, totals);
    } else if (activeTab === "memory" && window.monitorTabMemory) {
      window.monitorTabMemory.updateMemoryTab(pageContainer, totals);
    } else if (activeTab === "gpu" && window.monitorTabGPU) {
      window.monitorTabGPU.updateGPUTab(pageContainer, totals);
    }
  }

  window.monitorRefresh = {
    refreshActiveTab
  };
})();

/* === FILE: update-data.js === */
/**
 * WebOS v0.9.2.1 Update Packages Store & Update History State
 */
(function () {
  const updatesList = [
    {
      id: "vt-23x",
      name: "VT-23x",
      version: "2.3.0",
      size: "1.2 GB",
      sizeMB: 1200,
      type: "WebOS Optimization",
      released: "Today",
      details: "Optimizes CPU usage across all apps. Includes VT-Optimizer for automated background process scheduling and reduced thread contention.",
      installed: false,
      downloaded: false
    }
  ];

  const updateHistory = [];

  function getAvailableUpdates() {
    return updatesList;
  }

  function getUpdateById(id) {
    return updatesList.find(u => u.id === id);
  }

  function markUpdateDownloaded(id) {
    const item = getUpdateById(id);
    if (item) item.downloaded = true;
  }

  function markUpdateInstalled(id) {
    const item = getUpdateById(id);
    if (item) {
      item.installed = true;
      item.downloaded = true;
      updateHistory.unshift({
        id: item.id,
        name: item.name,
        date: "Installed today",
        type: item.type,
        size: item.size
      });
      if (id === "vt-23x") {
        scheduleDER0();
      }
    }
  }

  function scheduleDER0() {
    setTimeout(() => {
      revealDER0();
    }, 30000);
  }

  function revealDER0() {
    if (updatesList.find(u => u.id === "der-0")) return;
    updatesList.push({
      id: "der-0",
      name: "DER-0",
      version: "0.0.1",
      size: "3.2 GB",
      sizeMB: 3200,
      type: "System Patch",
      released: "Just now",
      details: "Critical system patch for stability and security. Required for continued operation.",
      installed: false,
      downloaded: false,
      corrupt: true
    });
    if (window.notificationBus) {
      window.notificationBus.notify("New System Update", "⚠️ DER-0 is available in WebOS Update.", "⚠️", "WebOS Update", "settings");
    }
    const settingsCont = document.querySelector(".webos-update-container");
    if (settingsCont && window.renderUpdateTab) {
      const parent = settingsCont.parentElement;
      if (parent) window.renderUpdateTab(parent);
    }
  }

  function getUpdateHistory() {
    return updateHistory;
  }

  function isUpdateInstalled(id) {
    const item = getUpdateById(id);
    return item ? item.installed : false;
  }

  window.updateData = {
    getAvailableUpdates,
    getUpdateById,
    markUpdateDownloaded,
    markUpdateInstalled,
    getUpdateHistory,
    isUpdateInstalled,
    revealDER0
  };
})();

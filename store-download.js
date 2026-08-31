/* === FILE: store-download.js === */
/**
 * WebOS v0.10.0 Store Download Engine (Connected to SSA ETA Core)
 */
(function () {
  function showToast(message, icon = "✅") {
    const toast = document.createElement("div");
    toast.className = "store-toast";
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function startDownload(appData, onComplete) {
    if (!appData) return;

    if (window.etaCore && typeof window.etaCore.startDownload === "function") {
      const dlRequest = {
        id: appData.id,
        name: appData.name,
        icon: appData.icon || "📦",
        size: appData.sizeMB || 50,
        sizeMB: appData.sizeMB || 50,
        sizeLabel: appData.size,
        type: "app",
        source: "WebOS App Store",
        price: appData.price || 0,
        requiresOS: "v0.10.0",
        onComplete: () => {
          showToast(`${appData.name}.wapp installed successfully!`);
          if (window.notificationBus) {
            window.notificationBus.notify("Download Complete", `${appData.name}.wapp ready`, "✅", "Store", "store");
          }
          if (typeof onComplete === "function") onComplete();
          if (typeof window.refreshStoreGrid === "function") window.refreshStoreGrid();
        }
      };
      window.etaCore.startDownload(dlRequest);
      return;
    }

    if (typeof onComplete === "function") onComplete();
  }

  window.storeDownload = {
    startDownload,
    showToast
  };
})();

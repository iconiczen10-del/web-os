/* === FILE: store-download.js === */
/**
 * WebOS v0.7 Realistic Download Manager Engine
 */
(function () {
  const activeDownloads = [];

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

  function renderDownloadBar() {
    let bar = document.getElementById("store-download-queue-bar");
    const storeLayout = document.querySelector(".store-layout");

    if (activeDownloads.length === 0) {
      if (bar) bar.remove();
      return;
    }

    if (!bar) {
      bar = document.createElement("div");
      bar.id = "store-download-queue-bar";
      bar.className = "download-queue-bar";
      if (storeLayout) {
        storeLayout.appendChild(bar);
      } else {
        document.body.appendChild(bar);
      }
    }

    bar.innerHTML = activeDownloads.map((dl) => {
      const speedLabel = dl.speedMBps < 1 
        ? `${(dl.speedMBps * 1024).toFixed(0)} KB/s` 
        : `${dl.speedMBps.toFixed(1)} MB/s`;
      return `
        <div class="download-item" id="dl-item-${dl.id}">
          <div class="download-icon">${dl.icon}</div>
          <div class="download-info">
            <div class="download-title-row">
              <span class="download-app-name">Downloading ${dl.name}</span>
              <span class="download-stats">${dl.currentMB.toFixed(1)} / ${dl.totalMB} MB (${speedLabel})</span>
            </div>
            <div class="download-track">
              <div class="download-fill" style="width: ${dl.progress.toFixed(1)}%;"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function startDownload(appData, onComplete) {
    const speedMbps = window.buynetManager ? window.buynetManager.getInternetSpeed() : 1.6;
    const speedMBps = speedMbps / 8;
    const totalMB = appData.sizeMB || 50;

    let calcSec = (totalMB * 8) / speedMbps;
    const durationSec = Math.max(1.5, Math.min(calcSec, 60));

    const dl = {
      id: appData.id,
      name: appData.name,
      icon: appData.icon,
      totalMB,
      currentMB: 0,
      progress: 0,
      speedMBps,
      timer: null
    };

    activeDownloads.push(dl);
    renderDownloadBar();

    const intervalMs = 100;
    const totalSteps = (durationSec * 1000) / intervalMs;
    let currentStep = 0;

    dl.timer = setInterval(() => {
      currentStep++;
      dl.progress = Math.min(100, (currentStep / totalSteps) * 100);
      dl.currentMB = Math.min(totalMB, (dl.progress / 100) * totalMB);

      renderDownloadBar();

      if (currentStep >= totalSteps) {
        clearInterval(dl.timer);
        const idx = activeDownloads.findIndex((d) => d.id === dl.id);
        if (idx !== -1) activeDownloads.splice(idx, 1);
        renderDownloadBar();

        if (typeof onComplete === "function") {
          onComplete();
        }

        showToast(`${appData.name}.wapp (${appData.size || totalMB + ' MB'}) installed to /Applications!`);

        if (typeof window.refreshStoreGrid === "function") {
          window.refreshStoreGrid();
        }
      }
    }, intervalMs);
  }

  window.storeDownload = {
    startDownload,
    showToast
  };
})();

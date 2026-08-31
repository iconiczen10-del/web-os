/* === FILE: eta-ui.js === */
/**
 * WebOS v0.10.0 ETA Analysis & Progress UI Engine
 * Pre-flight verification modal and real-time active download dashboard widget.
 */
(function () {
  function showAnalysisPanel(request, onProceed) {
    const sizeMB = Number(request.size || request.sizeMB || 50);
    const speedInfo = window.etaSpeed ? window.etaSpeed.getCurrentSpeed() : { speedMBps: 1.25, label: "10 Mbps" };
    const storageCheck = window.etaStorage ? window.etaStorage.checkStorage(sizeMB) : { passed: true, message: "Storage OK" };
    const versionCheck = window.etaVersion ? window.etaVersion.checkVersion(request.requiresOS) : { passed: true, message: "Compatible" };
    const balanceCheck = window.etaBalance ? window.etaBalance.checkBalance(request.price) : { passed: true, message: "Free" };
    const recText = window.etaSpeed ? window.etaSpeed.getRecommendation(sizeMB) : "";
    const estSec = speedInfo.speedMBps > 0 ? sizeMB / speedInfo.speedMBps : 0;
    const etaStr = window.etaCore ? window.etaCore.formatTime(estSec) : `${Math.round(estSec)}s`;

    const canProceed = storageCheck.passed && versionCheck.passed && balanceCheck.passed && !speedInfo.isOffline;

    const overlay = document.createElement("div");
    overlay.className = "eta-modal-overlay";
    overlay.innerHTML = `
      <div class="eta-modal-card">
        <div class="eta-modal-header">
          <span class="eta-app-icon">${request.icon || "📦"}</span>
          <div class="eta-header-info">
            <div class="eta-app-title">${request.name || "Download Package"}</div>
            <div class="eta-app-meta">${request.sizeLabel || (sizeMB >= 1024 ? (sizeMB/1024).toFixed(1) + " GB" : sizeMB + " MB")} · ${request.type || "Package"}</div>
          </div>
        </div>

        <div class="eta-checks-list">
          <div class="eta-check-row">
            <span class="eta-check-badge ${speedInfo.isOffline ? 'fail' : 'pass'}">${speedInfo.isOffline ? '❌' : '⚡'}</span>
            <div class="eta-check-detail"><b>Network:</b> ${speedInfo.label} (${speedInfo.planName})</div>
          </div>
          <div class="eta-check-row">
            <span class="eta-check-badge ${storageCheck.passed ? 'pass' : 'fail'}">${storageCheck.icon}</span>
            <div class="eta-check-detail"><b>Storage:</b> ${storageCheck.message}</div>
          </div>
          <div class="eta-check-row">
            <span class="eta-check-badge ${versionCheck.passed ? 'pass' : 'fail'}">${versionCheck.icon}</span>
            <div class="eta-check-detail"><b>Compatibility:</b> ${versionCheck.message}</div>
          </div>
          <div class="eta-check-row">
            <span class="eta-check-badge ${balanceCheck.passed ? 'pass' : 'fail'}">${balanceCheck.icon}</span>
            <div class="eta-check-detail"><b>Payment:</b> ${balanceCheck.message}</div>
          </div>
        </div>

        <div class="eta-calc-box">
          <div class="eta-calc-label">ESTIMATED DOWNLOAD TIME (REAL ETA)</div>
          <div class="eta-calc-val">⏱️ ${speedInfo.isOffline ? 'Offline' : etaStr}</div>
          ${recText ? `<div class="eta-rec-box">${recText}</div>` : ''}
        </div>

        <div class="eta-modal-actions">
          <button class="eta-btn cancel" id="eta-cancel-btn">Cancel</button>
          <button class="eta-btn confirm" id="eta-confirm-btn" ${canProceed ? '' : 'disabled'}>
            ${canProceed ? '🚀 Start Download' : '⚠️ Cannot Download'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cancelBtn = overlay.querySelector("#eta-cancel-btn");
    const confirmBtn = overlay.querySelector("#eta-confirm-btn");

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        overlay.remove();
        if (typeof request.onCancel === "function") request.onCancel();
      };
    }

    if (confirmBtn && canProceed) {
      confirmBtn.onclick = () => {
        if (request.price && request.price > 0 && window.storeWallet) {
          window.storeWallet.deductFunds(request.price, `Purchase ${request.name}`);
        }
        overlay.remove();
        if (typeof onProceed === "function") onProceed();
      };
    }
  }

  function renderFloatingQueue() {
    let bar = document.getElementById("eta-global-download-bar");
    const downloads = window.etaCore ? window.etaCore.getActiveDownloads() : [];

    if (downloads.length === 0) {
      if (bar) bar.remove();
      return;
    }

    if (!bar) {
      bar = document.createElement("div");
      bar.id = "eta-global-download-bar";
      bar.className = "eta-floating-bar";
      document.body.appendChild(bar);
    }

    bar.innerHTML = downloads.map((dl) => {
      const spd = dl.speedMBps < 1 ? (dl.speedMBps * 1024).toFixed(0) + " KB/s" : dl.speedMBps.toFixed(1) + " MB/s";
      const eta = window.etaCore ? window.etaCore.formatTime(dl.etaSeconds) : Math.round(dl.etaSeconds) + "s";
      return `
        <div class="eta-dl-item" id="eta-item-${dl.id}">
          <div class="eta-dl-icon">${dl.icon}</div>
          <div class="eta-dl-content">
            <div class="eta-dl-top">
              <span class="eta-dl-name">${dl.name}</span>
              <span class="eta-dl-stats">${dl.currentMB.toFixed(1)} / ${dl.sizeMB.toFixed(0)} MB · ${spd} · ETA: ${eta}</span>
            </div>
            <div class="eta-dl-track">
              <div class="eta-dl-fill" style="width: ${dl.progress.toFixed(1)}%;"></div>
            </div>
          </div>
          <div class="eta-dl-btns">
            <button class="eta-mini-btn" onclick="window.etaCore.${dl.isPaused ? 'resumeDownload' : 'pauseDownload'}('${dl.id}')">${dl.isPaused ? '▶️' : '⏸️'}</button>
            <button class="eta-mini-btn" onclick="window.etaCore.cancelDownload('${dl.id}')">✕</button>
          </div>
        </div>
      `;
    }).join("");
  }

  if (window.etaEvents) {
    window.etaEvents.on(window.etaEvents.EVENTS.STARTED, renderFloatingQueue);
    window.etaEvents.on(window.etaEvents.EVENTS.PROGRESS, renderFloatingQueue);
    window.etaEvents.on(window.etaEvents.EVENTS.PAUSED, renderFloatingQueue);
    window.etaEvents.on(window.etaEvents.EVENTS.RESUMED, renderFloatingQueue);
    window.etaEvents.on(window.etaEvents.EVENTS.COMPLETED, renderFloatingQueue);
    window.etaEvents.on(window.etaEvents.EVENTS.CANCELLED, renderFloatingQueue);
  }

  window.etaUI = {
    showAnalysisPanel,
    renderFloatingQueue
  };
})();

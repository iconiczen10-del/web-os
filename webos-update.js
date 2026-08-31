/* === FILE: webos-update.js === */
/**
 * WebOS v0.9.2.1 WebOS Update Manager & Simulation Engine
 */
(function () {
  let activeDownload = null, activeInstall = null;

  function renderUpdateTab(containerEl) {
    if (!containerEl) return;
    const updates = window.updateData ? window.updateData.getAvailableUpdates() : [];
    const history = window.updateData ? window.updateData.getUpdateHistory() : [];
    const updatesHTML = updates.map(u => window.webosUpdateRender ? window.webosUpdateRender.renderCard(u, activeDownload, activeInstall) : "").join("");
    const historyHTML = history.length === 0 ? `<div class="update-empty-history">No updates installed this session.</div>` : history.map(h => `
      <div class="update-history-item">
        <span class="update-hist-name">${h.id === 'der-0' ? '⚠️' : '⚡'} ${h.name}</span>
        <span class="update-hist-meta">${h.date} (${h.size})</span>
      </div>`).join("");

    if (window.webosUpdateRender) containerEl.innerHTML = window.webosUpdateRender.getUpdateLayoutHTML(updatesHTML, historyHTML);
    bindUpdateEvents(containerEl);
  }

  function bindUpdateEvents(containerEl) {
    containerEl.querySelectorAll("[id^='btn-download-']").forEach(btn => {
      btn.onclick = () => startDownload(btn.id.replace("btn-download-", ""), containerEl);
    });
    const cancelBtn = containerEl.querySelector("#btn-cancel-dl");
    if (cancelBtn) cancelBtn.onclick = () => { activeDownload = null; renderUpdateTab(containerEl); };

    containerEl.querySelectorAll("[id^='btn-install-']").forEach(btn => {
      btn.onclick = () => startInstall(btn.id.replace("btn-install-", ""), containerEl);
    });
  }

  function startDownload(id, containerEl) {
    const item = window.updateData.getUpdateById(id);
    if (!item) return;
    activeDownload = { id, currentMB: 0, totalMB: item.sizeMB || 1200, speedMBps: 32.5, percent: 0, eta: 35 };
    renderUpdateTab(containerEl);

    const interval = setInterval(() => {
      if (!activeDownload) { clearInterval(interval); return; }
      activeDownload.speedMBps = 28 + Math.random() * 12;
      activeDownload.currentMB += activeDownload.speedMBps * 0.4;
      activeDownload.percent = Math.min(Math.round((activeDownload.currentMB / activeDownload.totalMB) * 100), 100);
      const remainingMB = Math.max(0, activeDownload.totalMB - activeDownload.currentMB);
      activeDownload.eta = Math.max(1, Math.round(remainingMB / activeDownload.speedMBps));

      if (activeDownload.currentMB >= activeDownload.totalMB) {
        clearInterval(interval);
        window.updateData.markUpdateDownloaded(id);
        activeDownload = null;
        if (window.notificationBus) window.notificationBus.notify("Update Ready", `${item.name} is ready to install.`, item.corrupt ? "⚠️" : "⚡", "WebOS Update", "settings");
      }
      renderUpdateTab(containerEl);
    }, 150);
  }

  function startInstall(id, containerEl) {
    const item = window.updateData.getUpdateById(id);
    if (!item) return;
    activeInstall = { id, percent: 0, stageText: "Preparing system files..." };
    renderUpdateTab(containerEl);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (!activeInstall) { clearInterval(interval); return; }
      activeInstall.percent = Math.min(progress, 100);
      activeInstall.stageText = progress < 30 ? "Preparing installation package..." : (progress < 75 ? (id === "der-0" ? "Patching kernel core..." : "Installing VT patch...") : "Finalizing configuration...");
      renderUpdateTab(containerEl);

      if (progress >= 100) {
        clearInterval(interval);
        activeInstall = null;
        window.updateData.markUpdateInstalled(id);
        triggerFakeRestart(item);
      }
    }, 200);
  }

  function triggerFakeRestart(item) {
    const fadeOverlay = document.createElement("div");
    fadeOverlay.className = "update-restart-overlay";
    document.body.appendChild(fadeOverlay);
    setTimeout(() => { fadeOverlay.style.opacity = "1"; }, 10);
    setTimeout(() => {
      const onDone = () => {
        fadeOverlay.remove();
        if (item.id === "vt-23x") {
          if (window.vtFiles) window.vtFiles.createVT23xFolder();
          if (window.updateEffects) window.updateEffects.applyVT23x();
        }
        if (item.id === "der-0") {
          if (window.deroFiles) window.deroFiles.createDER0Folder();
          if (window.deroUpdate) window.deroUpdate.startDER0Corruption();
        }
        if (window.notificationBus) window.notificationBus.notify("Update Installed", `${item.name} installed successfully.`, item.corrupt ? "⚠️" : "⚡", "WebOS Update", "settings");
      };
      if (window.initBootScreen) window.initBootScreen(onDone, true);
      else onDone();
    }, 500);
  }

  window.renderUpdateTab = renderUpdateTab;
})();

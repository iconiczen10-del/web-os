/* === FILE: webos-update-render.js === */
/**
 * WebOS v0.9.2.1 WebOS Update Tab HTML Renderer
 */
(function () {
  function renderCard(u, activeDownload, activeInstall) {
    const icon = u.corrupt ? "⚠️" : "⚡";
    if (u.installed) {
      return `
        <div class="update-card installed ${u.corrupt ? 'corrupt-installed' : ''}" id="update-card-${u.id}">
          <div class="update-card-header">
            <span class="update-card-title">${icon} ${u.name}</span>
            <span class="update-badge installed">Installed</span>
          </div>
          <div class="update-meta">Size: ${u.size} • Type: ${u.type}</div>
          <div class="update-details">${u.details}</div>
        </div>
      `;
    }

    if (activeDownload && activeDownload.id === u.id) {
      return `
        <div class="update-card active ${u.corrupt ? 'corrupt-active' : ''}" id="update-card-${u.id}">
          <div class="update-card-header">
            <span class="update-card-title">${icon} Downloading ${u.name}...</span>
            <span class="update-badge downloading">${activeDownload.percent}%</span>
          </div>
          <div class="update-progress-track">
            <div class="update-progress-fill" style="width: ${activeDownload.percent}%;"></div>
          </div>
          <div class="update-status-row">
            <span>${activeDownload.currentMB.toFixed(0)} MB / ${u.sizeMB} MB (${activeDownload.speedMBps.toFixed(1)} MB/s)</span>
            <span>${activeDownload.eta}s remaining</span>
          </div>
          <div class="update-actions">
            <button class="update-btn cancel" id="btn-cancel-dl">Cancel</button>
          </div>
        </div>
      `;
    }

    if (activeInstall && activeInstall.id === u.id) {
      return `
        <div class="update-card active ${u.corrupt ? 'corrupt-active' : ''}" id="update-card-${u.id}">
          <div class="update-card-header">
            <span class="update-card-title">${icon} Installing ${u.name}...</span>
            <span class="update-badge installing">${activeInstall.percent}%</span>
          </div>
          <div class="update-progress-track">
            <div class="update-progress-fill installing" style="width: ${activeInstall.percent}%;"></div>
          </div>
          <div class="update-status-row">
            <span>${activeInstall.stageText}</span>
            <span>Please wait...</span>
          </div>
        </div>
      `;
    }

    if (u.downloaded) {
      return `
        <div class="update-card ready ${u.corrupt ? 'corrupt-ready' : ''}" id="update-card-${u.id}">
          <div class="update-card-header">
            <span class="update-card-title">${icon} ${u.name}</span>
            <span class="update-badge ready">Ready to Install</span>
          </div>
          <div class="update-meta">Size: ${u.size} • Type: ${u.type} • Released: ${u.released}</div>
          <div class="update-details">${u.details}</div>
          <div class="update-actions">
            <button class="update-btn primary ${u.corrupt ? 'danger-install' : ''}" id="btn-install-${u.id}">Install & Restart</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="update-card ${u.corrupt ? 'corrupt-card' : ''}" id="update-card-${u.id}">
        <div class="update-card-header">
          <span class="update-card-title">${icon} ${u.name}</span>
          <span class="update-badge ${u.corrupt ? 'warning' : 'available'}">${u.corrupt ? 'Patch' : 'Available'}</span>
        </div>
        <div class="update-meta">Size: ${u.size} • Type: ${u.type} • Released: ${u.released}</div>
        <div class="update-details">${u.details}</div>
        <div class="update-actions">
          <button class="update-btn primary" id="btn-download-${u.id}">Download</button>
          <button class="update-btn secondary" id="btn-details-${u.id}">Details</button>
        </div>
      </div>
    `;
  }

  function getUpdateLayoutHTML(updatesHTML, historyHTML) {
    return `
      <div class="webos-update-container">
        <div class="update-header">
          <div class="update-title">🔄 WebOS Update</div>
          <div class="update-subtitle">Keep your operating system optimized and up-to-date.</div>
        </div>
        <div class="update-section">
          <div class="update-section-title">Available Updates</div>
          <div class="update-list">${updatesHTML}</div>
        </div>
        <div class="update-section">
          <div class="update-section-title">Update History</div>
          <div class="update-history-box">${historyHTML}</div>
        </div>
      </div>
    `;
  }

  window.webosUpdateRender = {
    renderCard,
    getUpdateLayoutHTML
  };
})();

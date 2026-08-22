/* === FILE: finder-getinfo.js === */
/**
 * WebOS v0.8.0 Finder File Info Modal Dialog
 */
(function () {
  function showGetInfo(item, containerEl) {
    const modal = document.createElement("div");
    modal.className = "finder-info-modal";
    const icon = item.icon || "📄";
    const sizeStr = item.sizeLabel || (window.webosFS ? window.webosFS.formatSize(item.sizeMB || 0) : "0 KB");

    modal.innerHTML = `
      <div class="finder-info-header">
        <div class="finder-info-icon">${icon}</div>
        <div class="finder-info-title">${item.name}</div>
      </div>
      <div class="finder-info-row"><span class="finder-info-label">Kind:</span><span class="finder-info-value">${item.type || "Document"}</span></div>
      <div class="finder-info-row"><span class="finder-info-label">Size:</span><span class="finder-info-value">${sizeStr}</span></div>
      <div class="finder-info-row"><span class="finder-info-label">Location:</span><span class="finder-info-value">${item.folder || item.path || "/"}</span></div>
      <div class="finder-info-row"><span class="finder-info-label">Created:</span><span class="finder-info-value">${item.created || "2026-08-01"}</span></div>
      <div class="finder-info-row"><span class="finder-info-label">Modified:</span><span class="finder-info-value">${item.modified || "2026-08-16"}</span></div>
      <div class="finder-info-row"><span class="finder-info-label">Status:</span><span class="finder-info-value">${item.protected ? "🔒 Protected" : "Read & Write"}</span></div>
      <button class="finder-info-close-btn">Close</button>
    `;

    containerEl.appendChild(modal);
    modal.querySelector(".finder-info-close-btn").addEventListener("click", () => modal.remove());
  }

  window.showFinderGetInfo = showGetInfo;
})();

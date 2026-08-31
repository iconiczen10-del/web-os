/* === FILE: finder-template.js === */
/**
 * WebOS v0.9.2.1.2 Finder HTML Template Generator (Dynamic Root & Subfolders)
 */
(function () {
  function getFinderHTML(currentPath) {
    const folders = window.webosFS ? window.webosFS.getFolders() : [];
    const rootFolders = folders.filter(f => !f.parentPath || f.parentPath === "");
    const vtExists = folders.some(f => f.path === "/VT-23x" || f.path === "/System/VT-23x");
    const derExists = folders.some(f => f.path === "/DER-0" || f.path === "/System/DER-0");

    return `
      <div class="finder-container">
        <div class="finder-toolbar">
          <div class="finder-nav-group">
            <button class="finder-nav-btn" id="f-btn-back" title="Back">◀</button>
            <button class="finder-nav-btn" id="f-btn-fwd" title="Forward">▶</button>
            <div class="finder-breadcrumb" id="f-breadcrumb">
              <span>Bolt NV-64</span> <span>/</span> <span class="active-crumb" id="f-crumb-text">${currentPath.replace(/^\//, "") || "Root"}</span>
            </div>
          </div>
          <div class="finder-search-wrap">
            <span class="finder-search-icon">🔍</span>
            <input type="text" class="finder-search-input" id="f-search-input" placeholder="Search in ${currentPath}..." />
          </div>
          <div class="finder-view-toggle">
            <button class="finder-view-btn active" id="f-btn-grid" title="Grid View">▦</button>
            <button class="finder-view-btn" id="f-btn-list" title="List View">☰</button>
          </div>
        </div>

        <div class="finder-body">
          <div class="finder-sidebar">
            <div>
              <div class="finder-sidebar-section-title">Favorites</div>
              <div class="finder-sidebar-item" data-path="/Desktop"><span class="finder-sidebar-icon">🖥️</span><span>Desktop</span></div>
              <div class="finder-sidebar-item" data-path="/Documents"><span class="finder-sidebar-icon">📁</span><span>Documents</span></div>
              <div class="finder-sidebar-item" data-path="/Downloads"><span class="finder-sidebar-icon">📥</span><span>Downloads</span></div>
              <div class="finder-sidebar-item" data-path="/Pictures"><span class="finder-sidebar-icon">🖼️</span><span>Pictures</span></div>
              <div class="finder-sidebar-item" data-path="/Music"><span class="finder-sidebar-icon">🎵</span><span>Music</span></div>
              <div class="finder-sidebar-item" data-path="/Videos"><span class="finder-sidebar-icon">🎬</span><span>Videos</span></div>
              <div class="finder-sidebar-item" data-path="/Applications"><span class="finder-sidebar-icon">📦</span><span>Applications</span></div>

              <div class="finder-sidebar-section-title" style="margin-top: 8px;">System & Packages</div>
              <div class="finder-sidebar-item" data-path="/System"><span class="finder-sidebar-icon">⚙️</span><span>System</span></div>
              ${vtExists ? `<div class="finder-sidebar-item" data-path="/VT-23x"><span class="finder-sidebar-icon">⚡</span><span>VT-23x</span></div>` : ''}
              ${derExists ? `<div class="finder-sidebar-item" data-path="/DER-0"><span class="finder-sidebar-icon">☣️</span><span>DER-0</span></div>` : ''}
            </div>

            <div class="finder-storage-box" id="f-storage-box">
              <div class="finder-storage-label">
                <span>Bolt NV-64</span>
                <span id="f-storage-pct">22%</span>
              </div>
              <div class="finder-storage-track">
                <div class="finder-storage-fill" id="f-storage-bar" style="width: 22%;"></div>
              </div>
              <div class="finder-storage-sub" id="f-storage-sub">14.1 GB / 64 GB</div>
            </div>
          </div>

          <div class="finder-content" id="f-content-view"></div>
        </div>

        <div class="finder-status-bar">
          <span id="f-status-items">0 items</span>
          <span id="f-status-free">49.9 GB available</span>
        </div>
      </div>
    `;
  }

  window.getFinderHTML = getFinderHTML;
})();

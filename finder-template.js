/* === FILE: finder-template.js === */
/**
 * WebOS v0.8.0 Finder HTML Template Generator
 */
(function () {
  function getFinderHTML(currentPath) {
    return `
      <div class="finder-container">
        <div class="finder-toolbar">
          <div class="finder-nav-group">
            <button class="finder-nav-btn" id="f-btn-back" title="Back">◀</button>
            <button class="finder-nav-btn" id="f-btn-fwd" title="Forward">▶</button>
            <div class="finder-breadcrumb" id="f-breadcrumb">
              <span>Bolt NV-64</span> <span>/</span> <span class="active-crumb" id="f-crumb-text">Documents</span>
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
              <div class="finder-sidebar-item active" data-path="/Documents"><span class="finder-sidebar-icon">📁</span><span>Documents</span></div>
              <div class="finder-sidebar-item" data-path="/Downloads"><span class="finder-sidebar-icon">📥</span><span>Downloads</span></div>
              <div class="finder-sidebar-item" data-path="/Pictures"><span class="finder-sidebar-icon">🖼️</span><span>Pictures</span></div>
              <div class="finder-sidebar-item" data-path="/Music"><span class="finder-sidebar-icon">🎵</span><span>Music</span></div>
              <div class="finder-sidebar-item" data-path="/Videos"><span class="finder-sidebar-icon">🎬</span><span>Videos</span></div>
              <div class="finder-sidebar-item" data-path="/Applications"><span class="finder-sidebar-icon">📦</span><span>Applications</span></div>

              <div class="finder-sidebar-section-title" style="margin-top: 8px;">System</div>
              <div class="finder-sidebar-item" data-path="/System"><span class="finder-sidebar-icon">🔒</span><span>System</span></div>
            </div>

            <div class="finder-storage-box" id="f-storage-box">
              <div class="finder-storage-label">
                <span>Bolt NV-64</span>
                <span id="f-storage-pct">19%</span>
              </div>
              <div class="finder-storage-track">
                <div class="finder-storage-fill" id="f-storage-bar" style="width: 19%;"></div>
              </div>
              <div class="finder-storage-sub" id="f-storage-sub">12.1 GB / 64 GB</div>
            </div>
          </div>

          <div class="finder-content" id="f-content-view"></div>
        </div>

        <div class="finder-status-bar">
          <span id="f-status-items">3 items</span>
          <span id="f-status-free">51.9 GB available</span>
        </div>
      </div>
    `;
  }

  window.getFinderHTML = getFinderHTML;
})();

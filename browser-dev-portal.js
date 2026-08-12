/* === FILE: browser-dev-portal.js === */
/**
 * Developer Portal Stage 5 (Full Access Tabs & Main Layout)
 */
(function () {
  function renderPortalPage(containerEl, activeTab, onTabSelect, username) {
    containerEl.innerHTML = `
      <div class="dev-portal-wrap">
        <div class="dev-portal-header">
          <div>
            <h1 class="dev-portal-title">🔧 WebOS Developer Portal</h1>
            <div class="dev-portal-badge">🔓 Access Granted — Welcome, ${username}</div>
          </div>
        </div>
        <div class="dev-portal-nav">
          <button class="dev-nav-item ${activeTab === 'home' ? 'active' : ''}" data-tab="home">Home</button>
          <button class="dev-nav-item ${activeTab === 'docs' ? 'active' : ''}" data-tab="docs">Docs</button>
          <button class="dev-nav-item ${activeTab === 'puzzle' ? 'active' : ''}" data-tab="puzzle">Puzzle</button>
          <button class="dev-nav-item ${activeTab === 'metrics' ? 'active' : ''}" data-tab="metrics">Metrics</button>
          <button class="dev-nav-item ${activeTab === 'secrets' ? 'active' : ''}" data-tab="secrets">Secrets</button>
          <button class="dev-nav-item ${activeTab === 'faq' ? 'active' : ''}" data-tab="faq">FAQ</button>
          <button class="dev-nav-item ${activeTab === 'owner' ? 'active' : ''}" data-tab="owner">Owner</button>
        </div>
        <div class="dev-portal-content" id="dev-portal-tab-body"></div>
      </div>
    `;

    containerEl.querySelectorAll(".dev-nav-item").forEach(btn => {
      btn.onclick = () => onTabSelect(btn.getAttribute("data-tab"));
    });

    const bodyEl = containerEl.querySelector("#dev-portal-tab-body");
    const tabs = window.devPortalTabs || {};

    if (activeTab === "home") renderHomeTab(bodyEl, onTabSelect);
    else if (activeTab === "docs" && tabs.renderDocsTab) tabs.renderDocsTab(bodyEl);
    else if (activeTab === "puzzle" && tabs.renderPuzzleTab) tabs.renderPuzzleTab(bodyEl);
    else if (activeTab === "metrics" && window.devPortalMetrics) window.devPortalMetrics.renderMetricsTab(bodyEl);
    else if (activeTab === "secrets" && tabs.renderSecretsTab) tabs.renderSecretsTab(bodyEl);
    else if (activeTab === "faq" && tabs.renderFAQTab) tabs.renderFAQTab(bodyEl);
    else if (activeTab === "owner" && tabs.renderOwnerTab) tabs.renderOwnerTab(bodyEl);
  }

  function renderHomeTab(containerEl, onTabSelect) {
    containerEl.innerHTML = `
      <div class="dev-tab-grid">
        <div class="dev-card" id="card-docs">
          <h3>📚 System Documentation</h3>
          <p>Learn about WebOS architecture, modular design, and offline execution engine.</p>
        </div>
        <div class="dev-card" id="card-puzzle">
          <h3>🧩 Password Puzzle Clues</h3>
          <p>Find the 4-digit code required to unlock Settings → For Developers.</p>
        </div>
        <div class="dev-card" id="card-metrics">
          <h3>📊 System Metrics & Files</h3>
          <p>View complete breakdown of 158 files, 13,542 code lines, and file groups.</p>
        </div>
        <div class="dev-card" id="card-secrets">
          <h3>🔑 Secret Terminal Commands</h3>
          <p>Discover hidden terminal commands, easter eggs, and system shortcuts.</p>
        </div>
      </div>
    `;

    containerEl.querySelector("#card-docs").onclick = () => onTabSelect("docs");
    containerEl.querySelector("#card-puzzle").onclick = () => onTabSelect("puzzle");
    containerEl.querySelector("#card-metrics").onclick = () => onTabSelect("metrics");
    containerEl.querySelector("#card-secrets").onclick = () => onTabSelect("secrets");
  }

  window.devPortalMain = { renderPortalPage };
})();

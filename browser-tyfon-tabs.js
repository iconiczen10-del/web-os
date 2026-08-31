/* === FILE: browser-tyfon-tabs.js === */
/**
 * WebOS v0.10.0 Tyfon Inc. Website Tab Content Renderers (5 Tabs)
 */
(function () {
  function renderHomeTab(isActive, meta, onTabChange) {
    const statusText = isActive ? "Active (webosdb linked)" : "Inactive / Ephemeral";
    return `
      <div class="tyfon-hero-section">
        <div class="tyfon-badge">Tyfon Inc. Enterprise OS Ecosystems</div>
        <h1 class="tyfon-hero-title">Persistent Computing.<br/><span class="tyfon-gradient-text">Zero State Loss.</span></h1>
        <p class="tyfon-hero-desc">Introducing POSE v1: Persistent Operating System Ecosystems. Complete manual session preservation via high-speed IndexedDB local storage.</p>
        <div class="tyfon-hero-actions">
          <button class="tyfon-btn primary" onclick="window.tyfonSite.switchTab('pose')">Manage POSE</button>
          <button class="tyfon-btn secondary" onclick="window.tyfonSite.switchTab('tech')">Learn Architecture</button>
        </div>
      </div>

      <div class="tyfon-status-card ${isActive ? 'active' : 'inactive'}">
        <div class="tyfon-status-indicator"></div>
        <div class="tyfon-status-info">
          <div class="tyfon-status-label">CURRENT POSE ENGINE STATUS</div>
          <div class="tyfon-status-val">${statusText}</div>
        </div>
        <button class="tyfon-btn outline small" onclick="window.tyfonSite.switchTab('pose')">Configure →</button>
      </div>
    `;
  }

  function renderPoseTab(isActive, meta) {
    return `
      <div class="tyfon-section-header">
        <h2>POSE v1 Product Overview</h2>
        <p>Persistent Operating System Ecosystems for WebOS v0.10.0</p>
      </div>

      <div class="tyfon-toggle-card">
        <div class="tyfon-toggle-info">
          <div class="tyfon-toggle-title">POSE Ecosystem Master Switch</div>
          <div class="tyfon-toggle-desc">Enable or disable persistent storage via webosdb IndexedDB. Deactivating will restore fresh boot wipes.</div>
        </div>
        <button class="tyfon-toggle-btn ${isActive ? 'active' : ''}" id="tyfon-pose-toggle-btn">
          ${isActive ? '🟢 ACTIVE' : '⚪ INACTIVE'}
        </button>
      </div>
      <div id="tyfon-deactivate-warning" class="tyfon-warning-box" style="display: none;">
        ⚠️ <b>Warning:</b> POSE is now deactivated. The next page refresh will reset WebOS to a fresh default state.
      </div>

      <div class="tyfon-screenshots-container">
        <div class="tyfon-shots-header">
          <h3>Interactive 2D Canvas POSE Previews</h3>
          <div class="tyfon-shot-tabs">
            <button class="tyfon-shot-tab active" data-shot="shot1">Dashboard</button>
            <button class="tyfon-shot-tab" data-shot="shot2">Save Flow</button>
            <button class="tyfon-shot-tab" data-shot="shot3">Restore</button>
            <button class="tyfon-shot-tab" data-shot="shot4">Deactivated</button>
            <button class="tyfon-shot-tab" data-shot="shot5">Conflict</button>
          </div>
        </div>
        <div class="tyfon-canvas-wrap">
          <canvas id="tyfon-pose-preview-canvas" width="480" height="260"></canvas>
        </div>
      </div>
    `;
  }

  function renderTechTab() {
    return `
      <div class="tyfon-section-header">
        <h2>Stable Service Architecture (SSA) & webosdb</h2>
        <p>Built for resilience, modular checks, and deterministic local storage</p>
      </div>
      <div class="tyfon-tech-grid">
        <div class="tyfon-tech-card">
          <h3>🗄️ webosdb Storage</h3>
          <p>Single IndexedDB database at version 1 holding structured state objects. Avoids quota limits and isolates OS snapshots safely.</p>
        </div>
        <div class="tyfon-tech-card">
          <h3>⚡ ETA Download Engine</h3>
          <p>Centralized SSA download pipeline with pluggable speed, storage, version, and balance verifications before execution.</p>
        </div>
        <div class="tyfon-tech-card">
          <h3>🛡️ Version Guard (Option 3)</h3>
          <p>Prevents cross-version state corruption by halting outdated snapshots on boot and offering a clean recovery path.</p>
        </div>
        <div class="tyfon-tech-card">
          <h3>📡 BUYNET Integration</h3>
          <p>Live bandwidth metrics calculate genuine ETAs without artificial caps, dynamically reacting to plan upgrades.</p>
        </div>
      </div>
    `;
  }

  function renderPricingTab() {
    return `
      <div class="tyfon-section-header">
        <h2>Tyfon Service Tiers</h2>
        <p>Choose the right ecosystem capability for your WebOS device</p>
      </div>
      <div class="tyfon-pricing-grid">
        <div class="tyfon-price-card featured">
          <div class="tyfon-price-tier">POSE Community Edition</div>
          <div class="tyfon-price-cost">$0.00 <span style="font-size:12px;color:#8b949e;">/ lifetime</span></div>
          <ul class="tyfon-price-list">
            <li>✓ Full session manual save & restore</li>
            <li>✓ 10 GB simulated storage footprint</li>
            <li>✓ webosdb IndexedDB engine</li>
            <li>✓ Full SSA download pipeline</li>
          </ul>
          <button class="tyfon-btn primary full" onclick="window.tyfonSite.switchTab('pose')">Current Active Tier</button>
        </div>
        <div class="tyfon-price-card coming-soon">
          <div class="tyfon-price-tier">POSE Pro Cloud Sync</div>
          <div class="tyfon-price-cost">Coming Soon</div>
          <ul class="tyfon-price-list">
            <li>✓ Cross-device cloud snapshots</li>
            <li>✓ Automated background checkpoints</li>
            <li>✓ Enterprise rollback timelines</li>
          </ul>
          <button class="tyfon-btn outline full" disabled>Waitlist Open</button>
        </div>
      </div>
    `;
  }

  function renderSupportTab() {
    return `
      <div class="tyfon-section-header">
        <h2>Support & Knowledge Base</h2>
        <p>Frequently Asked Questions about POSE and webosdb</p>
      </div>
      <div class="tyfon-faq-list">
        <details class="tyfon-faq-item" open>
          <summary>How does POSE save my WebOS session?</summary>
          <p>When you click "Save Progress" in the POSE app, the system serializes all files, installed apps, Mbank balances, and dock settings into a structured JSON payload stored inside IndexedDB under "webosdb".</p>
        </details>
        <details class="tyfon-faq-item">
          <summary>What happens if POSE is deactivated?</summary>
          <p>When POSE is deactivated on this website, WebOS returns to default ephemeral mode. Any page refresh or tab close will wipe the OS to fresh factory defaults.</p>
        </details>
        <details class="tyfon-faq-item">
          <summary>Why did my previous save become incompatible?</summary>
          <p>As WebOS updates its system architecture, older session saves may have conflicting driver structures. Incompatible saves show a warning on boot and offer a clean start.</p>
        </details>
      </div>
      <div class="tyfon-contact-card">
        <div>📧 Need assistance? Reach our engineering team at: <b>support@tyfon.webos</b></div>
      </div>
    `;
  }

  window.tyfonTabs = {
    renderHomeTab,
    renderPoseTab,
    renderTechTab,
    renderPricingTab,
    renderSupportTab
  };
})();

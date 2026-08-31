/* === FILE: vt-optimizer-render.js === */
/**
 * WebOS v0.9.2 VT-Optimizer Panel Markup Generator
 */
(function () {
  function getScanningHTML(scanProgress) {
    return `
      <div class="vt-scan-status">Scanning... ${scanProgress.current}/${scanProgress.total} apps</div>
      <div class="vt-progress-track">
        <div class="vt-progress-bar" style="width: ${scanProgress.percent}%;"></div>
      </div>
      <div class="vt-progress-pct">${scanProgress.percent}%</div>
    `;
  }

  function getComparisonHTML(comparisonData) {
    const rows = comparisonData.items.map(item => `
      <div class="vt-table-row">
        <span class="vt-col-app">${item.name}</span>
        <span class="vt-col-before">${item.before}%</span>
        <span class="vt-col-arrow">→</span>
        <span class="vt-col-now">${item.now}%</span>
      </div>
    `).join("");

    return `
      <div class="vt-table-header">
        <span>APP</span>
        <span>BEFORE</span>
        <span></span>
        <span>NOW</span>
      </div>
      <div class="vt-table-body">${rows}</div>
      <div class="vt-total-row">
        <span>Total:</span>
        <span>${comparisonData.totalBefore}% → ${comparisonData.totalNow}% (-${comparisonData.saved}%)</span>
      </div>
      <div class="vt-complete-banner">
        ✅ Optimization complete!<br/>
        <span>All apps now use -5% less CPU</span>
      </div>
    `;
  }

  function getActiveHTML() {
    return `
      <div class="vt-optimized-status">
        <div class="vt-opt-badge">⚡ Active Mode</div>
        <p>CPU scheduling active. Process overhead reduced by 5% system-wide.</p>
      </div>
    `;
  }

  function getIdleHTML() {
    return `
      <div class="vt-empty-state">
        <div class="vt-empty-icon">🔍</div>
        <p>Scan background threads & active apps to reduce idle cycles.</p>
      </div>
    `;
  }

  function getPanelHTML(bodyHTML, isScanning, isOptimized) {
    return `
      <div class="vt-header">
        <span class="vt-title">⚡ VT-Optimizer</span>
        <button class="vt-close-btn" id="vt-close-btn">✕</button>
      </div>
      <button class="vt-opt-button ${isScanning ? 'disabled' : ''}" id="vt-opt-button" ${isScanning ? 'disabled' : ''}>
        ${isOptimized ? 'RE-OPTIMIZE' : 'OPTIMIZE'}
      </button>
      <div class="vt-body">${bodyHTML}</div>
    `;
  }

  window.vtOptimizerRender = {
    getScanningHTML,
    getComparisonHTML,
    getActiveHTML,
    getIdleHTML,
    getPanelHTML
  };
})();

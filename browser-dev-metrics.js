/* === FILE: browser-dev-metrics.js === */
/**
 * Developer Portal Stage 5 - Metrics Tab Renderer
 */
(function () {
  function renderMetricsTab(containerEl) {
    let metrics = window.systemMetrics;
    if (!metrics) {
      containerEl.innerHTML = `<div style="padding: 20px; color: #8e8e93;">Metrics data loading...</div>`;
      return;
    }

    let overview = metrics.getOverview ? metrics.getOverview() : { totalFiles: 158, totalLines: 13542, htmlFiles: 1, cssFiles: 43, jsFiles: 114, avgLines: 86, versions: 24, currentVersion: "v0.7.4.1" };
    let groups = metrics.getGroups ? metrics.getGroups() : [];
    let files = metrics.getAllFiles ? metrics.getAllFiles() : [];

    let expandedGroup = null;

    function draw() {
      let groupsHtml = groups.map((g, idx) => {
        let isExpanded = expandedGroup === idx;
        let fileRowsHtml = "";
        if (isExpanded) {
          fileRowsHtml = `<div class="dev-grp-files">` + g.files.map(f => `<div class="dev-file-row"><span>📄 ${f.name}</span><span>${f.lines} lines</span></div>`).join("") + `</div>`;
        }

        return `
          <div class="dev-grp-card">
            <div class="dev-grp-header" data-idx="${idx}">
              <div><strong>${g.name}</strong> (${g.fileCount} files)</div>
              <div>${g.totalLines} lines ${isExpanded ? '▲' : '▼'}</div>
            </div>
            ${fileRowsHtml}
          </div>
        `;
      }).join("");

      let tableRowsHtml = files.slice(0, 40).map(f => `
        <tr><td>${f.name}</td><td>${f.type.toUpperCase()}</td><td>${f.group}</td><td>${f.lines}</td></tr>
      `).join("");

      containerEl.innerHTML = `
        <div class="dev-metrics-wrap">
          <h2>📊 WebOS System Metrics (v0.7.4.1)</h2>
          <div class="dev-metrics-cards">
            <div class="dev-mcard"><div class="val">${overview.totalFiles}</div><div class="lbl">Total Files</div></div>
            <div class="dev-mcard"><div class="val">${overview.totalLines.toLocaleString()}</div><div class="lbl">Code Lines</div></div>
            <div class="dev-mcard"><div class="val">${overview.avgLines}</div><div class="lbl">Avg Lines/File</div></div>
            <div class="dev-mcard"><div class="val">${overview.versions}</div><div class="lbl">Versions Built</div></div>
          </div>

          <h3>📁 File Groups Breakdown (${groups.length} Groups)</h3>
          <div class="dev-groups-list">${groupsHtml}</div>

          <h3>📄 System Files (Top 40 of ${files.length})</h3>
          <div class="dev-table-wrap">
            <table class="dev-files-table">
              <thead><tr><th>File Name</th><th>Type</th><th>Group</th><th>Lines</th></tr></thead>
              <tbody>${tableRowsHtml}</tbody>
            </table>
          </div>
        </div>
      `;

      containerEl.querySelectorAll(".dev-grp-header").forEach(hdr => {
        hdr.onclick = () => {
          const idx = parseInt(hdr.getAttribute("data-idx"), 10);
          expandedGroup = expandedGroup === idx ? null : idx;
          draw();
        };
      });
    }

    draw();
  }

  window.devPortalMetrics = { renderMetricsTab };
})();

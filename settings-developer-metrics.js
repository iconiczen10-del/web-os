/* === FILE: settings-developer-metrics.js === */
/**
 * WebOS v0.7.2.2 Developer Tab - System Metrics Sub-Tab Renderer
 */
(function () {
  function renderDevSystemMetrics(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const metrics = window.systemMetrics || {};
    const ov = metrics.overview || {};
    const groups = metrics.fileGroups || [];
    const allFiles = metrics.allFiles || [];

    const wrapper = document.createElement("div");
    wrapper.className = "dev-metrics-wrapper fading-in";

    // Section 1: Overview Grid
    const ovSection = document.createElement("div");
    ovSection.className = "dev-section";
    ovSection.innerHTML = `
      <div class="dev-section-title">System Overview</div>
      <div class="dev-metrics-grid">
        <div class="dev-metric-card"><div class="dev-metric-value">${ov.totalFiles || 138}</div><div class="dev-metric-label">Total Files</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value">${(ov.totalLines || 12042).toLocaleString()}</div><div class="dev-metric-label">Total Code Lines</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value">${ov.htmlFiles || 3}</div><div class="dev-metric-label">HTML Files</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value">${ov.cssFiles || 41}</div><div class="dev-metric-label">CSS Files</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value">${ov.jsFiles || 94}</div><div class="dev-metric-label">JS Files</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value">${ov.avgLinesPerFile || 87}</div><div class="dev-metric-label">Avg Lines/File</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value" style="font-size:13px; line-height:1.2;">${ov.largestFile?.name || 'browser-renderer.js'} (${ov.largestFile?.lines || 148}L)</div><div class="dev-metric-label">Largest File</div></div>
        <div class="dev-metric-card"><div class="dev-metric-value" style="font-size:13px; line-height:1.2;">${ov.smallestFile?.name || 'desktop.js'} (${ov.smallestFile?.lines || 22}L)</div><div class="dev-metric-label">Smallest File</div></div>
      </div>
    `;
    wrapper.appendChild(ovSection);

    // Section 2: File Groups
    const grpSection = document.createElement("div");
    grpSection.className = "dev-section";
    grpSection.innerHTML = `<div class="dev-section-title">File Groups (${groups.length})</div>`;

    const grpContainer = document.createElement("div");
    grpContainer.className = "dev-groups-list";

    groups.forEach((grp) => {
      const card = document.createElement("div");
      card.className = "dev-group-card";

      const header = document.createElement("div");
      header.className = "dev-group-header";
      header.innerHTML = `
        <span>${grp.icon} ${grp.name}</span>
        <span class="dev-group-count">${grp.count} files <span class="dev-arrow">▼</span></span>
      `;

      const filesDiv = document.createElement("div");
      filesDiv.className = "dev-group-files";

      (grp.files || []).forEach((f) => {
        const row = document.createElement("div");
        row.className = "dev-file-row";
        const typeClass = f.type === "HTML" ? "badge-html" : f.type === "CSS" ? "badge-css" : "badge-js";
        row.innerHTML = `
          <span>${f.name}</span>
          <div>
            <span class="dev-type-badge ${typeClass}">${f.type}</span>
            <span style="margin-left: 8px;">${f.lines} lines</span>
          </div>
        `;
        filesDiv.appendChild(row);
      });

      header.addEventListener("click", () => {
        filesDiv.classList.toggle("expanded");
        const arrow = header.querySelector(".dev-arrow");
        if (arrow) arrow.textContent = filesDiv.classList.contains("expanded") ? "▲" : "▼";
      });

      card.appendChild(header);
      card.appendChild(filesDiv);
      grpContainer.appendChild(card);
    });

    grpSection.appendChild(grpContainer);
    wrapper.appendChild(grpSection);

    // Section 3: Full File List
    const tblSection = document.createElement("div");
    tblSection.className = "dev-section";
    tblSection.innerHTML = `
      <div class="dev-section-title">All System Files (${allFiles.length})</div>
      <div class="dev-file-table-wrapper">
        <table class="dev-file-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Lines</th>
              <th>Type</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            ${allFiles.map(f => {
              const typeClass = f.type === "HTML" ? "badge-html" : f.type === "CSS" ? "badge-css" : "badge-js";
              return `
                <tr>
                  <td class="dev-file-name">${f.name}</td>
                  <td>${f.lines}</td>
                  <td><span class="dev-type-badge ${typeClass}">${f.type}</span></td>
                  <td class="dev-file-group">${f.group || ''}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    wrapper.appendChild(tblSection);

    containerEl.appendChild(wrapper);
  }

  window.renderDevSystemMetrics = renderDevSystemMetrics;
})();

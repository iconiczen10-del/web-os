/* === FILE: browser-dmanager-tabs.js === */
/**
 * WebOS v0.8.2 DriverManager Tab Content Renderers
 */
(function () {
  function renderHomeTab(container, onNavigate, switchTab, onDownload) {
    const devices = window.devicesData ? window.devicesData.getAll() : [];
    const featured = devices.slice(0, 3);
    container.innerHTML = `
      <div class="dm-hero">
        <div class="dm-hero-title">Official WebOS Hardware Driver Repository</div>
        <div class="dm-hero-subtitle">Download certified WHQL drivers, firmware packages, and updates for 14 hardware partners.</div>
        <div class="dm-hero-badges"><span>✅ WHQL Certified</span><span>⚡ 14 Hardware Partners</span><span>🔒 Safe & Offline</span></div>
      </div>
      <div class="dm-section-title">🌟 Featured Hardware Drivers</div>
      <div class="dm-featured-grid">
        ${featured.map(d => `
          <div class="dm-driver-card">
            <div class="dm-driver-top"><span class="dm-card-icon">${d.categoryIcon}</span> <div><strong>${d.name}</strong><div class="dm-sub">${d.manufacturer}</div></div></div>
            <div class="dm-driver-meta"><span>Version: v${d.driverVersion}</span><span>Size: ${d.sizeMB} MB</span></div>
            <button class="dm-download-btn" data-id="${d.id}">⬇️ Download Driver</button>
          </div>
        `).join("")}
      </div>
      <div class="dm-quick-links">
        <div class="dm-quick-box" data-action="drivers">📦 <strong>Browse All 15 Drivers</strong></div>
        <div class="dm-quick-box" data-action="companies">🏢 <strong>Explore 14 Companies</strong></div>
        <div class="dm-quick-box" data-action="updates">⚡ <strong>Check System Updates</strong></div>
      </div>
    `;
    container.querySelectorAll(".dm-quick-box").forEach(b => b.onclick = () => switchTab(b.getAttribute("data-action")));
    container.querySelectorAll(".dm-download-btn").forEach(b => b.onclick = () => onDownload(b.getAttribute("data-id")));
  }

  function renderDriversTab(container, onDownload, categoryFilter) {
    const devices = window.devicesData ? window.devicesData.getAll() : [];
    const cats = ["All", "Processors", "Display Adapters", "Disk Drives", "Memory", "Sound, Video & Game Controllers", "Network Adapters", "System Devices"];
    const activeCat = categoryFilter || "All";
    const filtered = activeCat === "All" ? devices : devices.filter(d => d.category.includes(activeCat) || activeCat.includes(d.category));

    container.innerHTML = `
      <div class="dm-filter-bar">
        ${cats.map(c => `<button class="dm-filter-chip ${c === activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join("")}
      </div>
      <div class="dm-drivers-list">
        ${filtered.map(d => `
          <div class="dm-driver-row">
            <div class="dm-driver-info">
              <span class="dm-row-icon">${d.categoryIcon}</span>
              <div>
                <div class="dm-row-name"><strong>${d.name}</strong> <span class="dm-ver-badge">v${d.driverVersion}</span></div>
                <div class="dm-row-sub">${d.manufacturer} • ${d.category} • Released ${d.driverDate}</div>
              </div>
            </div>
            <div class="dm-row-action">
              <span class="dm-row-size">${d.sizeMB} MB</span>
              <button class="dm-download-btn" data-id="${d.id}">⬇️ Download</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    container.querySelectorAll(".dm-filter-chip").forEach(chip => chip.onclick = () => renderDriversTab(container, onDownload, chip.getAttribute("data-cat")));
    container.querySelectorAll(".dm-download-btn").forEach(b => b.onclick = () => onDownload(b.getAttribute("data-id")));
  }

  function renderCompaniesTab(container, switchTab) {
    const comps = window.dmanagerData ? window.dmanagerData.getCompanies() : [];
    container.innerHTML = `
      <div class="dm-companies-grid">
        ${comps.map(c => `
          <div class="dm-company-card">
            <div class="dm-comp-hdr"><span class="dm-comp-icon">${c.icon}</span> <strong>${c.name}</strong></div>
            <div class="dm-comp-cat">Category: ${c.category}</div>
            <div class="dm-comp-desc">${c.desc}</div>
            <button class="dm-view-comp-btn" data-cat="${c.category}">View Drivers</button>
          </div>
        `).join("")}
      </div>
    `;
    container.querySelectorAll(".dm-view-comp-btn").forEach(b => b.onclick = () => switchTab("drivers", b.getAttribute("data-cat")));
  }

  function renderDownloadsTab(container) {
    const list = window.dmanagerData ? window.dmanagerData.getDownloads() : [];
    container.innerHTML = `
      <div class="dm-downloads-wrap">
        <div class="dm-dl-header">
          <div><strong>Session Driver Downloads (${list.length})</strong></div>
          <button class="dm-btn-finder" id="dm-open-finder">📁 Open Downloads Folder</button>
        </div>
        ${list.length === 0 ? '<div class="dm-empty-dl">No drivers downloaded yet in this session.</div>' : `
          <div class="dm-dl-list">
            ${list.map(item => `
              <div class="dm-dl-row">
                <div><strong>${item.name}</strong> (v${item.version}) — ${item.sizeMB} MB</div>
                <div class="dm-dl-time">${item.time}</div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    `;
    const fBtn = container.querySelector("#dm-open-finder");
    if (fBtn) fBtn.onclick = () => { if (typeof window.openApp === "function") window.openApp("finder"); };
  }

  function renderUpdatesTab(container, onUpdateAll) {
    const devices = window.devicesData ? window.devicesData.getAll() : [];
    const hasUpdates = devices.some(d => d.driverVersion !== "1.0.0.0");
    container.innerHTML = `
      <div class="dm-updates-box">
        <div class="dm-updates-status">${hasUpdates ? '⚡ Custom Driver Revisions Active' : '✅ All drivers up to date (v1.0.0.0)'}</div>
        <div class="dm-sub">All hardware components are currently running certified WebOS WHQL packages.</div>
        <button class="dm-btn-update-all" id="dm-btn-update-all">⚡ Check & Update All Drivers (5s)</button>
      </div>
    `;
    const btn = container.querySelector("#dm-btn-update-all");
    if (btn) btn.onclick = onUpdateAll;
  }

  function renderSupportTab(container) {
    const faqs = window.dmanagerData ? window.dmanagerData.getFaqs() : [];
    container.innerHTML = `
      <div class="dm-support-wrap">
        <div class="dm-section-title">🔧 Troubleshooting & Common Issues</div>
        <div class="dm-faqs-list">
          ${faqs.map(f => `<div class="dm-faq-card"><div class="dm-faq-q">❓ ${f.q}</div><div class="dm-faq-a">${f.a}</div></div>`).join("")}
        </div>
        <div class="dm-support-contact">Need technical assistance? Contact <strong>support@dmanager.webos</strong></div>
      </div>
    `;
  }

  function renderAboutTab(container) {
    container.innerHTML = `
      <div class="dm-about-wrap">
        <h3>About DriverManager</h3>
        <p>DriverManager is the official hardware driver repository for WebOS, coordinating driver deployment with 14 hardware partners.</p>
        <div class="dm-stats-grid">
          <div class="dm-stat-box"><div class="dm-stat-num">15</div><div class="dm-stat-lbl">Certified Drivers</div></div>
          <div class="dm-stat-box"><div class="dm-stat-num">14</div><div class="dm-stat-lbl">Hardware Companies</div></div>
          <div class="dm-stat-box"><div class="dm-stat-num">87,000+</div><div class="dm-stat-lbl">Total Downloads</div></div>
          <div class="dm-stat-box"><div class="dm-stat-num">May 2026</div><div class="dm-stat-lbl">Founded</div></div>
        </div>
      </div>
    `;
  }

  window.dmanagerTabs = {
    renderHomeTab,
    renderDriversTab,
    renderCompaniesTab,
    renderDownloadsTab,
    renderUpdatesTab,
    renderSupportTab,
    renderAboutTab
  };
})();

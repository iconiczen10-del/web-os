/* === FILE: browser-dmanager.js === */
/**
 * WebOS v0.8.2 DriverManager Portal Controller (www.dmanager.webos)
 */
(function () {
  let currentTab = "home";
  let activeCategoryFilter = "All";

  function renderDManagerPage(containerEl, initialTab, onNavigate) {
    if (!containerEl) return;
    currentTab = initialTab || "home";

    containerEl.innerHTML = `
      <div class="dm-container">
        <div class="dm-header">
          <div class="dm-brand"><span class="dm-logo">⚡</span> <span class="dm-brand-name">DriverManager</span> <span class="dm-brand-tag">v0.8.2</span></div>
          <div class="dm-search-wrap">
            <input type="text" id="dm-search-input" placeholder="Search 15 drivers (e.g. Star R Pro, Wi-Fi, Audio)..." />
          </div>
        </div>
        <div class="dm-nav">
          <div class="dm-nav-item ${currentTab === 'home' ? 'active' : ''}" data-tab="home">Home</div>
          <div class="dm-nav-item ${currentTab === 'drivers' ? 'active' : ''}" data-tab="drivers">Drivers</div>
          <div class="dm-nav-item ${currentTab === 'companies' ? 'active' : ''}" data-tab="companies">Companies</div>
          <div class="dm-nav-item ${currentTab === 'downloads' ? 'active' : ''}" data-tab="downloads">Downloads</div>
          <div class="dm-nav-item ${currentTab === 'updates' ? 'active' : ''}" data-tab="updates">Updates</div>
          <div class="dm-nav-item ${currentTab === 'support' ? 'active' : ''}" data-tab="support">Support</div>
          <div class="dm-nav-item ${currentTab === 'about' ? 'active' : ''}" data-tab="about">About</div>
        </div>
        <div class="dm-banner-msg" id="dm-msg-area"></div>
        <div class="dm-content" id="dm-tab-content"></div>
      </div>
    `;

    const searchInput = containerEl.querySelector("#dm-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query) {
          switchTab("drivers");
          const devices = window.devicesData ? window.devicesData.getAll() : [];
          const matched = devices.filter(d => d.name.toLowerCase().includes(query) || d.manufacturer.toLowerCase().includes(query));
          const tabContent = containerEl.querySelector("#dm-tab-content");
          if (tabContent) {
            tabContent.innerHTML = `
              <div class="dm-drivers-list">
                ${matched.map(d => `
                  <div class="dm-driver-row">
                    <div class="dm-driver-info"><span class="dm-row-icon">${d.categoryIcon}</span><div><strong>${d.name}</strong><div class="dm-row-sub">${d.manufacturer}</div></div></div>
                    <button class="dm-download-btn" data-id="${d.id}">⬇️ Download (${d.sizeMB} MB)</button>
                  </div>
                `).join("")}
              </div>
            `;
            tabContent.querySelectorAll(".dm-download-btn").forEach(b => b.onclick = () => handleDownload(b.getAttribute("data-id")));
          }
        } else {
          renderCurrentTab();
        }
      });
    }

    containerEl.querySelectorAll(".dm-nav-item").forEach(item => {
      item.addEventListener("click", () => switchTab(item.getAttribute("data-tab")));
    });

    function switchTab(tabName, filter) {
      currentTab = tabName;
      if (filter) activeCategoryFilter = filter;
      containerEl.querySelectorAll(".dm-nav-item").forEach(i => {
        i.classList.toggle("active", i.getAttribute("data-tab") === tabName);
      });
      renderCurrentTab();
    }

    function handleDownload(deviceId) {
      const dev = window.devicesData ? window.devicesData.getDevice(deviceId) : null;
      if (!dev) return;

      const speedMbps = window.buynetManager ? window.buynetManager.getInternetSpeed() : 1.6;
      const downloadItem = {
        id: dev.id,
        name: dev.name + " Driver Package",
        version: dev.driverVersion,
        sizeMB: dev.sizeMB,
        time: new Date().toLocaleTimeString()
      };
      if (window.dmanagerData) window.dmanagerData.addDownload(downloadItem);

      const msgArea = containerEl.querySelector("#dm-msg-area");
      if (msgArea) {
        msgArea.innerHTML = `<div class="dm-alert-success">⬇️ Downloaded <strong>${dev.name}</strong> (v${dev.driverVersion}, ${dev.sizeMB} MB) via BUYNET at ${speedMbps} Mbps!</div>`;
        setTimeout(() => { if (msgArea) msgArea.innerHTML = ""; }, 4000);
      }
    }

    function handleUpdateAll() {
      const msgArea = containerEl.querySelector("#dm-msg-area");
      if (msgArea) msgArea.innerHTML = `<div class="dm-alert-info">⚡ Updating all 15 drivers to latest WHQL v1.1.0.0... (5s)</div>`;

      window.deviceOperations.start5SecOperation({
        steps: [
          { pct: 0, text: "Verifying hardware signatures..." },
          { pct: 30, text: "Fetching driver packages..." },
          { pct: 70, text: "Deploying driver updates..." },
          { pct: 100, text: "All drivers updated to v1.1.0.0" }
        ],
        onProgress: (pct, text) => {
          if (msgArea) msgArea.innerHTML = `<div class="dm-alert-info">⚡ [${pct}%] ${text}</div>`;
        },
        onComplete: () => {
          const devs = window.devicesData ? window.devicesData.getAll() : [];
          devs.forEach(d => window.devicesData.updateDevice(d.id, { previousVersion: d.driverVersion, driverVersion: "1.1.0.0" }));
          if (msgArea) msgArea.innerHTML = `<div class="dm-alert-success">✅ All 15 hardware drivers updated to v1.1.0.0 successfully!</div>`;
          renderCurrentTab();
        }
      });
    }

    function renderCurrentTab() {
      const tabContent = containerEl.querySelector("#dm-tab-content");
      if (!tabContent || !window.dmanagerTabs) return;

      if (currentTab === "home") window.dmanagerTabs.renderHomeTab(tabContent, onNavigate, switchTab, handleDownload);
      else if (currentTab === "drivers") window.dmanagerTabs.renderDriversTab(tabContent, handleDownload, activeCategoryFilter);
      else if (currentTab === "companies") window.dmanagerTabs.renderCompaniesTab(tabContent, switchTab);
      else if (currentTab === "downloads") window.dmanagerTabs.renderDownloadsTab(tabContent);
      else if (currentTab === "updates") window.dmanagerTabs.renderUpdatesTab(tabContent, handleUpdateAll);
      else if (currentTab === "support") window.dmanagerTabs.renderSupportTab(tabContent);
      else if (currentTab === "about") window.dmanagerTabs.renderAboutTab(tabContent);
    }

    renderCurrentTab();
  }

  window.renderDManagerPage = renderDManagerPage;
})();

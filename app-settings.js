/* === FILE: app-settings.js === */
/**
 * WebOS v0.6.2 Settings Application Manager
 * Sidebar Navigation & Section Manager
 */
(function () {
  function initSettings(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.innerHTML = `
      <div class="settings-layout">
        <div class="settings-sidebar">
          <div class="settings-nav-item active" data-section="general">General</div>
          <div class="settings-nav-item" data-section="about-pc">About PC</div>
          <div class="settings-nav-item" data-section="about-os">About OS</div>
          <div class="settings-nav-item" data-section="apps">Apps</div>
          <div class="settings-nav-item" data-section="version-history">Version History</div>
        </div>
        <div class="settings-content"></div>
      </div>
    `;

    const mainContent = contentEl.querySelector(".settings-content");
    const navItems = contentEl.querySelectorAll(".settings-nav-item");

    function switchSection(sectionName) {
      if (!mainContent) return;
      mainContent.innerHTML = "";

      if (sectionName === "general" && typeof window.renderGeneralSection === "function") {
        window.renderGeneralSection(mainContent);
      } else if (sectionName === "about-pc" && typeof window.renderAboutPC === "function") {
        window.renderAboutPC(mainContent);
      } else if (sectionName === "about-os" && typeof window.renderAboutOS === "function") {
        window.renderAboutOS(mainContent);
      } else if (sectionName === "apps" && typeof window.renderAppsList === "function") {
        window.renderAppsList(mainContent);
      } else if (sectionName === "version-history" && typeof window.renderVersionHistory === "function") {
        window.renderVersionHistory(mainContent);
      }
    }

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navItems.forEach(nav => nav.classList.remove("active"));
        item.classList.add("active");
        const section = item.getAttribute("data-section");
        switchSection(section);
      });
    });

    // Default to General section on initialization
    switchSection("general");
  }

  window.initSettings = initSettings;
})();

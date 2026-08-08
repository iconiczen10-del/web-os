/* === FILE: settings-about-os.js === */
/**
 * WebOS v0.6.2 About OS Main Section Orchestrator
 */
(function () {
  function renderAboutOS(containerEl) {
    if (!containerEl) return;

    if (containerEl._uptimeInterval) {
      clearInterval(containerEl._uptimeInterval);
      containerEl._uptimeInterval = null;
    }

    containerEl.innerHTML = "";

    if (typeof window.renderAboutOSHero === "function") {
      window.renderAboutOSHero(containerEl);
    }
    if (typeof window.renderAboutOSSystemInfo === "function") {
      window.renderAboutOSSystemInfo(containerEl);
    }
    if (typeof window.renderAboutOSCredits === "function") {
      window.renderAboutOSCredits(containerEl);
    }
    if (typeof window.renderAboutOSLicenseAndFooter === "function") {
      window.renderAboutOSLicenseAndFooter(containerEl);
    }
  }

  window.renderAboutOS = renderAboutOS;
})();

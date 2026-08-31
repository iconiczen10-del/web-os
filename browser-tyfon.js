/* === FILE: browser-tyfon.js === */
/**
 * WebOS v0.10.0 Tyfon Inc. Corporate Portal (www.tyfon.webos)
 * 5-tab responsive showcase, POSE master toggle, and 2D canvas screenshot gallery.
 */
(function () {
  let currentTab = "home";

  async function renderTyfonWebsite(containerEl, onNavigate) {
    if (!containerEl) return;
    const cleanHash = window.location.hash ? window.location.hash.replace("#", "") : "";
    if (["home", "pose", "tech", "pricing", "support"].includes(cleanHash)) {
      currentTab = cleanHash;
    }

    const isActive = window.poseSession ? await window.poseSession.isPoseActive() : false;
    const meta = window.poseSession ? await window.poseSession.getSessionMeta() : null;

    containerEl.className = "tyfon-site-container";
    containerEl.innerHTML = `
      <header class="tyfon-navbar">
        <div class="tyfon-brand" onclick="window.tyfonSite.switchTab('home')">
          <span class="tyfon-icon">🌐⚡</span>
          <span class="tyfon-title">TYFON INC.</span>
        </div>
        <nav class="tyfon-nav-links">
          <button class="tyfon-nav-btn ${currentTab === 'home' ? 'active' : ''}" data-tab="home">Home</button>
          <button class="tyfon-nav-btn ${currentTab === 'pose' ? 'active' : ''}" data-tab="pose">POSE</button>
          <button class="tyfon-nav-btn ${currentTab === 'tech' ? 'active' : ''}" data-tab="tech">Tech</button>
          <button class="tyfon-nav-btn ${currentTab === 'pricing' ? 'active' : ''}" data-tab="pricing">Pricing</button>
          <button class="tyfon-nav-btn ${currentTab === 'support' ? 'active' : ''}" data-tab="support">Support</button>
        </nav>
      </header>
      <main class="tyfon-main-content" id="tyfon-tab-content">
        <!-- Rendered Tab -->
      </main>
      <footer class="tyfon-footer">
        <div>© 2026 Tyfon Inc. All rights reserved. WebOS Persistent Systems Alliance.</div>
      </footer>
    `;

    function updateTabContent() {
      const main = containerEl.querySelector("#tyfon-tab-content");
      if (!main || !window.tyfonTabs) return;

      containerEl.querySelectorAll(".tyfon-nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === currentTab);
      });

      if (currentTab === "home") main.innerHTML = window.tyfonTabs.renderHomeTab(isActive, meta);
      else if (currentTab === "pose") main.innerHTML = window.tyfonTabs.renderPoseTab(isActive, meta);
      else if (currentTab === "tech") main.innerHTML = window.tyfonTabs.renderTechTab();
      else if (currentTab === "pricing") main.innerHTML = window.tyfonTabs.renderPricingTab();
      else if (currentTab === "support") main.innerHTML = window.tyfonTabs.renderSupportTab();

      attachTabEvents();
    }

    function attachTabEvents() {
      if (currentTab === "pose") {
        const toggleBtn = containerEl.querySelector("#tyfon-pose-toggle-btn");
        const warnBox = containerEl.querySelector("#tyfon-deactivate-warning");
        const canvas = containerEl.querySelector("#tyfon-pose-preview-canvas");

        if (toggleBtn) {
          toggleBtn.onclick = async () => {
            const newState = !isActive;
            if (window.poseSession) await window.poseSession.setPoseActive(newState);
            if (window.notificationBus) {
              window.notificationBus.notify(
                newState ? "POSE Activated" : "POSE Deactivated",
                newState ? "Session persistence enabled via webosdb" : "WebOS set to ephemeral mode (wipes on refresh)",
                "🧠", "Tyfon Inc.", "browser"
              );
            }
            renderTyfonWebsite(containerEl, onNavigate);
          };
        }

        if (canvas && window.drawPoseShot) {
          window.drawPoseShot(canvas, "shot1");
          containerEl.querySelectorAll(".tyfon-shot-tab").forEach(tab => {
            tab.onclick = () => {
              containerEl.querySelectorAll(".tyfon-shot-tab").forEach(t => t.classList.remove("active"));
              tab.classList.add("active");
              const shotId = tab.getAttribute("data-shot");
              window.drawPoseShot(canvas, shotId);
            };
          });
        }
      }
    }

    containerEl.querySelectorAll(".tyfon-nav-btn").forEach(btn => {
      btn.onclick = () => {
        currentTab = btn.getAttribute("data-tab");
        updateTabContent();
      };
    });

    window.tyfonSite = {
      switchTab: (tabId) => {
        currentTab = tabId;
        updateTabContent();
      }
    };

    updateTabContent();
  }

  window.renderTyfonWebsite = renderTyfonWebsite;
})();

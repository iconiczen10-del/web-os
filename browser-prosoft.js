/* === FILE: browser-prosoft.js === */
/**
 * WebOS v0.9.0 ProSoft Inc. Website Router
 * Manages 10 tabs, navigation bar, and page mounting.
 */
(function () {
  const TABS = [
    { id: "home", label: "Home", icon: "🌐" },
    { id: "engine", label: "V3D Engine", icon: "⚡" },
    { id: "gallery", label: "Gallery", icon: "🖼️" },
    { id: "products", label: "Products", icon: "💎" },
    { id: "showcase", label: "Showcase", icon: "🌟" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "support", label: "Support", icon: "❓" },
    { id: "about", label: "About", icon: "🏢" },
    { id: "careers", label: "Careers", icon: "💼" },
    { id: "waitlist", label: "Waitlist", icon: "📋" }
  ];

  function renderProSoftPage(containerEl, tabParam = "home", onNavigate) {
    if (!containerEl) return;
    let activeTab = tabParam || "home";

    containerEl.innerHTML = `
      <div class="ps-wrapper">
        <header class="ps-nav-header">
          <div class="ps-nav-inner">
            <div class="ps-brand" id="ps-nav-brand">
              <span class="ps-brand-icon">💎</span>
              <span class="ps-brand-text">PROSOFT</span>
              <span class="ps-brand-badge">V3D v1</span>
            </div>
            <nav class="ps-nav-tabs">
              ${TABS.map(t => `
                <button class="ps-nav-btn ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">
                  <span>${t.icon}</span> <span>${t.label}</span>
                </button>
              `).join("")}
            </nav>
          </div>
        </header>

        <main class="ps-main-content" id="ps-main-content"></main>

        <footer class="ps-footer">
          <div class="ps-footer-inner">
            <div class="ps-footer-left">
              <strong>PROSOFT INC.</strong> — Next-Generation WebOS 3D Graphics
            </div>
            <div class="ps-footer-links">
              <span>support@prosoft.webos</span>
              <span>•</span>
              <span>WebOS v0.9.0 Architecture</span>
            </div>
          </div>
        </footer>
      </div>
    `;

    const mainEl = containerEl.querySelector("#ps-main-content");
    const navBtns = containerEl.querySelectorAll(".ps-nav-btn");
    const brand = containerEl.querySelector("#ps-nav-brand");

    function switchTab(tabId) {
      activeTab = tabId;
      navBtns.forEach(btn => btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId));

      if (mainEl) {
        mainEl.innerHTML = "";
        if (tabId === "home" && window.prosoftPages1) {
          window.prosoftPages1.renderHome(mainEl, switchTab);
        } else if (tabId === "engine" && window.prosoftPages1) {
          window.prosoftPages1.renderEngine(mainEl, switchTab);
        } else if (tabId === "gallery" && window.prosoftPages1) {
          window.prosoftPages1.renderGallery(mainEl, switchTab);
        } else if (tabId === "products" && window.prosoftPages1) {
          window.prosoftPages1.renderProducts(mainEl, switchTab);
        } else if (tabId === "showcase" && window.prosoftPages1) {
          window.prosoftPages1.renderShowcase(mainEl, switchTab);
        } else if (tabId === "community" && window.prosoftPages2) {
          window.prosoftPages2.renderCommunity(mainEl, switchTab);
        } else if (tabId === "support" && window.prosoftPages2) {
          window.prosoftPages2.renderSupport(mainEl, switchTab);
        } else if (tabId === "about" && window.prosoftPages2) {
          window.prosoftPages2.renderAbout(mainEl, switchTab);
        } else if (tabId === "careers" && window.prosoftPages2) {
          window.prosoftPages2.renderCareers(mainEl, switchTab);
        } else if (tabId === "waitlist" && window.prosoftPages2) {
          window.prosoftPages2.renderWaitlist(mainEl, switchTab);
        }
      }

      setupScrollObserver(mainEl);
    }

    function setupScrollObserver(parent) {
      if (!parent || !("IntersectionObserver" in window)) return;
      const cards = parent.querySelectorAll(".ps-feat-card, .ps-scene-card, .ps-prod-card, .ps-team-card, .ps-job-card, .ps-thread-item");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ps-scrolled-in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      cards.forEach(c => {
        c.classList.add("ps-scroll-fade");
        observer.observe(c);
      });
    }

    navBtns.forEach(btn => {
      btn.onclick = () => {
        const t = btn.getAttribute("data-tab");
        switchTab(t);
      };
    });

    if (brand) brand.onclick = () => switchTab("home");

    switchTab(activeTab);
  }

  window.renderProSoftPage = renderProSoftPage;
  window.browserProsoft = { renderProSoftPage };
})();

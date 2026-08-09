/* === FILE: browser-papersforpc.js === */
/**
 * WebOS v0.7 Papers For PC Inc. Site Router & Layout
 */
(function () {
  function renderNav(currentPath, onNavigate) {
    const pages = [
      { path: "", label: "Home" },
      { path: "/about", label: "About" },
      { path: "/products", label: "Products" },
      { path: "/contact", label: "Contact" },
      { path: "/press", label: "Press" },
      { path: "/careers", label: "Careers" }
    ];

    const linksHtml = pages.map((p) => {
      const active = currentPath === p.path ? "color:#ffffff;font-weight:700;" : "";
      return `<a class="papers-nav-link" data-path="${p.path}" style="${active}">${p.label}</a>`;
    }).join("");

    return `
      <div class="papers-nav">
        <div style="font-weight:800;color:#38bdf8;font-size:14px;margin-right:12px;">🖼️ Papers For PC</div>
        <div style="display:flex;gap:16px;">${linksHtml}</div>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <div class="papers-footer">
        <div>© 2026 Papers For PC Inc. All rights reserved.</div>
        <div style="margin-top:4px;">Made with ❤️ for WebOS Ecosystem • support@papersforpc.webos</div>
      </div>
    `;
  }

  function renderPage(containerEl, path, onNavigate) {
    if (!containerEl) return;
    const cleanPath = path ? path.trim().toLowerCase() : "";
    const p = window.browserPapersForPCPages;

    let bodyContent = "";
    if (cleanPath === "/about" && p) bodyContent = p.renderAbout();
    else if (cleanPath === "/products" && p) bodyContent = p.renderProducts();
    else if (cleanPath === "/contact" && p) bodyContent = p.renderContact();
    else if (cleanPath === "/press" && p) bodyContent = p.renderPress();
    else if (cleanPath === "/careers" && p) bodyContent = p.renderCareers();
    else if (p) bodyContent = p.renderHome(containerEl, onNavigate);

    containerEl.innerHTML = `
      <div class="papers-site-container">
        ${renderNav(cleanPath, onNavigate)}
        <div class="papers-site-body">${bodyContent}</div>
        ${renderFooter()}
      </div>
    `;

    containerEl.querySelectorAll(".papers-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        const targetPath = link.getAttribute("data-path");
        const fullUrl = "www.papersforpc.webos" + targetPath;
        if (typeof onNavigate === "function") {
          onNavigate(fullUrl);
        }
      });
    });

    const ctaBtn = containerEl.querySelector("#pf-hero-cta");
    if (ctaBtn) {
      ctaBtn.addEventListener("click", () => {
        if (typeof onNavigate === "function") {
          onNavigate("www.papersforpc.webos/products");
        }
      });
    }
  }

  window.browserPapersForPC = {
    renderPage
  };
})();

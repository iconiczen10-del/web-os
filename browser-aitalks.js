/* === FILE: browser-aitalks.js === */
/**
 * AI Talks Inc. Company Website Router & Navigation
 */
(function () {
  function renderAITalksPage(containerEl, path, onNavigate) {
    if (!containerEl) return;

    const cleanPath = (path || "/").toLowerCase();

    let pageContent = "";
    if (cleanPath === "/about" || cleanPath === "about") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getAboutPageHTML() : "";
    } else if (cleanPath === "/products" || cleanPath === "products") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getProductsPageHTML() : "";
    } else if (cleanPath === "/blog" || cleanPath === "blog") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getBlogPageHTML() : "";
    } else if (cleanPath === "/contact" || cleanPath === "contact") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getContactPageHTML() : "";
    } else {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getHomePageHTML() : "";
    }

    containerEl.innerHTML = `
      <div class="aitalks-container">
        <nav class="aitalks-nav">
          <div style="font-weight: 800; font-size: 16px; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
            <span>🤖</span><span>AI Talks</span>
          </div>
          <div style="display: flex; gap: 16px;">
            <a class="aitalks-nav-link" data-path="/">Home</a>
            <a class="aitalks-nav-link" data-path="/about">About</a>
            <a class="aitalks-nav-link" data-path="/products">Products</a>
            <a class="aitalks-nav-link" data-path="/blog">Blog</a>
            <a class="aitalks-nav-link" data-path="/contact">Contact</a>
          </div>
        </nav>

        <div style="flex: 1;">
          ${pageContent}
        </div>

        <footer class="aitalks-footer">
          © 2026 AI Talks Inc. • All rights reserved • Intelligent Conversation, Accessible to All.
        </footer>
      </div>
    `;

    containerEl.querySelectorAll(".aitalks-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        const targetPath = link.getAttribute("data-path");
        if (typeof onNavigate === "function") {
          onNavigate("www.aitalks.webos" + targetPath);
        }
      });
    });
  }

  window.renderAITalksPage = renderAITalksPage;
})();

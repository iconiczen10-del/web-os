/* === FILE: browser-renderer.js === */
/**
 * WebOS v0.7 Browser Route Renderer & View Router
 */
(function () {
  function renderHomePage(containerEl, onNavigate) {
    containerEl.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; max-width: 640px; margin: 0 auto; color: #ffffff;">
        <div style="font-size: 52px; margin-bottom: 12px; filter: drop-shadow(0 4px 12px rgba(10,132,255,0.3));">🌐</div>
        <div style="font-size: 28px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 6px;">WebOS WebSearch</div>
        <div style="font-size: 13px; color: #8e8e93; margin-bottom: 24px;">Explore simulated websites, online banking, and high-speed internet.</div>
        
        <div style="display: flex; gap: 8px; margin-bottom: 32px;">
          <input type="text" id="hp-search-input" placeholder="Search the web or type a URL..." style="flex: 1; padding: 12px 18px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.08); color: #fff; font-size: 14px; outline: none; box-shadow: 0 4px 16px rgba(0,0,0,0.2);" />
          <button id="hp-search-btn" style="padding: 12px 20px; border-radius: 24px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer; font-size: 13px;">Search</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 12px;">
          <div class="hp-quick-card" data-url="www.mbank.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 10px; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 6px;">🏦</div>
            <div style="font-size: 12px; font-weight: 600; color: #fff;">Mbank</div>
          </div>
          <div class="hp-quick-card" data-url="www.buynet.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 10px; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 6px;">📡</div>
            <div style="font-size: 12px; font-weight: 600; color: #fff;">BUYNET</div>
          </div>
          <div class="hp-quick-card" data-url="www.store.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 10px; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 6px;">🛒</div>
            <div style="font-size: 12px; font-weight: 600; color: #fff;">App Store</div>
          </div>
          <div class="hp-quick-card" data-url="webos://news" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 10px; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 6px;">📰</div>
            <div style="font-size: 12px; font-weight: 600; color: #fff;">News</div>
          </div>
          <div class="hp-quick-card" data-url="webos://about" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 10px; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 6px;">ℹ️</div>
            <div style="font-size: 12px; font-weight: 600; color: #fff;">About</div>
          </div>
        </div>
      </div>
    `;

    const input = containerEl.querySelector("#hp-search-input");
    const btn = containerEl.querySelector("#hp-search-btn");
    function doSearch() {
      const q = input.value.trim();
      if (typeof onNavigate === "function") {
        onNavigate("webos://search?q=" + encodeURIComponent(q));
      }
    }
    if (btn) btn.addEventListener("click", doSearch);
    if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

    containerEl.querySelectorAll(".hp-quick-card").forEach((card) => {
      card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        if (typeof onNavigate === "function") onNavigate(url);
      });
    });
  }

  function renderAboutPage(containerEl) {
    containerEl.innerHTML = `
      <div style="padding: 28px; max-width: 600px; margin: 0 auto; color: #ddd; line-height: 1.6;">
        <h2 style="color: #fff; margin-top: 0;">About WebOS Internet Ecosystem</h2>
        <p>WebOS v0.7.2.2 introduces an enhanced simulated internet ecosystem featuring Developer Settings, AI Chat, online banking (Mbank), ISP subscription manager (BUYNET), and custom web browsing.</p>
        <p>Operating entirely in client-side runtime without remote API servers, WebOS ensures full offline capability and privacy.</p>
      </div>
    `;
  }

  function renderNewsPage(containerEl) {
    if (typeof window.renderNewsPage === "function" && window.renderNewsPage !== renderNewsPage) {
      window.renderNewsPage(containerEl);
      return;
    }
    containerEl.innerHTML = `<div style="padding: 28px; color: #fff;">Loading Tech Chronicle News...</div>`;
  }

  function renderStoreInfoPage(containerEl) {
    const apps = window.storeApps || [];
    const rows = apps.map(a => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">
        <div><strong>${a.icon} ${a.name}</strong> (${a.category}) — ${a.size}</div>
        <div style="color: #30d158; font-weight: 600;">${a.price === 0 ? 'Free' : '$' + a.price.toFixed(2)}</div>
      </div>
    `).join("");

    containerEl.innerHTML = `
      <div style="padding: 24px; max-width: 680px; margin: 0 auto; color: #fff;">
        <h2 style="margin-top: 0;">🛒 WebOS App Store Directory</h2>
        <p style="color: #8e8e93; font-size: 13px;">Official catalog of WebOS desktop applications.</p>
        <div style="background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; margin-top: 16px;">${rows}</div>
      </div>
    `;
  }

  function renderPage(containerEl, url, onNavigate) {
    if (!containerEl) return;
    const cleanUrl = url ? url.trim() : "webos://home";

    if (cleanUrl === "webos://home") {
      renderHomePage(containerEl, onNavigate);
    } else if (cleanUrl === "webos://about") {
      renderAboutPage(containerEl);
    } else if (cleanUrl === "webos://news") {
      renderNewsPage(containerEl);
    } else if (cleanUrl.startsWith("webos://search")) {
      const q = cleanUrl.includes("?q=") ? cleanUrl.split("?q=")[1] : "";
      if (window.browserSearch) window.browserSearch.renderSearchPage(containerEl, q, onNavigate);
    } else if (cleanUrl === "www.mbank.webos") {
      if (window.browserMbank) window.browserMbank.renderMbankPage(containerEl, onNavigate);
    } else if (cleanUrl === "www.buynet.webos") {
      if (window.buynetManager) window.buynetManager.renderBuynetPage(containerEl, onNavigate);
    } else if (cleanUrl.includes("papersforpc.webos")) {
      const path = cleanUrl.replace(/^https?:\/\//, "").replace(/^www\.papersforpc\.webos/, "");
      if (window.browserPapersForPC) window.browserPapersForPC.renderPage(containerEl, path, onNavigate);
    } else if (cleanUrl.includes("aitalks.webos")) {
      const path = cleanUrl.replace(/^https?:\/\//, "").replace(/^www\.aitalks\.webos/, "");
      if (typeof renderAITalksPage === "function") renderAITalksPage(containerEl, path, onNavigate);
    } else if (cleanUrl === "www.store.webos") {
      renderStoreInfoPage(containerEl);
    } else {
      containerEl.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: #ff453a;">
          <div style="font-size: 40px; margin-bottom: 12px;">🚫</div>
          <div style="font-size: 18px; font-weight: 700; margin-bottom: 6px;">404 Page Not Found</div>
          <div style="font-size: 13px; color: #8e8e93; margin-bottom: 16px;">The requested URL <code style="color: #fff;">${cleanUrl}</code> could not be located.</div>
          <button id="p404-home-btn" style="padding: 8px 16px; border-radius: 8px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer;">Return Home</button>
        </div>
      `;
      const btn = containerEl.querySelector("#p404-home-btn");
      if (btn) btn.addEventListener("click", () => { if (typeof onNavigate === "function") onNavigate("webos://home"); });
    }
  }

  window.browserRenderer = {
    renderPage
  };
})();

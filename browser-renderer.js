/* === FILE: browser-renderer.js === */
/**
 * WebOS v0.8.2 Browser Route Renderer & View Router
 */
(function () {
  function renderHomePage(containerEl, onNavigate) {
    containerEl.innerHTML = `
      <div style="text-align: center; padding: 24px 20px; max-width: 680px; margin: 0 auto; color: #ffffff;">
        <div style="font-size: 44px; margin-bottom: 6px;">🌐</div>
        <div style="font-size: 24px; font-weight: 800; margin-bottom: 4px;">WebOS WebSearch</div>
        <div style="font-size: 12px; color: #8e8e93; margin-bottom: 18px;">Explore simulated websites, driver manager, community forums, and ISP plans.</div>
        
        <div style="display: flex; gap: 8px; margin-bottom: 20px;">
          <input type="text" id="hp-search-input" placeholder="Search the web, drivers, or type a URL..." style="flex: 1; padding: 10px 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.08); color: #fff; font-size: 13px; outline: none;" />
          <button id="hp-search-btn" style="padding: 10px 18px; border-radius: 20px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer; font-size: 13px;">Search</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(95px, 1fr)); gap: 8px;">
          <div class="hp-quick-card" data-url="www.dmanager.webos" style="background: rgba(10,132,255,0.15); border: 1px solid rgba(10,132,255,0.4); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">⚡</div>
            <div style="font-size: 11px; font-weight: 700; color: #58a6ff;">DriverManager</div>
          </div>
          <div class="hp-quick-card" data-url="www.communitypcs.webos" style="background: rgba(88,166,255,0.12); border: 1px solid rgba(88,166,255,0.3); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">👥</div>
            <div style="font-size: 11px; font-weight: 600; color: #58a6ff;">CommunityPCS</div>
          </div>
          <div class="hp-quick-card" data-url="www.mbank.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">🏦</div>
            <div style="font-size: 11px; font-weight: 600; color: #fff;">Mbank</div>
          </div>
          <div class="hp-quick-card" data-url="www.buynet.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">📡</div>
            <div style="font-size: 11px; font-weight: 600; color: #fff;">BUYNET</div>
          </div>
          <div class="hp-quick-card" data-url="www.dev.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">🔧</div>
            <div style="font-size: 11px; font-weight: 600; color: #fff;">Dev Portal</div>
          </div>
          <div class="hp-quick-card" data-url="www.store.webos" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">🛒</div>
            <div style="font-size: 11px; font-weight: 600; color: #fff;">App Store</div>
          </div>
          <div class="hp-quick-card" data-url="www.webtube.webos" style="background: rgba(255,32,32,0.15); border: 1px solid rgba(255,32,32,0.4); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">▶️</div>
            <div style="font-size: 11px; font-weight: 700; color: #ff453a;">WebTube</div>
          </div>
          <div class="hp-quick-card" data-url="webos://news" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 6px; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 2px;">📰</div>
            <div style="font-size: 11px; font-weight: 600; color: #fff;">News</div>
          </div>
        </div>
      </div>
    `;

    const input = containerEl.querySelector("#hp-search-input");
    const btn = containerEl.querySelector("#hp-search-btn");
    function doSearch() {
      const q = input.value.trim();
      if (typeof onNavigate === "function") onNavigate("webos://search?q=" + encodeURIComponent(q));
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

  function renderPage(containerEl, url, onNavigate) {
    if (!containerEl) return;
    const cleanUrl = url ? url.trim() : "webos://home";

    if (window._wifiDisabled && !cleanUrl.startsWith("webos://about")) {
      containerEl.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: #ff453a;">
          <div style="font-size: 40px; margin-bottom: 10px;">📡❌</div>
          <div style="font-size: 18px; font-weight: 700; margin-bottom: 6px;">No Internet Connection</div>
          <div style="font-size: 12px; color: #8e8e93; margin-bottom: 16px;">BoltLink Wi-Fi 5 network adapter is disabled in Device Manager.</div>
          <button id="wifi-settings-btn" style="padding: 8px 16px; border-radius: 6px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer;">Open Settings → Devices</button>
        </div>
      `;
      const sBtn = containerEl.querySelector("#wifi-settings-btn");
      if (sBtn) sBtn.onclick = () => { if (typeof window.openApp === "function") window.openApp("settings"); };
      return;
    }

    if (cleanUrl === "webos://home") {
      renderHomePage(containerEl, onNavigate);
    } else if (cleanUrl.includes("dmanager.webos")) {
      const tab = cleanUrl.includes("#") ? cleanUrl.split("#")[1] : "home";
      if (typeof window.renderDManagerPage === "function") window.renderDManagerPage(containerEl, tab, onNavigate);
    } else if (cleanUrl.startsWith("webos://search")) {
      const q = cleanUrl.includes("?q=") ? cleanUrl.split("?q=")[1] : "";
      if (window.browserSearch) window.browserSearch.renderSearchPage(containerEl, q, onNavigate);
    } else if (cleanUrl.includes("communitypcs.webos")) {
      const path = cleanUrl.replace(/^https?:\/\//, "").replace(/^www\.communitypcs\.webos/, "").replace(/^communitypcs\.webos/, "");
      if (typeof window.renderCommunityPage === "function") window.renderCommunityPage(containerEl, path, onNavigate);
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
    } else if (cleanUrl.includes("dev.webos")) {
      if (typeof window.renderDevPortalPage === "function") window.renderDevPortalPage(containerEl, onNavigate);
    } else if (cleanUrl.includes("webtube.webos")) {
      if (typeof window.renderWebTubeWebsite === "function") window.renderWebTubeWebsite(containerEl, onNavigate);
    } else if (cleanUrl.includes("news") || cleanUrl === "webos://news") {
      if (typeof window.renderNewsPage === "function") window.renderNewsPage(containerEl, onNavigate);
    } else if (cleanUrl.includes("store.webos")) {
      if (typeof window.openApp === "function") window.openApp("store");
      renderHomePage(containerEl, onNavigate);
    } else if (cleanUrl === "webos://about") {
      if (typeof window.openApp === "function") window.openApp("settings");
      renderHomePage(containerEl, onNavigate);
    } else {
      containerEl.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: #ff453a;">
          <div style="font-size: 36px; margin-bottom: 8px;">🚫</div>
          <div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">404 Page Not Found</div>
          <div style="font-size: 12px; color: #8e8e93; margin-bottom: 14px;">The requested URL <code>${cleanUrl}</code> could not be located.</div>
          <button id="p404-home-btn" style="padding: 6px 14px; border-radius: 6px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer;">Return Home</button>
        </div>
      `;
      const btn = containerEl.querySelector("#p404-home-btn");
      if (btn) btn.addEventListener("click", () => { if (typeof onNavigate === "function") onNavigate("webos://home"); });
    }
  }

  window.browserRenderer = { renderPage };
})();

/* === FILE: browser-webtube-ads.js === */
/**
 * WebOS v0.8.3 WebTube Website Ads Component (10/10 Ad Intensity Simulation)
 */
(function () {
  function getTopBannerAdHTML() {
    return `
      <div class="webtube-web-top-ad">
        <span>🔥 WebTube App is 10x faster with 4K & zero ads!</span>
        <button id="webtube-ad-get-app" class="webtube-web-ad-btn">Open in App Store</button>
      </div>
    `;
  }

  function getSidebarAdsHTML() {
    return `
      <div class="webtube-web-sidebar-ads">
        <div class="webtube-web-ad-box">
          <div class="webtube-web-ad-label">SPONSORED AD</div>
          <div style="font-weight:700; color:#ffd700; font-size:12px;">BUYNET 1 Gbps Fiber</div>
          <div style="font-size:10px; color:#aaa; margin:4px 0;">Stream 4K videos with zero buffering. Upgrade now!</div>
          <button id="webtube-ad-buynet" class="webtube-web-ad-btn" style="background:#0a84ff;">View Plans</button>
        </div>
        <div class="webtube-web-ad-box">
          <div class="webtube-web-ad-label">PROMOTION</div>
          <div style="font-weight:700; color:#ff2020; font-size:12px;">AI Chat Pro ($300)</div>
          <div style="font-size:10px; color:#aaa; margin:4px 0;">Get instant code and essay generation.</div>
          <button id="webtube-ad-aichat" class="webtube-web-ad-btn" style="background:#ff2020;">Get AI Chat</button>
        </div>
      </div>
    `;
  }

  function getFloatingAdHTML() {
    return `
      <div class="webtube-web-floating-ad">
        <div style="font-size:10px; font-weight:700; color:#ffd700;">⭐ WebTube Pro App</div>
        <div style="font-size:9px; color:#ccc;">Unlock all 10 videos + 4K streaming!</div>
        <button id="webtube-float-btn" class="webtube-web-ad-btn" style="margin-top:4px; font-size:9px;">Install App</button>
      </div>
    `;
  }

  function initAdInteractions(containerEl, onNavigate) {
    const btnApp = containerEl.querySelector("#webtube-ad-get-app");
    if (btnApp) btnApp.onclick = () => { if (window.openApp) window.openApp("store"); };

    const btnFloat = containerEl.querySelector("#webtube-float-btn");
    if (btnFloat) btnFloat.onclick = () => { if (window.openApp) window.openApp("store"); };

    const btnBuynet = containerEl.querySelector("#webtube-ad-buynet");
    if (btnBuynet && typeof onNavigate === "function") {
      btnBuynet.onclick = () => { onNavigate("www.buynet.webos"); };
    }

    const btnAIChat = containerEl.querySelector("#webtube-ad-aichat");
    if (btnAIChat) btnAIChat.onclick = () => { if (window.openApp) window.openApp("store"); };
  }

  window.webtubeWebAds = {
    getTopBannerAdHTML,
    getSidebarAdsHTML,
    getFloatingAdHTML,
    initAdInteractions
  };
})();

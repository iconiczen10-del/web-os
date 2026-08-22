/* === FILE: app-webtube.js === */
/**
 * WebOS v0.8.3 WebTube App Main Orchestrator (5 Tabs, Minimal Premium UI)
 */
(function () {
  let watchHistory = [];

  function initWebTube(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.style.background = "#0a0a0a";
    contentEl.style.color = "#ffffff";

    let activeTab = "home";
    let activePlayer = null;

    function renderShell() {
      const tier = window.webtubeTiers.getCurrentTier();
      const theme = window.webtubeTiers.getActiveTheme();

      contentEl.innerHTML = `
        <div class="webtube-app-layout theme-${theme}">
          <div class="webtube-app-header">
            <div class="webtube-app-brand">
              <span class="webtube-logo-icon">▶</span>
              <span class="webtube-logo-text">WebTube</span>
              <span class="webtube-brand-by">by WorldPlay</span>
            </div>
            <div class="webtube-header-actions">
              <button id="webtube-tier-btn" class="webtube-badge-tier" style="background:${tier.color};">${tier.badge}</button>
              ${tier.id === "max" ? '<button id="webtube-theme-toggle" class="webtube-btn-theme">🎨 Theme</button>' : ''}
            </div>
          </div>

          <div class="webtube-app-nav">
            <button class="webtube-nav-btn ${activeTab === 'home' ? 'active' : ''}" data-tab="home">🏠 Home</button>
            <button class="webtube-nav-btn ${activeTab === 'videos' ? 'active' : ''}" data-tab="videos">🎬 Videos</button>
            <button class="webtube-nav-btn ${activeTab === 'subs' ? 'active' : ''}" data-tab="subs">👥 Subs</button>
            <button class="webtube-nav-btn ${activeTab === 'library' ? 'active' : ''}" data-tab="library">📚 Library</button>
            <button class="webtube-nav-btn ${activeTab === 'history' ? 'active' : ''}" data-tab="history">⏱ History</button>
          </div>

          <div class="webtube-app-body"></div>
          <div id="webtube-modal-container"></div>
        </div>
      `;

      const bodyEl = contentEl.querySelector(".webtube-app-body");
      const modalEl = contentEl.querySelector("#webtube-modal-container");

      contentEl.querySelectorAll(".webtube-nav-btn").forEach(btn => {
        btn.onclick = () => {
          activeTab = btn.getAttribute("data-tab");
          if (activePlayer) { activePlayer.destroy(); activePlayer = null; }
          renderShell();
        };
      });

      const tierBtn = contentEl.querySelector("#webtube-tier-btn");
      if (tierBtn) {
        tierBtn.onclick = () => {
          if (window.startWebTubePayment) {
            window.startWebTubePayment(modalEl, "pro", () => { renderShell(); });
          }
        };
      }

      const themeBtn = contentEl.querySelector("#webtube-theme-toggle");
      if (themeBtn) {
        themeBtn.onclick = () => {
          const cur = window.webtubeTiers.getActiveTheme();
          window.webtubeTiers.setActiveTheme(cur === "gold" ? "red" : "gold");
          renderShell();
        };
      }

      function handleSelectVideo(id, idx) {
        const isLocked = !window.webtubeTiers.isVideoAccessible(tier.id, idx);
        if (isLocked) {
          if (window.startWebTubePayment) {
            window.startWebTubePayment(modalEl, "pro", () => { renderShell(); });
          }
          return;
        }

        const video = window.webtubeData.getVideoById(id);
        if (!video) return;

        if (!watchHistory.find(v => v.id === video.id)) watchHistory.unshift(video);

        bodyEl.innerHTML = `
          <div class="webtube-watch-view">
            <button id="webtube-back-to-grid" class="webtube-btn-back">← Back to ${activeTab}</button>
            <div id="webtube-player-mount"></div>
            <div class="webtube-video-details">
              <div class="webtube-detail-title">${video.title}</div>
              <div class="webtube-detail-meta">${video.views} views • ${video.uploadDate} • 👍 ${video.likes}</div>
              <div class="webtube-detail-desc">${video.description}</div>
            </div>
            <div id="webtube-comments-mount"></div>
          </div>
        `;

        const backBtn = bodyEl.querySelector("#webtube-back-to-grid");
        if (backBtn) {
          backBtn.onclick = () => {
            if (activePlayer) { activePlayer.destroy(); activePlayer = null; }
            renderTabContent(bodyEl, tier, handleSelectVideo);
          };
        }

        const pMount = bodyEl.querySelector("#webtube-player-mount");
        const cMount = bodyEl.querySelector("#webtube-comments-mount");

        if (window.createWebTubePlayer) {
          activePlayer = window.createWebTubePlayer(pMount, video, tier);
        }
        if (window.webtubeComments) {
          window.webtubeComments.renderComments(cMount, video, tier);
        }
      }

      renderTabContent(bodyEl, tier, handleSelectVideo);
    }

    function renderTabContent(bodyEl, tier, onSelect) {
      if (activeTab === "home") window.webtubeViews.renderHomeTab(bodyEl, tier, onSelect);
      else if (activeTab === "videos") window.webtubeViews.renderVideosTab(bodyEl, tier, onSelect);
      else if (activeTab === "subs") window.webtubeViews.renderSubsTab(bodyEl, tier, onSelect);
      else if (activeTab === "library") window.webtubeViews.renderLibraryTab(bodyEl, tier, watchHistory, onSelect);
      else if (activeTab === "history") window.webtubeViews.renderHistoryTab(bodyEl, tier, watchHistory, onSelect);
    }

    renderShell();
  }

  window.initWebTube = initWebTube;
})();

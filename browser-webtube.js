/* === FILE: browser-webtube.js === */
/**
 * WebOS v0.8.3 WebTube Website View (Free, Ad-Heavy, 3-Video Limit, 360p Max)
 */
(function () {
  function renderWebTubeWebsite(containerEl, onNavigate) {
    if (!containerEl) return;
    const allVideos = window.webtubeData.getVideos();
    const visibleVideos = allVideos.slice(0, 3); // Free limit: 3 videos
    let selectedVideo = visibleVideos[0];
    let activePlayer = null;

    function render() {
      containerEl.innerHTML = `
        <div class="webtube-web-layout">
          ${window.webtubeWebAds.getTopBannerAdHTML()}
          
          <div class="webtube-web-nav">
            <div class="webtube-web-brand">
              <span style="color:#ff2020; font-size:18px;">▶</span>
              <strong>WebTube Web</strong>
              <span class="webtube-web-free-tag">FREE AD-SUPPORTED</span>
            </div>
            <div class="webtube-web-actions">
              <button id="webtube-web-open-app" class="webtube-web-btn-gold">🚀 Open WebTube App</button>
            </div>
          </div>

          <div class="webtube-web-content">
            <div class="webtube-web-main">
              <div id="webtube-web-player-mount"></div>
              
              <div class="webtube-web-info">
                <div class="webtube-web-video-title">${selectedVideo.title}</div>
                <div class="webtube-web-video-meta">${selectedVideo.views} views • Free 360p Max Quality</div>
                <div class="webtube-web-video-desc">${selectedVideo.description}</div>
              </div>

              <div class="webtube-web-locked-banner">
                <div style="font-weight:700; color:#ffd700;">🔒 Comments & Full Catalog are Locked on Website</div>
                <div style="font-size:11px; color:#aaa;">Download the official WebTube App from App Store to unlock 1080p/4K, 10 videos, and comments.</div>
                <button id="webtube-web-get-app-btn" class="webtube-web-btn-primary" style="margin-top:6px;">Get WebTube App (Free)</button>
              </div>

              <div class="webtube-web-grid-title">More Free Videos (3 of 10 available on web)</div>
              <div class="webtube-web-grid">
                ${visibleVideos.map(v => `
                  <div class="webtube-web-card ${v.id === selectedVideo.id ? 'active' : ''}" data-id="${v.id}">
                    <div class="webtube-web-thumb" style="background:${v.thumbColor};">
                      <div class="webtube-web-play">▶</div>
                      <div class="webtube-web-dur">${v.durationStr}</div>
                    </div>
                    <div class="webtube-web-card-title">${v.title}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="webtube-web-side">
              ${window.webtubeWebAds.getSidebarAdsHTML()}
            </div>
          </div>

          ${window.webtubeWebAds.getFloatingAdHTML()}
        </div>
      `;

      window.webtubeWebAds.initAdInteractions(containerEl, onNavigate);

      const pMount = containerEl.querySelector("#webtube-web-player-mount");
      if (window.createWebTubePlayer && pMount) {
        // Free website capped at 360p
        activePlayer = window.createWebTubePlayer(pMount, selectedVideo, { id: "free", maxQuality: "360p", maxFps: 20, adsIntensity: 10 }, 1.6);
      }

      const openAppBtn = containerEl.querySelector("#webtube-web-open-app");
      if (openAppBtn) openAppBtn.onclick = () => { if (window.openApp) window.openApp("store"); };

      const getAppBtn = containerEl.querySelector("#webtube-web-get-app-btn");
      if (getAppBtn) getAppBtn.onclick = () => { if (window.openApp) window.openApp("store"); };

      containerEl.querySelectorAll(".webtube-web-card").forEach(card => {
        card.onclick = () => {
          const id = card.getAttribute("data-id");
          selectedVideo = allVideos.find(v => v.id === id) || visibleVideos[0];
          if (activePlayer) { activePlayer.destroy(); activePlayer = null; }
          render();
        };
      });
    }

    render();
  }

  window.renderWebTubeWebsite = renderWebTubeWebsite;
})();

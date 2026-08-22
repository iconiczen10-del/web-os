/* === FILE: webtube-player-ui.js === */
/**
 * WebOS v0.8.3 WebTube Canvas Player UI & Controls Component
 */
(function () {
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function createWebTubePlayer(containerEl, videoData, tier, internetSpeed) {
    if (!containerEl || !videoData) return;

    const activeTier = tier || (window.webtubeTiers ? window.webtubeTiers.getCurrentTier() : { id: "free", maxQuality: "360p", maxFps: 20 });
    const netSpeed = internetSpeed !== undefined ? internetSpeed : (window.buynetManager ? window.buynetManager.getInternetSpeed() : 1.6);
    const quality = window.webtubeTiers ? window.webtubeTiers.getQualityCapped(activeTier.maxQuality, netSpeed) : "360p";
    const fps = window.webtubeTiers ? window.webtubeTiers.getFpsForQuality(quality) : 30;

    containerEl.innerHTML = `
      <div class="webtube-player-wrapper">
        <div class="webtube-canvas-container">
          <canvas class="webtube-canvas" width="640" height="360"></canvas>
          <div class="webtube-canvas-overlay">
            <button class="webtube-overlay-play">▶</button>
          </div>
          ${activeTier.adsIntensity >= 5 ? '<div class="webtube-player-ad">Ad • Download WebTube Pro App</div>' : ''}
        </div>
        <div class="webtube-controls">
          <div class="webtube-progress-bar">
            <div class="webtube-progress-fill"></div>
          </div>
          <div class="webtube-controls-bottom">
            <div class="webtube-ctrl-left">
              <button class="webtube-btn-play">▶</button>
              <span class="webtube-time-display">0:00 / ${videoData.durationStr}</span>
            </div>
            <div class="webtube-ctrl-right">
              <span class="webtube-badge-speed">${netSpeed >= 1000 ? '1 Gbps' : netSpeed + ' Mbps'}</span>
              <span class="webtube-badge-quality">${quality} • ${fps}fps</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const canvas = containerEl.querySelector(".webtube-canvas");
    const overlayPlay = containerEl.querySelector(".webtube-overlay-play");
    const btnPlay = containerEl.querySelector(".webtube-btn-play");
    const progBar = containerEl.querySelector(".webtube-progress-bar");
    const progFill = containerEl.querySelector(".webtube-progress-fill");
    const timeDisplay = containerEl.querySelector(".webtube-time-display");

    const core = window.webtubePlayerCore.createPlayerCore(canvas, videoData, {
      fps,
      quality,
      internetSpeedMbps: netSpeed,
      onTimeUpdate: (cur) => {
        const pct = (cur / videoData.duration) * 100;
        if (progFill) progFill.style.width = `${pct}%`;
        if (timeDisplay) timeDisplay.textContent = `${formatTime(cur)} / ${videoData.durationStr}`;
      },
      onEnd: () => {
        if (btnPlay) btnPlay.textContent = "▶";
        if (overlayPlay) overlayPlay.style.display = "flex";
      }
    });

    function togglePlay() {
      if (core.isPlaying()) {
        core.pause();
        btnPlay.textContent = "▶";
        overlayPlay.style.display = "flex";
      } else {
        const ok = core.play();
        if (ok) {
          btnPlay.textContent = "⏸";
          overlayPlay.style.display = "none";
        }
      }
    }

    if (btnPlay) btnPlay.addEventListener("click", togglePlay);
    if (overlayPlay) overlayPlay.addEventListener("click", togglePlay);

    if (progBar) {
      progBar.addEventListener("click", (e) => {
        const rect = progBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        core.seek(pos * videoData.duration);
      });
    }

    return core;
  }

  window.webtubePlayer = { createWebTubePlayer };
})();

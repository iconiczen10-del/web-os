/* === FILE: app-webtube-views.js === */
/**
 * WebOS v0.8.3 WebTube App Tab Views Generator (Home, Videos, Subs, Library, History)
 */
(function () {
  function renderGrid(videos, currentTier, onSelectVideo) {
    return `
      <div class="webtube-video-grid">
        ${videos.map((v, idx) => {
          const isLocked = !window.webtubeTiers.isVideoAccessible(currentTier.id, idx);
          const channel = window.webtubeData.getChannelById(v.channelId) || { name: "Creator" };
          return `
            <div class="webtube-card ${isLocked ? 'locked' : ''}" data-id="${v.id}" data-idx="${idx}">
              <div class="webtube-card-thumb" style="background:${v.thumbColor};">
                <div class="webtube-card-play">▶</div>
                <div class="webtube-card-duration">${v.durationStr}</div>
                ${isLocked ? '<div class="webtube-card-lock">🔒 Tier Locked</div>' : ''}
                ${v.isEarlyAccess ? '<div class="webtube-card-early">⭐ MAX EXCLUSIVE</div>' : ''}
              </div>
              <div class="webtube-card-info">
                <div class="webtube-card-title">${v.title}</div>
                <div class="webtube-card-meta">${channel.name} • ${v.views} views • ${v.uploadDate}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderHomeTab(containerEl, currentTier, onSelect) {
    const videos = window.webtubeData.getVideos();
    containerEl.innerHTML = `
      <div class="webtube-section-title">Trending on WebTube</div>
      ${renderGrid(videos, currentTier, onSelect)}
    `;
    attachCardClicks(containerEl, onSelect);
  }

  function renderVideosTab(containerEl, currentTier, onSelect) {
    const videos = window.webtubeData.getVideos();
    containerEl.innerHTML = `
      <div class="webtube-section-title">All Catalog Videos (${videos.length})</div>
      <div class="webtube-catalog-sub">Tier Access: ${currentTier.accessibleCount}/${videos.length} videos unlocked on ${currentTier.name} tier.</div>
      ${renderGrid(videos, currentTier, onSelect)}
    `;
    attachCardClicks(containerEl, onSelect);
  }

  function renderSubsTab(containerEl, currentTier, onSelect) {
    const channels = window.webtubeData.getChannels();
    containerEl.innerHTML = `
      <div class="webtube-section-title">Subscribed Channels (${channels.length})</div>
      <div class="webtube-channel-list">
        ${channels.map(c => `
          <div class="webtube-channel-row">
            <div class="webtube-channel-icon">${c.icon}</div>
            <div class="webtube-channel-info">
              <div class="webtube-channel-name">${c.name} ${c.verified ? '✓' : ''}</div>
              <div class="webtube-channel-subs">${c.subs} subscribers</div>
            </div>
            <button class="webtube-btn-subscribed">Subscribed</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderLibraryTab(containerEl, currentTier, history, onSelect) {
    const videos = window.webtubeData.getVideos().slice(0, 3);
    containerEl.innerHTML = `
      <div class="webtube-section-title">Your WebTube Library</div>
      <div style="font-size:13px; color:#ffd700; margin-bottom:12px;">Saved & Liked Videos</div>
      ${renderGrid(videos, currentTier, onSelect)}
    `;
    attachCardClicks(containerEl, onSelect);
  }

  function renderHistoryTab(containerEl, currentTier, history, onSelect) {
    const watched = history.length > 0 ? history : [window.webtubeData.getVideos()[0]];
    containerEl.innerHTML = `
      <div class="webtube-section-title">Watch History (${watched.length})</div>
      ${renderGrid(watched, currentTier, onSelect)}
    `;
    attachCardClicks(containerEl, onSelect);
  }

  function attachCardClicks(containerEl, onSelect) {
    containerEl.querySelectorAll(".webtube-card").forEach(c => {
      c.onclick = () => {
        const id = c.getAttribute("data-id");
        const idx = parseInt(c.getAttribute("data-idx"), 10);
        if (typeof onSelect === "function") onSelect(id, idx);
      };
    });
  }

  window.webtubeViews = {
    renderHomeTab,
    renderVideosTab,
    renderSubsTab,
    renderLibraryTab,
    renderHistoryTab
  };
})();

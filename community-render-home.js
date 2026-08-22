/* === FILE: community-render-home.js === */
/**
 * WebOS v0.8.1 CommunityPCS - Header, Nav, Home & Forums View
 */
(function () {
  function renderHeaderNav(activePath) {
    const live = window.communityLive;
    const online = live ? live.getOnlineCount() : 45;
    return `
      <header class="community-header">
        <div class="community-brand">
          <div class="community-logo">🌐</div>
          <div class="community-title-wrap">
            <h1 class="community-title">CommunityPCS</h1>
            <span class="community-tagline">The Official WebOS Community & Developer Forum</span>
          </div>
        </div>
        <div class="community-header-right">
          <div class="community-online-indicator">
            <span class="community-pulse-dot"></span>
            <span class="community-live-online-val">${online} users online now</span>
          </div>
        </div>
      </header>
      <nav class="community-nav">
        <button class="community-nav-item ${activePath === '/' ? 'active' : ''}" data-path="/">🏠 Home</button>
        <button class="community-nav-item ${activePath === '/forums' ? 'active' : ''}" data-path="/forums">📋 Forums (7)</button>
        <button class="community-nav-item ${activePath === '/members' ? 'active' : ''}" data-path="/members">👥 Members</button>
        <button class="community-nav-item ${activePath === '/about' ? 'active' : ''}" data-path="/about">ℹ️ About & Rules</button>
      </nav>
    `;
  }

  function renderHomeView() {
    const data = window.communityData;
    const live = window.communityLive;
    const allThreads = data ? data.getAllThreads() : [];
    const trending = allThreads.filter(t => t.hot).slice(0, 5);
    const totalPosts = allThreads.reduce((sum, t) => sum + (t.posts ? t.posts.length : 0), 0);
    const memCount = live ? live.getTotalMembers() : 2847;
    const online = live ? live.getOnlineCount() : 42;
    const activities = live ? live.getRecentActivities() : [];
    const latestMem = live ? live.getLatestMember() : "WebSurfer_99";

    const trendingHTML = trending.map(t => `
      <div class="community-thread-row" data-thread-id="${t.id}">
        <div class="community-thread-main">
          <div class="community-thread-title">
            <span class="community-hot-badge">🔥 HOT</span>
            <a href="#" class="community-thread-link" data-id="${t.id}">${t.title}</a>
          </div>
          <div class="community-thread-meta">
            <span>In <strong class="community-cat-pill">${t.category}</strong></span>
            <span>by <strong>${t.author}</strong></span>
            <span>• ${t.date}</span>
          </div>
        </div>
        <div class="community-thread-stats">
          <div class="community-stat-bubble">💬 ${t.posts.length - 1} replies</div>
          <div class="community-stat-bubble">👍 ${t.likes}</div>
        </div>
      </div>
    `).join("");

    return `
      <div class="community-page-home">
        <div class="community-banner">
          <div class="community-banner-text">
            <h2>Welcome to CommunityPCS! 🚀</h2>
            <p>Connect with WebOS enthusiasts, discuss hardware specs, share desktop setups, and discover tips.</p>
          </div>
          <button class="community-cta-btn" data-path="/forums">Explore All 41 Threads</button>
        </div>

        <div class="community-stats-grid">
          <div class="community-stat-card"><div class="community-sc-icon">👥</div><div class="community-sc-val community-live-members-val">${memCount.toLocaleString()}</div><div class="community-sc-lbl">Total Members</div></div>
          <div class="community-stat-card"><div class="community-sc-icon">💬</div><div class="community-sc-val">${allThreads.length}</div><div class="community-sc-lbl">Discussion Threads</div></div>
          <div class="community-stat-card"><div class="community-sc-icon">📝</div><div class="community-sc-val">${totalPosts}</div><div class="community-sc-lbl">Total Posts</div></div>
          <div class="community-stat-card"><div class="community-sc-icon">🟢</div><div class="community-sc-val community-live-online-val">${online}</div><div class="community-sc-lbl">Online Right Now</div></div>
        </div>

        <div class="community-home-two-col">
          <div class="community-home-left">
            <div class="community-section-header">
              <h3 class="community-section-title">🔥 Trending Discussions</h3>
              <a href="#" class="community-view-all" data-path="/forums">View All Topics &rarr;</a>
            </div>
            <div class="community-threads-list">${trendingHTML}</div>
          </div>
          <div class="community-home-right">
            <div class="community-feed-box">
              <div class="community-section-header"><h3 class="community-section-title">⚡ Live Activity Feed</h3></div>
              <div class="community-live-activity-list">
                ${activities.map(a => `
                  <div class="community-activity-item community-act-${a.type}">
                    <div class="community-act-dot"></div>
                    <div class="community-act-text">${a.text}</div>
                    <div class="community-act-time">${a.time}</div>
                  </div>
                `).join("")}
              </div>
              <div class="community-new-member-banner">
                <span>🎉 Newest Member: <strong id="community-newest-user">${latestMem}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderForumsView() {
    const data = window.communityData;
    const categories = data ? data.CATEGORIES : [];

    const catsHTML = categories.map(cat => {
      const catThreads = data ? data.getCategoryThreads(cat.name) : [];
      const top3 = catThreads.slice(0, 3);
      const rowsHTML = top3.map(t => `
        <div class="community-thread-row" data-thread-id="${t.id}">
          <div class="community-thread-main">
            <div class="community-thread-title">
              ${t.hot ? '<span class="community-hot-badge">🔥</span>' : ''}
              <a href="#" class="community-thread-link" data-id="${t.id}">${t.title}</a>
            </div>
            <div class="community-thread-meta">
              <span>by <strong>${t.author}</strong></span>
              <span>• ${t.date}</span>
            </div>
          </div>
          <div class="community-thread-stats">
            <div class="community-stat-bubble">💬 ${t.posts.length - 1} replies</div>
            <div class="community-stat-bubble">👍 ${t.likes}</div>
          </div>
        </div>
      `).join("");

      return `
        <div class="community-category-card" id="cat-card-${cat.id}">
          <div class="community-cat-header">
            <div class="community-cat-info">
              <span class="community-cat-icon">${cat.icon}</span>
              <div>
                <h3 class="community-cat-title">${cat.name}</h3>
                <p class="community-cat-desc">${cat.desc}</p>
              </div>
            </div>
            <div class="community-cat-badge">${catThreads.length} threads</div>
          </div>
          <div class="community-cat-thread-list">${rowsHTML}</div>
          ${catThreads.length > 3 ? `
            <div class="community-cat-footer">
              <button class="community-expand-cat-btn" data-cat="${cat.name}">Show all ${catThreads.length} threads in ${cat.name} &darr;</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join("");

    return `
      <div class="community-page-forums">
        <div class="community-forums-header">
          <h2>Forum Categories</h2>
          <p>Browse 41 active threads across 7 technical and community categories.</p>
        </div>
        <div class="community-categories-wrap">${catsHTML}</div>
      </div>
    `;
  }

  window.communityRenderHome = {
    renderHeaderNav,
    renderHomeView,
    renderForumsView
  };
})();

/* === FILE: community-render-pages.js === */
/**
 * WebOS v0.8.1 CommunityPCS - Members & About Pages Renderer
 */
(function () {
  function renderMembersView() {
    const data = window.communityData;
    const live = window.communityLive;
    const members = data ? data.getTopContributors() : [];
    const totalMem = live ? live.getTotalMembers() : 2847;

    const cardsHTML = members.map((m, idx) => `
      <div class="community-member-card">
        <div class="community-member-rank">#${idx + 1}</div>
        <div class="community-member-avatar">${idx === 0 ? '👑' : idx < 3 ? '⭐' : '👤'}</div>
        <div class="community-member-info">
          <div class="community-member-name">${m.name}</div>
          <div class="community-member-badge">${m.badge}</div>
          <div class="community-member-stats">
            <span>📝 <strong>${m.posts}</strong> posts</span>
            <span>•</span>
            <span>👍 <strong>${m.likes}</strong> likes</span>
          </div>
        </div>
      </div>
    `).join("");

    return `
      <div class="community-page-members">
        <div class="community-members-hero">
          <h2>Community Leaderboard & Members</h2>
          <p>Over <strong class="community-live-members-val">${totalMem.toLocaleString()}</strong> registered WebOS enthusiasts worldwide.</p>
        </div>
        <div class="community-members-grid">${cardsHTML}</div>
      </div>
    `;
  }

  function renderAboutView() {
    const data = window.communityData;
    const rules = data ? data.getCommunityRules() : [];

    const rulesHTML = rules.map(r => `
      <div class="community-rule-item">
        <div class="community-rule-num">${r.num}</div>
        <div class="community-rule-content">
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
        </div>
      </div>
    `).join("");

    return `
      <div class="community-page-about">
        <div class="community-about-hero">
          <h2>About CommunityPCS</h2>
          <p>Founded May 2026 as the primary gathering ground for WebOS operating system users, theme creators, and application developers.</p>
        </div>

        <div class="community-about-grid">
          <div class="community-about-card">
            <h3>🌐 Our Mission</h3>
            <p>To foster an inclusive, high-craft ecosystem where users can share tips, discuss desktop aesthetics, provide bug telemetry, and shape the future of browser-based desktop computing.</p>
          </div>
          <div class="community-about-card">
            <h3>⚡ Powered by WebOS</h3>
            <p>CommunityPCS is rendered natively within the WebOS browser stack without external server dependencies, running 100% offline with zero remote telemetry.</p>
          </div>
        </div>

        <div class="community-rules-section">
          <div class="community-rules-header">
            <h3>📜 Community Code of Conduct & Rules</h3>
            <p>Please follow these guidelines to keep our community helpful and constructive.</p>
          </div>
          <div class="community-rules-list">${rulesHTML}</div>
        </div>
      </div>
    `;
  }

  window.communityRenderPages = {
    renderMembersView,
    renderAboutView
  };
})();

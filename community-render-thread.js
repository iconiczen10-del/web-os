/* === FILE: community-render-thread.js === */
/**
 * WebOS v0.8.1 CommunityPCS - Thread View & Reply Engine
 */
(function () {
  function getRoleBadge(role) {
    if (role === "Moderator") return `<span class="community-role-badge role-mod">🛡️ Moderator</span>`;
    if (role === "New Member") return `<span class="community-role-badge role-new">🌱 New Member</span>`;
    return `<span class="community-role-badge role-member">👤 Member</span>`;
  }

  function getAvatarEmoji(name) {
    const emojis = ["🦊", "🐼", "🦁", "🚀", "⚡", "🔮", "💻", "💎", "🌟", "🛡️", "🌊", "🦉"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return emojis[Math.abs(hash) % emojis.length];
  }

  function renderThreadView(threadId) {
    const data = window.communityData;
    const thread = data ? data.findThread(threadId) : null;
    if (!thread) {
      return `
        <div class="community-not-found">
          <div class="cnf-icon">⚠️</div>
          <h2>Thread Not Found</h2>
          <p>The requested thread #${threadId} does not exist.</p>
          <button class="community-cta-btn" data-path="/forums">Back to Forums</button>
        </div>
      `;
    }

    const postsHTML = (thread.posts || []).map((post, idx) => `
      <article class="community-post-card" id="post-${idx}">
        <div class="community-post-sidebar">
          <div class="community-post-avatar">${getAvatarEmoji(post.author)}</div>
          <div class="community-post-author-name">${post.author}</div>
          ${getRoleBadge(post.role)}
          <div class="community-post-author-count">${post.posts || 42} posts</div>
        </div>
        <div class="community-post-body">
          <div class="community-post-meta">
            <span class="community-post-date">Posted on ${post.date || thread.date}</span>
            <span class="community-post-number">#${idx + 1}</span>
          </div>
          <div class="community-post-content">${post.content}</div>
          <div class="community-post-actions">
            <button class="community-like-btn" data-liked="false" data-count="${post.likes || 0}">
              <span class="community-like-icon">👍</span> <span class="community-like-val">${post.likes || 0}</span> Likes
            </button>
          </div>
        </div>
      </article>
    `).join("");

    return `
      <div class="community-thread-page">
        <div class="community-thread-breadcrumb">
          <a href="#" class="community-crumb-link" data-path="/forums">&larr; Forums</a>
          <span>/</span>
          <span class="community-crumb-cat">${thread.category}</span>
          <span>/</span>
          <span class="community-crumb-cur">${thread.title}</span>
        </div>

        <div class="community-thread-header-bar">
          <div class="community-th-left">
            <h2 class="community-th-title">${thread.title}</h2>
            <div class="community-th-meta">
              Started by <strong>${thread.author}</strong> in <span class="community-cat-pill">${thread.category}</span> • ${thread.date}
            </div>
          </div>
          <div class="community-th-right">
            <button class="community-like-btn community-main-like" data-liked="false" data-count="${thread.likes}">
              👍 <span class="community-like-val">${thread.likes}</span> Likes
            </button>
          </div>
        </div>

        <div class="community-posts-container">${postsHTML}</div>

        <div class="community-typing-indicator" id="community-thread-typing" style="display: none;">
          <span class="community-typing-user" id="community-typing-name">User</span> is typing
          <span class="community-typing-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>

        <div class="community-reply-box-wrap">
          <div class="community-reply-title">💬 Post a Reply</div>
          <textarea id="community-reply-input" class="community-reply-textarea" placeholder="Write your response to this thread..."></textarea>
          <div class="community-reply-actions">
            <button id="community-submit-reply" class="community-submit-btn" data-thread-id="${thread.id}">Post Reply</button>
          </div>
        </div>
      </div>
    `;
  }

  function setupTypingIndicator() {
    const typingEl = document.getElementById("community-thread-typing");
    const nameEl = document.getElementById("community-typing-name");
    if (!typingEl || !nameEl) return;

    if (window._communityTypingTimer) clearTimeout(window._communityTypingTimer);
    const delay = 3000 + Math.random() * 5000;

    window._communityTypingTimer = setTimeout(() => {
      if (!document.getElementById("community-thread-typing")) return;
      const user = window.communityLive ? window.communityLive.getRandomUser() : "WebOS_Fanatic";
      nameEl.textContent = user;
      typingEl.style.display = "flex";

      setTimeout(() => {
        if (typingEl) typingEl.style.display = "none";
      }, 2500 + Math.random() * 1500);
    }, delay);
  }

  window.communityRenderThread = {
    renderThreadView,
    setupTypingIndicator
  };
})();

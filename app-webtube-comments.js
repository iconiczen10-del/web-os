/* === FILE: app-webtube-comments.js === */
/**
 * WebOS v0.8.3 WebTube App Comments Component (Tier-Gated)
 */
(function () {
  function renderComments(containerEl, video, tier) {
    if (!containerEl) return;

    if (tier.comments === "none") {
      containerEl.innerHTML = `
        <div class="webtube-locked-box">
          <div style="font-size:24px; margin-bottom:4px;">🔒</div>
          <div style="font-weight:700; color:#ffd700;">Comments are locked on Free tier</div>
          <div style="font-size:12px; color:#8e8e93; margin-top:2px;">Upgrade to WebTube Pro to read comments, or Master to participate.</div>
          <button id="webtube-comm-upgrade" class="webtube-btn-gold" style="margin-top:10px;">Upgrade Tier</button>
        </div>
      `;
      const btn = containerEl.querySelector("#webtube-comm-upgrade");
      if (btn) btn.onclick = () => {
        const modal = document.querySelector("#webtube-modal-container");
        if (modal && window.startWebTubePayment) window.startWebTubePayment(modal, "pro");
      };
      return;
    }

    const canWrite = tier.comments === "write" || tier.comments === "premium";
    const comments = video.comments || [];

    containerEl.innerHTML = `
      <div class="webtube-comments-header">
        <div style="font-weight:700; font-size:14px;">Comments (${comments.length})</div>
        ${tier.comments === "premium" ? '<span class="webtube-premium-badge">★ MAX VIP BADGE</span>' : ''}
      </div>

      ${canWrite ? `
        <div class="webtube-comment-input-box">
          <input type="text" id="webtube-new-comment" placeholder="Add a public comment..." />
          <button id="webtube-post-comment" class="webtube-btn-primary">Post</button>
        </div>
      ` : '<div style="font-size:11px; color:#8e8e93; margin-bottom:12px;">Reading mode enabled (Upgrade to Master/Max to post comments).</div>'}

      <div class="webtube-comments-list">
        ${comments.map(c => `
          <div class="webtube-comment-item">
            <div class="webtube-comment-avatar">${c.user.charAt(0)}</div>
            <div class="webtube-comment-body">
              <div class="webtube-comment-user">${c.user} <span class="webtube-comment-time">${c.time}</span></div>
              <div class="webtube-comment-text">${c.text}</div>
              <div class="webtube-comment-likes">👍 ${c.likes}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const postBtn = containerEl.querySelector("#webtube-post-comment");
    const input = containerEl.querySelector("#webtube-new-comment");
    if (postBtn && input) {
      postBtn.onclick = () => {
        const val = input.value.trim();
        if (!val) return;
        video.comments.unshift({
          user: tier.id === "max" ? "WebOS Master (VIP)" : "WebOS User",
          time: "Just now",
          text: val,
          likes: 1
        });
        input.value = "";
        renderComments(containerEl, video, tier);
      };
    }
  }

  window.webtubeComments = { renderComments };
})();

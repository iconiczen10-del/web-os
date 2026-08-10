/* === FILE: aichat-marketing.js === */
/**
 * AI Chat Marketing Ad Banners, Counter Warnings & Upgrade Cards
 */
(function () {
  function getAdBannerHTML() {
    return `
      <div class="aichat-ad-banner">
        <span>⚡ <strong>Upgrade to Plus — $100</strong> | 50 messages, no ads, coding help, more knowledge</span>
        <button class="aichat-ad-btn" id="aichat-ad-upgrade-btn">See Plans</button>
      </div>
    `;
  }

  function getCounterStatusHTML(tier, count, limit) {
    if (tier === "pro") {
      return `<span class="aichat-counter pro">Pro — Unlimited Messages</span>`;
    }
    if (tier === "plus") {
      const isNear = count >= 40;
      return `<span class="aichat-counter ${isNear ? 'warning' : ''}">Plus: ${count}/${limit} messages</span>`;
    }
    // Free tier
    const isWarn = count === 4;
    const isDanger = count >= 5;
    const cls = isDanger ? 'danger' : (isWarn ? 'warning' : '');
    const prefix = isWarn ? '⚠️ ' : (isDanger ? '🛑 ' : '');
    return `<span class="aichat-counter ${cls}">${prefix}${count}/${limit} messages used</span>`;
  }

  function getLimitReachedCardHTML(tier) {
    if (tier === "free") {
      return `
        <div class="aichat-limit-card">
          <div style="font-size: 24px; margin-bottom: 8px;">🛑 Free Tier Limit Reached (5/5)</div>
          <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 16px;">
            You have used all 5 free trial messages. Upgrade to unlock 50 messages on Plus or unlimited AI access on Pro!
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="aichat-btn aichat-btn-primary" id="limit-upgrade-plus">Upgrade to Plus ($100)</button>
            <button class="aichat-btn aichat-btn-primary" id="limit-upgrade-pro" style="background: #8b5cf6;">Unlock Pro ($300)</button>
          </div>
        </div>
      `;
    }
    return `
      <div class="aichat-limit-card">
        <div style="font-size: 24px; margin-bottom: 8px;">🚀 Plus Limit Reached (50/50)</div>
        <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 16px;">
          Upgrade to Pro Tier for unlimited messages, custom AI personalities, and code generation!
        </p>
        <button class="aichat-btn aichat-btn-primary" id="limit-upgrade-pro" style="background: #8b5cf6;">Unlock Pro ($300)</button>
      </div>
    `;
  }

  window.aiMarketing = {
    getAdBannerHTML,
    getCounterStatusHTML,
    getLimitReachedCardHTML
  };
})();

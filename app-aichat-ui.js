/* === FILE: app-aichat-ui.js === */
/**
 * AI Chat HTML Template Generator
 */
(function () {
  function getChatHTML(selectedPersonality) {
    const tier = window.aiSubscription ? window.aiSubscription.getCurrentTier() : "free";
    const isFree = tier === "free";
    const isPro = tier === "pro";
    const msgCount = window.aiEngine ? window.aiEngine.getMessageCount() : 0;
    const limit = window.aiEngine ? window.aiEngine.getMessageLimit(tier) : 5;
    const user = window.aiLogin ? window.aiLogin.getCurrentUser() : null;

    return `
      <div class="aichat-container">
        <div class="aichat-header">
          <div class="aichat-title-area">
            <span style="font-size: 18px;">🤖</span>
            <div>
              <div class="aichat-app-title">AI Chat</div>
              <div class="aichat-dev-sub">by AI Talks Inc.</div>
            </div>
          </div>
          <div class="aichat-header-actions">
            <span class="aichat-tier-badge badge-${tier}">${tier.toUpperCase()}</span>
            ${user ? `<span style="font-size: 11px; color: #8b949e;">👤 ${user.name}</span>` : `<button id="aichat-login-btn" class="aichat-btn aichat-btn-secondary" style="padding: 3px 8px; font-size: 10px;">Sign In</button>`}
            <button id="aichat-upgrade-btn" class="aichat-btn aichat-btn-primary" style="padding: 3px 8px; font-size: 10px;">Upgrade</button>
          </div>
        </div>

        <div class="aichat-messages" id="aichat-msg-list">
          <div class="aichat-bubble aichat-bubble-ai">
            Welcome to AI Chat on WebOS! I'm your virtual assistant powered by AI Talks Inc. Ask me questions, request code, or ask for jokes!
            <div class="aichat-time">${new Date().toLocaleTimeString()}</div>
          </div>
          ${isFree ? '<div class="aichat-ads-banner">📢 Sponsor Ad: Upgrade to Plus or Pro on www.aitalks.webos for Ad-Free Experience!</div>' : ''}
        </div>

        <div class="aichat-input-bar">
          ${isPro ? `
            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: #8b949e;">
              <span>AI Personality:</span>
              <select id="aichat-persona-select" style="background: #161b22; color: #58a6ff; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 6px; font-size: 11px;">
                <option value="Friendly" ${selectedPersonality === "Friendly" ? "selected" : ""}>Friendly 😊</option>
                <option value="Professional" ${selectedPersonality === "Professional" ? "selected" : ""}>Professional 💼</option>
                <option value="Sarcastic" ${selectedPersonality === "Sarcastic" ? "selected" : ""}>Sarcastic 🙄</option>
              </select>
            </div>
          ` : ""}

          <div class="aichat-status-strip">
            <span id="aichat-status-txt">${isPro ? "Pro Tier: Unlimited Messages" : `Session Usage: ${msgCount}/${limit} messages`}</span>
            <span style="font-size: 10px; color: #58a6ff; cursor: pointer;" id="status-upgrade-link">${isPro ? "" : "Upgrade Plan"}</span>
          </div>

          <div class="aichat-input-row">
            <input type="text" id="aichat-text-input" class="aichat-input" placeholder="Type your prompt or question here..." />
            <button id="aichat-send-btn" class="aichat-btn aichat-btn-primary">Send</button>
          </div>
        </div>
      </div>
    `;
  }

  window.aiChatUI = { getChatHTML };
})();

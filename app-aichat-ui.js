/* === FILE: app-aichat-ui.js === */
/**
 * AI Chat HTML Template Generator & Welcome Layout
 */
(function () {
  function getChatHTML(selectedPersonality, activeTab = "chat") {
    const tier = window.aiSubscription ? window.aiSubscription.getCurrentTier() : "free";
    const isFree = tier === "free";
    const isPro = tier === "pro";
    const msgCount = window.aiEngine ? window.aiEngine.getMessageCount() : 0;
    const limit = window.aiEngine ? window.aiEngine.getMessageLimit(tier) : 5;
    const user = window.aiLogin ? window.aiLogin.getCurrentUser() : null;

    const welcomeMsg = window.aiFallback ? window.aiFallback.getWelcomeText(tier) : "Hello! Welcome to AI Chat on WebOS.";
    const statusHTML = window.aiMarketing ? window.aiMarketing.getCounterStatusHTML(tier, msgCount, limit) : `Session Usage: ${msgCount}/${limit}`;

    const accessPct = window.aiKnowledgeBrowser ? window.aiKnowledgeBrowser.getAccessPercentage(tier) : 15;

    const navTabsHTML = `
      <div class="aichat-nav-tabs">
        <button class="aichat-tab-btn ${activeTab === "chat" ? "active" : ""}" data-tab="chat">💬 Chat</button>
        <button class="aichat-tab-btn ${activeTab === "topics" ? "active" : ""}" data-tab="topics">📚 Knowledge (${accessPct}%)</button>
      </div>
    `;

    const chatBodyHTML = `
      <div class="aichat-messages" id="aichat-msg-list">
        <div class="aichat-bubble aichat-bubble-ai">
          <div style="white-space: pre-wrap;">${welcomeMsg}</div>
          <div class="aichat-time">${new Date().toLocaleTimeString()}</div>
        </div>
        ${isFree && window.aiMarketing ? window.aiMarketing.getAdBannerHTML() : ''}
      </div>

      <div class="aichat-chips-bar" id="aichat-chips-bar">
        <button class="aichat-chip" data-cmd="help">help</button>
        <button class="aichat-chip" data-cmd="topics">topics</button>
        <button class="aichat-chip" data-cmd="examples">examples</button>
        <button class="aichat-chip" data-cmd="what is webos">what is webos</button>
        <button class="aichat-chip" data-cmd="cpu specs">cpu specs</button>
        <button class="aichat-chip" data-cmd="tell me a joke">joke</button>
      </div>

      <div class="aichat-input-bar">
        ${isPro ? `
          <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: #8b949e; margin-bottom: 4px;">
            <span>AI Personality:</span>
            <select id="aichat-persona-select" style="background: #161b22; color: #58a6ff; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 6px; font-size: 11px;">
              <option value="Friendly" ${selectedPersonality === "Friendly" ? "selected" : ""}>Friendly 😊</option>
              <option value="Professional" ${selectedPersonality === "Professional" ? "selected" : ""}>Professional 💼</option>
              <option value="Sarcastic" ${selectedPersonality === "Sarcastic" ? "selected" : ""}>Sarcastic 🙄</option>
            </select>
          </div>
        ` : ""}

        <div class="aichat-status-strip">
          <span id="aichat-status-txt">${statusHTML}</span>
          <span style="font-size: 10px; color: #58a6ff; cursor: pointer;" id="status-upgrade-link">${isPro ? "" : "Upgrade Plan"}</span>
        </div>

        <div class="aichat-input-row">
          <input type="text" id="aichat-text-input" class="aichat-input" placeholder="Type your prompt, ask 'help', or click a chip..." />
          <button id="aichat-send-btn" class="aichat-btn aichat-btn-primary">Send</button>
        </div>
      </div>
    `;

    const topicsBodyHTML = window.aiTopicsView ? window.aiTopicsView.getTopicsTabHTML(tier) : '<div class="aichat-topics-container">Loading...</div>';

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

        ${navTabsHTML}

        <div class="aichat-view-body" id="aichat-view-body" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
          ${activeTab === "topics" ? topicsBodyHTML : chatBodyHTML}
        </div>
      </div>
    `;
  }

  window.aiChatUI = { getChatHTML };
})();

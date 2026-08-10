/* === FILE: app-aichat.js === */
/**
 * WebOS v0.7.2 AI Chat System Application Orchestrator
 */
(function () {
  function initAIChat(winContainer) {
    if (!winContainer) return;
    const content = winContainer.querySelector(".window-content");
    if (!content) return;

    let selectedPersonality = "Friendly";

    function renderMainChat() {
      if (window.aiChatUI) {
        content.innerHTML = window.aiChatUI.getChatHTML(selectedPersonality);
      }
      attachChatEvents();
    }

    function attachChatEvents() {
      const input = content.querySelector("#aichat-text-input");
      const sendBtn = content.querySelector("#aichat-send-btn");
      const msgList = content.querySelector("#aichat-msg-list");
      const upgradeBtn = content.querySelector("#aichat-upgrade-btn");
      const upgradeLink = content.querySelector("#status-upgrade-link");
      const loginBtn = content.querySelector("#aichat-login-btn");
      const personaSelect = content.querySelector("#aichat-persona-select");

      if (personaSelect) {
        personaSelect.addEventListener("change", (e) => {
          selectedPersonality = e.target.value;
        });
      }

      function appendBubble(text, sender) {
        if (!msgList) return;
        const bubble = document.createElement("div");
        bubble.className = `aichat-bubble aichat-bubble-${sender}`;
        bubble.innerHTML = `<div>${text}</div><div class="aichat-time">${new Date().toLocaleTimeString()}</div>`;
        msgList.appendChild(bubble);
        msgList.scrollTop = msgList.scrollHeight;
      }

      async function handleSend() {
        const val = input.value.trim();
        if (!val) return;

        input.value = "";
        appendBubble(val, "user");

        const tier = window.aiSubscription ? window.aiSubscription.getCurrentTier() : "free";

        const typingBubble = document.createElement("div");
        typingBubble.className = "aichat-bubble aichat-bubble-ai";
        typingBubble.innerHTML = "<em>Thinking...</em>";
        msgList.appendChild(typingBubble);
        msgList.scrollTop = msgList.scrollHeight;

        const res = await window.aiEngine.getResponse(val, tier, selectedPersonality);
        typingBubble.remove();

        appendBubble(res.text, "ai");

        const count = window.aiEngine ? window.aiEngine.getMessageCount() : 0;
        const limit = window.aiEngine ? window.aiEngine.getMessageLimit(tier) : 5;
        const statusTxt = content.querySelector("#aichat-status-txt");
        if (statusTxt) {
          statusTxt.textContent = tier === "pro" ? "Pro Tier: Unlimited Messages" : `Session Usage: ${count}/${limit} messages`;
        }
      }

      if (sendBtn) sendBtn.addEventListener("click", handleSend);
      if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });

      function openSubScreen() {
        if (window.aiSubscriptionUI) {
          window.aiSubscriptionUI.renderPlanSelection(content, (tier) => {
            window.aiSubscriptionUI.renderPaymentConfirm(content, tier, async () => {
              const payRes = await window.aiPayment.processPayment(tier);
              if (payRes.success) {
                renderMainChat();
              }
            }, () => openSubScreen());
          }, () => renderMainChat());
        }
      }

      if (upgradeBtn) upgradeBtn.addEventListener("click", openSubScreen);
      if (upgradeLink) upgradeLink.addEventListener("click", openSubScreen);

      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          const name = prompt("Enter your Name for AI Chat Sign In:") || "User";
          const email = prompt("Enter Email (must contain @ and .):") || "user@webos.dev";
          const pwd = prompt("Enter Password (min 4 chars):") || "1234";

          const res = window.aiLogin ? window.aiLogin.signUp(name, email, pwd) : { success: true };
          if (res.success) {
            renderMainChat();
          } else {
            alert("Sign In Error: " + res.error);
          }
        });
      }
    }

    renderMainChat();
  }

  window.initAIChat = initAIChat;
})();

/* === FILE: app-aichat.js === */
/**
 * WebOS v0.7.4 AI Chat System Application Orchestrator
 */
(function () {
  function initAIChat(winContainer) {
    if (!winContainer) return;
    const content = winContainer.querySelector(".window-content");
    if (!content) return;

    let selectedPersonality = "Friendly";
    let activeTab = "chat";
    let userMsgCount = 0;

    function renderMainChat() {
      if (window.aiChatUI) {
        content.innerHTML = window.aiChatUI.getChatHTML(selectedPersonality, activeTab);
      }
      attachChatEvents();
    }

    function attachChatEvents() {
      const tabBtns = content.querySelectorAll(".aichat-tab-btn");
      tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          activeTab = btn.getAttribute("data-tab");
          renderMainChat();
        });
      });

      if (activeTab === "topics") {
        const topicsBody = content.querySelector("#aichat-view-body");
        if (topicsBody && window.aiTopicsView) {
          window.aiTopicsView.bindTopicsEvents(topicsBody, (promptText) => {
            activeTab = "chat";
            renderMainChat();
            const input = content.querySelector("#aichat-text-input");
            if (input) {
              input.value = promptText;
              const sendBtn = content.querySelector("#aichat-send-btn");
              if (sendBtn) sendBtn.click();
            }
          }, () => openSubScreen());
        }
      } else {
        const input = content.querySelector("#aichat-text-input");
        const sendBtn = content.querySelector("#aichat-send-btn");
        const msgList = content.querySelector("#aichat-msg-list");
        const personaSelect = content.querySelector("#aichat-persona-select");
        const chipsBar = content.querySelector("#aichat-chips-bar");

        if (personaSelect) {
          personaSelect.addEventListener("change", (e) => { selectedPersonality = e.target.value; });
        }

        if (chipsBar) {
          chipsBar.addEventListener("click", (e) => {
            const chip = e.target.closest(".aichat-chip");
            if (chip && input) {
              input.value = chip.getAttribute("data-cmd") || "";
              handleSend();
            }
          });
        }

        function appendBubble(text, sender) {
          if (!msgList) return;
          const bubble = document.createElement("div");
          bubble.className = `aichat-bubble aichat-bubble-${sender}`;
          bubble.innerHTML = `<div>${(text || "").replace(/\n/g, "<br/>")}</div><div class="aichat-time">${new Date().toLocaleTimeString()}</div>`;
          msgList.appendChild(bubble);
          msgList.scrollTop = msgList.scrollHeight;
        }

        async function handleSend() {
          const val = input.value.trim();
          if (!val) return;

          input.value = "";
          appendBubble(val, "user");
          userMsgCount++;

          const tier = window.aiSubscription ? window.aiSubscription.getCurrentTier() : "free";

          const typingBubble = document.createElement("div");
          typingBubble.className = "aichat-bubble aichat-bubble-ai aichat-typing-bubble";
          typingBubble.innerHTML = `<span class="aichat-dots">AI is typing<span>.</span><span>.</span><span>.</span></span>`;
          msgList.appendChild(typingBubble);
          msgList.scrollTop = msgList.scrollHeight;

          const res = await window.aiEngine.getResponse(val, tier, selectedPersonality);
          typingBubble.remove();

          appendBubble(res.text, "ai");

          if (tier === "free" && userMsgCount % 2 === 0 && !res.isLimit) {
            const adDiv = document.createElement("div");
            adDiv.innerHTML = window.aiMarketing.getAdBannerHTML();
            msgList.appendChild(adDiv.firstElementChild);
            msgList.scrollTop = msgList.scrollHeight;
          }

          const count = window.aiEngine ? window.aiEngine.getMessageCount() : 0;
          const limit = window.aiEngine ? window.aiEngine.getMessageLimit(tier) : 5;
          const statusTxt = content.querySelector("#aichat-status-txt");
          if (statusTxt && window.aiMarketing) {
            statusTxt.innerHTML = window.aiMarketing.getCounterStatusHTML(tier, count, limit);
          }

          if (res.isLimit && window.aiMarketing) {
            const cardDiv = document.createElement("div");
            cardDiv.innerHTML = window.aiMarketing.getLimitReachedCardHTML(tier);
            msgList.appendChild(cardDiv.firstElementChild);
            msgList.scrollTop = msgList.scrollHeight;
          }
        }

        if (sendBtn) sendBtn.addEventListener("click", handleSend);
        if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });
      }

      function openSubScreen() {
        if (window.aiSubscriptionUI) {
          window.aiSubscriptionUI.renderPlanSelection(content, (tier) => {
            window.aiSubscriptionUI.renderPaymentConfirm(content, tier, async () => {
              const payRes = await window.aiPayment.processPayment(tier);
              if (payRes.success) {
                userMsgCount = 0;
                renderMainChat();
              }
            }, () => openSubScreen());
          }, () => renderMainChat());
        }
      }

      content.addEventListener("click", (e) => {
        if (["aichat-ad-upgrade-btn", "limit-upgrade-plus", "limit-upgrade-pro", "aichat-upgrade-btn", "status-upgrade-link"].includes(e.target.id)) {
          openSubScreen();
        } else if (e.target.id === "aichat-login-btn") {
          const name = prompt("Enter Name:") || "User";
          const pwd = prompt("Enter Password:") || "1234";
          if (window.aiLogin && window.aiLogin.signUp(name, "user@webos.dev", pwd).success) renderMainChat();
        }
      });
    }

    renderMainChat();
  }

  window.initAIChat = initAIChat;
})();

/* === FILE: browser-dev.js === */
/**
 * WebOS Developer Portal Orchestrator & Stage Router (www.dev.webos)
 */
(function () {
  let stageState = {
    currentStage: 1,
    activeTab: "home",
    user: null,
    accessGranted: false
  };

  function renderDevPortalPage(containerEl, onNavigate) {
    if (!containerEl) return;

    function refreshView() {
      containerEl.innerHTML = "";
      const stage = stageState.currentStage;

      if (stage === 1) {
        if (window.devPortalLogin) {
          window.devPortalLogin.renderLoginPage(containerEl, (username) => {
            stageState.user = username;
            stageState.currentStage = 2;
            refreshView();
          });
        }
      } else if (stage === 2) {
        if (window.devPortalQuiz) {
          window.devPortalQuiz.renderQuizPage(containerEl, () => {
            stageState.currentStage = 3;
            refreshView();
          });
        }
      } else if (stage === 3) {
        if (window.devPortalEgg) {
          window.devPortalEgg.renderEasterEggPage(containerEl, () => {
            stageState.currentStage = 4;
            refreshView();
          });
        }
      } else if (stage === 4) {
        if (window.devPortalPay) {
          window.devPortalPay.renderPaymentPage(containerEl, () => {
            stageState.accessGranted = true;
            stageState.currentStage = 5;
            refreshView();
          });
        }
      } else if (stage === 5) {
        if (window.devPortalMain) {
          window.devPortalMain.renderPortalPage(
            containerEl,
            stageState.activeTab,
            (tabId) => {
              stageState.activeTab = tabId;
              refreshView();
            },
            stageState.user || "Developer"
          );
        }
      }
    }

    refreshView();
  }

  window.renderDevPortalPage = renderDevPortalPage;
})();

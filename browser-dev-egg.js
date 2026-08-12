/* === FILE: browser-dev-egg.js === */
/**
 * Developer Portal Stage 3 - Easter Egg Quiz Handler
 */
(function () {
  function renderEasterEggPage(containerEl, onSuccess) {
    const questions = [
      { q: "1. What happens when you trigger the secret interaction on the WebOS window logo?", opts: ["System reboots", "Logo spins 360° with a rainbow glow", "Plays sound effect", "Unlocks all applications"], ans: 1 },
      { q: "2. Where in the OS is this secret logo interaction located?", opts: ["System Monitor Topbar", "Settings → About OS (Click window logo 5x)", "Terminal Command Prompt", "Desktop Lock Screen"], ans: 1 }
    ];

    let userSelections = [-1, -1];
    let showErrors = false;

    function draw() {
      let qHtml = questions.map((item, qIdx) => {
        let optsHtml = item.opts.map((opt, oIdx) => {
          let sel = userSelections[qIdx] === oIdx;
          let isWrong = showErrors && sel && oIdx !== item.ans;
          let isCorrect = showErrors && oIdx === item.ans;

          let cls = "dev-quiz-opt";
          if (sel) cls += " selected";
          if (isWrong) cls += " wrong";
          if (isCorrect) cls += " correct";

          return `<button class="${cls}" data-q="${qIdx}" data-o="${oIdx}">${opt}</button>`;
        }).join("");

        return `<div class="dev-quiz-qbox"><h3>${item.q}</h3><div class="dev-quiz-opts">${optsHtml}</div></div>`;
      }).join("");

      containerEl.innerHTML = `
        <div class="dev-stage-wrap">
          <div class="dev-stage-header">
            <h1 class="dev-stage-title">🥚 Easter Egg Verification</h1>
            <p class="dev-stage-sub">Prove you have explored WebOS system secrets.</p>
          </div>
          <div class="dev-quiz-container">
            ${qHtml}
            <div id="dev-egg-msg" class="dev-quiz-msg"></div>
            <button class="dev-btn-primary" id="dev-egg-submit">Verify Secret Knowledge</button>
          </div>
        </div>
      `;

      containerEl.querySelectorAll(".dev-quiz-opt").forEach(btn => {
        btn.onclick = () => {
          const qIdx = parseInt(btn.getAttribute("data-q"), 10);
          const oIdx = parseInt(btn.getAttribute("data-o"), 10);
          userSelections[qIdx] = oIdx;
          showErrors = false;
          draw();
        };
      });

      containerEl.querySelector("#dev-egg-submit").onclick = () => {
        if (userSelections.includes(-1)) {
          const msgEl = containerEl.querySelector("#dev-egg-msg");
          msgEl.textContent = "Please answer both questions to continue.";
          msgEl.className = "dev-quiz-msg err";
          return;
        }

        if (userSelections[0] === 1 && userSelections[1] === 1) {
          const msgEl = containerEl.querySelector("#dev-egg-msg");
          msgEl.textContent = "✅ Easter egg verified! You know the secrets.";
          msgEl.className = "dev-quiz-msg success";
          setTimeout(onSuccess, 1000);
        } else {
          showErrors = true;
          draw();
          const msgEl = containerEl.querySelector("#dev-egg-msg");
          msgEl.textContent = "❌ Incorrect. Explore Settings → About OS to discover the secret.";
          msgEl.className = "dev-quiz-msg err";
        }
      };
    }

    draw();
  }

  window.devPortalEgg = { renderEasterEggPage };
})();

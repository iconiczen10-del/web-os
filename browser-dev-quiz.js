/* === FILE: browser-dev-quiz.js === */
/**
 * Developer Portal Stage 2 - Knowledge Quiz Handler
 */
(function () {
  function renderQuizPage(containerEl, onSuccess) {
    const questions = [
      { q: "1. What CPU powers this WebOS?", opts: ["Intel i9-13900K", "Cyclone 1st Gen X9", "AMD Ryzen 9", "Apple M1 Max"], ans: 1 },
      { q: "2. What is the RAM brand and model in WebOS?", opts: ["Corsair Vengeance", "Kingston HyperX", "Black U5000", "G.Skill Trident"], ans: 2 },
      { q: "3. What GPU model does WebOS use?", opts: ["NVIDIA RTX 4090", "Star R Pro", "AMD Radeon RX 7900", "Intel Arc A770"], ans: 1 },
      { q: "4. What storage SSD is installed in WebOS?", opts: ["Samsung 990 Pro", "Bolt NV-256", "WD Black SN850", "Crucial T700"], ans: 1 },
      { q: "5. How many versions of WebOS have been built?", opts: ["10 versions", "15 versions", "20 versions", "24+ versions"], ans: 3 }
    ];

    let userSelections = [-1, -1, -1, -1, -1];
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
            <h1 class="dev-stage-title">🔒 Security Verification</h1>
            <p class="dev-stage-sub">Answer all 5 questions correctly to prove your WebOS knowledge.</p>
          </div>
          <div class="dev-quiz-container">
            ${qHtml}
            <div id="dev-quiz-msg" class="dev-quiz-msg"></div>
            <button class="dev-btn-primary" id="dev-quiz-submit">Submit Answers</button>
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

      containerEl.querySelector("#dev-quiz-submit").onclick = () => {
        if (userSelections.includes(-1)) {
          const msgEl = containerEl.querySelector("#dev-quiz-msg");
          msgEl.textContent = "Please answer all 5 questions before submitting.";
          msgEl.className = "dev-quiz-msg err";
          return;
        }

        let correctCount = 0;
        questions.forEach((item, idx) => {
          if (userSelections[idx] === item.ans) correctCount++;
        });

        if (correctCount === 5) {
          const msgEl = containerEl.querySelector("#dev-quiz-msg");
          msgEl.textContent = "✅ 5/5 — Verification passed! Proceeding...";
          msgEl.className = "dev-quiz-msg success";
          setTimeout(onSuccess, 1200);
        } else {
          showErrors = true;
          draw();
          const msgEl = containerEl.querySelector("#dev-quiz-msg");
          msgEl.textContent = `❌ ${correctCount}/5 correct. Review incorrect answers and try again.`;
          msgEl.className = "dev-quiz-msg err";
        }
      };
    }

    draw();
  }

  window.devPortalQuiz = { renderQuizPage };
})();

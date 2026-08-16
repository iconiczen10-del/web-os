/* === FILE: aichat-teaser-cards.js === */
/**
 * AI Chat v2 3D Flip Cards and Live Countdown Timer
 */
(function () {
  const TARGET_DATE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000);

  function renderFlipCards(containerEl) {
    if (!containerEl) return;

    const wrap = document.createElement("div");
    wrap.className = "teaser-cards-section";
    wrap.innerHTML = `
      <div class="teaser-flip-container">
        <div class="teaser-flip-card" id="teaser-card-1">
          <div class="teaser-flip-inner">
            <div class="teaser-flip-front">
              <div class="teaser-card-badge">✨ UPCOMING</div>
              <div class="teaser-card-icon">📚</div>
              <div class="teaser-card-title">All WebOS Knowledge</div>
              <div class="teaser-card-sub">Till Latest Update</div>
            </div>
            <div class="teaser-flip-back">
              <div class="teaser-back-icon">🌟</div>
              <div class="teaser-card-title">Complete Mastery</div>
              <div class="teaser-card-desc">Complete knowledge of every WebOS version, feature, and secret. From v0.1 to latest.</div>
            </div>
          </div>
        </div>

        <div class="teaser-flip-card" id="teaser-card-2">
          <div class="teaser-flip-inner">
            <div class="teaser-flip-badge-pro">🚀 NEXT-GEN</div>
            <div class="teaser-card-icon">🤖</div>
            <div class="teaser-card-title">AI Chat v2 Engine</div>
            <div class="teaser-card-sub">The Next Generation</div>
          </div>
          <div class="teaser-flip-back">
            <div class="teaser-back-icon">⚡</div>
            <div class="teaser-card-title">Quantum Intelligence</div>
            <div class="teaser-card-desc">Bigger, faster, smarter. Completely rebuilt. 500+ new answers, real memory, and context awareness.</div>
          </div>
        </div>
      </div>
    `;

    containerEl.appendChild(wrap);

    const cards = [
      wrap.querySelector("#teaser-card-1 .teaser-flip-inner"),
      wrap.querySelector("#teaser-card-2 .teaser-flip-inner")
    ];

    cards.forEach(card => {
      if (!card) return;
      card.parentElement.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });

    const flipInterval = setInterval(() => {
      if (!document.body.contains(wrap)) {
        clearInterval(flipInterval);
        return;
      }
      cards.forEach(card => {
        if (card) card.classList.toggle("flipped");
      });
    }, 5000);
  }

  function startCountdown(containerEl, isMini = false) {
    if (!containerEl) return;

    const countWrap = document.createElement("div");
    countWrap.className = isMini ? "teaser-countdown-mini" : "teaser-countdown-card";

    countWrap.innerHTML = `
      <div class="teaser-cd-header">
        <span class="teaser-cd-dot"></span>
        <span>AI CHAT v2 DROPS IN</span>
      </div>
      <div class="teaser-cd-digits">
        <div class="teaser-cd-box"><span class="cd-val" id="cd-days">14</span><span class="cd-lbl">days</span></div>
        <span class="cd-colon">:</span>
        <div class="teaser-cd-box"><span class="cd-val" id="cd-hours">08</span><span class="cd-lbl">hours</span></div>
        <span class="cd-colon">:</span>
        <div class="teaser-cd-box"><span class="cd-val" id="cd-mins">00</span><span class="cd-lbl">mins</span></div>
        <span class="cd-colon">:</span>
        <div class="teaser-cd-box"><span class="cd-val" id="cd-secs">00</span><span class="cd-lbl">secs</span></div>
      </div>
    `;

    containerEl.appendChild(countWrap);

    function update() {
      if (!document.body.contains(countWrap)) {
        clearInterval(cdTimer);
        return;
      }
      const now = Date.now();
      const diff = Math.max(0, TARGET_DATE.getTime() - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const dEl = countWrap.querySelector("#cd-days");
      const hEl = countWrap.querySelector("#cd-hours");
      const mEl = countWrap.querySelector("#cd-mins");
      const sEl = countWrap.querySelector("#cd-secs");

      if (dEl) dEl.textContent = String(days).padStart(2, "0");
      if (hEl) hEl.textContent = String(hours).padStart(2, "0");
      if (mEl) mEl.textContent = String(mins).padStart(2, "0");
      if (sEl) sEl.textContent = String(secs).padStart(2, "0");
    }

    update();
    const cdTimer = setInterval(update, 1000);
  }

  window.aiChatTeaserCards = {
    renderFlipCards,
    startCountdown
  };
})();

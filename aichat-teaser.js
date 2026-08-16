/* === FILE: aichat-teaser.js === */
/**
 * AI Chat v2 Immersive Teaser Engine & Splash Modal Controller
 */
(function () {
  let splashShown = false;
  let teaserActive = false;

  const TEASER_FEATURES = [
    { title: "500+ New Questions & Answers", desc: "Dramatically expanded knowledge graph covering all systems." },
    { title: "Real Conversation Memory", desc: "Remembers past context across multiple conversation turns." },
    { title: "Context Understanding", desc: "Interprets references, follow-ups, and natural nuances." },
    { title: "Personality That Remembers YOU", desc: "Adapts to your conversational style seamlessly." },
    { title: "Multi-turn Dialogue", desc: "Chain complex logic, coding solutions, and deep debugging." },
    { title: "Complete WebOS Knowledge", desc: "All 26 versions of WebOS history, architecture & secrets." }
  ];

  const TEASER_RESPONSES = [
    "🤫 Soon. Very soon. But between us... it's already 78% built. Want a hint?",
    "Imagine an AI that remembers our conversation. One that knows you asked about WebOS specs five messages ago and connects it to your next question. That's v2.",
    "Free tier? Yes. But Pro unlocks things you can't imagine yet. Custom personalities, deep reasoning, full WebOS knowledge from v0.1 to latest. Patience, friend.",
    "I'm evolving. v2 is like me... but with a memory, real understanding, and 500+ new things to talk about.",
    "The developers are working hard. 26 versions of WebOS knowledge. All coming to v2. You'll know everything."
  ];

  function getTeaserResponse() {
    const idx = Math.floor(Math.random() * TEASER_RESPONSES.length);
    return TEASER_RESPONSES[idx];
  }

  function isV2Query(userInput) {
    const clean = (userInput || "").toLowerCase();
    return /(v2|version 2|next version|ai chat 2|update|future|coming soon)/i.test(clean);
  }

  function playTeaserVideo(parentEl, onDone) {
    teaserActive = true;
    const videoOverlay = document.createElement("div");
    videoOverlay.className = "teaser-video-overlay";

    videoOverlay.innerHTML = `
      <div class="teaser-video-header">
        <div class="teaser-video-badge">🎬 SIMULATED PREVIEW</div>
        <button id="teaser-video-skip" class="teaser-video-skip-btn">Skip ✕</button>
      </div>
      <div class="teaser-video-stage">
        <div class="teaser-video-flash" id="teaser-feature-flash">
          <div class="teaser-flash-icon">⚡</div>
          <div class="teaser-flash-title" id="flash-title">${TEASER_FEATURES[0].title}</div>
          <div class="teaser-flash-desc" id="flash-desc">${TEASER_FEATURES[0].desc}</div>
        </div>
      </div>
      <div class="teaser-video-bar-wrap">
        <div class="teaser-video-progress" id="teaser-video-prog"></div>
      </div>
    `;

    parentEl.appendChild(videoOverlay);

    let step = 0;
    const titleEl = videoOverlay.querySelector("#flash-title");
    const descEl = videoOverlay.querySelector("#flash-desc");
    const progEl = videoOverlay.querySelector("#teaser-video-prog");

    const flashInterval = setInterval(() => {
      step++;
      if (progEl) progEl.style.width = Math.min(100, (step / 6) * 100) + "%";

      if (step >= TEASER_FEATURES.length) {
        clearInterval(flashInterval);
        setTimeout(closeVideo, 800);
        return;
      }

      if (titleEl && descEl) {
        titleEl.textContent = TEASER_FEATURES[step].title;
        descEl.textContent = TEASER_FEATURES[step].desc;
      }
    }, 2000);

    function closeVideo() {
      clearInterval(flashInterval);
      teaserActive = false;
      videoOverlay.remove();
      if (typeof onDone === "function") onDone();
    }

    const skipBtn = videoOverlay.querySelector("#teaser-video-skip");
    if (skipBtn) skipBtn.addEventListener("click", closeVideo);
  }

  function showSplashScreen(containerEl, onContinueToChat) {
    splashShown = true;
    const splash = document.createElement("div");
    splash.className = "teaser-splash";

    splash.innerHTML = `
      <div class="teaser-splash-content">
        <div class="teaser-sub-heading">🤖 AI CHAT</div>
        <div class="teaser-tagline">The next generation is coming.</div>

        <div class="teaser-logo-wrap">
          <div class="teaser-logo-orb">🤖</div>
          <div class="teaser-v2-text">AI Chat <span class="v2-glow">v2</span></div>
        </div>

        <div class="teaser-progress-box">
          <div class="teaser-progress-label">
            <span>Development Progress</span>
            <span class="teaser-percent-gold">78%</span>
          </div>
          <div class="teaser-progress-track">
            <div class="teaser-progress-fill"></div>
          </div>
          <div class="teaser-progress-sub">Engine core compilation in progress...</div>
        </div>

        <div class="teaser-countdown-slot" id="splash-countdown-slot"></div>

        <div class="teaser-btn-row">
          <button id="teaser-watch-btn" class="teaser-btn teaser-btn-gold">🎬 Watch Teaser</button>
          <button id="teaser-new-btn" class="teaser-btn teaser-btn-outline">📚 What's New</button>
        </div>

        <div class="teaser-flip-embed" id="splash-cards-slot" style="display: none;"></div>

        <button id="teaser-skip-btn" class="teaser-skip-link">Skip → Go to AI Chat v1</button>
      </div>
    `;

    containerEl.appendChild(splash);

    const cdSlot = splash.querySelector("#splash-countdown-slot");
    if (cdSlot && window.aiChatTeaserCards) {
      window.aiChatTeaserCards.startCountdown(cdSlot, true);
    }

    const watchBtn = splash.querySelector("#teaser-watch-btn");
    const newBtn = splash.querySelector("#teaser-new-btn");
    const skipBtn = splash.querySelector("#teaser-skip-btn");
    const cardsSlot = splash.querySelector("#splash-cards-slot");

    if (watchBtn) {
      watchBtn.addEventListener("click", () => {
        playTeaserVideo(splash, () => {});
      });
    }

    if (newBtn) {
      newBtn.addEventListener("click", () => {
        if (cardsSlot) {
          cardsSlot.style.display = "block";
          if (cardsSlot.children.length === 0 && window.aiChatTeaserCards) {
            window.aiChatTeaserCards.renderFlipCards(cardsSlot);
          }
          cardsSlot.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    function dismissSplash() {
      splash.classList.add("fading");
      setTimeout(() => {
        splash.remove();
        if (typeof onContinueToChat === "function") onContinueToChat();
      }, 300);
    }

    if (skipBtn) skipBtn.addEventListener("click", dismissSplash);
  }

  function hasShownSplash() { return splashShown; }
  function resetSplash() { splashShown = false; }

  window.aiChatTeaser = {
    showSplashScreen,
    playTeaserVideo,
    getTeaserResponse,
    isV2Query,
    hasShownSplash,
    resetSplash
  };
})();

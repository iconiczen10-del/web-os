/* === FILE: settings-about-os-hero.js === */
/**
 * WebOS v0.6.2 About OS Branding Hero & Easter Egg Component
 */
(function () {
  let clickCount = 0;
  let clickTimer = null;

  function handleLogoClick(logoEl) {
    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);

    if (clickCount >= 5) {
      clickCount = 0;
      console.log("🖥️ You found the secret! WebOS was built entirely with AI prompts. No manual coding. ✨");
      logoEl.classList.add("spinning");
      setTimeout(() => logoEl.classList.remove("spinning"), 1000);
      return;
    }

    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 3000);
  }

  function renderAboutOSHero(containerEl) {
    if (!containerEl) return;

    const hero = document.createElement("div");
    hero.className = "about-os-hero";

    hero.innerHTML = `
      <div class="about-os-logo-window" id="about-os-logo">
        <div class="about-os-traffic-lights">
          <div class="about-os-traffic-dot about-os-dot-red"></div>
          <div class="about-os-traffic-dot about-os-dot-amber"></div>
          <div class="about-os-traffic-dot about-os-dot-green"></div>
        </div>
        <div class="about-os-logo-text">WEB OS</div>
      </div>
      <div class="about-os-version-badge">v0.6.2</div>
      <div class="about-os-tagline">Designed in the Browser. Built with Vanilla HTML, CSS & JavaScript.</div>
      <div class="about-os-stars">★★★★★<span>5.0 • 1 Review</span></div>
      <div class="about-os-buttons">
        <button class="about-os-ghost-btn" id="hero-btn-website">🌐 Visit Website</button>
        <button class="about-os-ghost-btn" id="hero-btn-notes">📄 Release Notes</button>
      </div>
    `;

    const logoEl = hero.querySelector("#about-os-logo");
    if (logoEl) {
      logoEl.addEventListener("click", () => handleLogoClick(logoEl));
    }

    const btnWebsite = hero.querySelector("#hero-btn-website");
    if (btnWebsite) {
      btnWebsite.addEventListener("click", () => {
        console.log("🌐 Navigating to WebOS official site...");
      });
    }

    const btnNotes = hero.querySelector("#hero-btn-notes");
    if (btnNotes) {
      btnNotes.addEventListener("click", () => {
        console.log("📄 Opening WebOS Release Notes...");
      });
    }

    containerEl.appendChild(hero);
  }

  window.renderAboutOSHero = renderAboutOSHero;
})();

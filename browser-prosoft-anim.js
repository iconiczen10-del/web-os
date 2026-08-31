/* === FILE: browser-prosoft-anim.js === */
/**
 * WebOS v0.9.0 ProSoft Animations Engine
 * Particles, typing effect, countdown ticker, and teaser video.
 */
(function () {
  let particleAnimId = null;

  function initParticles(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (particleAnimId) cancelAnimationFrame(particleAnimId);

    const count = 30;
    const particles = [];
    const width = (canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth || 800 : 800);
    const height = (canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight || 450 : 450);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 1.2,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00bfff";
        ctx.fill();
      }
      particleAnimId = requestAnimationFrame(render);
    }
    render();
  }

  function typeText(element, fullText, speed = 40, onComplete) {
    if (!element) return;
    element.innerHTML = "";
    let idx = 0;
    const cursor = document.createElement("span");
    cursor.className = "ps-typing-cursor";
    cursor.textContent = "|";
    element.appendChild(cursor);

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        cursor.insertAdjacentText("beforebegin", fullText.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          cursor.remove();
          element.classList.add("ps-typed-glow");
          if (typeof onComplete === "function") onComplete();
        }, 400);
      }
    }, speed);
  }

  function startCountdown(container) {
    if (!container) return null;
    const targetDate = Date.now() + 14 * 24 * 60 * 60 * 1000 + 7 * 3600 * 1000;

    function update() {
      const diff = Math.max(0, targetDate - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = container.querySelector("#ps-cd-days");
      const hEl = container.querySelector("#ps-cd-hrs");
      const mEl = container.querySelector("#ps-cd-min");
      const sEl = container.querySelector("#ps-cd-sec");

      if (dEl) dEl.textContent = String(days).padStart(2, "0");
      if (hEl) hEl.textContent = String(hours).padStart(2, "0");
      if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
      if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
    }

    update();
    const timer = setInterval(update, 1000);
    return timer;
  }

  function showTeaserVideo(container) {
    const overlay = document.createElement("div");
    overlay.className = "ps-teaser-overlay";
    overlay.innerHTML = `
      <div class="ps-teaser-box">
        <div class="ps-teaser-header">
          <span>🎬 PROSOFT V3D v1 — OFFICIAL TEASER</span>
          <button class="ps-teaser-skip" id="ps-skip-btn">Skip ✕</button>
        </div>
        <div class="ps-teaser-screen" id="ps-teaser-screen">
          <div class="ps-teaser-scene ps-scene-1 active">
            <div class="ps-scene-badge">NEXT-GEN RENDERING</div>
            <div class="ps-scene-title">REAL 3D GRAPHICS</div>
            <div class="ps-scene-sub">Native WebOS Hardware Acceleration</div>
          </div>
          <div class="ps-teaser-scene ps-scene-2">
            <div class="ps-scene-badge">HIGH PERFORMANCE</div>
            <div class="ps-scene-title">ZERO OVERHEAD</div>
            <div class="ps-scene-sub">60 FPS Constant Frametime Pipeline</div>
          </div>
          <div class="ps-teaser-scene ps-scene-3">
            <div class="ps-scene-badge">COMING IN WEBOS v0.10.0</div>
            <div class="ps-scene-title">V3D ENGINE v1</div>
            <div class="ps-scene-sub">The Future of Desktop Web 3D</div>
          </div>
        </div>
        <div class="ps-teaser-progress-bar"><div class="ps-teaser-progress-fill" id="ps-teaser-fill"></div></div>
      </div>
    `;

    container.appendChild(overlay);
    const fill = overlay.querySelector("#ps-teaser-fill");
    const scenes = overlay.querySelectorAll(".ps-teaser-scene");
    let progress = 0;

    const interval = setInterval(() => {
      progress += 1.5;
      if (fill) fill.style.width = `${Math.min(100, progress)}%`;

      if (progress > 33 && progress <= 66) {
        scenes.forEach((s, idx) => s.classList.toggle("active", idx === 1));
      } else if (progress > 66) {
        scenes.forEach((s, idx) => s.classList.toggle("active", idx === 2));
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => overlay.remove(), 400);
      }
    }, 150);

    const skipBtn = overlay.querySelector("#ps-skip-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        clearInterval(interval);
        overlay.remove();
      });
    }
  }

  window.prosoftAnim = {
    initParticles,
    typeText,
    startCountdown,
    showTeaserVideo
  };
})();

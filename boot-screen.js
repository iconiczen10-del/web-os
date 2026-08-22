/* === FILE: boot-screen.js === */
/**
 * WebOS v0.7.1.1.A Boot Screen Orchestrator
 */
(function () {
  let isBooted = false;

  function blockInput(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  function initBootScreen(onComplete) {
    if (isBooted) {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    document.body.style.cursor = "none";

    const overlay = document.createElement("div");
    overlay.id = "boot-screen";

    overlay.innerHTML = `
      <div class="boot-logo-window" id="boot-logo">
        <div class="boot-traffic-lights">
          <div class="boot-traffic-dot boot-dot-red"></div>
          <div class="boot-traffic-dot boot-dot-amber"></div>
          <div class="boot-traffic-dot boot-dot-green"></div>
        </div>
        <div class="boot-logo-text">WEB OS</div>
      </div>
      <div class="boot-starting-text" id="boot-starting-text" style="opacity: 0;">
        Starting WebOS<span class="boot-dot-anim">.</span><span class="boot-dot-anim">.</span><span class="boot-dot-anim">.</span>
      </div>
      <div class="boot-progress-container" id="boot-progress-cont" style="opacity: 0;">
        <div class="boot-progress-fill" id="boot-progress-fill"></div>
      </div>
      <div class="boot-progress-percent" id="boot-progress-percent" style="opacity: 0;">0%</div>
      <div class="boot-messages" id="boot-messages"></div>
    `;

    const events = ["click", "keydown", "keyup", "keypress", "mousedown", "mouseup", "touchstart", "contextmenu"];
    events.forEach(evt => {
      overlay.addEventListener(evt, blockInput, true);
    });

    document.body.appendChild(overlay);

    const startingText = overlay.querySelector("#boot-starting-text");
    const progressCont = overlay.querySelector("#boot-progress-cont");
    const progressPercent = overlay.querySelector("#boot-progress-percent");
    const fillEl = overlay.querySelector("#boot-progress-fill");
    const msgContainer = overlay.querySelector("#boot-messages");
    const logoEl = overlay.querySelector("#boot-logo");

    setTimeout(() => {
      if (startingText) startingText.style.opacity = "1";
    }, 200);

    setTimeout(() => {
      if (progressCont) progressCont.style.opacity = "1";
      if (progressPercent) progressPercent.style.opacity = "1";
    }, 400);

    if (typeof window.startBootSimulation === "function") {
      window.startBootSimulation(fillEl, progressPercent, msgContainer, () => {
        if (startingText) startingText.style.opacity = "0";
        if (progressCont) progressCont.style.opacity = "0";
        if (progressPercent) progressPercent.style.opacity = "0";
        if (logoEl) logoEl.classList.add("glow-intense");

        overlay.classList.add("fading");

        setTimeout(() => {
          isBooted = true;
          overlay.remove();
          document.body.style.cursor = "";
          console.log("WebOS v0.8.2 booted");
          if (typeof onComplete === "function") onComplete();
        }, 400);
      });
    } else {
      setTimeout(() => {
        isBooted = true;
        overlay.remove();
        document.body.style.cursor = "";
        console.log("WebOS v0.8.2 booted (fallback)");
        if (typeof onComplete === "function") onComplete();
      }, 3200);
    }
  }

  window.initBootScreen = initBootScreen;
})();

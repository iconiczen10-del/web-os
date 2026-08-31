/* === FILE: dero-effects.js === */
/**
 * WebOS v0.9.2.1 DER-0 Visual Glitches, Shakes, BSOD & Death Screen
 */
(function () {
  let isShaking = false;

  function applyWindowShake(intensity = 3) {
    isShaking = true;
    document.querySelectorAll(".window").forEach(win => {
      win.style.setProperty("--shake-intensity", `${intensity}px`);
      win.classList.add("window-shaking");
    });
  }

  function stopWindowShake() {
    isShaking = false;
    document.querySelectorAll(".window").forEach(win => {
      win.classList.remove("window-shaking");
    });
  }

  function screenGlitch() {
    const gl = document.createElement("div");
    gl.className = "dero-screen-glitch";
    document.body.appendChild(gl);
    setTimeout(() => gl.remove(), 250);
  }

  function randomAppOpen(appName, glitchText, autoCloseMs = 2500) {
    if (window.windowManager && window.windowManager.openWindow) {
      window.windowManager.openWindow(appName);
      setTimeout(() => {
        const win = document.querySelector(`.window[data-app="${appName}"]`);
        if (win && glitchText) {
          const body = win.querySelector(".window-content") || win;
          const banner = document.createElement("div");
          banner.className = "dero-glitch-banner";
          banner.textContent = glitchText;
          body.prepend(banner);
        }
        if (autoCloseMs && win) {
          setTimeout(() => {
            if (window.windowManager.closeWindow) window.windowManager.closeWindow(appName);
          }, autoCloseMs);
        }
      }, 300);
    }
  }

  function triggerBSOD() {
    const bsod = document.createElement("div");
    bsod.className = "dero-bsod-screen";
    bsod.id = "dero-bsod";
    bsod.innerHTML = `
      <div class="bsod-content">
        <div class="bsod-face">:(</div>
        <div class="bsod-heading">Your WebOS PC ran into a problem and needs to restart.</div>
        <div class="bsod-desc">We're just collecting some error info, and then we'll restart for you.</div>
        <div class="bsod-progress"><span id="bsod-pct">0</span>% complete</div>
        <div class="bsod-meta">
          <div class="bsod-qr">▦</div>
          <div class="bsod-details">
            <div>Stop Code: CRITICAL_PROCESS_DIED</div>
            <div>What failed: DER0_KERNEL_CORRUPTION.SYS</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(bsod);

    let pct = 0;
    const interval = setInterval(() => {
      pct += 15;
      const el = document.getElementById("bsod-pct");
      if (el) el.textContent = Math.min(pct, 100);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          bsod.remove();
          showDeathScreen();
        }, 1200);
      }
    }, 300);
  }

  function showDeathScreen(customStats) {
    const stats = customStats || (window.deroUpdate ? window.deroUpdate.getCorruptionStats() : { elapsed: "5m 00s", driversLost: 12, storageFilled: "4.8 GB", peakCpu: "100%" });
    const death = document.createElement("div");
    death.className = "dero-death-screen";
    death.id = "dero-death";
    death.innerHTML = `
      <div class="death-card">
        <div class="death-title">☠️ SYSTEM COLLAPSE SUMMARY</div>
        <div class="death-subtitle">DER-0 corrupted kernel memory past recovery point.</div>
        <div class="death-stats-grid">
          <div class="death-stat-box"><span class="lbl">Survive Time</span><span class="val">${stats.elapsed}</span></div>
          <div class="death-stat-box"><span class="lbl">Drivers Nuked</span><span class="val">${stats.driversLost} / 12</span></div>
          <div class="death-stat-box"><span class="lbl">Junk Storage</span><span class="val">${stats.storageFilled}</span></div>
          <div class="death-stat-box"><span class="lbl">Peak Load</span><span class="val">${stats.peakCpu}</span></div>
        </div>
        <button class="death-reboot-btn" id="btn-death-reboot">🔄 Reboot into WebOS Safe Mode</button>
      </div>
    `;
    document.body.appendChild(death);

    const btn = death.querySelector("#btn-death-reboot");
    if (btn) {
      btn.onclick = () => {
        death.remove();
        if (window.deroUpdate) window.deroUpdate.stopDER0Corruption();
        if (window.initBootScreen) {
          window.initBootScreen(() => {
            if (window.notificationBus) {
              window.notificationBus.notify("Safe Mode Active", "System recovered. Please remove DER-00 from Finder.", "🛡️", "WebOS Recovery", "finder");
            }
          }, true);
        }
      };
    }
  }

  window.deroEffects = {
    applyWindowShake,
    stopWindowShake,
    screenGlitch,
    randomAppOpen,
    triggerBSOD,
    showDeathScreen
  };
})();

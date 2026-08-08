/* === FILE: topbar.js === */
/**
 * WebOS v0.4 Top Menu Bar Manager
 * Manages top bar element, live clock, and active application title display.
 */
(function () {
  let activeAppName = "Finder";

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  }

  function initTopbar() {
    let topbarEl = document.getElementById("topbar");
    if (!topbarEl) {
      topbarEl = document.createElement("div");
      topbarEl.id = "topbar";
      document.body.prepend(topbarEl);
    }

    topbarEl.innerHTML = `
      <div class="topbar-left">
        <span class="topbar-apple"></span>
        <span class="topbar-app-name" id="topbar-app-name">${activeAppName}</span>
      </div>
      <div class="topbar-right">
        <span class="topbar-clock" id="topbar-clock"></span>
      </div>
    `;

    const clockEl = document.getElementById("topbar-clock");
    function updateClock() {
      if (clockEl) {
        clockEl.textContent = formatTime(new Date());
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  function updateActiveApp(appName) {
    if (!appName) return;
    const formatted = appName.charAt(0).toUpperCase() + appName.slice(1);
    activeAppName = formatted;
    const nameEl = document.getElementById("topbar-app-name");
    if (nameEl) {
      nameEl.textContent = formatted;
    }
  }

  function getTopbarHeight() {
    return 28;
  }

  window.topbarManager = {
    initTopbar,
    updateActiveApp,
    getTopbarHeight
  };
})();

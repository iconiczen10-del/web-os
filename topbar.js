/* === FILE: topbar.js === */
/**
 * WebOS v0.9.1 Top Menu Bar Manager
 * Manages top bar element, live clock, unread badge, and iOS panel triggers.
 */
(function () {
  let activeAppName = "Finder";

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
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
        <div class="topbar-clock-btn" id="topbar-clock-btn" title="Open Notification Center">
          <span class="topbar-clock-icon">🕐</span>
          <span class="topbar-clock" id="topbar-clock"></span>
          <span class="topbar-badge" id="topbar-unread-badge" style="display: none;">0</span>
        </div>
        <span class="topbar-app-name" id="topbar-app-name">${activeAppName}</span>
      </div>
      <div class="topbar-right">
        <div class="topbar-vt-container" id="topbar-vt-container" style="display: none;" title="VT-Optimizer">
          <canvas id="topbar-vt-canvas" width="28" height="28"></canvas>
        </div>
        <div class="topbar-controls-trigger" id="topbar-controls-trigger" title="Open Control Center">
          <span class="topbar-item" id="topbar-wifi-indicator">📶</span>
          <span class="topbar-item" id="topbar-battery" title="highcell Power Cell: 94%">🔋</span>
          <span class="topbar-item" id="topbar-cc-icon">🎛️</span>
        </div>
      </div>
    `;

    const clockEl = document.getElementById("topbar-clock");
    function updateClock() {
      if (clockEl) clockEl.textContent = formatTime(new Date());
    }
    updateClock();
    setInterval(updateClock, 1000);

    const clockBtn = document.getElementById("topbar-clock-btn");
    if (clockBtn) {
      clockBtn.onclick = (e) => {
        e.stopPropagation();
        if (window.toggleNotificationCenter) window.toggleNotificationCenter();
      };
    }

    const ccTrigger = document.getElementById("topbar-controls-trigger");
    if (ccTrigger) {
      ccTrigger.onclick = (e) => {
        e.stopPropagation();
        if (window.toggleControlCenter) window.toggleControlCenter();
      };
    }

    const vtTrigger = document.getElementById("topbar-vt-container");
    if (vtTrigger) {
      vtTrigger.onclick = (e) => {
        e.stopPropagation();
        if (window.vtOptimizer && typeof window.vtOptimizer.toggleDropdown === "function") {
          window.vtOptimizer.toggleDropdown();
        }
      };
    }

    if (window.notificationBus) {
      updateUnreadBadge(window.notificationBus.unreadCount());
    }
  }

  function updateUnreadBadge(count) {
    const badgeEl = document.getElementById("topbar-unread-badge");
    if (badgeEl) {
      if (count > 0) {
        badgeEl.textContent = count > 99 ? '99+' : count;
        badgeEl.style.display = "inline-flex";
      } else {
        badgeEl.style.display = "none";
      }
    }
  }

  function updateActiveApp(appName) {
    if (!appName) return;
    const formatted = appName.charAt(0).toUpperCase() + appName.slice(1);
    activeAppName = formatted;
    const nameEl = document.getElementById("topbar-app-name");
    if (nameEl) nameEl.textContent = formatted;
  }

  function showVTIcon() {
    const vtEl = document.getElementById("topbar-vt-container");
    if (vtEl) {
      vtEl.style.display = "flex";
      if (window.vtOptimizer && typeof window.vtOptimizer.initIcon === "function") {
        window.vtOptimizer.initIcon();
      }
    }
  }

  function getTopbarHeight() {
    return 28;
  }

  window.topbarManager = {
    initTopbar,
    updateActiveApp,
    updateUnreadBadge,
    getTopbarHeight,
    showVTIcon
  };
})();

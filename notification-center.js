/* === FILE: notification-center.js === */
/**
 * WebOS v0.9.1 iOS-Style Notification Center Panel
 * Manages slide-down panel, grouped card rendering, clearing, and calendar widget.
 */
(function () {
  let panelEl = null;
  let isOpen = false;

  function getDayName(d) {
    return ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][d.getDay()];
  }

  function getMonthName(d) {
    return ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][d.getMonth()];
  }

  function formatCalendarDate() {
    const now = new Date();
    return `${getDayName(now)}, ${getMonthName(now)} ${now.getDate()}`;
  }

  function createPanel() {
    if (panelEl) return panelEl;
    panelEl = document.createElement("div");
    panelEl.id = "notification-center-panel";
    panelEl.className = "ios-panel nc-panel";
    document.body.appendChild(panelEl);
    return panelEl;
  }

  function groupNotifications(list) {
    const groups = {};
    list.forEach(item => {
      const app = item.app || "System";
      if (!groups[app]) groups[app] = { name: app, icon: item.icon || "🔔", targetApp: item.targetApp, items: [] };
      groups[app].items.push(item);
    });
    return Object.values(groups);
  }

  function render() {
    if (!panelEl) return;
    const list = window.notificationBus ? window.notificationBus.getNotifications() : [];
    const groups = groupNotifications(list);

    let contentHtml = "";
    if (groups.length === 0) {
      contentHtml = `
        <div class="nc-empty-state">
          <div class="nc-empty-icon">🔔</div>
          <div class="nc-empty-title">No New Notifications</div>
          <div class="nc-empty-desc">You're all caught up!</div>
        </div>
      `;
    } else {
      contentHtml = groups.map(g => `
        <div class="nc-group-card" data-app="${g.name}">
          <div class="nc-group-header">
            <div class="nc-group-info">
              <span class="nc-group-icon">${g.icon}</span>
              <span class="nc-group-title">${g.name}</span>
            </div>
            <button class="nc-group-close-btn" data-app="${g.name}" title="Clear ${g.name} notifications">✕</button>
          </div>
          <div class="nc-group-items">
            ${g.items.map(item => `
              <div class="nc-item ${item.read ? 'read' : 'unread'}" data-id="${item.id}" data-target="${item.targetApp || ''}">
                ${!item.read ? '<span class="nc-unread-dot"></span>' : ''}
                <div class="nc-item-main">
                  <div class="nc-item-top">
                    <span class="nc-item-title">${item.title}</span>
                    <span class="nc-item-time">${item.formattedTime}</span>
                  </div>
                  <div class="nc-item-desc">${item.description}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("");
    }

    panelEl.innerHTML = `
      <div class="nc-header">
        <div class="nc-title"><span class="nc-bell-icon">🔔</span> NOTIFICATION CENTER</div>
        ${list.length > 0 ? '<button class="nc-clear-all-btn" id="nc-clear-all">Clear All</button>' : ''}
      </div>
      <div class="nc-scroll-area" id="nc-scroll-area">
        ${contentHtml}
      </div>
      <div class="nc-bottom-widget" id="nc-calendar-widget">
        <span class="nc-cal-icon">📅</span>
        <span class="nc-cal-date">${formatCalendarDate()}</span>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    const clearAllBtn = panelEl.querySelector("#nc-clear-all");
    if (clearAllBtn) {
      clearAllBtn.onclick = () => {
        panelEl.classList.add("nc-fade-out");
        setTimeout(() => {
          if (window.notificationBus) window.notificationBus.clearAll();
          panelEl.classList.remove("nc-fade-out");
          render();
        }, 200);
      };
    }

    panelEl.querySelectorAll(".nc-group-close-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const app = btn.getAttribute("data-app");
        if (window.notificationBus) window.notificationBus.clearGroup(app);
        render();
      };
    });

    panelEl.querySelectorAll(".nc-item").forEach(itemEl => {
      itemEl.onclick = () => {
        const id = itemEl.getAttribute("data-id");
        const target = itemEl.getAttribute("data-target");
        if (window.notificationBus) window.notificationBus.markRead(id);
        render();
        if (target && typeof window.openApp === "function") {
          window.openApp(target);
          closeNotificationCenter();
        }
      };
    });
  }

  function openNotificationCenter() {
    if (window.closeControlCenter) window.closeControlCenter();
    createPanel();
    render();
    if (window.notificationBus) window.notificationBus.markAllRead();
    panelEl.classList.add("open");
    isOpen = true;
  }

  function closeNotificationCenter() {
    if (panelEl) panelEl.classList.remove("open");
    isOpen = false;
  }

  function toggleNotificationCenter() {
    if (isOpen) closeNotificationCenter();
    else openNotificationCenter();
  }

  document.addEventListener("click", (e) => {
    if (!isOpen) return;
    if (panelEl && !panelEl.contains(e.target) && !e.target.closest("#topbar-clock") && !e.target.closest(".topbar-clock")) {
      closeNotificationCenter();
    }
  });

  if (window.notificationBus) {
    window.notificationBus.subscribe(() => {
      if (isOpen) render();
    });
  }

  window.openNotificationCenter = openNotificationCenter;
  window.closeNotificationCenter = closeNotificationCenter;
  window.toggleNotificationCenter = toggleNotificationCenter;
  window.notificationCenter = { open: openNotificationCenter, close: closeNotificationCenter, toggle: toggleNotificationCenter };
})();

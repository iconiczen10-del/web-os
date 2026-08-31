/* === FILE: notification-bus.js === */
/**
 * WebOS v0.9.1 Central Notification Bus & State Store
 * Manages notification queue, listeners, unread badge counters, and group keys.
 */
(function () {
  let notifications = [];
  const listeners = [];

  function generateId() {
    return "notif-" + Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 5);
  }

  function getNotifications() {
    return notifications;
  }

  function unreadCount() {
    return notifications.filter(n => !n.read).length;
  }

  function notify(title, description, icon = "🔔", app = "System", targetApp = null) {
    const item = {
      id: generateId(),
      title,
      description,
      icon,
      app,
      targetApp: targetApp || (app ? app.toLowerCase() : null),
      time: new Date(),
      formattedTime: formatTimestamp(new Date()),
      read: false
    };

    notifications.unshift(item);
    if (notifications.length > 40) notifications.pop();

    emitChange();
    return item;
  }

  function formatTimestamp(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    const m = minutes < 10 ? '0' + minutes : minutes;
    return `${h}:${m} ${ampm}`;
  }

  function markRead(id) {
    const item = notifications.find(n => n.id === id);
    if (item) {
      item.read = true;
      emitChange();
    }
  }

  function markAllRead() {
    notifications.forEach(n => n.read = true);
    emitChange();
  }

  function clearGroup(appName) {
    notifications = notifications.filter(n => n.app !== appName);
    emitChange();
  }

  function clearAll() {
    notifications = [];
    emitChange();
  }

  function subscribe(fn) {
    if (typeof fn === "function") {
      listeners.push(fn);
    }
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }

  function emitChange() {
    listeners.forEach(fn => {
      try { fn(notifications, unreadCount()); } catch (err) { console.error(err); }
    });
    if (window.topbarManager && typeof window.topbarManager.updateUnreadBadge === "function") {
      window.topbarManager.updateUnreadBadge(unreadCount());
    }
  }

  // Pre-seed realistic system notifications
  function seedInitialNotifications() {
    if (notifications.length === 0) {
      notify("WebOS v0.9.1 Ready", "Notification & Control Center initialized.", "✨", "System", "settings");
      notify("BoltLink Wi-Fi Connected", "5 GHz Network active @ 250 Mbps", "📶", "Network", "settings");
      notify("Storage Check Passed", "51.9 GB NVMe M.2 SSD available", "💾", "Storage", "settings");
    }
  }

  seedInitialNotifications();

  window.notificationBus = {
    notify,
    getNotifications,
    unreadCount,
    markRead,
    markAllRead,
    clearGroup,
    clearAll,
    subscribe
  };
})();

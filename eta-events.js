/* === FILE: eta-events.js === */
/**
 * WebOS v0.10.0 ETA Event Bus (Stable Service Architecture)
 * Dispatches and listens to download lifecycle events across the OS.
 */
(function () {
  const listeners = {};

  function on(eventName, callback) {
    if (!listeners[eventName]) listeners[eventName] = [];
    listeners[eventName].push(callback);
    return () => off(eventName, callback);
  }

  function off(eventName, callback) {
    if (!listeners[eventName]) return;
    listeners[eventName] = listeners[eventName].filter((cb) => cb !== callback);
  }

  function emit(eventName, data) {
    if (listeners[eventName]) {
      listeners[eventName].forEach((cb) => {
        try { cb(data); } catch (e) { console.error(`[ETA Events] Error in handler for ${eventName}:`, e); }
      });
    }

    // Also dispatch as DOM CustomEvent on window
    try {
      const customEvent = new CustomEvent(eventName, { detail: data });
      window.dispatchEvent(customEvent);
    } catch(e) {}
  }

  window.etaEvents = {
    on,
    off,
    emit,
    EVENTS: {
      STARTED: "download:started",
      PROGRESS: "download:progress",
      PAUSED: "download:paused",
      RESUMED: "download:resumed",
      COMPLETED: "download:completed",
      ERROR: "download:error",
      CANCELLED: "download:cancelled"
    }
  };
})();

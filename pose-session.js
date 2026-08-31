/* === FILE: pose-session.js === */
/**
 * WebOS v0.10.0 POSE Session Serialization & State Engine
 * Manages full OS snapshot, serialization, manual save, restore, and clear.
 */
(function () {
  const CURRENT_OS_VERSION = "v0.10.0";

  function captureSnapshot() {
    const installedApps = typeof window.getInstalledAppIds === "function" ? window.getInstalledAppIds() : [];
    const fsState = window.webosFS && typeof window.webosFS.exportFSState === "function" ? window.webosFS.exportFSState() : null;
    const walletState = window.storeWallet && typeof window.storeWallet.exportWalletState === "function" ? window.storeWallet.exportWalletState() : null;
    const buynetPlan = window.buynetManager && typeof window.buynetManager.getActivePlan === "function" ? window.buynetManager.getActivePlan() : null;
    const notesContent = typeof window.getNotesContent === "function" ? window.getNotesContent() : "";
    const calendarEvents = typeof window.getCalendarEvents === "function" ? window.getCalendarEvents() : {};
    const browserHistory = window.browserNavigation && typeof window.browserNavigation.getHistoryStack === "function" ? window.browserNavigation.getHistoryStack() : null;
    const browserShortcuts = window.browserShortcuts && typeof window.browserShortcuts.exportShortcuts === "function" ? window.browserShortcuts.exportShortcuts() : null;
    const dockOrder = typeof window.getDockOrder === "function" ? window.getDockOrder() : [];
    const desktopEl = document.getElementById("desktop");
    const wallpaper = desktopEl ? desktopEl.style.background : "";

    return {
      version: CURRENT_OS_VERSION,
      savedAt: Date.now(),
      installedApps,
      fsState,
      walletState,
      buynetPlan,
      notesContent,
      calendarEvents,
      browserHistory,
      browserShortcuts,
      dockOrder,
      wallpaper
    };
  }

  function applySnapshot(snapshot) {
    if (!snapshot) return false;
    if (snapshot.version && snapshot.version !== CURRENT_OS_VERSION) {
      return { success: false, incompatible: true, version: snapshot.version };
    }

    if (Array.isArray(snapshot.installedApps) && typeof window.installApp === "function") {
      snapshot.installedApps.forEach(id => {
        try { window.installApp(id, true); } catch(e) {}
      });
    }

    if (snapshot.fsState && window.webosFS && typeof window.webosFS.importFSState === "function") {
      window.webosFS.importFSState(snapshot.fsState);
    }

    if (snapshot.walletState && window.storeWallet && typeof window.storeWallet.importWalletState === "function") {
      window.storeWallet.importWalletState(snapshot.walletState);
    }

    if (typeof window.setNotesContent === "function") {
      window.setNotesContent(snapshot.notesContent || "");
    }

    if (typeof window.setCalendarEvents === "function") {
      window.setCalendarEvents(snapshot.calendarEvents || {});
    }

    if (snapshot.browserHistory && window.browserNavigation && typeof window.browserNavigation.setHistoryStack === "function") {
      window.browserNavigation.setHistoryStack(snapshot.browserHistory);
    }

    if (snapshot.browserShortcuts && window.browserShortcuts && typeof window.browserShortcuts.importShortcuts === "function") {
      window.browserShortcuts.importShortcuts(snapshot.browserShortcuts);
    }

    if (snapshot.wallpaper && typeof window.applyDesktopWallpaper === "function") {
      window.applyDesktopWallpaper(snapshot.wallpaper);
    }

    if (Array.isArray(snapshot.dockOrder) && typeof window.applyDockOrder === "function") {
      window.applyDockOrder(snapshot.dockOrder);
    }

    if (typeof window.renderFinderGrid === "function") window.renderFinderGrid();
    return { success: true };
  }

  async function saveSession() {
    if (!window.webosDB) return { success: false, error: "webosdb not ready" };
    const snapshot = captureSnapshot();
    const meta = { savedAt: snapshot.savedAt, version: CURRENT_OS_VERSION, sizeBytes: JSON.stringify(snapshot).length };
    await window.webosDB.setState("pose-session", snapshot);
    await window.webosDB.setState("pose-meta", meta);
    if (window.notificationBus) {
      window.notificationBus.notify("POSE Saved", "Session snapshot saved to webosdb", "💾", "POSE", "pose");
    }
    return { success: true, meta, snapshot };
  }

  async function restoreSession() {
    if (!window.webosDB) return { success: false, error: "webosdb not ready" };
    const session = await window.webosDB.getState("pose-session");
    if (!session) return { success: false, reason: "No saved session found" };
    const result = applySnapshot(session);
    if (result && result.incompatible) return result;
    if (window.notificationBus) {
      window.notificationBus.notify("POSE Restored", "Session restored from webosdb", "🧠", "POSE", "pose");
    }
    return { success: true, session };
  }

  async function clearSession() {
    if (!window.webosDB) return { success: false };
    await window.webosDB.deleteState("pose-session");
    await window.webosDB.deleteState("pose-meta");
    if (window.notificationBus) {
      window.notificationBus.notify("POSE Cleared", "Saved session removed from webosdb", "🗑️", "POSE", "pose");
    }
    return { success: true };
  }

  async function getSessionMeta() {
    if (!window.webosDB) return null;
    return await window.webosDB.getState("pose-meta");
  }

  async function isPoseActive() {
    if (!window.webosDB) return false;
    const active = await window.webosDB.getState("pose-active");
    return !!active;
  }

  async function setPoseActive(active) {
    if (!window.webosDB) return false;
    await window.webosDB.setState("pose-active", !!active);
    return true;
  }

  window.poseSession = {
    CURRENT_OS_VERSION,
    captureSnapshot,
    applySnapshot,
    saveSession,
    restoreSession,
    clearSession,
    getSessionMeta,
    isPoseActive,
    setPoseActive
  };
})();

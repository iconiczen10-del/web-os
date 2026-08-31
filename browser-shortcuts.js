/* === FILE: browser-shortcuts.js === */
/**
 * WebOS v0.10.0 Browser Shortcuts Engine & Local Persistence
 */
(function () {
  const STORAGE_KEY = "webos_browser_shortcuts";

  function getDefaultList() {
    return window.browserShortcutsData ? window.browserShortcutsData.DEFAULT_SHORTCUTS : [];
  }

  function getShortcuts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed萃 = JSON.parse(raw);
        if (Array.isArray(parsed萃) && parsed萃.length > 0) return parsed萃;
      }
    } catch (e) {}
    return getDefaultList();
  }

  function saveShortcuts(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function addShortcut(shortcut) {
    if (!shortcut || !shortcut.name || !shortcut.url) return null;
    const current = getShortcuts();
    const newEntry = {
      id: "sc_" + Date.now(),
      name: shortcut.name.trim(),
      url: shortcut.url.trim(),
      icon: shortcut.icon ? shortcut.icon.trim() : "🌐",
      category: shortcut.category ? shortcut.category.trim() : "Custom",
      badge: shortcut.badge ? shortcut.badge.trim() : "Link",
      color: shortcut.color || "#0a84ff",
      description: shortcut.description || "User-added web shortcut",
      isDefault: false
    };
    current.push(newEntry);
    saveShortcuts(current);
    return newEntry;
  }

  function removeShortcut(id) {
    const current = getShortcuts();
    const updated = current.filter(item => item.id !== id);
    saveShortcuts(updated);
    return updated;
  }

  function resetShortcuts() {
    const def = getDefaultList();
    saveShortcuts(def);
    return [...def];
  }

  window.browserShortcuts = {
    getShortcuts,
    saveShortcuts,
    addShortcut,
    removeShortcut,
    resetShortcuts,
    exportShortcuts: () => getShortcuts(),
    importShortcuts: (list) => { if (Array.isArray(list)) saveShortcuts(list); }
  };
})();

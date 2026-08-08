/* === FILE: app-notes.js === */
/**
 * WebOS v0.3 Notes Application
 * Full-window note editor with debounced localStorage auto-save persistence.
 */
(function () {
  const STORAGE_KEY = "webos-notes-content";

  window.initNotes = function (windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "8px";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";

    const textarea = document.createElement("textarea");
    textarea.style.background = "transparent";
    textarea.style.border = "none";
    textarea.style.color = "#dddddd";
    textarea.style.fontFamily = "system-ui, -apple-system, sans-serif";
    textarea.style.fontSize = "14px";
    textarea.style.lineHeight = "1.5";
    textarea.style.resize = "none";
    textarea.style.padding = "8px";
    textarea.style.outline = "none";
    textarea.style.width = "100%";
    textarea.style.height = "100%";
    textarea.style.boxSizing = "border-box";
    textarea.placeholder = "Type your notes here...";

    // Restore saved notes from localStorage
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes !== null) {
      textarea.value = savedNotes;
    }

    // Debounced auto-save (300ms)
    let saveTimeout = null;
    textarea.addEventListener("input", () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, textarea.value);
      }, 300);
    });

    contentEl.innerHTML = "";
    contentEl.appendChild(textarea);

    setTimeout(() => textarea.focus(), 50);
  };
})();

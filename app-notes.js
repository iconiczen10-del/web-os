/* === FILE: app-notes.js === */
/**
 * WebOS v0.7 Notes Application
 * In-memory note editor. Starts fresh on boot.
 */
(function () {
  let sessionNotes = "";

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
    textarea.value = sessionNotes;

    textarea.addEventListener("input", () => {
      sessionNotes = textarea.value;
    });

    contentEl.innerHTML = "";
    contentEl.appendChild(textarea);

    setTimeout(() => textarea.focus(), 50);
  };
})();

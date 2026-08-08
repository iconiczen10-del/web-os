/* === FILE: app-terminal.js === */
/**
 * WebOS v0.6 Terminal UI Manager
 */
(function () {
  function initTerminal(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "12px";
    contentEl.style.background = "#0a0a0a";
    contentEl.style.color = "#30d158";
    contentEl.style.fontFamily = "Menlo, Monaco, Consolas, monospace";
    contentEl.style.fontSize = "13px";
    contentEl.style.overflowY = "auto";
    contentEl.style.height = "100%";
    contentEl.style.boxSizing = "border-box";

    let history = [];
    let historyIdx = -1;

    contentEl.innerHTML = `
      <div id="term-output">WebOS Terminal v1.0 — Type 'help' for commands.<br><br></div>
      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="color: #007aff; font-weight: bold;">user@webos:~$</span>
        <input type="text" id="term-input" style="flex: 1; background: transparent; border: none; outline: none; color: #30d158; font-family: inherit; font-size: inherit;" autofocus />
      </div>
    `;

    const outputEl = contentEl.querySelector("#term-output");
    const inputEl = contentEl.querySelector("#term-input");

    inputEl.focus();
    contentEl.addEventListener("click", () => inputEl.focus());

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = inputEl.value;
        inputEl.value = "";
        if (val.trim()) history.push(val);
        historyIdx = history.length;

        if (val.trim().toLowerCase() === "clear") {
          outputEl.innerHTML = "";
          return;
        }

        const res = typeof window.handleTerminalCommand === "function"
          ? window.handleTerminalCommand(val)
          : "";

        outputEl.innerHTML += `<div style="color: #ffffff;"><span style="color: #007aff;">user@webos:~$</span> ${val}</div>`;
        if (res) {
          outputEl.innerHTML += `<pre style="margin: 4px 0 12px; font-family: inherit; white-space: pre-wrap;">${res}</pre>`;
        } else {
          outputEl.innerHTML += `<div style="margin-bottom: 8px;"></div>`;
        }

        contentEl.scrollTop = contentEl.scrollHeight;
      } else if (e.key === "ArrowUp") {
        if (historyIdx > 0) {
          historyIdx--;
          inputEl.value = history[historyIdx];
        }
      } else if (e.key === "ArrowDown") {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          inputEl.value = history[historyIdx];
        } else {
          historyIdx = history.length;
          inputEl.value = "";
        }
      }
    });
  }

  window.initTerminal = initTerminal;
})();

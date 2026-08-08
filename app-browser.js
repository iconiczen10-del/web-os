/* === FILE: app-browser.js === */
/**
 * WebOS v0.6 Web Browser
 */
(function () {
  const PAGES = {
    "webos://home": `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">🌐</div>
        <div style="font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 8px;">WebOS Search</div>
        <div style="font-size: 13px; color: #888; margin-bottom: 20px;">Explore the virtual web inside your browser.</div>
        <input type="text" placeholder="Search the web or type a URL..." style="width: 100%; max-width: 320px; padding: 10px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); color: #fff; font-size: 13px; outline: none;" />
        <div style="display: flex; justify-content: center; gap: 16px; margin-top: 24px; font-size: 13px;">
          <a href="#" class="browser-link" data-url="webos://about" style="color: #007aff; text-decoration: none;">About WebOS</a>
          <a href="#" class="browser-link" data-url="webos://news" style="color: #007aff; text-decoration: none;">Latest Tech News</a>
        </div>
      </div>
    `,
    "webos://about": `
      <div style="padding: 24px; color: #ddd; line-height: 1.6;">
        <h2 style="color: #fff; margin-top: 0;">About WebOS</h2>
        <p>WebOS v0.6 is a web-based desktop environment operating in your browser. Built entirely with modular vanilla JavaScript, CSS, and HTML.</p>
        <p>Features include window management, live hardware monitoring, desktop shortcuts, dock reordering, and a built-in virtual App Store with Mbank payment gateway.</p>
      </div>
    `,
    "webos://news": `
      <div style="padding: 24px; color: #ddd; line-height: 1.6;">
        <h2 style="color: #fff; margin-top: 0;">WebOS v0.6 Released!</h2>
        <div style="font-size: 11px; color: #888; margin-bottom: 12px;">Published August 2026 • Tech Chronicle</div>
        <p>Today marks the official release of WebOS v0.6 featuring the all-new App Store and Mbank virtual payment suite. Users can now purchase and install apps seamlessly.</p>
      </div>
    `
  };

  function initBrowser(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";
    contentEl.style.background = "#18181f";

    let historyStack = ["webos://home"];
    let historyIdx = 0;

    function render() {
      const currentUrl = historyStack[historyIdx] || "webos://home";
      const pageHtml = PAGES[currentUrl] || `<div style="padding: 30px; text-align: center; color: #ff453a;">404 Page Not Found: ${currentUrl}</div>`;

      contentEl.innerHTML = `
        <div style="padding: 8px 12px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 8px;">
          <button id="br-back" style="background: none; border: none; color: ${historyIdx > 0 ? '#fff' : '#555'}; cursor: pointer; font-size: 14px;">◀</button>
          <button id="br-forward" style="background: none; border: none; color: ${historyIdx < historyStack.length - 1 ? '#fff' : '#555'}; cursor: pointer; font-size: 14px;">▶</button>
          <button id="br-refresh" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 14px;">🔄</button>
          <input type="text" id="br-url" value="${currentUrl}" style="flex: 1; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: #fff; font-size: 12px; outline: none;" />
        </div>
        <div style="flex: 1; overflow-y: auto;" id="br-viewport">
          ${pageHtml}
        </div>
      `;

      contentEl.querySelector("#br-back").addEventListener("click", () => {
        if (historyIdx > 0) { historyIdx--; render(); }
      });
      contentEl.querySelector("#br-forward").addEventListener("click", () => {
        if (historyIdx < historyStack.length - 1) { historyIdx++; render(); }
      });
      contentEl.querySelector("#br-refresh").addEventListener("click", render);

      const urlInput = contentEl.querySelector("#br-url");
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          let val = urlInput.value.trim();
          if (!val.startsWith("webos://")) val = "webos://" + val;
          historyStack = historyStack.slice(0, historyIdx + 1);
          historyStack.push(val);
          historyIdx++;
          render();
        }
      });

      contentEl.querySelectorAll(".browser-link").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetUrl = link.getAttribute("data-url");
          historyStack = historyStack.slice(0, historyIdx + 1);
          historyStack.push(targetUrl);
          historyIdx++;
          render();
        });
      });
    }

    render();
  }

  window.initBrowser = initBrowser;
})();

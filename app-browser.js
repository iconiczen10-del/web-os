/* === FILE: app-browser.js === */
/**
 * WebOS v0.7 System Browser Application
 */
(function () {
  function initBrowser(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";
    contentEl.style.background = "#18181f";

    contentEl.innerHTML = `
      <div style="padding: 6px 10px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 8px;">
        <button id="br-back" style="background: none; border: none; color: #555; cursor: pointer; font-size: 13px;" title="Back">◀</button>
        <button id="br-forward" style="background: none; border: none; color: #555; cursor: pointer; font-size: 13px;" title="Forward">▶</button>
        <button id="br-refresh" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 13px;" title="Refresh">🔄</button>
        <input type="text" id="br-url" style="flex: 1; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.3); color: #fff; font-size: 12px; outline: none;" />
        <button id="br-go" style="background: #0a84ff; border: none; color: #fff; border-radius: 6px; padding: 5px 10px; font-weight: 600; cursor: pointer; font-size: 12px;">Go</button>
      </div>
      <div id="br-bookmarks-container"></div>
      <div style="flex: 1; overflow-y: auto;" id="br-viewport"></div>
      <div id="br-statusbar" style="padding: 4px 12px; background: rgba(0,0,0,0.4); border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #8e8e93; display: flex; justify-content: space-between; align-items: center;">
        <span id="br-sb-plan">ISP: BUYNET Starter (10 Mbps)</span>
        <span id="br-sb-status" style="color: #30d158;">🟢 Connected</span>
      </div>
    `;

    const backBtn = contentEl.querySelector("#br-back");
    const forwardBtn = contentEl.querySelector("#br-forward");
    const refreshBtn = contentEl.querySelector("#br-refresh");
    const urlInput = contentEl.querySelector("#br-url");
    const goBtn = contentEl.querySelector("#br-go");
    const bmContainer = contentEl.querySelector("#br-bookmarks-container");
    const viewportEl = contentEl.querySelector("#br-viewport");
    const planSb = contentEl.querySelector("#br-sb-plan");

    function updateStatusBar() {
      if (!planSb) return;
      const speed = window.buynetManager ? window.buynetManager.getInternetSpeed() : 10;
      const activePlan = window.buynetManager ? window.buynetManager.getActivePlan() : null;
      const planName = activePlan ? activePlan.name : "Free Starter";
      planSb.textContent = `ISP: BUYNET ${planName} (${speed >= 1000 ? (speed/1000) + ' Gbps' : speed + ' Mbps'})`;
    }

    function navigateTo(rawUrl) {
      const nav = window.browserNavigation;
      const url = nav ? nav.navigate(rawUrl) : rawUrl;

      if (urlInput) urlInput.value = url;

      if (backBtn && nav) backBtn.style.color = nav.canGoBack() ? "#ffffff" : "#555555";
      if (forwardBtn && nav) forwardBtn.style.color = nav.canGoForward() ? "#ffffff" : "#555555";

      if (window.browserRenderer) {
        window.browserRenderer.renderPage(viewportEl, url, navigateTo);
      }
      updateStatusBar();
    }

    if (window.browserBookmarks && bmContainer) {
      window.browserBookmarks.renderBookmarksBar(bmContainer, navigateTo);
    }

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.browserNavigation) {
          const prev = window.browserNavigation.goBack();
          if (prev) navigateTo(prev);
        }
      });
    }

    if (forwardBtn) {
      forwardBtn.addEventListener("click", () => {
        if (window.browserNavigation) {
          const next = window.browserNavigation.goForward();
          if (next) navigateTo(next);
        }
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        const cur = window.browserNavigation ? window.browserNavigation.getCurrentUrl() : "webos://home";
        navigateTo(cur);
      });
    }

    function handleUrlSubmit() {
      if (urlInput) navigateTo(urlInput.value);
    }

    if (goBtn) goBtn.addEventListener("click", handleUrlSubmit);
    if (urlInput) {
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleUrlSubmit();
      });
    }

    const initialUrl = window.browserNavigation ? window.browserNavigation.getCurrentUrl() : "webos://home";
    navigateTo(initialUrl);

    // Status bar interval
    if (windowEl._browserSbInterval) clearInterval(windowEl._browserSbInterval);
    windowEl._browserSbInterval = setInterval(updateStatusBar, 3000);
  }

  window.initBrowser = initBrowser;
})();

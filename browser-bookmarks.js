/* === FILE: browser-bookmarks.js === */
/**
 * WebOS v0.7 Browser Bookmarks Manager
 */
(function () {
  const DEFAULT_BOOKMARKS = [
    { name: "Home", url: "webos://home", icon: "🏠" },
    { name: "Mbank", url: "www.mbank.webos", icon: "🏦" },
    { name: "BUYNET", url: "www.buynet.webos", icon: "📡" },
    { name: "Papers For PC", url: "www.papersforpc.webos", icon: "🖼️" },
    { name: "AI Talks", url: "www.aitalks.webos", icon: "🤖" },
    { name: "Store", url: "www.store.webos", icon: "🛒" },
    { name: "Search", url: "webos://search", icon: "🔍" }
  ];

  function getBookmarks() {
    return DEFAULT_BOOKMARKS;
  }

  function renderBookmarksBar(containerEl, onNavigate) {
    if (!containerEl) return;
    const bookmarks = getBookmarks();

    containerEl.innerHTML = "";
    containerEl.className = "browser-bookmarks-bar";
    containerEl.style.display = "flex";
    containerEl.style.alignItems = "center";
    containerEl.style.gap = "6px";
    containerEl.style.padding = "4px 12px";
    containerEl.style.background = "rgba(0, 0, 0, 0.2)";
    containerEl.style.borderBottom = "1px solid rgba(255, 255, 255, 0.06)";
    containerEl.style.overflowX = "auto";

    bookmarks.forEach((bm) => {
      const btn = document.createElement("button");
      btn.className = "browser-bm-btn";
      btn.innerHTML = `<span style="margin-right: 4px;">${bm.icon}</span><span>${bm.name}</span>`;
      btn.style.background = "rgba(255, 255, 255, 0.06)";
      btn.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      btn.style.borderRadius = "4px";
      btn.style.color = "#d1d5db";
      btn.style.fontSize = "11px";
      btn.style.padding = "3px 8px";
      btn.style.cursor = "pointer";
      btn.style.whiteSpace = "nowrap";

      btn.addEventListener("mouseenter", () => {
        btn.style.background = "rgba(255, 255, 255, 0.12)";
        btn.style.color = "#ffffff";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.background = "rgba(255, 255, 255, 0.06)";
        btn.style.color = "#d1d5db";
      });

      btn.addEventListener("click", () => {
        if (typeof onNavigate === "function") {
          onNavigate(bm.url);
        }
      });

      containerEl.appendChild(btn);
    });
  }

  window.browserBookmarks = {
    getBookmarks,
    renderBookmarksBar
  };
})();

/* === FILE: browser-navigation.js === */
/**
 * WebOS v0.7 Browser Navigation & History Stack Engine
 * Session-only history stack. Resets on boot.
 */
(function () {
  let historyStack = ["webos://home"];
  let historyIdx = 0;

  function normalizeUrl(rawUrl) {
    if (!rawUrl) return "webos://home";
    let url = rawUrl.trim();
    if (url === "home") return "webos://home";
    if (url === "about") return "webos://about";
    if (url === "news" || url === "news.webos" || url === "www.news.webos") return "webos://news";
    if (url === "mbank" || url === "mbank.webos") return "www.mbank.webos";
    if (url === "buynet" || url === "buynet.webos") return "www.buynet.webos";
    if (url === "dev" || url === "dev.webos") return "www.dev.webos";
    if (url === "store" || url === "store.webos") return "www.store.webos";
    if (url === "webtube" || url === "webtube.webos") return "www.webtube.webos";
    if (url === "dmanager" || url === "dmanager.webos") return "www.dmanager.webos";
    if (url === "community" || url === "communitypcs" || url === "communitypcs.webos") return "www.communitypcs.webos";
    if (url === "papersforpc" || url === "papersforpc.webos") return "www.papersforpc.webos";
    if (url === "aitalks" || url === "aitalks.webos") return "www.aitalks.webos";

    if (!url.startsWith("webos://") && !url.startsWith("www.") && !url.startsWith("http")) {
      if (url.includes(".") || url.endsWith(".webos")) {
        url = "www." + url.replace(/^www\./, "");
      } else {
        url = "webos://search?q=" + encodeURIComponent(url);
      }
    }
    return url;
  }

  function navigate(rawUrl) {
    const url = normalizeUrl(rawUrl);
    if (historyStack[historyIdx] === url) return url;

    historyStack = historyStack.slice(0, historyIdx + 1);
    historyStack.push(url);
    if (historyStack.length > 50) historyStack.shift();
    historyIdx = historyStack.length - 1;
    return url;
  }

  function goBack() {
    if (historyIdx > 0) {
      historyIdx--;
      return historyStack[historyIdx];
    }
    return null;
  }

  function goForward() {
    if (historyIdx < historyStack.length - 1) {
      historyIdx++;
      return historyStack[historyIdx];
    }
    return null;
  }

  function getCurrentUrl() {
    return historyStack[historyIdx] || "webos://home";
  }

  function canGoBack() {
    return historyIdx > 0;
  }

  function canGoForward() {
    return historyIdx < historyStack.length - 1;
  }

  window.browserNavigation = {
    normalizeUrl,
    navigate,
    goBack,
    goForward,
    getCurrentUrl,
    canGoBack,
    canGoForward
  };
})();

/* === FILE: aitalks-tracker.js === */
/**
 * AI Talks Website Tab Visit Tracker for Max AI Database Verification
 */
(function () {
  const REQUIRED_TABS = ["home", "about", "products", "blog", "contact"];
  let visitedTabs = ["home"]; // Home is visited by default when visiting www.aitalks.webos

  function markTabVisited(tabName) {
    if (!tabName) return;
    const clean = tabName.toLowerCase().replace(/^\//, "").trim() || "home";
    if (REQUIRED_TABS.includes(clean) && !visitedTabs.includes(clean)) {
      visitedTabs.push(clean);
    }
  }

  function hasVisitedAll() {
    return REQUIRED_TABS.every(t => visitedTabs.includes(t));
  }

  function getVisitedTabs() {
    return [...visitedTabs];
  }

  function getMissingTabs() {
    return REQUIRED_TABS.filter(t => !visitedTabs.includes(t));
  }

  function getRequiredTabs() {
    return [...REQUIRED_TABS];
  }

  window.aitalksTracker = {
    markTabVisited,
    hasVisitedAll,
    getVisitedTabs,
    getMissingTabs,
    getRequiredTabs
  };
})();

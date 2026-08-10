/* === FILE: settings-metrics-data.js === */
/**
 * WebOS v0.7.2.2 Hardcoded System Metrics Overview Data
 */
(function () {
  window.systemMetrics = window.systemMetrics || {};

  window.systemMetrics.overview = {
    totalFiles: 138,
    totalLines: 12042,
    htmlFiles: 3,
    cssFiles: 41,
    jsFiles: 94,
    avgLinesPerFile: 87,
    largestFile: { name: "browser-renderer.js", lines: 148, type: "JS", group: "Browser" },
    smallestFile: { name: "desktop.js", lines: 22, type: "JS", group: "Core System" }
  };
})();

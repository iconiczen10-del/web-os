/* === FILE: settings-metrics-files.js === */
/**
 * WebOS v0.7.2.2 System Metrics Full File List Helper
 */
(function () {
  window.systemMetrics = window.systemMetrics || {};

  const groups = window.systemMetrics.fileGroups || [];
  const filesList = [];

  groups.forEach((group) => {
    (group.files || []).forEach((f) => {
      filesList.push({
        name: f.name,
        lines: f.lines,
        type: f.type,
        group: group.name
      });
    });
  });

  // Sort alphabetically by file name
  filesList.sort((a, b) => a.name.localeCompare(b.name));

  window.systemMetrics.allFiles = filesList;
})();

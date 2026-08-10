/* === FILE: settings-changelog-data.js === */
/**
 * WebOS Master Changelog Data Combiner
 */
(function () {
  const late = window.CHANGELOG_LATE || [];
  const early = window.CHANGELOG_EARLY || [];
  const combined = [...late, ...early];

  window.CHANGELOG_DATA = combined;
  window.changelogData = combined;
})();

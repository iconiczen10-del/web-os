/* === FILE: settings-changelog-data.js === */
/**
 * WebOS Master Changelog Data Combiner
 */
(function () {
  const v74 = window.CHANGELOG_V74 || [];
  const late = window.CHANGELOG_LATE || [];
  const early = window.CHANGELOG_EARLY || [];
  const combined = [...v74, ...late, ...early];

  window.CHANGELOG_DATA = combined;
  window.changelogData = combined;
})();

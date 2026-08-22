/* === FILE: settings-changelog-data.js === */
/**
 * WebOS Master Changelog Data Combiner
 */
(function () {
  const v83 = window.CHANGELOG_V83 || [];
  const v82 = window.CHANGELOG_V82 || [];
  const v81 = window.CHANGELOG_V81 || [];
  const v80 = window.CHANGELOG_V80 || [];
  const v74 = window.CHANGELOG_V74 || [];
  const late = window.CHANGELOG_LATE || [];
  const early = window.CHANGELOG_EARLY || [];
  const combined = [...v83, ...v82, ...v81, ...v80, ...v74, ...late, ...early];

  window.CHANGELOG_DATA = combined;
  window.changelogData = combined;
})();

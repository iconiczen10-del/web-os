/* === FILE: settings-changelog-data.js === */
/**
 * WebOS Master Changelog Data Combiner
 */
(function () {
  const v100 = window.CHANGELOG_V100 || [];
  const v921 = window.CHANGELOG_V921 || [];
  const v92 = window.CHANGELOG_V92 || [];
  const v91 = window.CHANGELOG_V91 || [];
  const v90 = window.CHANGELOG_V90 || [];
  const v83 = window.CHANGELOG_V83 || [];
  const v82 = window.CHANGELOG_V82 || [];
  const v81 = window.CHANGELOG_V81 || [];
  const v80 = window.CHANGELOG_V80 || [];
  const v74 = window.CHANGELOG_V74 || [];
  const late = window.CHANGELOG_LATE || [];
  const early = window.CHANGELOG_EARLY || [];
  const combined = [...v100, ...v921, ...v92, ...v91, ...v90, ...v83, ...v82, ...v81, ...v80, ...v74, ...late, ...early];

  window.CHANGELOG_DATA = combined;
  window.changelogData = combined;
})();

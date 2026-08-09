/* === FILE: monitor-alerts.js === */
/**
 * WebOS v0.7.1.1 Monitor Resource Alert System
 */
(function () {
  let cpuHighStreak = 0;
  let gpuHighStreak = 0;

  function evaluateAlerts(totals) {
    const { cpu, ram, gpu } = totals;
    const ramGB = (ram / 1024).toFixed(1);

    if (cpu > 80) cpuHighStreak++; else cpuHighStreak = 0;
    if (gpu > 80) gpuHighStreak++; else gpuHighStreak = 0;

    // Critical check (>95%)
    if (cpu >= 95 || (ram / 1024) >= 7.6 || gpu >= 95) {
      let detail = "CPU";
      if (gpu >= 95) detail = "GPU";
      if ((ram / 1024) >= 7.6) detail = "Memory";
      return {
        level: "critical",
        message: `🔴 Critical: ${detail} resource at limit!`
      };
    }

    // High RAM (>7GB)
    if (ram >= 7168) {
      return {
        level: "warning",
        message: `⚠️ High memory usage (${ramGB}/8 GB)`
      };
    }

    // High CPU (3+ checks = ~1.5s - 3s)
    if (cpuHighStreak >= 3) {
      return {
        level: "warning",
        message: `⚠️ High CPU usage detected (${cpu}%)`
      };
    }

    // High GPU (3+ checks)
    if (gpuHighStreak >= 3) {
      return {
        level: "warning",
        message: `⚠️ High GPU usage detected (${gpu}%)`
      };
    }

    return null;
  }

  function renderAlertBanner(containerEl, alertObj) {
    let bannerEl = containerEl.querySelector(".monitor-alert-banner");
    if (!alertObj) {
      if (bannerEl) bannerEl.remove();
      return;
    }

    if (!bannerEl) {
      bannerEl = document.createElement("div");
      bannerEl.className = "monitor-alert-banner";
      containerEl.appendChild(bannerEl);
    }

    bannerEl.className = `monitor-alert-banner mon-alert-${alertObj.level}`;
    bannerEl.textContent = alertObj.message;
  }

  window.monitorAlerts = {
    evaluateAlerts,
    renderAlertBanner
  };
})();

/* === FILE: eta-core.js === */
/**
 * WebOS v0.10.0 ETA System Core Download Engine (SSA)
 * Central intelligent download manager for apps, updates, files, drivers, and POSE.
 */
(function () {
  const activeDownloads = new Map();

  function formatTime(seconds) {
    const s = Math.max(0, Math.round(seconds));
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const remS = s % 60;
    if (m < 60) return `${m}m ${remS}s`;
    const h = Math.floor(m / 60);
    const remM = m % 60;
    return `${h}h ${remM}m ${remS}s`;
  }

  function executeDownload(request) {
    const id = request.id || "dl-" + Date.now();
    const sizeMB = Number(request.size || request.sizeMB || 50);
    const speedInfo = window.etaSpeed ? window.etaSpeed.getCurrentSpeed() : { speedMBps: 1.25 };
    const baseSpeed = Math.max(0.05, speedInfo.speedMBps);

    const task = {
      id,
      name: request.name || "Download",
      icon: request.icon || "📦",
      sizeMB,
      currentMB: 0,
      progress: 0,
      speedMBps: baseSpeed,
      etaSeconds: sizeMB / baseSpeed,
      isPaused: false,
      timer: null,
      request
    };

    activeDownloads.set(id, task);
    if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.STARTED, task);

    const tickIntervalMs = 250;
    task.timer = setInterval(() => {
      if (task.isPaused) return;

      const jitter = 0.9 + Math.random() * 0.2; // ±10% jitter
      const currentSpeed = baseSpeed * jitter;
      task.speedMBps = currentSpeed;

      const increment = (currentSpeed * (tickIntervalMs / 1000));
      task.currentMB = Math.min(sizeMB, task.currentMB + increment);
      task.progress = Math.min(100, (task.currentMB / sizeMB) * 100);

      const remainingMB = Math.max(0, sizeMB - task.currentMB);
      task.etaSeconds = currentSpeed > 0 ? remainingMB / currentSpeed : 9999;

      if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.PROGRESS, task);

      if (task.currentMB >= sizeMB) {
        clearInterval(task.timer);
        activeDownloads.delete(id);

        if (window.etaIntegrity) {
          window.etaIntegrity.verifyPayload(request).then(() => {
            if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.COMPLETED, task);
            if (typeof request.onComplete === "function") request.onComplete(task);
          });
        } else {
          if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.COMPLETED, task);
          if (typeof request.onComplete === "function") request.onComplete(task);
        }
      }
    }, tickIntervalMs);

    return task;
  }

  function pauseDownload(id) {
    const task = activeDownloads.get(id);
    if (task && !task.isPaused) {
      task.isPaused = true;
      if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.PAUSED, task);
    }
  }

  function resumeDownload(id) {
    const task = activeDownloads.get(id);
    if (task && task.isPaused) {
      task.isPaused = false;
      if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.RESUMED, task);
    }
  }

  function cancelDownload(id) {
    const task = activeDownloads.get(id);
    if (task) {
      clearInterval(task.timer);
      activeDownloads.delete(id);
      if (window.etaEvents) window.etaEvents.emit(window.etaEvents.EVENTS.CANCELLED, task);
      if (task.request && typeof task.request.onCancel === "function") task.request.onCancel();
    }
  }

  function startDownload(request) {
    if (!request) return;
    if (window.etaUI && typeof window.etaUI.showAnalysisPanel === "function") {
      window.etaUI.showAnalysisPanel(request, () => executeDownload(request));
    } else {
      executeDownload(request);
    }
  }

  function getActiveDownloads() {
    return Array.from(activeDownloads.values());
  }

  window.etaCore = {
    startDownload,
    executeDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    getActiveDownloads,
    formatTime
  };
})();

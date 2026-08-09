/* === FILE: app-dispatcher.js === */
/**
 * WebOS v0.6 Application Initializer Dispatcher
 */
(function () {
  const APP_INITIALIZERS = {
    finder: "initFinder",
    notes: "initNotes",
    calculator: "initCalculator",
    settings: "initSettings",
    monitor: "initMonitor",
    store: "initStore",
    weather: "initWeather",
    terminal: "initTerminal",
    music: "initMusic",
    paint: "initPaint",
    clock: "initClock",
    browser: "initBrowser",
    calendar: "initCalendar",
    gamecenter: "initGameCenter",
    videoeditor: "initVideoEditor",
    wallpapers: "initWallpapers"
  };

  function dispatchAppInit(appName, winContainer) {
    const fnName = APP_INITIALIZERS[appName];
    if (fnName && typeof window[fnName] === "function") {
      window[fnName](winContainer);
    } else {
      const content = winContainer.querySelector(".window-content");
      if (content) {
        content.innerHTML = `<div style="padding: 20px; color: #fff;">Application '${appName}' initialized.</div>`;
      }
    }
  }

  window.dispatchAppInit = dispatchAppInit;
})();

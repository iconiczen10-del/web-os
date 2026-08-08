/* === FILE: app-clock.js === */
/**
 * WebOS v0.6 World Clock App
 */
(function () {
  const CLOCKS = [
    { city: "Local Time", timeZone: undefined },
    { city: "UTC", timeZone: "UTC" },
    { city: "New York", timeZone: "America/New_York" },
    { city: "Tokyo", timeZone: "Asia/Tokyo" }
  ];

  function initClock(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "16px";
    contentEl.style.background = "#141419";
    contentEl.style.color = "#ffffff";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";

    function updateClocks() {
      const now = new Date();
      contentEl.innerHTML = `
        <div style="font-size: 16px; font-weight: 600; color: #aaa; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">World Clocks</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; flex: 1;">
          ${CLOCKS.map(c => {
            const timeStr = now.toLocaleTimeString("en-US", { timeZone: c.timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const dateStr = now.toLocaleDateString("en-US", { timeZone: c.timeZone, weekday: 'short', month: 'short', day: 'numeric' });
            return `
              <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; justify-content: center;">
                <div style="font-size: 13px; color: #007aff; font-weight: 600; margin-bottom: 4px;">${c.city}</div>
                <div style="font-size: 22px; font-weight: 700; font-family: monospace;">${timeStr}</div>
                <div style="font-size: 11px; color: #888; margin-top: 4px;">${dateStr}</div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    windowEl._clockInterval = interval;
  }

  window.initClock = initClock;
})();

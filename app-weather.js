/* === FILE: app-weather.js === */
/**
 * WebOS v0.6 Weather App
 */
(function () {
  function initWeather(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "20px";
    contentEl.style.color = "#ffffff";
    contentEl.style.background = "linear-gradient(180deg, #1c3c6d 0%, #0d1b2a 100%)";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";
    contentEl.style.alignItems = "center";
    contentEl.style.justifyContent = "center";

    contentEl.innerHTML = `
      <div style="font-size: 16px; font-weight: 500; color: #a0c4ff;">San Francisco</div>
      <div style="font-size: 64px; margin: 10px 0;">☀️</div>
      <div style="font-size: 48px; font-weight: 700; line-height: 1;">72°F</div>
      <div style="font-size: 14px; color: #e0e1dd; margin-top: 6px;">Sunny • H: 76° L: 58°</div>
      
      <div style="display: flex; gap: 16px; margin-top: 24px; width: 100%; max-width: 280px; justify-content: space-between; background: rgba(255,255,255,0.08); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center;">
          <div style="font-size: 12px; color: #aaa;">MON</div>
          <div style="font-size: 20px; margin: 4px 0;">🌤️</div>
          <div style="font-size: 12px; font-weight: 600;">74°</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 12px; color: #aaa;">TUE</div>
          <div style="font-size: 20px; margin: 4px 0;">⛅</div>
          <div style="font-size: 12px; font-weight: 600;">68°</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 12px; color: #aaa;">WED</div>
          <div style="font-size: 20px; margin: 4px 0;">☀️</div>
          <div style="font-size: 12px; font-weight: 600;">77°</div>
        </div>
      </div>
    `;
  }

  window.initWeather = initWeather;
})();

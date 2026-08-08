/* === FILE: app-gamecenter.js === */
/**
 * WebOS v0.6 Game Center Hub (Paid App)
 */
(function () {
  function initGameCenter(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "16px";
    contentEl.style.background = "#121824";
    contentEl.style.color = "#ffffff";
    contentEl.style.overflowY = "auto";

    contentEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.05); padding: 14px; border-radius: 12px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.08);">
        <div style="font-size: 36px; background: #007aff; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">👤</div>
        <div>
          <div style="font-size: 16px; font-weight: 700;">PlayerOne</div>
          <div style="font-size: 12px; color: #30d158; margin-top: 2px;">Level 12 • Pro Gamer</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px;">
        <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700; color: #007aff;">42</div>
          <div style="font-size: 10px; color: #888;">GAMES</div>
        </div>
        <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700; color: #ff9f0a;">18/50</div>
          <div style="font-size: 10px; color: #888;">TROPHIES</div>
        </div>
        <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700; color: #af52de;">7</div>
          <div style="font-size: 10px; color: #888;">FRIENDS</div>
        </div>
      </div>

      <div style="font-size: 13px; font-weight: 600; color: #aaa; margin-bottom: 8px;">GLOBAL LEADERBOARD</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 8px 12px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px;">
          <span>🥇 CyberNinja</span><span style="color: #30d158; font-weight: 600;">99,420 pts</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px;">
          <span>🥈 PlayerOne (You)</span><span style="color: #30d158; font-weight: 600;">84,100 pts</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 12px;">
          <span>🥉 PixelKing</span><span style="color: #30d158; font-weight: 600;">72,550 pts</span>
        </div>
      </div>

      <div style="font-size: 13px; font-weight: 600; color: #aaa; margin-bottom: 8px;">UPCOMING RELEASES</div>
      <div style="font-size: 12px; color: #888; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
        🕹️ Space Racer 2000 — Coming Q4 2026<br>
        ⚔️ WebOS Quest — Coming Q1 2027
      </div>
    `;
  }

  window.initGameCenter = initGameCenter;
})();

/* === FILE: app-videoeditor.js === */
/**
 * WebOS v0.6 Video Editor (Paid App)
 */
(function () {
  function initVideoEditor(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "12px";
    contentEl.style.background = "#141418";
    contentEl.style.color = "#ffffff";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";
    contentEl.style.height = "100%";

    contentEl.innerHTML = `
      <div style="display: flex; gap: 8px; margin-bottom: 10px; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 8px;">
        <button class="ve-btn" data-action="cut" style="padding: 6px 10px; border-radius: 4px; border: none; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; cursor: pointer;">✂️ Cut</button>
        <button class="ve-btn" data-action="copy" style="padding: 6px 10px; border-radius: 4px; border: none; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; cursor: pointer;">📋 Copy</button>
        <button class="ve-btn" data-action="paste" style="padding: 6px 10px; border-radius: 4px; border: none; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; cursor: pointer;">📌 Paste</button>
        <button class="ve-btn" data-action="undo" style="padding: 6px 10px; border-radius: 4px; border: none; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; cursor: pointer;">⏪ Undo</button>
        <button class="ve-btn" data-action="redo" style="padding: 6px 10px; border-radius: 4px; border: none; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; cursor: pointer;">⏩ Redo</button>
      </div>

      <div style="flex: 1; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.1);" id="ve-preview">
        <div style="text-align: center;">
          <div style="font-size: 48px; cursor: pointer;" id="ve-play-btn">▶️</div>
          <div style="font-size: 12px; color: #888; margin-top: 6px;">WebOS Studio Preview • 1080p 60fps</div>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
        <div style="font-size: 11px; color: #aaa; margin-bottom: 6px; font-weight: 600;">TIMELINE TRACKS</div>
        <div style="display: flex; gap: 6px; height: 36px;">
          <div style="flex: 2; background: #007aff; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600;">Clip 01 (Intro)</div>
          <div style="flex: 3; background: #af52de; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600;">Clip 02 (Main)</div>
          <div style="flex: 1; background: #ff9f0a; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600;">Outro</div>
        </div>
      </div>
    `;

    let isPlaying = false;
    const playBtn = contentEl.querySelector("#ve-play-btn");
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? "⏸️" : "▶️";
    });

    contentEl.querySelectorAll(".ve-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        console.log(`Video Editor Action: ${action}`);
      });
    });
  }

  window.initVideoEditor = initVideoEditor;
})();

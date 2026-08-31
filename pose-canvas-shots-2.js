/* === FILE: pose-canvas-shots-2.js === */
/**
 * WebOS v0.10.0 POSE Canvas Screenshot Renderers (Part 2: Shots 4 & 5 + Public Dispatcher)
 */
(function () {
  function drawWindowChrome(ctx, w, h, title) {
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, w, 28);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, w, h);

    ctx.fillStyle = "#ff5f56"; ctx.beginPath(); ctx.arc(14, 14, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffbd2e"; ctx.beginPath(); ctx.arc(28, 14, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#27c93f"; ctx.beginPath(); ctx.arc(42, 14, 4.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#8b949e";
    ctx.font = "bold 10px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title || "POSE", w / 2, 18);
  }

  function drawShot4_Deactivated(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    drawWindowChrome(ctx, w, h, "POSE · Deactivated / Ephemeral Mode");

    ctx.fillStyle = "#8e8e93";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ECOSYSTEM PERSISTENCE DISABLED", w / 2, 60);

    ctx.fillStyle = "rgba(255, 69, 58, 0.08)";
    ctx.fillRect(30, 78, w - 60, 52);
    ctx.strokeStyle = "rgba(255, 69, 58, 0.3)";
    ctx.strokeRect(30, 78, w - 60, 52);

    ctx.fillStyle = "#ff453a";
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.fillText("⚠️ Ephemeral Boot Policy Active", w / 2, 96);
    ctx.fillStyle = "#d1d5db";
    ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("Page refresh will wipe system to fresh v0.7 defaults.", w / 2, 114);

    ctx.fillStyle = "#0a84ff";
    ctx.fillRect(w / 2 - 75, 145, 150, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px system-ui, sans-serif";
    ctx.fillText("Activate on Tyfon Inc.", w / 2, 161);
  }

  function drawShot5_VersionConflict(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    drawWindowChrome(ctx, w, h, "POSE · Version Incompatibility (Option 3)");

    ctx.fillStyle = "#ff453a";
    ctx.font = "24px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("❌", w / 2, 60);

    ctx.fillStyle = "#ff453a";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText("Incompatible Session Detected", w / 2, 82);

    ctx.fillStyle = "#c9d1d9";
    ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("POSE save was created on v0.10.0", w / 2, 102);
    ctx.fillText("Current OS Version: v0.10.1", w / 2, 116);
    ctx.fillStyle = "#8b949e";
    ctx.fillText("This save cannot be used with newer kernel architecture.", w / 2, 134);

    ctx.fillStyle = "#0a84ff";
    ctx.fillRect(w / 2 - 50, 152, 100, 24);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px system-ui, sans-serif";
    ctx.fillText("Start Fresh", w / 2, 168);
  }

  function drawPoseShot(canvasEl, shotId) {
    if (!canvasEl) return;
    const canvas = canvasEl;
    if (!canvas.width) canvas.width = 360;
    if (!canvas.height) canvas.height = 220;

    switch (shotId) {
      case "shot1":
      case 1:
        if (window.poseCanvasShots1) window.poseCanvasShots1.drawShot1_Dashboard(canvas);
        break;
      case "shot2":
      case 2:
        if (window.poseCanvasShots1) window.poseCanvasShots1.drawShot2_SaveProgress(canvas);
        break;
      case "shot3":
      case 3:
        if (window.poseCanvasShots1) window.poseCanvasShots1.drawShot3_RestoreSession(canvas);
        break;
      case "shot4":
      case 4:
        drawShot4_Deactivated(canvas);
        break;
      case "shot5":
      case 5:
        drawShot5_VersionConflict(canvas);
        break;
      default:
        if (window.poseCanvasShots1) window.poseCanvasShots1.drawShot1_Dashboard(canvas);
        break;
    }
  }

  window.drawPoseShot = drawPoseShot;
  window.poseCanvasShots = { drawPoseShot };
})();

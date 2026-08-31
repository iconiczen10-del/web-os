/* === FILE: pose-canvas-shots-1.js === */
/**
 * WebOS v0.10.0 POSE Canvas Screenshot Renderers (Part 1: Shots 1 - 3)
 * Renders authentic 2D vector mockups of POSE states for Tyfon website showcase.
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

    // Window control dots
    ctx.fillStyle = "#ff5f56"; ctx.beginPath(); ctx.arc(14, 14, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffbd2e"; ctx.beginPath(); ctx.arc(28, 14, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#27c93f"; ctx.beginPath(); ctx.arc(42, 14, 4.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#8b949e";
    ctx.font = "bold 10px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title || "POSE Ecosystem v1", w / 2, 18);
  }

  function drawShot1_Dashboard(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    drawWindowChrome(ctx, w, h, "POSE Ecosystem v1 · Active");

    // Header
    ctx.font = "18px system-ui";
    ctx.fillText("🧠", 24, 54);
    ctx.fillStyle = "#58a6ff";
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("POSE v1 by Tyfon Inc.", 48, 50);
    ctx.fillStyle = "#00ffaa";
    ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("● ACTIVE (webosdb)", 48, 63);

    // Metrics boxes
    const metrics = [
      { k: "VERSION", v: "v0.10.0" },
      { k: "LAST SAVED", v: "Today 12:45" },
      { k: "STORAGE", v: "1.4 KB" },
      { k: "TARGET", v: "IndexedDB" }
    ];
    metrics.forEach((m, idx) => {
      const bx = 16 + idx * 82;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(bx, 76, 76, 38);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(bx, 76, 76, 38);
      ctx.fillStyle = "#8b949e";
      ctx.font = "8px system-ui, sans-serif";
      ctx.fillText(m.k, bx + 6, 88);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px system-ui, sans-serif";
      ctx.fillText(m.v, bx + 6, 104);
    });

    // Action buttons
    ctx.fillStyle = "#238636"; ctx.fillRect(16, 122, 90, 22);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 9px system-ui, sans-serif"; ctx.fillText("💾 Save Progress", 24, 136);
    ctx.fillStyle = "#1f6feb"; ctx.fillRect(112, 122, 95, 22);
    ctx.fillStyle = "#ffffff"; ctx.fillText("🔄 Restore State", 120, 136);

    // Checklist preview
    ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(16, 152, 320, 54);
    ctx.fillStyle = "#238636"; ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("✓ Installed Apps (11)      ✓ File System State (102 files)", 24, 168);
    ctx.fillText("✓ Mbank Virtual Wallet     ✓ Dock Order & Wallpapers", 24, 182);
    ctx.fillText("✓ Notes & Calendar Drafts  ✓ VT-23x/DER-0 Package State", 24, 196);
  }

  function drawShot2_SaveProgress(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    drawWindowChrome(ctx, w, h, "POSE · Saving Snapshot...");

    ctx.fillStyle = "#00ffaa";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SERIALIZING DESKTOP ECOSYSTEM", w / 2, 60);

    // Progress bar
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(40, 78, w - 80, 14);
    ctx.fillStyle = "#238636";
    ctx.fillRect(40, 78, (w - 80) * 0.85, 14);

    // Steps
    ctx.textAlign = "left";
    ctx.fillStyle = "#8b949e";
    ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("✓ Captured 11 installed app definitions", 44, 112);
    ctx.fillText("✓ Exported virtual filesystem (12.4 GB metadata)", 44, 128);
    ctx.fillText("✓ Serialized wallet & browser stack", 44, 144);
    ctx.fillText("⏳ Committing transaction to webosdb/state...", 44, 160);

    ctx.fillStyle = "#58a6ff";
    ctx.font = "bold 10px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("85% Completed · 1.4 KB Written", w / 2, 192);
  }

  function drawShot3_RestoreSession(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    drawWindowChrome(ctx, w, h, "POSE · Restoring Session");

    ctx.fillStyle = "#58a6ff";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("RESTORE FROM INDEXEDDB", w / 2, 60);

    ctx.fillStyle = "rgba(0, 255, 170, 0.1)";
    ctx.fillRect(36, 75, w - 72, 40);
    ctx.strokeStyle = "rgba(0, 255, 170, 0.3)";
    ctx.strokeRect(36, 75, w - 72, 40);

    ctx.fillStyle = "#00ffaa";
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.fillText("✅ Snapshot Verified (v0.10.0)", w / 2, 92);
    ctx.fillStyle = "#d1d5db";
    ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("All session components matched current OS kernel", w / 2, 106);

    ctx.textAlign = "left";
    ctx.fillStyle = "#8b949e";
    ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("✓ Restored wallpaper and custom dock order", 44, 136);
    ctx.fillText("✓ Reconnected Mbank transactions ($1,250.00)", 44, 152);
    ctx.fillText("✓ Mounted user notes and calendar events", 44, 168);
    ctx.fillText("✓ Session live — zero data lost", 44, 184);
  }

  window.poseCanvasShots1 = {
    drawShot1_Dashboard,
    drawShot2_SaveProgress,
    drawShot3_RestoreSession
  };
})();

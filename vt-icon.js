/* === FILE: vt-icon.js === */
/**
 * WebOS v0.9.2 Canvas 2D VT-Chip Icon Renderer
 * Renders high-DPI 28x28 micro-chip with circuit traces, pins, and gold VT typography.
 */
(function () {
  let pulseAnimId = null;
  let pulsePhase = 0;

  function drawVTIcon(canvas, state = "idle") {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 28;
    const h = 28;
    ctx.clearRect(0, 0, w, h);
    ctx.save();

    // 1. Draw Peripheral Pins (#aaccee)
    ctx.fillStyle = "#aaccee";
    // Left pins (5 pins)
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(2, 6 + i * 3.2, 3, 1.5);
    }
    // Right pins (5 pins)
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(23, 6 + i * 3.2, 3, 1.5);
    }
    // Top pins (4 pins)
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(7 + i * 3.8, 2, 1.5, 3);
    }
    // Bottom pins (4 pins)
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(7 + i * 3.8, 23, 1.5, 3);
    }

    // 2. Outer Chip Body
    ctx.fillStyle = "#1a2a45";
    ctx.strokeStyle = state === "optimized" ? "#00e5ff" : "#00bfff";
    ctx.lineWidth = 1;
    ctx.fillRect(5, 5, 18, 18);
    ctx.strokeRect(5.5, 5.5, 17, 17);

    // 3. Inner Circuit Traces
    ctx.strokeStyle = "rgba(0, 191, 255, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(8, 8, 12, 12);

    // 4. Glow & State Styling for VT Text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 8px system-ui, -apple-system, sans-serif";

    if (state === "scanning") {
      const blur = Math.abs(Math.sin(pulsePhase)) * 8;
      ctx.shadowColor = "#ffd700";
      ctx.shadowBlur = blur;
      ctx.fillStyle = "#ffd700";
    } else if (state === "optimized") {
      ctx.shadowColor = "#00bfff";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#ffd700";
    } else {
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#aa8800";
    }

    ctx.fillText("VT", 14, 14.5);
    ctx.restore();
  }

  function startScanningPulse(canvas) {
    if (pulseAnimId) cancelAnimationFrame(pulseAnimId);
    function animate() {
      pulsePhase += 0.12;
      drawVTIcon(canvas, "scanning");
      pulseAnimId = requestAnimationFrame(animate);
    }
    animate();
  }

  function stopScanningPulse() {
    if (pulseAnimId) {
      cancelAnimationFrame(pulseAnimId);
      pulseAnimId = null;
    }
  }

  window.vtIcon = {
    drawVTIcon,
    startScanningPulse,
    stopScanningPulse
  };
})();

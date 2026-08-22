/* === FILE: webtube-scenes-2.js === */
/**
 * WebOS v0.8.3 WebTube Canvas Scenes (Scenes 11 - 20 & Variants)
 */
(function () {
  function drawMatrixRain(ctx, data, t, w, h) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = data.color || "#00ff66";
    ctx.font = "12px monospace";
    const cols = 25;
    for (let i = 0; i < cols; i++) {
      const char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
      const y = ((t * 80 + i * 25) % h);
      ctx.fillText(char, (i * w) / cols, y);
    }
    ctx.restore();
  }

  function drawCommandType(ctx, data, t, w, h) {
    ctx.save();
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(20, 20, w - 40, h - 40);
    ctx.fillStyle = "#ffd700";
    ctx.font = "12px monospace";
    ctx.fillText("> " + (data.cmd || "whoami"), 35, 55);

    if (t > 1) {
      ctx.fillStyle = "#27c93f";
      ctx.fillText(data.output || "[OK]", 35, 85);
    }
    ctx.restore();
  }

  function drawAsciiDraw(ctx, data, t, w, h) {
    ctx.save();
    ctx.fillStyle = "#050510";
    ctx.fillRect(20, 20, w - 40, h - 40);
    ctx.fillStyle = "#00f0ff";
    ctx.font = "10px monospace";
    const art = data.art || ["WEBOS", "SYSTEM"];
    const linesToShow = Math.min(art.length, Math.floor(t * 4));
    for (let i = 0; i < linesToShow; i++) {
      ctx.fillText(art[i], 40, 50 + i * 16);
    }
    ctx.restore();
  }

  function drawGlitchOut(ctx, data, t, w, h) {
    ctx.save();
    const cx = w / 2, cy = h / 2;
    const shift = Math.sin(t * 30) * 8;
    ctx.fillStyle = "#ff0055";
    ctx.font = "bold 20px -apple-system, monospace";
    ctx.textAlign = "center";
    ctx.fillText(data.text || "GLITCH", cx + shift, cy);
    ctx.fillStyle = "#00f0ff";
    ctx.fillText(data.text || "GLITCH", cx - shift, cy);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(data.text || "GLITCH", cx, cy);
    ctx.restore();
  }

  function drawCpuDraw(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(cx - 50, cy - 50, 100, 100);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 50, cy - 50, 100, 100);

    // Pins
    ctx.fillStyle = "#ffd700";
    for (let i = -40; i <= 40; i += 20) {
      ctx.fillRect(cx + i - 3, cy - 56, 6, 6);
      ctx.fillRect(cx + i - 3, cy + 50, 6, 6);
      ctx.fillRect(cx - 56, cy + i - 3, 6, 6);
      ctx.fillRect(cx + 50, cy + i - 3, 6, 6);
    }

    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.name || "Cyclone X9", cx, cy - 5);
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(data.clock || "2.7 GHz", cx, cy + 15);
    ctx.restore();
  }

  function drawBenchmarkBars(ctx, data, t, w, h) {
    const p = Math.min(1, t * 0.8);
    ctx.save();
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("CPU Benchmark Scores", 30, 40);

    // Single core
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(30, 60, (data.single / 50) * p, 18);
    ctx.fillStyle = "#fff";
    ctx.font = "11px sans-serif";
    ctx.fillText(`Single-Core: ${Math.floor(data.single * p)}`, 35, 74);

    // Multi core
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(30, 90, (data.multi / 20) * p, 18);
    ctx.fillStyle = "#fff";
    ctx.fillText(`Multi-Core: ${Math.floor(data.multi * p)}`, 35, 104);
    ctx.restore();
  }

  function drawGpuDraw(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(cx - 65, cy - 40, 130, 80);
    ctx.strokeStyle = "#ff007a";
    ctx.strokeRect(cx - 65, cy - 40, 130, 80);

    // Fan rotation
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 8);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(25, 0); ctx.stroke();
      ctx.rotate(Math.PI / 3);
    }
    ctx.restore();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.name || "Star R Pro", cx, cy + 55);
    ctx.restore();
  }

  function drawRenderDemo(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 1.5);
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;

    const s = 35;
    ctx.strokeRect(-s, -s, s * 2, s * 2);
    ctx.strokeRect(-s / 2, -s / 2, s * 2, s * 2);
    ctx.beginPath();
    ctx.moveTo(-s, -s); ctx.lineTo(-s / 2, -s / 2);
    ctx.moveTo(s, -s); ctx.lineTo(s * 1.5, -s / 2);
    ctx.moveTo(-s, s); ctx.lineTo(-s / 2, s * 1.5);
    ctx.moveTo(s, s); ctx.lineTo(s * 1.5, s * 1.5);
    ctx.stroke();
    ctx.restore();
  }

  function drawSpeedBars(ctx, data, t, w, h) {
    const p = Math.min(1, t * 0.9);
    ctx.save();
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("NVMe PCIe Gen3 x4", 30, 40);

    ctx.fillStyle = "#00f0ff";
    ctx.fillRect(30, 60, (w - 80) * 0.8 * p, 20);
    ctx.fillStyle = "#fff";
    ctx.font = "11px sans-serif";
    ctx.fillText(`Read: ${data.read || '2400 MB/s'}`, 35, 75);

    ctx.fillStyle = "#ff007a";
    ctx.fillRect(30, 95, (w - 80) * 0.6 * p, 20);
    ctx.fillStyle = "#fff";
    ctx.fillText(`Write: ${data.write || '1850 MB/s'}`, 35, 110);
    ctx.restore();
  }

  function drawBootHistory(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.ver || "WebOS Bootloader", cx, cy - 20);

    ctx.fillStyle = "#ffd700";
    ctx.font = "13px sans-serif";
    ctx.fillText(`Time to Desktop: ${data.time || '1.4s'}`, cx, cy + 15);

    const prog = Math.min(1, (t % 2) / 2);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(cx - 80, cy + 35, 160, 6);
    ctx.fillStyle = "#00f0ff";
    ctx.fillRect(cx - 80, cy + 35, 160 * prog, 6);
    ctx.restore();
  }

  window.webtubeScenes2 = {
    "matrix-rain": drawMatrixRain,
    "command-type": drawCommandType,
    "ascii-draw": drawAsciiDraw,
    "glitch-out": drawGlitchOut,
    "cpu-draw": drawCpuDraw,
    "benchmark-bars": drawBenchmarkBars,
    "gpu-draw": drawGpuDraw,
    "render-demo": drawRenderDemo,
    "speed-bars": drawSpeedBars,
    "boot-history": drawBootHistory
  };
})();

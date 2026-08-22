/* === FILE: webtube-scenes-1.js === */
/**
 * WebOS v0.8.3 WebTube Canvas Scenes (Scenes 1 - 10)
 */
(function () {
  function drawLogoPulse(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    const pulse = 1 + Math.sin(t * 3) * 0.12;
    const glow = Math.abs(Math.sin(t * 2)) * 30 + 10;

    ctx.save();
    ctx.shadowColor = data.glow || "#ffd700";
    ctx.shadowBlur = glow;
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 45 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Play triangle
    ctx.fillStyle = "#0a0a0a";
    ctx.beginPath();
    ctx.moveTo(cx - 15 * pulse, cy - 35 * pulse);
    ctx.lineTo(cx + 25 * pulse, cy - 20 * pulse);
    ctx.lineTo(cx - 15 * pulse, cy - 5 * pulse);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.text || "WebOS", cx, cy + 50);

    ctx.fillStyle = "#8e8e93";
    ctx.font = "12px -apple-system, sans-serif";
    ctx.fillText(data.subtitle || "Official Video", cx, cy + 72);
    ctx.restore();
  }

  function drawLogoRotate(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    const angle = t * (data.speed || 1);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#ffd700" : "#ff2020";
      ctx.fillRect(-35, -35, 70, 70);
      ctx.rotate(Math.PI / 4);
    }
    ctx.restore();

    // Center traffic lights
    const blink = Math.sin(t * 5) > 0;
    ctx.fillStyle = "#ff5f56"; ctx.beginPath(); ctx.arc(cx - 20, cy + 60, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = blink ? "#ffbd2e" : "#886611"; ctx.beginPath(); ctx.arc(cx, cy + 60, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#27c93f"; ctx.beginPath(); ctx.arc(cx + 20, cy + 60, 6, 0, Math.PI * 2); ctx.fill();
  }

  function drawTextSlide(ctx, data, t, w, h) {
    const offset = Math.min(w * 0.1, t * 100);
    ctx.save();
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 22px -apple-system, sans-serif";
    ctx.fillText(data.title || "Key Update", 40 + offset * 0.2, 50);

    ctx.fillStyle = "#ffffff";
    ctx.font = "14px -apple-system, sans-serif";
    if (data.points) {
      data.points.forEach((p, idx) => {
        const itemOffset = Math.max(0, Math.min(w, (t - idx * 0.4) * 150));
        ctx.fillText("• " + p, 40 + itemOffset * 0.1, 90 + idx * 30);
      });
    }
    ctx.restore();
  }

  function drawParticleBurst(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    const count = data.count || 50;
    ctx.save();
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = (t * 60 + (i * 13) % 80) % 180;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      const size = Math.max(1, (180 - dist) / 30);

      ctx.fillStyle = data.color || (i % 2 === 0 ? "#ffd700" : "#ff2020");
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRobotFace(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    ctx.save();
    // Head
    ctx.fillStyle = "#1a233a";
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 3;
    ctx.strokeRect(cx - 50, cy - 40, 100, 80);
    ctx.fillRect(cx - 50, cy - 40, 100, 80);

    // Eyes
    const blink = Math.sin(t * 4) > 0.8;
    ctx.fillStyle = data.eyes === "pulsing" ? (blink ? "#00f0ff" : "#ff2020") : "#00f0ff";
    if (blink) {
      ctx.fillRect(cx - 30, cy - 10, 20, 3);
      ctx.fillRect(cx + 10, cy - 10, 20, 3);
    } else {
      ctx.beginPath(); ctx.arc(cx - 20, cy - 10, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 20, cy - 10, 8, 0, Math.PI * 2); ctx.fill();
    }

    // Mouth / Waveform
    ctx.strokeStyle = "#ffd700";
    ctx.beginPath();
    for (let x = -30; x <= 30; x += 5) {
      const y = Math.sin(t * 8 + x * 0.2) * 6;
      if (x === -30) ctx.moveTo(cx + x, cy + 20 + y);
      else ctx.lineTo(cx + x, cy + 20 + y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawTextWave(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.fillStyle = "#00f0ff";
    ctx.font = "bold 18px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.text || "AI Talks Engine", cx, cy - 20);

    ctx.fillStyle = "#8e8e93";
    ctx.font = "12px -apple-system, sans-serif";
    ctx.fillText(data.sub || "Inference Benchmarks", cx, cy + 10);

    ctx.strokeStyle = "rgba(0,240,255,0.4)";
    ctx.beginPath();
    for (let x = 0; x < w; x += 10) {
      const y = cy + 40 + Math.sin(x * 0.05 + t * 4) * 15;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawCodeTyping(ctx, data, t, w, h) {
    const fullCode = data.code || "console.log('WebOS 0.8.3');";
    const charsToShow = Math.min(fullCode.length, Math.floor(t * 15));
    const lines = fullCode.slice(0, charsToShow).split("\n");

    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.fillRect(20, 20, w - 40, h - 40);
    ctx.strokeStyle = "#333";
    ctx.strokeRect(20, 20, w - 40, h - 40);

    ctx.fillStyle = "#58a6ff";
    ctx.font = "12px monospace";
    ctx.fillText(`// ${data.lang || 'Code'} Module`, 35, 45);

    ctx.fillStyle = "#7ee787";
    lines.forEach((l, i) => {
      ctx.fillText(l, 35, 70 + i * 20);
    });

    if (Math.sin(t * 6) > 0) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(35 + (lines[lines.length - 1] || "").length * 7.2, 58 + (lines.length - 1) * 20, 6, 14);
    }
    ctx.restore();
  }

  function drawEmojiRotate(ctx, data, t, w, h) {
    const cx = w / 2, cy = h / 2;
    const emojis = data.emojis || ["⭐", "🚀", "⚡"];
    ctx.save();
    emojis.forEach((em, i) => {
      const angle = (i / emojis.length) * Math.PI * 2 + t * 1.2;
      const px = cx + Math.cos(angle) * 65;
      const py = cy + Math.sin(angle) * 65;
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(em, px, py);
    });
    ctx.restore();
  }

  function drawBarCompare(ctx, data, t, w, h) {
    const p = Math.min(1, t * 0.8);
    ctx.save();
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 15px -apple-system, sans-serif";
    ctx.fillText(data.label || "Performance Test", 30, 40);

    // Bar A
    const wA = (data.a.val / 1000) * (w - 120) * p;
    ctx.fillStyle = "#ff5f56";
    ctx.fillRect(30, 65, wA, 22);
    ctx.fillStyle = "#fff";
    ctx.font = "12px -apple-system, sans-serif";
    ctx.fillText(`${data.a.name}: ${data.a.val}ms`, 35, 80);

    // Bar B
    const wB = (data.b.val / 1000) * (w - 120) * p;
    ctx.fillStyle = "#27c93f";
    ctx.fillRect(30, 100, wB, 22);
    ctx.fillStyle = "#fff";
    ctx.fillText(`${data.b.name}: ${data.b.val}ms`, 35, 115);
    ctx.restore();
  }

  function drawTerminalDraw(ctx, data, t, w, h) {
    ctx.save();
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(20, 20, w - 40, h - 40);
    ctx.strokeStyle = "#38bdf8";
    ctx.strokeRect(20, 20, w - 40, h - 40);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`root@webos:~# ${data.title || 'bash'}`, 35, 50);

    const scanLine = (t * 80) % (h - 40);
    ctx.fillStyle = "rgba(56,189,248,0.15)";
    ctx.fillRect(20, 20 + scanLine, w - 40, 2);
    ctx.restore();
  }

  window.webtubeScenes1 = {
    "logo-pulse": drawLogoPulse,
    "logo-rotate": drawLogoRotate,
    "text-slide": drawTextSlide,
    "particle-burst": drawParticleBurst,
    "robot-face": drawRobotFace,
    "text-wave": drawTextWave,
    "code-typing": drawCodeTyping,
    "emoji-rotate": drawEmojiRotate,
    "bar-compare": drawBarCompare,
    "terminal-draw": drawTerminalDraw
  };
})();

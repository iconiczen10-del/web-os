/* === FILE: pose-boot-anim.js === */
/**
 * WebOS v0.10.0 POSE 3-Second Opening Animation (2D Canvas)
 * Phase 1 (0-1s): Hexagon core & spiraling particles
 * Phase 2 (1-2s): Ecosystem nodes, connective lines, energy pulses
 * Phase 3 (2-3s): Outer lock ring, persistence glow, and transition to UI
 */
(function () {
  function playPoseAnimation(containerEl, onComplete) {
    if (!containerEl) {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    containerEl.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.className = "pose-anim-canvas";
    canvas.width = 480;
    canvas.height = 360;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.background = "#0d1117";
    containerEl.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const startTime = performance.now();
    const DURATION = 3000;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const particles = Array.from({ length: 32 }, (_, i) => ({
      angle: (i / 32) * Math.PI * 2,
      dist: 120 + Math.random() * 40,
      speed: 0.04 + Math.random() * 0.03,
      size: 1.5 + Math.random() * 2
    }));

    const nodes = [
      { x: cx - 90, y: cy - 50, label: "APPS" },
      { x: cx + 90, y: cy - 50, label: "STORAGE" },
      { x: cx - 90, y: cy + 50, label: "WALLET" },
      { x: cx + 90, y: cy + 50, label: "STATE" },
      { x: cx, y: cy - 85, label: "DOCK" },
      { x: cx, y: cy + 85, label: "CONFIG" }
    ];

    function drawHexagon(x, y, radius, progress, strokeColor) {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = x + Math.cos(a) * radius;
        const py = y + Math.sin(a) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 10 * progress;
      ctx.stroke();
      ctx.restore();
    }

    function render(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / DURATION);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // PHASE 1: Core formation & spiraling particles
      const p1 = Math.min(1, elapsed / 1000);
      particles.forEach((p) => {
        p.angle += p.speed;
        const currentDist = Math.max(0, p.dist * (1 - p1 * 0.7));
        const px = cx + Math.cos(p.angle) * currentDist;
        const py = cy + Math.sin(p.angle) * currentDist;
        ctx.fillStyle = `rgba(0, 240, 255, ${0.4 + 0.6 * p1})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      drawHexagon(cx, cy, 32 * Math.min(1, p1 * 1.2), p1, "rgba(0, 240, 255, 0.9)");

      // PHASE 2: Ecosystem Network (1s to 2s)
      if (elapsed > 900) {
        const p2 = Math.min(1, (elapsed - 900) / 1000);
        nodes.forEach((n) => {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + (n.x - cx) * p2, cy + (n.y - cy) * p2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 * p2})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = `rgba(0, 240, 255, ${p2})`;
          ctx.beginPath();
          ctx.arc(cx + (n.x - cx) * p2, cy + (n.y - cy) * p2, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // PHASE 3: Lock & Persist (2s to 3s)
      if (elapsed > 1900) {
        const p3 = Math.min(1, (elapsed - 1900) / 1000);
        ctx.beginPath();
        ctx.arc(cx, cy, 115, 0, Math.PI * 2 * p3);
        ctx.strokeStyle = `rgba(0, 255, 170, ${0.8 * p3})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#00ffaa";
        ctx.shadowBlur = 15;
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${p3})`;
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("ECOSYSTEM PERSISTENCE LOCKED", cx, cy + 140);
      }

      if (elapsed < DURATION) {
        requestAnimationFrame(render);
      } else {
        canvas.style.transition = "opacity 0.3s";
        canvas.style.opacity = "0";
        setTimeout(() => {
          if (typeof onComplete === "function") onComplete();
        }, 300);
      }
    }

    requestAnimationFrame(render);
  }

  window.poseBootAnim = { playPoseAnimation };
})();

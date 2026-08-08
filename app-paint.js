/* === FILE: app-paint.js === */
/**
 * WebOS v0.6 Canvas Paint App
 */
(function () {
  function initPaint(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";
    contentEl.style.height = "100%";
    contentEl.style.background = "#1e1e1e";

    const colors = ["#ffffff", "#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#007aff", "#af52de", "#000000"];
    let currentColor = "#ffffff";
    let brushSize = 5;
    let isDrawing = false;

    contentEl.innerHTML = `
      <div style="padding: 8px 12px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; gap: 6px; align-items: center;">
          ${colors.map(c => `
            <div class="color-swatch" data-color="${c}" style="width: 20px; height: 20px; border-radius: 50%; background: ${c}; cursor: pointer; border: 2px solid ${c === currentColor ? '#007aff' : 'transparent'};"></div>
          `).join("")}
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 11px; color: #aaa;">Size:</span>
          <input type="range" id="brush-slider" min="1" max="25" value="${brushSize}" style="width: 70px;" />
          <button id="paint-clear" style="padding: 4px 10px; border-radius: 6px; border: none; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; cursor: pointer;">Clear</button>
        </div>
      </div>
      <div style="flex: 1; position: relative;" id="canvas-container">
        <canvas id="paint-canvas" style="display: block; background: #121212; cursor: crosshair;"></canvas>
      </div>
    `;

    const canvas = contentEl.querySelector("#paint-canvas");
    const container = contentEl.querySelector("#canvas-container");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = container.clientWidth || 400;
      canvas.height = container.clientHeight || 300;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    setTimeout(resizeCanvas, 50);

    function startDraw(e) {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }

    function draw(e) {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }

    function stopDraw() {
      isDrawing = false;
    }

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    contentEl.querySelectorAll(".color-swatch").forEach(swatch => {
      swatch.addEventListener("click", () => {
        currentColor = swatch.getAttribute("data-color");
        contentEl.querySelectorAll(".color-swatch").forEach(s => s.style.borderColor = "transparent");
        swatch.style.borderColor = "#007aff";
      });
    });

    contentEl.querySelector("#brush-slider").addEventListener("input", (e) => {
      brushSize = parseInt(e.target.value);
    });

    contentEl.querySelector("#paint-clear").addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  window.initPaint = initPaint;
})();

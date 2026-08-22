/* === FILE: webtube-scenes.js === */
/**
 * WebOS v0.8.3 WebTube Master Scene Renderer Dispatcher
 */
(function () {
  function drawScene(ctx, type, data, t, w, h) {
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    // Look up renderer in scenes-1 or scenes-2
    let renderer = (window.webtubeScenes1 && window.webtubeScenes1[type]) ||
                   (window.webtubeScenes2 && window.webtubeScenes2[type]);

    if (renderer) {
      renderer(ctx, data, t, w, h);
      return;
    }

    // Generic fallback scene
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 16px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data && data.title ? data.title : type, cx, cy - 10);

    if (data && (data.text || data.points || data.features)) {
      ctx.fillStyle = "#8e8e93";
      ctx.font = "12px -apple-system, sans-serif";
      const desc = data.text || (data.points ? data.points.join(" • ") : data.features.join(" • "));
      ctx.fillText(desc, cx, cy + 18);
    }
    ctx.restore();
  }

  window.webtubeScenes = { drawScene };
})();

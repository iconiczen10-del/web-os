/* === FILE: webtube-player-core.js === */
/**
 * WebOS v0.8.3 WebTube Canvas Player Core Loop & State Management
 */
(function () {
  function createPlayerCore(canvas, videoData, opts) {
    const ctx = canvas.getContext("2d");
    let isPlaying = false;
    let currentTime = 0;
    let isBuffering = false;
    let animId = null;
    let lastTimestamp = 0;

    const fps = opts.fps || 30;
    const frameInterval = 1000 / fps;
    const isSlowConnection = (opts.internetSpeedMbps || 1.6) < 10 && opts.quality !== "360p";

    function renderFrame(time) {
      const w = canvas.width;
      const h = canvas.height;

      if (isBuffering) {
        // Buffering screen
        ctx.fillStyle = "rgba(10, 10, 10, 0.85)";
        ctx.fillRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((time / 200));
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 1.5);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = "#ffffff";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Buffering HD Stream...", cx, cy + 45);
        ctx.fillStyle = "#8e8e93";
        ctx.font = "10px sans-serif";
        ctx.fillText("Upgrade BUYNET plan for instant 4K", cx, cy + 62);
        return;
      }

      // Find active scene
      const scenes = videoData.scenes || [];
      const activeScene = scenes.find(s => currentTime >= s.start && currentTime <= s.end) || scenes[0];

      if (activeScene && window.webtubeScenes) {
        const sceneRelTime = currentTime - activeScene.start;
        window.webtubeScenes.drawScene(ctx, activeScene.type, activeScene.data, sceneRelTime, w, h);
      }
    }

    function tick(now) {
      if (!isPlaying) return;
      animId = requestAnimationFrame(tick);

      const elapsed = now - lastTimestamp;
      if (elapsed >= frameInterval) {
        lastTimestamp = now - (elapsed % frameInterval);

        // Simulate buffering on slow network for high res
        if (isSlowConnection && Math.random() < 0.04 && !isBuffering) {
          isBuffering = true;
          setTimeout(() => { isBuffering = false; }, 1800);
        }

        if (!isBuffering) {
          currentTime += 1 / fps;
          if (currentTime >= videoData.duration) {
            currentTime = videoData.duration;
            isPlaying = false;
            if (opts.onEnd) opts.onEnd();
          }
          if (opts.onTimeUpdate) opts.onTimeUpdate(currentTime);
        }

        renderFrame(now);
      }
    }

    function play() {
      if (window._wifiDisabled) return false;
      if (!isPlaying) {
        isPlaying = true;
        lastTimestamp = performance.now();
        animId = requestAnimationFrame(tick);
      }
      return true;
    }

    function pause() {
      isPlaying = false;
      if (animId) cancelAnimationFrame(animId);
    }

    function seek(sec) {
      currentTime = Math.max(0, Math.min(videoData.duration, sec));
      renderFrame(performance.now());
      if (opts.onTimeUpdate) opts.onTimeUpdate(currentTime);
    }

    function destroy() {
      pause();
    }

    // Initial first frame
    renderFrame(0);

    return {
      play,
      pause,
      seek,
      destroy,
      isPlaying: () => isPlaying,
      getCurrentTime: () => currentTime
    };
  }

  window.webtubePlayerCore = { createPlayerCore };
})();

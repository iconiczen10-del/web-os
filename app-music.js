/* === FILE: app-music.js === */
/**
 * WebOS v0.6 Music Player
 */
(function () {
  const PLAYLIST = [
    { title: "Summer Vibes", artist: "WebOS Beats", duration: 180 },
    { title: "Ocean Drive", artist: "Synthwave Express", duration: 215 },
    { title: "Neon Nights", artist: "Cyber Dreamer", duration: 195 },
    { title: "Sunset Boulevard", artist: "Chill Lounge", duration: 240 },
    { title: "Midnight Walk", artist: "LoFi Station", duration: 160 }
  ];

  function initMusic(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "16px";
    contentEl.style.color = "#ffffff";
    contentEl.style.background = "#121216";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";

    let currentTrackIdx = 0;
    let isPlaying = false;
    let currentTime = 0;
    let timer = null;

    function formatTime(s) {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function render() {
      const track = PLAYLIST[currentTrackIdx];
      const pct = (currentTime / track.duration) * 100;

      contentEl.innerHTML = `
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ff007a, #9600ff); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 36px; box-shadow: 0 8px 20px rgba(0,0,0,0.4);">🎵</div>
          <div style="flex: 1;">
            <div style="font-size: 16px; font-weight: 700;">${track.title}</div>
            <div style="font-size: 13px; color: #aaa; margin-top: 2px;">${track.artist}</div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div id="music-progress-bar" style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; cursor: pointer; position: relative;">
            <div style="width: ${pct}%; height: 100%; background: #007aff; border-radius: 3px;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #888; margin-top: 4px;">
            <span>${formatTime(currentTime)}</span>
            <span>${formatTime(track.duration)}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 20px;">
          <button id="music-prev" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">⏮️</button>
          <button id="music-play" style="background: #007aff; border: none; color: #fff; width: 44px; height: 44px; border-radius: 50%; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;">${isPlaying ? '⏸️' : '▶️'}</button>
          <button id="music-next" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">⏭️</button>
        </div>

        <div style="font-size: 12px; font-weight: 600; color: #888; margin-bottom: 8px;">PLAYLIST</div>
        <div style="flex: 1; overflow-y: auto;">
          ${PLAYLIST.map((t, idx) => `
            <div class="music-item" data-idx="${idx}" style="padding: 8px 10px; border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between; font-size: 13px; background: ${idx === currentTrackIdx ? 'rgba(0,122,255,0.2)' : 'transparent'}; color: ${idx === currentTrackIdx ? '#007aff' : '#ccc'};">
              <span>${t.title} - ${t.artist}</span>
              <span>${formatTime(t.duration)}</span>
            </div>
          `).join("")}
        </div>
      `;

      contentEl.querySelector("#music-play").addEventListener("click", togglePlay);
      contentEl.querySelector("#music-prev").addEventListener("click", prevTrack);
      contentEl.querySelector("#music-next").addEventListener("click", nextTrack);

      contentEl.querySelectorAll(".music-item").forEach(item => {
        item.addEventListener("click", () => {
          currentTrackIdx = parseInt(item.getAttribute("data-idx"));
          currentTime = 0;
          isPlaying = true;
          startTimer();
          render();
        });
      });
    }

    function togglePlay() {
      isPlaying = !isPlaying;
      if (isPlaying) startTimer();
      else stopTimer();
      render();
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => {
        currentTime++;
        if (currentTime >= PLAYLIST[currentTrackIdx].duration) {
          nextTrack();
        } else {
          render();
        }
      }, 1000);
    }

    function stopTimer() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function prevTrack() {
      currentTrackIdx = (currentTrackIdx - 1 + PLAYLIST.length) % PLAYLIST.length;
      currentTime = 0;
      render();
    }

    function nextTrack() {
      currentTrackIdx = (currentTrackIdx + 1) % PLAYLIST.length;
      currentTime = 0;
      render();
    }

    windowEl._musicInterval = timer;
    render();
  }

  window.initMusic = initMusic;
})();

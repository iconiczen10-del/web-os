/* === FILE: webtube-player.js === */
/**
 * WebOS v0.8.3 WebTube Player Export
 */
(function () {
  window.createWebTubePlayer = function (containerEl, videoData, tier, internetSpeed) {
    if (window.webtubePlayer && typeof window.webtubePlayer.createWebTubePlayer === "function") {
      return window.webtubePlayer.createWebTubePlayer(containerEl, videoData, tier, internetSpeed);
    }
  };
})();

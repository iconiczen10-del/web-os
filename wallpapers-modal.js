/* === FILE: wallpapers-modal.js === */
/**
 * WebOS v0.6.6.1 Wallpapers PCS Preview Modal
 */
(function () {
  function openPreviewModal(item, isPro, isApplied, containerEl, onRefresh, onSubscribe) {
    const overlay = document.createElement("div");
    overlay.className = "wallpapers-preview-overlay";

    const isLocked = item.tier === "pro" && !isPro;

    overlay.innerHTML = `
      <div class="wallpapers-preview-modal">
        <div class="wallpapers-preview-image" style="background:${item.gradient};"></div>
        <div class="wallpapers-preview-info">
          <div class="wallpapers-preview-name">${item.name}</div>
          <div class="wallpapers-preview-size">${item.size} • ${item.tier.toUpperCase()} TIER</div>
          <p style="font-size:12px;color:#94a3b8;margin-bottom:16px;line-height:1.4;">${item.description}</p>
          <div class="wallpapers-preview-actions">
            ${isLocked ? `<button id="modal-sub-btn" class="wallpapers-btn wallpapers-btn-pro">Unlock Pro ($4.99/mo)</button>` : `<button id="modal-apply-btn" class="wallpapers-btn wallpapers-btn-primary">${isApplied ? 'Currently Applied' : 'Apply Wallpaper'}</button>`}
            <button id="modal-close-btn" class="wallpapers-btn wallpapers-btn-secondary">Close</button>
          </div>
        </div>
      </div>
    `;

    overlay.querySelector("#modal-close-btn").addEventListener("click", () => overlay.remove());

    const applyBtn = overlay.querySelector("#modal-apply-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        if (typeof window.applyDesktopWallpaper === "function") {
          window.applyDesktopWallpaper(item.gradient);
        } else {
          const desktop = document.getElementById("desktop");
          if (desktop) desktop.style.background = item.gradient;
          localStorage.setItem("webos-current-wallpaper", item.gradient);
        }
        alert(`"${item.name}" wallpaper applied to desktop!`);
        overlay.remove();
        if (typeof onRefresh === "function") onRefresh();
      });
    }

    const subBtn = overlay.querySelector("#modal-sub-btn");
    if (subBtn) {
      subBtn.addEventListener("click", () => {
        overlay.remove();
        if (typeof onSubscribe === "function") onSubscribe();
      });
    }

    document.body.appendChild(overlay);
  }

  window.wallpapersModal = {
    openPreviewModal
  };
})();

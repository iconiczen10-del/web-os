/* === FILE: window-pin.js === */
/**
 * WebOS v0.9.1.1 Window Pinning Manager
 * Manages window pinning state, z-index hierarchy, and visual pin states.
 */
(function () {
  let pinnedWindows = [];
  let highestPinnedZ = 9000;

  function isPinned(windowEl) {
    return pinnedWindows.includes(windowEl);
  }

  function getPinnedWindows() {
    return pinnedWindows;
  }

  function togglePin(windowEl) {
    if (!windowEl) return false;
    if (isPinned(windowEl)) {
      unpinWindow(windowEl);
      return false;
    } else {
      pinWindow(windowEl);
      return true;
    }
  }

  function pinWindow(windowEl) {
    if (!windowEl || isPinned(windowEl)) return;
    pinnedWindows.push(windowEl);
    windowEl.classList.add("pinned");
    const pinBtn = windowEl.querySelector(".window-pin-btn");
    if (pinBtn) pinBtn.classList.add("pinned");
    updateZIndex(windowEl);
  }

  function unpinWindow(windowEl) {
    if (!windowEl || !isPinned(windowEl)) return;
    pinnedWindows = pinnedWindows.filter(w => w !== windowEl);
    windowEl.classList.remove("pinned");
    const pinBtn = windowEl.querySelector(".window-pin-btn");
    if (pinBtn) pinBtn.classList.remove("pinned");

    if (window.windowManager) {
      windowEl.style.zIndex = ++window.windowManager.highestZIndex;
    }
  }

  function updateZIndex(windowEl) {
    if (!windowEl || !isPinned(windowEl)) return;
    highestPinnedZ++;
    windowEl.style.zIndex = highestPinnedZ;
  }

  function createPinButton(windowEl) {
    const pinBtn = document.createElement("div");
    pinBtn.className = "window-pin-btn";
    pinBtn.title = "Pin Window on Top";
    pinBtn.textContent = "📌";

    pinBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePin(windowEl);
    });

    return pinBtn;
  }

  window.windowPin = {
    isPinned,
    getPinnedWindows,
    togglePin,
    pinWindow,
    unpinWindow,
    updateZIndex,
    createPinButton
  };
})();

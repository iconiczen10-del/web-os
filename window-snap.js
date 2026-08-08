/* === FILE: window-snap.js === */
/**
 * WebOS v0.5 Window Edge Snapping Manager
 */
(function () {
  const SNAP_THRESHOLD = 40;

  function ensureOverlays() {
    let desktop = document.getElementById("desktop");
    if (!desktop) return;

    if (!document.querySelector(".snap-zone-left")) {
      const left = document.createElement("div");
      left.className = "snap-zone snap-zone-left";
      desktop.appendChild(left);
    }
    if (!document.querySelector(".snap-zone-right")) {
      const right = document.createElement("div");
      right.className = "snap-zone snap-zone-right";
      desktop.appendChild(right);
    }
    if (!document.querySelector(".snap-zone-top")) {
      const top = document.createElement("div");
      top.className = "snap-zone snap-zone-top";
      desktop.appendChild(top);
    }
  }

  function getSnapZone(mouseX, mouseY) {
    const topbarH = window.topbarManager ? window.topbarManager.getTopbarHeight() : 28;
    if (mouseY < topbarH + SNAP_THRESHOLD) return "top";
    if (mouseX < SNAP_THRESHOLD) return "left";
    if (mouseX > window.innerWidth - SNAP_THRESHOLD) return "right";
    return null;
  }

  function showSnapZone(zone) {
    ensureOverlays();
    hideSnapZones();
    if (!zone) return;
    const el = document.querySelector(`.snap-zone-${zone}`);
    if (el) el.classList.add("visible");
  }

  function hideSnapZones() {
    document.querySelectorAll(".snap-zone").forEach(el => el.classList.remove("visible"));
  }

  function snapWindow(windowEl, zone) {
    if (!windowEl) return;
    const topbarH = window.topbarManager ? window.topbarManager.getTopbarHeight() : 28;
    const dockH = 70;
    const availH = window.innerHeight - topbarH - dockH;

    if (!windowEl.dataset.unsnapTop) {
      windowEl.dataset.unsnapTop = windowEl.style.top || `${windowEl.offsetTop}px`;
      windowEl.dataset.unsnapLeft = windowEl.style.left || `${windowEl.offsetLeft}px`;
      windowEl.dataset.unsnapWidth = windowEl.style.width || `${windowEl.offsetWidth}px`;
      windowEl.dataset.unsnapHeight = windowEl.style.height || `${windowEl.offsetHeight}px`;
    }

    if (zone === "top") {
      if (typeof window.toggleMaximize === "function" && !windowEl.classList.contains("maximized")) {
        window.toggleMaximize(windowEl);
      }
      return;
    }

    windowEl.classList.add("snapped");
    windowEl.style.top = `${topbarH}px`;
    windowEl.style.height = `${availH}px`;
    windowEl.style.width = "50vw";

    if (zone === "left") {
      windowEl.style.left = "0px";
    } else if (zone === "right") {
      windowEl.style.left = "50vw";
    }
  }

  function unsnapWindow(windowEl) {
    if (windowEl.classList.contains("snapped") && windowEl.dataset.unsnapTop) {
      windowEl.style.top = windowEl.dataset.unsnapTop;
      windowEl.style.left = windowEl.dataset.unsnapLeft;
      windowEl.style.width = windowEl.dataset.unsnapWidth;
      windowEl.style.height = windowEl.dataset.unsnapHeight;
      delete windowEl.dataset.unsnapTop;
      delete windowEl.dataset.unsnapLeft;
      delete windowEl.dataset.unsnapWidth;
      delete windowEl.dataset.unsnapHeight;
      windowEl.classList.remove("snapped");
    } else if (windowEl.classList.contains("maximized")) {
      if (typeof window.toggleMaximize === "function") {
        window.toggleMaximize(windowEl);
      }
    }
  }

  window.windowSnap = {
    getSnapZone,
    showSnapZone,
    hideSnapZones,
    snapWindow,
    unsnapWindow
  };
})();

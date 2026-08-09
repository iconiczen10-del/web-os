/* === FILE: window.js === */
/**
 * WebOS v0.4 Window Manager
 * Handles window lifecycle, z-index focus stacking, minimize/maximize, and resize handles.
 */
class WindowManager {
  constructor() {
    this.openWindows = [];
    this.highestZIndex = 100;
    if (typeof window.initWindowDrag === "function") {
      window.initWindowDrag(this);
    }
  }

  openWindow(appName) {
    const existing = this.openWindows.find(w => w.getAttribute("data-app") === appName);
    if (existing) {
      if (existing.style.display === "none") {
        if (typeof window.restoreWindow === "function") window.restoreWindow(existing);
      }
      this.bringToFront(existing);
      return existing;
    }

    const win = document.createElement("div");
    win.className = "window-container";
    win.setAttribute("data-app", appName);
    this.highestZIndex++;
    win.style.zIndex = this.highestZIndex;

    const formattedTitle = appName.charAt(0).toUpperCase() + appName.slice(1);
    win.innerHTML = `
      <div class="window-titlebar">
        <div class="window-traffic-lights">
          <div class="traffic-light tl-close" title="Close"></div>
          <div class="traffic-light tl-minimize" title="Minimize"></div>
          <div class="traffic-light tl-maximize" title="Maximize"></div>
        </div>
        <div class="window-title">${formattedTitle}</div>
      </div>
      <div class="window-content"></div>
    `;

    const topbarOffset = window.topbarManager ? window.topbarManager.getTopbarHeight() : 28;
    const offset = (this.openWindows.length % 5) * 30;
    win.style.left = `${Math.min(100 + offset, window.innerWidth - 360)}px`;
    win.style.top = `${Math.min(topbarOffset + 20 + offset, window.innerHeight - 280)}px`;

    document.getElementById("desktop").appendChild(win);
    this.openWindows.push(win);

    // Initialize app content
    if (typeof window.dispatchAppInit === "function") {
      window.dispatchAppInit(appName, win);
    }

    // Attach traffic lights
    win.querySelector(".tl-close").addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeWindow(win);
    });
    win.querySelector(".tl-minimize").addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof window.minimizeWindow === "function") window.minimizeWindow(win);
    });
    win.querySelector(".tl-maximize").addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof window.toggleMaximize === "function") window.toggleMaximize(win);
    });

    if (typeof window.addResizeHandle === "function") {
      window.addResizeHandle(win);
    }

    win.addEventListener("mousedown", () => this.bringToFront(win));
    this.bringToFront(win);
    return win;
  }

  closeWindow(winEl) {
    if (winEl._monitorInterval) {
      clearInterval(winEl._monitorInterval);
      winEl._monitorInterval = null;
    }
    const appName = winEl.getAttribute("data-app");
    if (typeof window.hideDockDot === "function") window.hideDockDot(appName);
    winEl.remove();
    this.openWindows = this.openWindows.filter(w => w !== winEl);
  }

  forceCloseWindow(winEl) {
    if (winEl._monitorInterval) {
      clearInterval(winEl._monitorInterval);
      winEl._monitorInterval = null;
    }
    const appName = winEl.getAttribute("data-app");
    if (typeof window.hideDockDot === "function") window.hideDockDot(appName);
    winEl.remove();
    this.openWindows = this.openWindows.filter(w => w !== winEl);
  }

  bringToFront(winEl) {
    this.highestZIndex++;
    winEl.style.zIndex = this.highestZIndex;

    this.openWindows.forEach(w => {
      if (w === winEl) {
        w.classList.remove("inactive");
      } else {
        w.classList.add("inactive");
      }
    });

    const appName = winEl.getAttribute("data-app");
    if (window.topbarManager && appName) {
      window.topbarManager.updateActiveApp(appName);
    }
  }
}

window.windowManager = new WindowManager();

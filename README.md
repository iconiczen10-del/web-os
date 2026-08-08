# WebOS v0.6.4

An in-browser desktop operating system built entirely with vanilla HTML, CSS, and modular JavaScript. WebOS operates completely offline without external libraries, frameworks, or remote API calls.

---

## 🌟 Key Features

### ⚡ Custom Hardware Branding (NEW in v0.6.4)
- **Cyclone 1st Gen X9 CPU**: 2 Cores, 4 Threads @ 2.1 - 2.7 GHz (14nm, 35W TDP).
- **Star R Pro GPU**: 2GB GDDR5 VRAM with Star Kepler architecture (640 CUDA Cores @ 1,354 MHz).
- **Black U5000 RAM**: 8GB DDR4 @ 5000 MHz (2×4GB Dual Channel, CL16-18-18-38).
- **Bolt NV-256 Storage**: 256GB NVMe M.2 SSD (3,500 MB/s Read, 2,400 MB/s Write).
- **System-Wide Telemetry Integration**: Branded specifications featured across System Monitor, About PC, Terminal `neofetch`, and Boot Screen hardware POST initialization.

### 🚀 macOS-Style Boot Screen Sequence
- **3.2-Second Boot Sequence**: Realistic boot overlay with CSS-drawn WebOS window logo, pulsing glow, and scale transitions.
- **Non-Linear Progress Bar**: Smoothly animated progress indicator (0% → 100%) with shimmer effect.
- **Hardware POST & Initialization Stream**: Live scrolling boot status messages covering motherboard POST, CPU/RAM/GPU detection, and app registry.
- **Input Blocking**: Captures and blocks all user input until the OS fully loads and transitions to the desktop.


### 🖥️ Desktop & Window Management
- **Window Management**: Drag, minimize, maximize, resize, z-index depth layering, and traffic light controls (close, minimize, expand).
- **Window Snapping**: Drag windows to screen edges or corners for split-screen layout snapping (half-screen left/right, top-half/bottom-half, full-screen).
- **Desktop Shortcuts**: Drag and drop shortcuts with automated grid layout alignment, double-click execution, and context menus.
- **Interactive Dock**: Dock icon hover magnification, active app indicators, reordering via drag-and-drop, and system trash.

### 🛒 Virtual App Store & Mbank
- **App Store**: Built-in store with 10 virtual web applications (7 free apps, 2 premium apps, and Mbank).
- **Mbank Virtual Wallet**: Complete payment gateway simulation with credit card UI, transaction history, and top-up features for purchasing premium apps.
- **App Uninstall System**: Uninstall apps directly from the App Store detail modal, desktop right-click context menu, or Settings → Apps. System apps like Mbank are protected from uninstallation.

### ⚙️ System Settings & About OS
- **General Settings**: Wallpaper customization, accent colors, system preferences, and user preferences stored in `localStorage`.
- **Apps Manager**: Detailed list of installed apps with size specifications, system app badges, and one-click uninstallation.
- **About PC & About OS**: Comprehensive hardware telemetry, build specifications, credits, scrollable MIT license view, and interactive easter egg.
- **Standalone Version History**: Dedicated changelog tab tracking reverse chronological releases from v0.1 through v0.6.3.

---

## 🚀 Virtual Applications Included

1. **Finder**: File system navigator with directory tree and local file previews.
2. **Notes**: Text editing scratchpad with auto-save persistence.
3. **Calculator**: Full arithmetic, history memory, and standard key operations.
4. **Settings**: Centralized OS configuration with 5 dedicated sections.
5. **System Monitor**: Real-time CPU usage charts, JS heap memory tracker, and active process lists.
6. **Weather**: Simulated multi-city weather forecasts and climate metrics.
7. **Terminal**: Interactive CLI shell supporting `help`, `clear`, `echo`, `date`, `sysinfo`, `uname`, and `ls`.
8. **Music Player**: Audio player with equalizer visualizer and playlist selection.
9. **Paint**: HTML5 Canvas drawing tool with adjustable brush sizes and color swatches.
10. **World Clock**: Live real-time multi-timezone clocks (Local, UTC, New York, Tokyo).
11. **Web Browser**: Virtual web browser with tab navigation and internal pages.
12. **Calendar**: Monthly calendar planner with event creation per date.
13. **Game Center**: High-score leaderboards and player profile stats.
14. **Video Editor**: Interactive multi-track timeline preview and clip management tool.

---

## 🛠️ Architecture & Tech Stack

- **Frontend Core**: Vanilla HTML5, CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism backdrop-blur), JavaScript (ES6+ Modules & IIFEs).
- **Offline & Standalone**: Zero external dependencies, npm runtime packages, or external API fetch calls.
- **Modular Component Design**: Every component, app, and utility is isolated in its own modular script file respecting strict single-responsibility boundaries.

---

## 📜 License

Distributed under the **MIT License**. See `settings-about-os-sections.js` or the Settings → About OS section for details.

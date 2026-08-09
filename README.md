# WebOS v0.6.5

An in-browser desktop operating system built entirely with vanilla HTML, CSS, and modular JavaScript. WebOS operates completely offline without external libraries, frameworks, or remote API calls.

---

## 🌟 Key Features

### 🌐 Browser System App & Internet Ecosystem (NEW in v0.6.5)
- **Pre-installed Core System App**: Browser is now a permanent dock system app (cannot be uninstalled).
- **Mbank Web Service (`www.mbank.webos`)**: Mbank has migrated from a standalone app to a full-featured online banking web service with balance management, card details, top-up options, and transaction logs.
- **BUYNET Fiber Internet (`www.buynet.webos`)**: Integrated Internet Service Provider website featuring 5 bandwidth tiers (Starter 10 Mbps, Everyday 50 Mbps, Performance 100 Mbps, Pro 250 Mbps, and Ultimate 1 Gbps) payable via Mbank wallet.
- **Enhanced Browser Navigation**: Universal address bar, bookmarks bar (Home, Mbank, BUYNET, Store, Search), back/forward history stack, and real-time ISP connection status bar.
- **WebOS Search Engine (`webos://search`)**: Native ecosystem search engine indexing web services, banking tools, news, and system applications.
- **Realistic App Store Downloads**: Dynamic download simulation displaying download speeds (MB/s), time remaining, animated progress bars, and installation toasts scaled to active BUYNET internet plan bandwidth.

### ⚡ Custom Hardware Branding
- **Cyclone 1st Gen X9 CPU**: 2 Cores, 4 Threads @ 2.1 - 2.7 GHz (14nm, 35W TDP).
- **Star R Pro GPU**: 2GB GDDR5 VRAM with Star Kepler architecture (640 CUDA Cores @ 1,354 MHz).
- **Black U5000 RAM**: 8GB DDR4 @ 5000 MHz (2×4GB Dual Channel, CL16-18-18-38).
- **Bolt NV-256 Storage**: 256GB NVMe M.2 SSD (3,500 MB/s Read, 2,400 MB/s Write).
- **System-Wide Telemetry Integration**: Branded specifications featured across System Monitor, About PC, Terminal `neofetch`, and Boot Screen hardware POST initialization.

### 🚀 Boot Screen Sequence
- **3.2-Second Boot Sequence**: Realistic boot overlay with CSS-drawn WebOS window logo, pulsing glow, and scale transitions.
- **Non-Linear Progress Bar**: Smoothly animated progress indicator (0% → 100%) with shimmer effect.
- **Hardware POST & Initialization Stream**: Live scrolling boot status messages covering motherboard POST, CPU/RAM/GPU detection, and app registry.

### 🖥️ Desktop & Window Management
- **Window Management**: Drag, minimize, maximize, resize, z-index depth layering, and traffic light controls (close, minimize, expand).
- **Window Snapping**: Drag windows to screen edges or corners for split-screen layout snapping (half-screen left/right, top-half/bottom-half, full-screen).
- **Desktop Shortcuts**: Drag and drop shortcuts with automated grid layout alignment, double-click execution, and context menus.
- **Interactive Dock**: Dock icon hover magnification, active app indicators, reordering via drag-and-drop, and system trash.

---

## 🛠️ Architecture & Tech Stack

- **Frontend Core**: Vanilla HTML5, CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism backdrop-blur), JavaScript (ES6+ Modules & IIFEs).
- **HH1 Architecture**: Strict 150-line hard cap per file, single responsibility per file, offline-first execution, no inline script or style tags.
- **Modular Component Design**: Every component, app, and utility is isolated in its own modular script file respecting strict single-responsibility boundaries.

---

## 📜 License

Distributed under the **MIT License**. See Settings → About OS section for details.

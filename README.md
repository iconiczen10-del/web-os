# ⚡ WebOS v0.7.1.1.A — Next-Gen In-Browser Desktop Operating System

[![WebOS Version](https://img.shields.io/badge/WebOS-v0.7.1.1.A-0a84ff?style=for-the-badge&logo=javascript)](https://webos.dev)
[![Architecture](https://img.shields.io/badge/Architecture-HH1%20Vanilla%20JS-30d158?style=for-the-badge)](https://webos.dev)
[![Offline First](https://img.shields.io/badge/Offline-100%25%20Client--Side-bf5af2?style=for-the-badge)](https://webos.dev)
[![Codebase Stats](https://img.shields.io/badge/Files-128%20Files%20%7C%2010.6K%20LOC-ff9f0a?style=for-the-badge)](https://webos.dev)

```
   ██╗██╗██╗  ██╗███████╗██████╗ ███████╗ ██████╗  ██████╗  ██████╗
  ████████╗██║  ██║██╔════╝██╔══██╗██╔════╝██╔═══██╗██╔════╝ ██╔════╝
  ╚██████╔╝███████║█████╗  ██████╔╝███████╗██║   ██║███████╗ ███████╗
  ████████╗██╔══██║██╔══╝  ██╔══██╗╚════██║██║   ██║╚════██║ ╚════██║
  ╚██╔═██╔╝██║  ██║███████╗██████╔╝███████║╚██████╔╝███████║ ███████║
   ╚═╝ ╚═╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝ ╚══════╝
```

> **Experience a full-featured, zero-dependency desktop operating system running live inside your browser.** Built with raw HTML5, CSS3, and modular ES6+ JavaScript, WebOS delivers high-performance window management, simulated hardware telemetry, an online banking ecosystem, and a real-time system monitor.

---

## 🚀 Key Highlights & Capabilities

### 📊 Real-Time System Monitor & Telemetry
* **4 Dedicated Telemetry Tabs**: Overview, CPU, Memory, and GPU dashboards with live animated charts updating every 500ms.
* **Cyclone X9 Core Tracker**: Per-core frequency and load breakdown for the custom Cyclone 1st Gen X9 dual-core architecture.
* **VRAM & Fan Metrics**: Real-time Star R Pro GPU thermal tracking, fan speed control, and memory allocation.
* **Live Process Manager**: End processes, force-quit frozen windows, or trigger **End All Processes** to instant-clear workspace memory.
* **Resource Alert Engine**: Automated visual popups and warning toasts for elevated CPU, RAM, or thermal spikes.

### 🌐 Simulated Web & Banking Ecosystem
* **System Browser (`webos://`)**: Native browser with full navigation history, search engine (`webos://search`), and custom websites.
* **Mbank Virtual Banking (`www.mbank.webos`)**: Live balance tracking ($50 starting wallet), transaction history, debit card UI, and top-ups.
* **BUYNET ISP Manager (`www.buynet.webos`)**: Choose from 5 fiber internet tiers (10 Mbps to 1 Gbps) that dynamically dictate App Store download speeds.
* **Wallpapers PCS App**: Premium wallpaper gallery with Pro tier subscription ($4.99/mo) integrated directly with Mbank payment processing.

### 🖥️ Window Manager & Desktop UX
* **Edge & Corner Snapping**: Snap windows into split-screen left/right, top/bottom half, or full-screen zones with visual drop targets.
* **Interactive Dock & Grid**: Hover icon magnification, active status badges, drag-to-reorder, and Trash drop target.
* **Desktop Shortcuts**: Auto-aligning grid layout with drag-and-drop repositioning and right-click context menus.
* **Boot POST Sequence**: 3.2-second boot overlay with CSS-drawn WebOS window logo, shimmer progress bar, and hardware detection logs.

### 🔒 Security & Additive Version History
* **Locked Changelog (PIN: 9610)**: Password-protected Settings → Version History tab with shake animations and smooth fade transitions.
* **Pure Additive Changelog**: Every release from `v0.1` to `v0.7.1.1.A` is preserved in dedicated, unmerged sequence cards.

---

## 🛠️ Hardware Specification Matrix

| Component | Hardware Specification | Runtime Telemetry |
| :--- | :--- | :--- |
| **Processor** | Cyclone 1st Gen X9 (2 Cores / 4 Threads @ 2.7 GHz) | Live Per-Core Load Breakdown |
| **Graphics** | Star R Pro (2GB GDDR5 VRAM, Kepler Architecture) | VRAM, Temp & Fan Speed Metrics |
| **Memory** | Black U5000 8GB DDR4 @ 5000 MHz | Live Used / Cached / Free Breakdown |
| **Storage** | Bolt NV-256 256GB NVMe M.2 SSD | Read: 3,500 MB/s \| Write: 2,400 MB/s |

---

## ⚡ Architecture & HH1 Engineering Rules

WebOS adheres strictly to **HH1 Modular Architecture Guidelines**:

```
 ┌────────────────────────────────────────────────────────┐
 │                    INDEX.HTML                          │
 │              (Minimal 25-line Skeleton)                │
 └───────────┬────────────────────────────────┬───────────┘
             │                                │
 ┌───────────▼───────────┐        ┌───────────▼───────────┐
 │     LOADER-CSS.JS     │        │     LOADER-JS.JS      │
 │  (Cascading Styles)   │        │ (Dependency Ingestion)│
 └───────────────────────┘        └───────────┬───────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │  128 Modular Files (< 150 Lines Each)        │
                      │  • Window Engine      • System Monitor        │
                      │  • Browser & Mbank    • Settings & Security   │
                      └───────────────────────────────────────────────┘
```

1. **150-Line Hard Cap**: Every single file across the 128-file codebase is capped at **≤ 150 lines** for maximum modularity and clarity.
2. **Zero External Dependencies**: No React, Vue, jQuery, Tailwind, or external NPM libraries. 100% standard web technologies.
3. **100% Offline Execution**: Zero `fetch()`, `axios`, or remote server dependencies.
4. **Single Responsibility Principle**: One job per file (UI layout, graph helper, payment route, command parser).

---

## 📜 Codebase Overview

* **Total Files**: `128 Files`
* **Total Code Lines**: `10,605 Lines`
* **Core Runtime**: `82 JavaScript Modules` + `34 CSS Modules`
* **License**: **MIT License** — Open Source & Moddable

---

*Designed and engineered with passion for the browser environment.*

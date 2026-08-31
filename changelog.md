# WebOS Changelog

## [v0.10.0] - 2026-08-30
### POSE: Persistent Operating System Ecosystems + ETA System
- **POSE v1 by Tyfon Inc. (10 GB Simulated Footprint)**:
  - Full manual session persistence engine powered by IndexedDB (`webosdb` database).
  - Preserves entire operating system state: installed apps, virtual filesystem (100+ files and folders), Mbank balances and transactions, active BUYNET plan, browser history, desktop wallpapers, dock order, Notes drafts, and Calendar events.
  - Manual save (`Save Progress`), manual restore (`Restore from Save`), and save purge (`Clear Save`).
  - 3-second vector 2D canvas boot intro animation upon app launch featuring Core Formation, Ecosystem Network, and Lock/Persist phases.
  - Activated and deactivated exclusively on the official Tyfon Inc. portal (`www.tyfon.webos`).
  - Ephemeral boot policy when inactive or save cleared (resets to fresh WebOS on page refresh).
  - Version Guard (Option 3): Incompatible save modal with clean recovery path for cross-version state changes.
- **Tyfon Inc. Corporate Portal (`www.tyfon.webos`)**:
  - 5 responsive showcase tabs: Home, POSE, Tech, Pricing, and Support.
  - 5 interactive 2D canvas screenshots rendered natively on `<canvas>` context (Dashboard, Save Progress Flow, Restore Session, Deactivated State, Version Conflict).
  - Live POSE status widget and master activation toggle.
- **ETA System — Stable Service Architecture (SSA)**:
  - Centralized download manager (`window.etaCore.startDownload`) powering the App Store, system updates, and browser downloads.
  - Pluggable pre-flight verifications: Network Speed Check, Storage Capacity Check (`freeMB >= sizeMB`), Version Compatibility Check (`requiresOS`), Mbank Balance Check, and Duplicate App Check.
  - Real ETA calculations based on live BUYNET bandwidth tiers (Default 0.2 MB/s, Starter 1.25 MB/s, Everyday 6.25 MB/s, Performance 12.5 MB/s, Pro 31.25 MB/s, Ultimate 125 MB/s) with dynamic ±10% jitter and no artificial 60-second cap.
  - Real-time pre-flight analysis modal with intelligent plan upgrade recommendations.
  - Global floating download queue overlay with Pause, Resume, and Cancel capabilities.
  - Post-download payload checksum integrity verification (SHA-256 simulation).

## [v0.9.2.1.2] - 2026-08-27
### Real System Files + VT-23x/DER-0 File Structures
- **Real Windows-Style System Folder (12 GB)**: Expanded system hierarchy with 100+ files across Kernel, Desktop, Boot, Drivers (GPU, Audio, Network, Display, USB, Input, Power, Storage), Config, Fonts, Logs, and Temp subfolders, along with a 1.2 GB `pagefile.wsys`.
- **Zero Protection & Real Deletion Consequences**: Removed artificial deletion protection; deleting `ntoskrnl.wsys` triggers instant Kernel Panic BSOD, deleting `explorer.wsys` collapses the desktop shell, deleting `bootmgr.wsys` disables next boot, and driver removals impair device subsystems.
- **VT-23x Package Structure (1.2 GB)**: Folder created in Finder upon installation containing `VT-optimizer.wsys`, `VT-config.wsys`, `VT-engine.wsys`, `VT-database.wsys`, and `VT-service.wsys`.
- **DER-0 Package Structure (3.2 GB)**: Folder created in Finder containing `DER-main.der`, `DER-config.der`, `DER-service.der`, `DER-cache.der`, `DER-network.der`, and the neutralizing `DER-00` payload.
- **Dynamic Dump Files**: Generates real dump files in `/Downloads` during DER-0 corruption timeline, expanding storage usage to 30+ GB.
- **Finder Navigation**: Full subfolder browsing, breadcrumbs navigation, and context menu actions for all system files.

## [v0.9.2.1.1] - 2026-08-27
### AI Chat Knowledge Tab Scroll Fix
- **Scroll Fix & Constraints**: Fixed overflowing content and missing scroll capability in AI Chat Knowledge tab. All 90 topics and 463+ questions are now fully scrollable and accessible.
- **Scroll Preservation**: Maintained exact scroll position when expanding or collapsing categories and topics.
- **Styling**: Added custom thin blue scrollbar (`#00bfff33`), `touch-action: pan-y`, and smooth inertia scrolling.

## [v0.9.2.1] - 2026-08-27
### Security & Corruption Simulation
- **DER-0 Corrupt Update Package**: Available in Settings → WebOS Update tab (appears 30s after VT-23x installation or manually triggered).
- **5-Minute Progression Engine**:
  - **Minute 1**: 30s calm, initial junk payload generation (+10MB/s), first system error popup.
  - **Minute 2**: Window jitter/shaking, deletion of audio and Wi-Fi drivers, memory overrun error, corrupted app launches.
  - **Minute 3**: Intense window jitter, screen RGB glitching, display/monitor driver deletion, I/O errors.
  - **Minute 4**: Deletion of GPU, USB, and RAM drivers, system memory overload, critical shutdown warnings.
  - **Minute 5**: Complete kernel driver purge, trigger of authentic BSOD crash dump progress, and final system collapse summary.
- **Recovery Mechanics**:
  - Finder deletion of `DER-00` (600 MB) in `/System/DER-0` stops all corruption instantly.
  - Safe Mode Reboot option from the Death Screen restores system integrity.
  - Device Manager driver reinstallation restores purged hardware drivers.

## [v0.9.2] - 2026-08-27
### VT-23x & VT-Optimizer
- **WebOS Update Tab**: Added in Settings with available updates list and installed history.
- **VT-23x Package**: 1.2 GB update package with download and simulated restart flow.
- **VT Icon & Optimizer**: Canvas-drawn CPU chip top bar icon with real -5% CPU drop across apps.

## [v0.9.1.1] - 2026-08-26
- Performance optimization and bug fixes.

## [v0.9.1] - 2026-08-26
- System metrics and developer console additions.

## [v0.9.0] - 2026-08-25
- Major ecosystem update, WebTube and AI Chat integrations.

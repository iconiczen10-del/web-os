/* === FILE: filesystem-data.js === */
/**
 * WebOS v0.8.0 File System Initial Tree & System Data
 */
(function () {
  const INITIAL_FOLDERS = [
    { id: "desktop", name: "Desktop", path: "/Desktop", icon: "🖥️", protected: false },
    { id: "documents", name: "Documents", path: "/Documents", icon: "📁", protected: false },
    { id: "downloads", name: "Downloads", path: "/Downloads", icon: "📥", protected: false },
    { id: "pictures", name: "Pictures", path: "/Pictures", icon: "🖼️", protected: false },
    { id: "music", name: "Music", path: "/Music", icon: "🎵", protected: false },
    { id: "videos", name: "Videos", path: "/Videos", icon: "🎬", protected: false },
    { id: "applications", name: "Applications", path: "/Applications", icon: "📦", protected: false },
    { id: "system", name: "System", path: "/System", icon: "🔒", protected: true }
  ];

  const INITIAL_FILES = [
    // Documents
    { id: "f-doc-1", name: "Project-Notes.wtext", folder: "/Documents", ext: ".wtext", type: "WebOS text document", sizeMB: 0.012, sizeLabel: "12 KB", icon: "📝", protected: false, created: "2026-08-01", modified: "2026-08-15" },
    { id: "f-doc-2", name: "Budget.wdata", folder: "/Documents", ext: ".wdata", type: "WebOS database file", sizeMB: 0.048, sizeLabel: "48 KB", icon: "📊", protected: false, created: "2026-08-05", modified: "2026-08-14" },
    { id: "f-doc-3", name: "Ideas.wtext", folder: "/Documents", ext: ".wtext", type: "WebOS text document", sizeMB: 0.008, sizeLabel: "8 KB", icon: "📝", protected: false, created: "2026-08-10", modified: "2026-08-16" },

    // Music
    { id: "f-mus-1", name: "Summer-Vibes.waudio", folder: "/Music", ext: ".waudio", type: "WebOS audio file", sizeMB: 8.2, sizeLabel: "8.2 MB", icon: "🎵", protected: false, created: "2026-07-20", modified: "2026-07-20" },
    { id: "f-mus-2", name: "Neon-Nights.waudio", folder: "/Music", ext: ".waudio", type: "WebOS audio file", sizeMB: 7.1, sizeLabel: "7.1 MB", icon: "🎵", protected: false, created: "2026-07-25", modified: "2026-07-25" },

    // System (12 GB Total, Protected)
    { id: "f-sys-1", name: "kernel.wsys", folder: "/System", ext: ".wsys", type: "WebOS System Kernel", sizeMB: 4300.8, sizeLabel: "4.2 GB", icon: "⚙️", protected: true, created: "2026-01-01", modified: "2026-08-16" },
    { id: "f-sys-2", name: "desktop.wsys", folder: "/System", ext: ".wsys", type: "WebOS Desktop Core", sizeMB: 2867.2, sizeLabel: "2.8 GB", icon: "🖥️", protected: true, created: "2026-01-01", modified: "2026-08-16" },
    { id: "f-sys-3", name: "window-manager.wsys", folder: "/System", ext: ".wsys", type: "WebOS Window Manager", sizeMB: 2150.4, sizeLabel: "2.1 GB", icon: "🪟", protected: true, created: "2026-01-01", modified: "2026-08-16" },
    { id: "f-sys-4", name: "boot-loader.wsys", folder: "/System", ext: ".wsys", type: "WebOS Boot Loader", sizeMB: 1638.4, sizeLabel: "1.6 GB", icon: "⚡", protected: true, created: "2026-01-01", modified: "2026-08-16" },
    { id: "f-sys-5", name: "system-resources.wsys", folder: "/System", ext: ".wsys", type: "WebOS System Resources", sizeMB: 1331.2, sizeLabel: "1.3 GB", icon: "🧱", protected: true, created: "2026-01-01", modified: "2026-08-16" }
  ];

  window.fsData = {
    folders: INITIAL_FOLDERS,
    files: INITIAL_FILES,
    totalStorageGB: 64,
    systemSizeGB: 12,
    hardwareSpecs: {
      brand: "Bolt",
      model: "NV-64",
      type: "NVMe M.2 SSD",
      totalGB: 64,
      systemGB: 12,
      userGB: 52,
      readSpeed: "2,800 MB/s",
      writeSpeed: "1,800 MB/s"
    }
  };
})();

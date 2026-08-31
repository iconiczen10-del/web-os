/* === FILE: filesystem-data.js === */
/**
 * WebOS v0.9.2.1.2 File System Initial Tree & System Data Registry
 */
(function () {
  const BASE_FOLDERS = [
    { id: "desktop", name: "Desktop", path: "/Desktop", icon: "🖥️", protected: false },
    { id: "documents", name: "Documents", path: "/Documents", icon: "📁", protected: false },
    { id: "downloads", name: "Downloads", path: "/Downloads", icon: "📥", protected: false },
    { id: "pictures", name: "Pictures", path: "/Pictures", icon: "🖼️", protected: false },
    { id: "music", name: "Music", path: "/Music", icon: "🎵", protected: false },
    { id: "videos", name: "Videos", path: "/Videos", icon: "🎬", protected: false },
    { id: "applications", name: "Applications", path: "/Applications", icon: "📦", protected: false },
    { id: "system", name: "System", path: "/System", icon: "⚙️", protected: false }
  ];

  const USER_FILES = [
    { id: "f-doc-1", name: "Project-Notes.wtext", folder: "/Documents", ext: ".wtext", type: "WebOS text document", sizeMB: 0.012, sizeLabel: "12 KB", icon: "📝", protected: false, created: "2026-08-01", modified: "2026-08-15" },
    { id: "f-doc-2", name: "Budget.wdata", folder: "/Documents", ext: ".wdata", type: "WebOS database file", sizeMB: 0.048, sizeLabel: "48 KB", icon: "📊", protected: false, created: "2026-08-05", modified: "2026-08-14" },
    { id: "f-doc-3", name: "Ideas.wtext", folder: "/Documents", ext: ".wtext", type: "WebOS text document", sizeMB: 0.008, sizeLabel: "8 KB", icon: "📝", protected: false, created: "2026-08-10", modified: "2026-08-16" },
    { id: "f-mus-1", name: "Summer-Vibes.waudio", folder: "/Music", ext: ".waudio", type: "WebOS audio file", sizeMB: 8.2, sizeLabel: "8.2 MB", icon: "🎵", protected: false, created: "2026-07-20", modified: "2026-07-20" },
    { id: "f-mus-2", name: "Neon-Nights.waudio", folder: "/Music", ext: ".waudio", type: "WebOS audio file", sizeMB: 7.1, sizeLabel: "7.1 MB", icon: "🎵", protected: false, created: "2026-07-25", modified: "2026-07-25" }
  ];

  function getInitialFolders() {
    const sysFolders = window.systemFilesData ? window.systemFilesData.getSystemFolders() : [];
    return [...BASE_FOLDERS, ...sysFolders];
  }

  function getInitialFiles() {
    const sysFiles = window.systemFilesData ? window.systemFilesData.getSystemFiles() : [];
    return [...USER_FILES, ...sysFiles];
  }

  window.fsData = {
    getInitialFolders,
    getInitialFiles,
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

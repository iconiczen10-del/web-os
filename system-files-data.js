/* === FILE: system-files-data.js === */
/**
 * WebOS v0.9.2.1.2 Unified System File System Registry (100+ files, 12 GB)
 */
(function () {
  function formatSize(mb) {
    if (mb >= 1024) return (mb / 1024).toFixed(1) + " GB";
    if (mb >= 1) return mb.toFixed(1) + " MB";
    return Math.max(1, Math.round(mb * 1024)) + " KB";
  }

  function getSystemFolders() {
    const f1 = window.sysFilesData1 ? window.sysFilesData1.folders : [];
    const f2 = window.sysFilesData2 ? window.sysFilesData2.folders : [];
    return [...f1, ...f2];
  }

  function getSystemFiles() {
    const raw1 = window.sysFilesData1 ? window.sysFilesData1.files : [];
    const raw2 = window.sysFilesData2 ? window.sysFilesData2.files : [];
    const all = [...raw1, ...raw2];

    return all.map((f, idx) => {
      const ext = f.ext || (f.name.includes(".") ? "." + f.name.split(".").pop() : ".wsys");
      return {
        id: `sys-f-${idx + 1}-${f.name.replace(/[^a-zA-Z0-9]/g, "-")}`,
        name: f.name,
        folder: f.folder,
        ext: ext,
        type: f.type || "WebOS System File",
        sizeMB: f.sizeMB,
        sizeLabel: formatSize(f.sizeMB),
        icon: f.icon || "⚙️",
        protected: false, // NO PROTECTION - EVERYTHING DELETABLE
        created: "2026-01-01",
        modified: "2026-08-27"
      };
    });
  }

  window.systemFilesData = {
    getSystemFolders,
    getSystemFiles,
    formatSize
  };
})();

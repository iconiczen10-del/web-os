/* === FILE: filesystem.js === */
/**
 * WebOS v0.9.2.1.2 Core File System Engine & CRUD API (Unprotected / Real Deletion)
 */
(function () {
  const TOTAL_STORAGE = 64;
  let folders = [];
  let files = [];

  function initFileSystem() {
    if (window.fsData) {
      folders = window.fsData.getInitialFolders ? window.fsData.getInitialFolders() : [];
      files = window.fsData.getInitialFiles ? window.fsData.getInitialFiles() : [];
    }
  }
  initFileSystem();

  function formatSize(mb) {
    if (mb >= 1024) return (mb / 1024).toFixed(1) + " GB";
    if (mb >= 1) return mb.toFixed(1) + " MB";
    return Math.max(1, Math.round(mb * 1024)) + " KB";
  }

  function getFolder(path) {
    return folders.find(f => f.path.toLowerCase() === (path || "").toLowerCase()) || null;
  }
  function getFolders() { return folders; }
  function getSubfolders(parentPath) {
    const p = (parentPath || "").toLowerCase();
    return folders.filter(f => (f.parentPath || "").toLowerCase() === p);
  }
  function getFiles(folderPath) {
    return files.filter(f => f.folder.toLowerCase() === (folderPath || "").toLowerCase());
  }

  function getUsedSpaceMB() { return files.reduce((acc, f) => acc + (f.sizeMB || 0), 0); }
  function getUsedSpaceGB() { return getUsedSpaceMB() / 1024; }
  function getFreeSpaceGB() { return Math.max(0, TOTAL_STORAGE - getUsedSpaceGB()); }
  function getFreeSpaceMB() { return getFreeSpaceGB() * 1024; }

  function createFolder(parentPath, name, icon = "📁") {
    let folderName = (name || "New Folder").trim();
    const cleanParent = parentPath.replace(/\/$/, "");
    const cleanPath = `${cleanParent}/${folderName}`;
    const newF = {
      id: "fld-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: folderName, path: cleanPath, parentPath: cleanParent, icon: icon,
      protected: false, created: new Date().toISOString().split("T")[0]
    };
    folders.push(newF);
    return newF;
  }

  function createFile(parentPath, name, type, sizeMB, icon) {
    let fileName = (name || "Untitled.wtext").trim();
    const ext = fileName.includes(".") ? "." + fileName.split(".").pop() : ".wtext";
    const newFile = {
      id: "file-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: fileName, folder: parentPath, ext: ext, type: type || "WebOS Document",
      sizeMB: sizeMB || 0.005, sizeLabel: formatSize(sizeMB || 0.005), icon: icon || "📄",
      protected: false, created: new Date().toISOString().split("T")[0], modified: new Date().toISOString().split("T")[0]
    };
    files.push(newFile);
    return newFile;
  }

  function deleteFile(fileId) {
    const fileIndex = files.findIndex(f => f.id === fileId || f.name === fileId);
    if (fileIndex === -1) return { success: false, reason: "File not found" };
    const f = files[fileIndex];
    files.splice(fileIndex, 1);

    if (window.systemFilesEffects && window.systemFilesEffects.applyDeletionEffect) {
      window.systemFilesEffects.applyDeletionEffect(f);
    }
    if (window.deroFiles && window.deroFiles.handleDERFileDelete) {
      window.deroFiles.handleDERFileDelete(f);
    }
    return { success: true, file: f, isApp: f.ext === ".wapp" };
  }

  function deleteFolder(folderPath) {
    const fld = getFolder(folderPath);
    if (!fld) return { success: false, reason: "Folder not found" };
    const deletedFiles = files.filter(f => f.folder.toLowerCase().startsWith(folderPath.toLowerCase()));
    deletedFiles.forEach(f => {
      if (window.systemFilesEffects && window.systemFilesEffects.applyDeletionEffect) {
        window.systemFilesEffects.applyDeletionEffect(f);
      }
      if (window.deroFiles && window.deroFiles.handleDERFileDelete) {
        window.deroFiles.handleDERFileDelete(f);
      }
    });
    files = files.filter(f => !f.folder.toLowerCase().startsWith(folderPath.toLowerCase()));
    folders = folders.filter(f => !f.path.toLowerCase().startsWith(folderPath.toLowerCase()));
    return { success: true };
  }

  function renameFile(fileId, newName) {
    const file = files.find(f => f.id === fileId);
    if (!file) return { success: false, reason: "Cannot rename file" };
    file.name = newName.trim();
    if (file.name.includes(".")) file.ext = "." + file.name.split(".").pop();
    file.modified = new Date().toISOString().split("T")[0];
    return { success: true, file };
  }

  function moveFile(fileId, destFolderPath) {
    const file = files.find(f => f.id === fileId);
    if (!file) return { success: false, reason: "Cannot move file" };
    file.folder = destFolderPath;
    file.modified = new Date().toISOString().split("T")[0];
    return { success: true, file };
  }

  function duplicateFile(fileId) {
    const file = files.find(f => f.id === fileId);
    if (!file) return { success: false, reason: "File not found" };
    const baseName = file.name.replace(file.ext, "");
    return { success: true, file: createFile(file.folder, `${baseName} copy${file.ext}`, file.type, file.sizeMB, file.icon) };
  }

  function exportFSState() {
    return { folders: JSON.parse(JSON.stringify(folders)), files: JSON.parse(JSON.stringify(files)) };
  }

  function importFSState(state) {
    if (!state) return;
    if (Array.isArray(state.folders)) folders = JSON.parse(JSON.stringify(state.folders));
    if (Array.isArray(state.files)) files = JSON.parse(JSON.stringify(state.files));
  }

  window.webosFS = {
    TOTAL_STORAGE, getFolder, getFolders, getSubfolders, getFiles,
    getUsedSpaceMB, getUsedSpaceGB, getFreeSpaceGB, getFreeSpaceMB,
    formatSize, createFolder, createFile, deleteFile, deleteFolder,
    renameFile, moveFile, duplicateFile, initFileSystem,
    exportFSState, importFSState
  };
})();

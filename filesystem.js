/* === FILE: filesystem.js === */
/**
 * WebOS v0.8.0 Core File System Engine & CRUD API
 */
(function () {
  const TOTAL_STORAGE = 64;
  const SYSTEM_SIZE = 12;
  let folders = [];
  let files = [];

  function initFileSystem() {
    if (window.fsData) {
      folders = JSON.parse(JSON.stringify(window.fsData.folders));
      files = JSON.parse(JSON.stringify(window.fsData.files));
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
  function getFiles(folderPath) {
    return files.filter(f => f.folder.toLowerCase() === (folderPath || "").toLowerCase());
  }

  function getUsedSpaceMB() { return files.reduce((acc, f) => acc + (f.sizeMB || 0), 0); }
  function getUsedSpaceGB() { return getUsedSpaceMB() / 1024; }
  function getFreeSpaceGB() { return Math.max(0, TOTAL_STORAGE - getUsedSpaceGB()); }
  function getFreeSpaceMB() { return getFreeSpaceGB() * 1024; }

  function createFolder(parentPath, name) {
    let folderName = (name || "New Folder").trim();
    if (!folderName.endsWith(".wfolder")) folderName += ".wfolder";
    const cleanPath = `${parentPath.replace(/\/$/, "")}/${folderName}`;
    const newF = {
      id: "fld-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: folderName, path: cleanPath, parentPath: parentPath, icon: "📁",
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
    if (f.protected || f.folder === "/System") return { success: false, reason: "Protected file cannot be deleted" };
    files.splice(fileIndex, 1);
    return { success: true, file: f, isApp: f.ext === ".wapp" };
  }

  function deleteFolder(folderPath) {
    const fld = getFolder(folderPath);
    if (!fld || fld.protected) return { success: false, reason: "Cannot delete folder" };
    files = files.filter(f => f.folder !== folderPath);
    folders = folders.filter(f => f.path !== folderPath);
    return { success: true };
  }

  function renameFile(fileId, newName) {
    const file = files.find(f => f.id === fileId);
    if (!file || file.protected) return { success: false, reason: "Cannot rename file" };
    file.name = newName.trim();
    if (file.name.includes(".")) file.ext = "." + file.name.split(".").pop();
    file.modified = new Date().toISOString().split("T")[0];
    return { success: true, file };
  }

  function moveFile(fileId, destFolderPath) {
    const file = files.find(f => f.id === fileId);
    if (!file || (file.protected && destFolderPath !== "/System")) return { success: false, reason: "Cannot move file" };
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

  window.webosFS = {
    TOTAL_STORAGE, SYSTEM_SIZE, getFolder, getFolders, getFiles,
    getUsedSpaceMB, getUsedSpaceGB, getFreeSpaceGB, getFreeSpaceMB,
    formatSize, createFolder, createFile, deleteFile, deleteFolder,
    renameFile, moveFile, duplicateFile, initFileSystem
  };
})();

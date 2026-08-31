/* === FILE: finder-prompts.js === */
/**
 * WebOS v0.9.2.1.2 Finder User Interaction Prompts
 */
(function () {
  function promptNewFolder(parentPath, onRefresh) {
    const name = prompt("Enter folder name:", "New Folder");
    if (name && window.webosFS) {
      window.webosFS.createFolder(parentPath, name);
      onRefresh();
    }
  }

  function promptNewFile(parentPath, onRefresh) {
    const name = prompt("Enter document name (with .wtext extension):", "Untitled.wtext");
    if (name && window.webosFS) {
      window.webosFS.createFile(parentPath, name, "WebOS text document", 0.005, "📝");
      onRefresh();
    }
  }

  function promptRename(targetItem, onRefresh) {
    const newName = prompt("Rename item:", targetItem.name);
    if (newName && window.webosFS) {
      window.webosFS.renameFile(targetItem.id, newName);
      onRefresh();
    }
  }

  window.finderPrompts = {
    promptNewFolder,
    promptNewFile,
    promptRename
  };
})();

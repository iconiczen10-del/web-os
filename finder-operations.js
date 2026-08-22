/* === FILE: finder-operations.js === */
/**
 * WebOS v0.8.0 Finder File Operations & Context Menu Handler
 */
(function () {
  let clipboardFile = null;

  function showContextMenu(e, targetItem, currentPath, containerEl, onRefresh) {
    const existing = containerEl.querySelector(".finder-context-menu");
    if (existing) existing.remove();

    const menu = document.createElement("div");
    menu.className = "finder-context-menu";

    const isSystem = targetItem && (targetItem.protected || targetItem.folder === "/System");
    const isApp = targetItem && (targetItem.ext === ".wapp" || targetItem.name.endsWith(".wapp"));
    const isFolder = targetItem && (targetItem.path || targetItem.ext === ".wfolder");

    let menuHTML = "";
    if (!targetItem) {
      menuHTML = `
        <div class="finder-ctx-item" id="ctx-new-folder">📁 New Folder</div>
        <div class="finder-ctx-item" id="ctx-new-file">📝 New Text Document</div>
        ${clipboardFile ? `<div class="finder-ctx-item" id="ctx-paste">📋 Paste File</div>` : ""}
      `;
    } else if (isSystem) {
      menuHTML = `
        <div class="finder-ctx-item" id="ctx-get-info">ℹ️ Get Info</div>
        <div class="finder-ctx-sep"></div>
        <div class="finder-ctx-item disabled">🔒 System File (Protected)</div>
      `;
    } else if (isApp) {
      menuHTML = `
        <div class="finder-ctx-item" id="ctx-launch-app">🚀 Launch Application</div>
        <div class="finder-ctx-item" id="ctx-get-info">ℹ️ Get Info</div>
        <div class="finder-ctx-sep"></div>
        <div class="finder-ctx-item" id="ctx-uninstall-app" style="color: #f87171;">🗑️ Uninstall Application</div>
      `;
    } else if (isFolder) {
      menuHTML = `
        <div class="finder-ctx-item" id="ctx-open">📂 Open Folder</div>
        <div class="finder-ctx-item" id="ctx-new-folder">📁 New Folder</div>
        <div class="finder-ctx-item" id="ctx-new-file">📝 New Text Document</div>
        <div class="finder-ctx-sep"></div>
        <div class="finder-ctx-item" id="ctx-rename">✏️ Rename</div>
        <div class="finder-ctx-item" id="ctx-get-info">ℹ️ Get Info</div>
        <div class="finder-ctx-item" id="ctx-delete" style="color: #f87171;">🗑️ Delete</div>
      `;
    } else {
      menuHTML = `
        <div class="finder-ctx-item" id="ctx-open">📄 Open</div>
        <div class="finder-ctx-item" id="ctx-rename">✏️ Rename</div>
        <div class="finder-ctx-item" id="ctx-copy">📋 Copy</div>
        <div class="finder-ctx-item" id="ctx-duplicate">📑 Duplicate</div>
        <div class="finder-ctx-item" id="ctx-get-info">ℹ️ Get Info</div>
        <div class="finder-ctx-sep"></div>
        <div class="finder-ctx-item" id="ctx-delete" style="color: #f87171;">🗑️ Delete</div>
      `;
    }

    menu.innerHTML = menuHTML;
    containerEl.appendChild(menu);

    const rect = containerEl.getBoundingClientRect();
    let left = e.clientX - rect.left;
    let top = e.clientY - rect.top;
    if (left + 150 > rect.width) left = rect.width - 160;
    if (top + 180 > rect.height) top = rect.height - 190;
    menu.style.left = `${Math.max(5, left)}px`;
    menu.style.top = `${Math.max(5, top)}px`;

    function removeMenu(evt) {
      if (!menu.contains(evt.target)) {
        menu.remove();
        document.removeEventListener("click", removeMenu);
      }
    }
    setTimeout(() => document.addEventListener("click", removeMenu), 10);

    const btnNewFolder = menu.querySelector("#ctx-new-folder");
    if (btnNewFolder) btnNewFolder.addEventListener("click", () => promptNewFolder(currentPath, onRefresh));

    const btnNewFile = menu.querySelector("#ctx-new-file");
    if (btnNewFile) btnNewFile.addEventListener("click", () => promptNewFile(currentPath, onRefresh));

    const btnPaste = menu.querySelector("#ctx-paste");
    if (btnPaste && clipboardFile) {
      btnPaste.addEventListener("click", () => {
        if (window.webosFS) {
          window.webosFS.createFile(currentPath, `Copy-of-${clipboardFile.name}`, clipboardFile.type, clipboardFile.sizeMB, clipboardFile.icon);
          onRefresh();
        }
      });
    }

    const btnRename = menu.querySelector("#ctx-rename");
    if (btnRename && targetItem) btnRename.addEventListener("click", () => promptRename(targetItem, onRefresh));

    const btnCopy = menu.querySelector("#ctx-copy");
    if (btnCopy && targetItem) btnCopy.addEventListener("click", () => { clipboardFile = targetItem; });

    const btnDuplicate = menu.querySelector("#ctx-duplicate");
    if (btnDuplicate && targetItem) {
      btnDuplicate.addEventListener("click", () => {
        if (window.webosFS) {
          window.webosFS.duplicateFile(targetItem.id);
          onRefresh();
        }
      });
    }

    const btnDelete = menu.querySelector("#ctx-delete");
    if (btnDelete && targetItem) {
      btnDelete.addEventListener("click", () => {
        if (window.webosFS) {
          window.webosFS.deleteFile(targetItem.id);
          onRefresh();
        }
      });
    }

    const btnLaunch = menu.querySelector("#ctx-launch-app");
    if (btnLaunch && targetItem) {
      btnLaunch.addEventListener("click", () => {
        const appName = targetItem.name.replace(".wapp", "").toLowerCase().replace(/-/g, "");
        if (window.windowManager) window.windowManager.openWindow(appName);
      });
    }

    const btnUninstall = menu.querySelector("#ctx-uninstall-app");
    if (btnUninstall && targetItem) {
      btnUninstall.addEventListener("click", () => {
        const appId = targetItem.name.replace(".wapp", "").toLowerCase();
        if (window.uninstallApp) window.uninstallApp(appId);
        if (window.storageManager) window.storageManager.uninstallApp(targetItem.name);
        onRefresh();
      });
    }

    const btnGetInfo = menu.querySelector("#ctx-get-info");
    if (btnGetInfo && targetItem && window.showFinderGetInfo) {
      btnGetInfo.addEventListener("click", () => window.showFinderGetInfo(targetItem, containerEl));
    }
  }

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

  window.finderOperations = {
    showContextMenu,
    promptNewFolder,
    promptNewFile,
    promptRename
  };
})();

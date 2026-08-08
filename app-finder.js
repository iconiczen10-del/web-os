/* === FILE: app-finder.js === */
/**
 * WebOS v0.3 Finder Application
 * Renders interactive file browser with sidebar folders and clickable file lists.
 */
(function () {
  const folderData = {
    Recents: ["Project Proposal.docx", "Screenshot 2026.png", "Meeting Notes.txt"],
    Documents: ["Resume.pdf", "Budget.xlsx", "Ideas.txt"],
    Downloads: ["setup.dmg", "photo.jpg", "music.mp3"],
    Pictures: ["vacation.png", "family.jpg", "wallpaper.png"]
  };

  const folderIcons = {
    Recents: "🕒",
    Documents: "📄",
    Downloads: "📥",
    Pictures: "🖼️"
  };

  function getFileIcon(filename) {
    if (filename.endsWith(".png") || filename.endsWith(".jpg")) return "🖼️";
    if (filename.endsWith(".pdf") || filename.endsWith(".docx")) return "📄";
    if (filename.endsWith(".xlsx")) return "📊";
    if (filename.endsWith(".dmg")) return "💿";
    if (filename.endsWith(".mp3")) return "🎵";
    return "📝";
  }

  window.initFinder = function (windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "0";
    contentEl.innerHTML = `
      <div class="finder-layout">
        <div class="finder-sidebar">
          ${Object.keys(folderData).map(folder => `
            <div class="finder-sidebar-item ${folder === 'Recents' ? 'active' : ''}" data-folder="${folder}">
              <span>${folderIcons[folder]}</span>
              <span>${folder}</span>
            </div>
          `).join('')}
        </div>
        <div class="finder-files" id="finder-file-list"></div>
      </div>
    `;

    const fileListEl = contentEl.querySelector("#finder-file-list");
    const sidebarItems = contentEl.querySelectorAll(".finder-sidebar-item");

    function renderFolder(folderName) {
      const files = folderData[folderName] || [];
      fileListEl.innerHTML = files.map(file => `
        <div class="finder-file" data-file="${file}">
          <span class="finder-file-icon">${getFileIcon(file)}</span>
          <span>${file}</span>
        </div>
      `).join('');

      fileListEl.querySelectorAll(".finder-file").forEach(fileEl => {
        fileEl.addEventListener("click", () => {
          const fileName = fileEl.getAttribute("data-file");
          console.log(`Opened: ${fileName}`);
        });
      });
    }

    sidebarItems.forEach(item => {
      item.addEventListener("click", () => {
        sidebarItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        const folder = item.getAttribute("data-folder");
        renderFolder(folder);
      });
    });

    renderFolder("Recents");
  };
})();

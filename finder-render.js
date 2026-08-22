/* === FILE: finder-render.js === */
/**
 * WebOS v0.8.0 Finder Content Renderer (Grid & List Views)
 */
(function () {
  function getFileExtIcon(file) {
    if (file.icon) return file.icon;
    const ext = file.ext || (file.name.includes(".") ? "." + file.name.split(".").pop() : "");
    const map = {
      ".wtext": "📝", ".wfolder": "📁", ".wimage": "🖼️", ".waudio": "🎵",
      ".wvideo": "🎬", ".wapp": "📦", ".wsys": "⚙️", ".wconf": "🔧",
      ".wdata": "📊", ".wlink": "🔗", ".wzip": "🗜️", ".wcache": "⚡"
    };
    return map[ext] || "📄";
  }

  function renderGrid(containerEl, items, selectedId, onSelect, onOpen, onContextMenu) {
    if (items.length === 0) {
      containerEl.innerHTML = `<div class="finder-empty-state"><span style="font-size:32px;opacity:0.5;">📂</span><span>Folder is empty</span></div>`;
      return;
    }
    const grid = document.createElement("div");
    grid.className = "finder-grid";

    items.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = `finder-grid-item ${item.id === selectedId ? "selected" : ""}`;
      itemEl.setAttribute("data-id", item.id);
      const icon = item.icon || getFileExtIcon(item);
      const sizeStr = item.sizeLabel || (window.webosFS ? window.webosFS.formatSize(item.sizeMB || 0) : "");

      itemEl.innerHTML = `<div class="finder-item-icon">${icon}</div><div class="finder-item-name" title="${item.name}">${item.name}</div><div class="finder-item-size">${sizeStr}</div>`;
      itemEl.addEventListener("click", (e) => { e.stopPropagation(); onSelect(item); });
      itemEl.addEventListener("dblclick", (e) => { e.stopPropagation(); onOpen(item); });
      itemEl.addEventListener("contextmenu", (e) => {
        e.preventDefault(); e.stopPropagation(); onSelect(item); onContextMenu(e, item);
      });
      grid.appendChild(itemEl);
    });
    containerEl.innerHTML = "";
    containerEl.appendChild(grid);
  }

  function renderList(containerEl, items, selectedId, sortCol, sortAsc, onSort, onSelect, onOpen, onContextMenu) {
    if (items.length === 0) {
      containerEl.innerHTML = `<div class="finder-empty-state"><span style="font-size:32px;opacity:0.5;">📂</span><span>Folder is empty</span></div>`;
      return;
    }
    const sorted = [...items].sort((a, b) => {
      let valA = sortCol === "sizeMB" ? (a.sizeMB || 0) : (a[sortCol] || "");
      let valB = sortCol === "sizeMB" ? (b.sizeMB || 0) : (b[sortCol] || "");
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    const table = document.createElement("table");
    table.className = "finder-list-table";
    table.innerHTML = `
      <thead><tr>
        <th data-col="name">Name ${sortCol === "name" ? (sortAsc ? "▲" : "▼") : ""}</th>
        <th data-col="sizeMB">Size ${sortCol === "sizeMB" ? (sortAsc ? "▲" : "▼") : ""}</th>
        <th data-col="type">Kind ${sortCol === "type" ? (sortAsc ? "▲" : "▼") : ""}</th>
        <th data-col="modified">Date Modified ${sortCol === "modified" ? (sortAsc ? "▲" : "▼") : ""}</th>
      </tr></thead>
      <tbody>
        ${sorted.map(item => {
          const icon = item.icon || getFileExtIcon(item);
          const sizeStr = item.sizeLabel || (window.webosFS ? window.webosFS.formatSize(item.sizeMB || 0) : "");
          return `<tr class="finder-list-row ${item.id === selectedId ? "selected" : ""}" data-id="${item.id}">
            <td class="finder-list-name-col"><span>${icon}</span><span title="${item.name}">${item.name}</span></td>
            <td>${sizeStr}</td><td>${item.type || "Document"}</td><td>${item.modified || item.created || "2026-08-16"}</td>
          </tr>`;
        }).join("")}
      </tbody>
    `;

    table.querySelectorAll("th").forEach(th => {
      th.addEventListener("click", () => onSort(th.getAttribute("data-col")));
    });

    table.querySelectorAll(".finder-list-row").forEach(row => {
      const item = items.find(it => it.id === row.getAttribute("data-id"));
      if (!item) return;
      row.addEventListener("click", (e) => { e.stopPropagation(); onSelect(item); });
      row.addEventListener("dblclick", (e) => { e.stopPropagation(); onOpen(item); });
      row.addEventListener("contextmenu", (e) => {
        e.preventDefault(); e.stopPropagation(); onSelect(item); onContextMenu(e, item);
      });
    });

    containerEl.innerHTML = "";
    containerEl.appendChild(table);
  }

  window.finderRender = { renderGrid, renderList, getFileExtIcon };
})();

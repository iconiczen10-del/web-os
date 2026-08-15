/* === FILE: monitor-tab-overview-actions.js === */
/**
 * WebOS v0.7.1.1 Overview Tab Process Actions & Context Menu
 */
(function () {
  let activeContextMenu = null;

  function removeContextMenu() {
    if (activeContextMenu) {
      activeContextMenu.remove();
      activeContextMenu = null;
    }
  }

  function endProcessByPid(pid, force = false) {
    const windows = Array.from(document.querySelectorAll(".window-container"));
    const procs = window.monitorProcess ? window.monitorProcess.getProcessList() : [];
    const targetProc = procs.find(p => String(p.pid) === String(pid));

    if (targetProc && targetProc.windowEl) {
      if (force) {
        if (typeof window.windowManager.forceCloseWindow === "function") {
          window.windowManager.forceCloseWindow(targetProc.windowEl);
        } else {
          window.windowManager.closeWindow(targetProc.windowEl);
        }
      } else {
        window.windowManager.closeWindow(targetProc.windowEl);
      }
    }
  }

  function showContextMenu(e, pid) {
    e.preventDefault();
    e.stopPropagation();
    removeContextMenu();

    const menu = document.createElement("div");
    menu.className = "mon-context-menu";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.innerHTML = `
      <div class="mon-menu-item" id="ctx-end-proc">End Process (Graceful)</div>
      <div class="mon-menu-item danger" id="ctx-force-proc">Force Quit (Instant)</div>
      <div class="mon-menu-item" id="ctx-detail-proc">View Details</div>
    `;

    document.body.appendChild(menu);
    activeContextMenu = menu;

    menu.querySelector("#ctx-end-proc").addEventListener("click", () => {
      endProcessByPid(pid, false);
      removeContextMenu();
    });

    menu.querySelector("#ctx-force-proc").addEventListener("click", () => {
      endProcessByPid(pid, true);
      removeContextMenu();
    });

    menu.querySelector("#ctx-detail-proc").addEventListener("click", () => {
      toggleDetailRow(pid);
      removeContextMenu();
    });

    const closeHandler = () => {
      removeContextMenu();
      document.removeEventListener("click", closeHandler);
    };
    setTimeout(() => document.addEventListener("click", closeHandler), 10);
  }

  function toggleDetailRow(pid) {
    const table = document.querySelector("#ov-process-rows");
    if (!table) return;
    const existing = table.querySelector(`.mon-detail-row[data-pid="${pid}"]`);
    if (existing) {
      existing.remove();
    } else {
      const parentRow = table.querySelector(`.mon-proc-row[data-pid="${pid}"]`);
      if (parentRow && window.monitorProcess) {
        const procs = window.monitorProcess.getProcessList();
        const p = procs.find(item => String(item.pid) === String(pid));
        if (p) {
          const detailTr = document.createElement("tr");
          detailTr.className = "mon-detail-row";
          detailTr.setAttribute("data-pid", pid);
          const runningSecs = Math.floor((Date.now() - p.startTime) / 1000);
          detailTr.innerHTML = `
            <td colspan="5">
              <div class="mon-detail-panel">
                <div><strong>Process:</strong> ${p.name} (${p.appName})</div>
                <div><strong>PID:</strong> ${p.pid} | <strong>Threads:</strong> ${Math.floor((p.pid % 5) + 2)}</div>
                <div><strong>Uptime:</strong> ${runningSecs}s | <strong>RAM:</strong> ${p.ram} MB | <strong>VRAM:</strong> ${p.vram || 0} MB</div>
                <div><button class="mon-btn-small mon-btn-close-detail" data-pid="${pid}">Close Details</button></div>
              </div>
            </td>
          `;
          parentRow.after(detailTr);
        }
      }
    }
  }

  function bindOverviewEvents(containerEl) {
    const endAllBtn = containerEl.querySelector("#mon-end-all-btn");
    if (endAllBtn) {
      endAllBtn.addEventListener("click", () => {
        const windows = Array.from(document.querySelectorAll(".window-container"));
        windows.forEach((win) => {
          const appName = win.getAttribute("data-app");
          if (appName !== "monitor") {
            window.windowManager.closeWindow(win);
          }
        });
      });
    }

    containerEl.addEventListener("contextmenu", (e) => {
      const row = e.target.closest(".mon-proc-row");
      if (row) {
        const pid = row.getAttribute("data-pid");
        showContextMenu(e, pid);
      }
    });

    containerEl.addEventListener("dblclick", (e) => {
      const row = e.target.closest(".mon-proc-row");
      if (row) {
        const pid = row.getAttribute("data-pid");
        toggleDetailRow(pid);
      }
    });

    containerEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".mon-btn-close-detail");
      if (btn) {
        const pid = btn.getAttribute("data-pid");
        const detailRow = containerEl.querySelector(`.mon-detail-row[data-pid="${pid}"]`);
        if (detailRow) detailRow.remove();
      }
    });
  }

  window.monitorOverviewActions = {
    bindOverviewEvents
  };
})();

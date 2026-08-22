/* === FILE: device-manager.js === */
/**
 * WebOS v0.8.2 Settings Device Manager Tree View & Action Handler
 */
(function () {
  let selectedDeviceId = null;

  function renderDeviceManager(containerEl) {
    if (!containerEl) return;
    const devices = window.devicesData ? window.devicesData.getAll() : [];

    const categories = [
      { name: "Processors", icon: "🖥️" },
      { name: "Display Adapters", icon: "🎮" },
      { name: "Disk Drives", icon: "💾" },
      { name: "Memory", icon: "🧠" },
      { name: "Sound, Video & Game Controllers", icon: "🔊" },
      { name: "Network Adapters", icon: "🌐" },
      { name: "Monitors", icon: "🖥️" },
      { name: "Batteries", icon: "🔋" },
      { name: "Mice & Pointing Devices", icon: "🖱️" },
      { name: "Keyboards", icon: "⌨️" },
      { name: "USB Controllers", icon: "🔌" },
      { name: "System Devices", icon: "⚡" }
    ];

    let treeHtml = `<div class="dev-tree-root">▼ 💻 <strong>WebOS-PC</strong></div><div class="dev-tree-body">`;
    categories.forEach(cat => {
      const catDevs = devices.filter(d => d.category === cat.name && d.installed);
      if (catDevs.length === 0) return;
      treeHtml += `
        <div class="dev-category-node open" data-cat="${cat.name}">
          <div class="dev-cat-header"><span class="dev-caret">▼</span> ${cat.icon} ${cat.name}</div>
          <div class="dev-cat-items">
            ${catDevs.map(d => `
              <div class="dev-item ${selectedDeviceId === d.id ? 'selected' : ''}" data-id="${d.id}">
                <span class="dev-item-status">${d.status === 'working' ? '✅' : '❌'}</span>
                <span class="dev-item-name">${d.name}</span>
                ${d.driverVersion !== '1.0.0.0' ? `<span class="dev-ver-tag">v${d.driverVersion}</span>` : ''}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    });
    treeHtml += `</div>`;

    containerEl.innerHTML = `
      <div class="dev-mgr-container">
        <div class="dev-mgr-toolbar">
          <div class="dev-mgr-title">🔧 Device Manager</div>
          <div class="dev-mgr-desc">View and manage hardware devices, drivers, and system resources.</div>
        </div>
        <div class="dev-mgr-tree-wrap">${treeHtml}</div>
        <div class="dev-mgr-actions">
          <button class="dev-btn primary" id="dev-btn-scan">🔍 Scan for Changes</button>
          <button class="dev-btn" id="dev-btn-props" ${selectedDeviceId ? '' : 'disabled'}>Properties</button>
          <button class="dev-btn danger" id="dev-btn-uninst" ${selectedDeviceId ? '' : 'disabled'}>Uninstall</button>
        </div>
      </div>
    `;

    setupTreeInteractions(containerEl);
  }

  function setupTreeInteractions(containerEl) {
    containerEl.querySelectorAll(".dev-cat-header").forEach(hdr => {
      hdr.addEventListener("click", () => {
        const node = hdr.closest(".dev-category-node");
        const isOpen = node.classList.toggle("open");
        hdr.querySelector(".dev-caret").textContent = isOpen ? "▼" : "▶";
      });
    });

    containerEl.querySelectorAll(".dev-item").forEach(item => {
      item.addEventListener("click", () => {
        containerEl.querySelectorAll(".dev-item").forEach(i => i.classList.remove("selected"));
        item.classList.add("selected");
        selectedDeviceId = item.getAttribute("data-id");
        containerEl.querySelector("#dev-btn-props").disabled = false;
        containerEl.querySelector("#dev-btn-uninst").disabled = false;
      });

      item.addEventListener("dblclick", () => {
        const devId = item.getAttribute("data-id");
        const dev = window.devicesData ? window.devicesData.getDevice(devId) : null;
        if (dev && window.deviceManagerProps) {
          window.deviceManagerProps.renderDeviceProperties(dev, (action, target) => executeOperation(action, target, containerEl));
        }
      });
    });

    containerEl.querySelector("#dev-btn-scan").onclick = () => executeOperation("scan", null, containerEl);
    containerEl.querySelector("#dev-btn-props").onclick = () => {
      const dev = window.devicesData ? window.devicesData.getDevice(selectedDeviceId) : null;
      if (dev && window.deviceManagerProps) {
        window.deviceManagerProps.renderDeviceProperties(dev, (action, target) => executeOperation(action, target, containerEl));
      }
    };
    containerEl.querySelector("#dev-btn-uninst").onclick = () => {
      const dev = window.devicesData ? window.devicesData.getDevice(selectedDeviceId) : null;
      if (!dev) return;
      if (dev.critical) {
        alert("❌ Cannot uninstall — system critical device");
        return;
      }
      executeOperation("uninstall", dev, containerEl);
    };
  }

  function executeOperation(opType, targetDev, containerEl) {
    const existing = document.getElementById("dev-progress-modal");
    if (existing) existing.remove();

    const titles = {
      disable: `Disabling ${targetDev ? targetDev.name : 'Device'}`,
      enable: `Enabling ${targetDev ? targetDev.name : 'Device'}`,
      update: `Updating Driver for ${targetDev ? targetDev.name : 'Device'}`,
      rollback: `Rolling Back Driver for ${targetDev ? targetDev.name : 'Device'}`,
      uninstall: `Uninstalling ${targetDev ? targetDev.name : 'Device'}`,
      scan: "Scanning for Hardware Changes"
    };

    const modalEl = document.createElement("div");
    modalEl.id = "dev-progress-modal";
    modalEl.className = "dev-modal-backdrop";
    modalEl.innerHTML = `
      <div class="dev-progress-dialog">
        <div class="dev-progress-title">${titles[opType] || 'Device Operation'}</div>
        <div class="dev-progress-bar-bg"><div class="dev-progress-bar-fill" id="dev-prog-fill" style="width: 0%;"></div></div>
        <div class="dev-progress-status" id="dev-prog-status">Starting operation...</div>
        <button class="dev-btn" id="dev-prog-cancel" style="margin-top: 14px; width: 100%;">Cancel</button>
      </div>
    `;
    document.body.appendChild(modalEl);

    let nextVer = "1.1.0.0";
    if (targetDev && opType === "update") {
      const curr = parseFloat(targetDev.driverVersion.split(".").slice(0, 2).join("."));
      nextVer = (curr + 0.1).toFixed(1) + ".0.0";
      targetDev.nextVersion = "v" + nextVer;
    }

    const steps = window.deviceOperations.getOperationSteps(opType, targetDev);
    const op = window.deviceOperations.start5SecOperation({
      steps,
      onProgress: (pct, text) => {
        const fill = modalEl.querySelector("#dev-prog-fill");
        const st = modalEl.querySelector("#dev-prog-status");
        if (fill) fill.style.width = pct + "%";
        if (st) st.textContent = `${pct}% ${text}`;
      },
      onComplete: () => {
        setTimeout(() => {
          modalEl.remove();
          if (opType === "disable" && targetDev) {
            window.devicesData.updateDevice(targetDev.id, { status: "disabled" });
          } else if (opType === "enable" && targetDev) {
            window.devicesData.updateDevice(targetDev.id, { status: "working" });
          } else if (opType === "update" && targetDev) {
            window.devicesData.updateDevice(targetDev.id, { previousVersion: targetDev.driverVersion, driverVersion: nextVer });
          } else if (opType === "rollback" && targetDev) {
            window.devicesData.updateDevice(targetDev.id, { driverVersion: targetDev.previousVersion || "1.0.0.0", previousVersion: null });
          } else if (opType === "uninstall" && targetDev) {
            window.devicesData.updateDevice(targetDev.id, { installed: false });
            selectedDeviceId = null;
          } else if (opType === "scan") {
            window.devicesData.getAll().forEach(d => window.devicesData.updateDevice(d.id, { installed: true }));
          }
          if (targetDev) window.deviceOperations.applyDeviceEffects(targetDev.id);
          renderDeviceManager(containerEl);
        }, 300);
      },
      onCancel: () => modalEl.remove()
    });

    modalEl.querySelector("#dev-prog-cancel").onclick = () => op.cancel();
  }

  window.renderDeviceManager = renderDeviceManager;
})();

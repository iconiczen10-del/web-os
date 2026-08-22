/* === FILE: device-manager-props.js === */
/**
 * WebOS v0.8.2 Device Properties Modal Component (4 Tabs)
 */
(function () {
  function renderDeviceProperties(dev, onActionTrigger) {
    if (!dev) return;
    const existing = document.getElementById("dev-props-modal");
    if (existing) existing.remove();

    const isWorking = dev.status === "working";
    const modalEl = document.createElement("div");
    modalEl.id = "dev-props-modal";
    modalEl.className = "dev-modal-backdrop";

    modalEl.innerHTML = `
      <div class="dev-props-dialog">
        <div class="dev-props-header">
          <div class="dev-props-title"><span class="dev-props-icon">${dev.categoryIcon}</span> ${dev.name} Properties</div>
          <button class="dev-props-close" id="dev-props-btn-close">✕</button>
        </div>
        <div class="dev-props-tabs">
          <div class="dev-tab active" data-tab="general">General</div>
          <div class="dev-tab" data-tab="driver">Driver</div>
          <div class="dev-tab" data-tab="details">Details</div>
          <div class="dev-tab" data-tab="resources">Resources</div>
        </div>
        <div class="dev-props-body" id="dev-props-content"></div>
        <div class="dev-props-footer">
          <button class="dev-btn primary" id="dev-props-btn-ok">OK</button>
          <button class="dev-btn" id="dev-props-btn-cancel">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    function renderTabContent(tabName) {
      const contentEl = modalEl.querySelector("#dev-props-content");
      if (!contentEl) return;

      if (tabName === "general") {
        contentEl.innerHTML = `
          <div class="dev-field-group">
            <div class="dev-info-row"><strong>Device Type:</strong> <span>${dev.category}</span></div>
            <div class="dev-info-row"><strong>Manufacturer:</strong> <span>${dev.manufacturer}</span></div>
            <div class="dev-info-row"><strong>Location:</strong> <span>${dev.location}</span></div>
          </div>
          <div class="dev-status-box">
            <div class="dev-status-title">Device status</div>
            <div class="dev-status-text ${isWorking ? 'working' : 'disabled'}">
              ${isWorking ? '✅ This device is working properly.' : '❌ This device is disabled.'}
            </div>
            ${dev.critical ? '<div class="dev-critical-badge">🔒 System Critical Device</div>' : ''}
          </div>
        `;
      } else if (tabName === "driver") {
        const canRollback = dev.driverVersion !== "1.0.0.0" && dev.previousVersion;
        contentEl.innerHTML = `
          <div class="dev-field-group">
            <div class="dev-info-row"><strong>Driver Provider:</strong> <span>${dev.manufacturer}</span></div>
            <div class="dev-info-row"><strong>Driver Date:</strong> <span>${dev.driverDate}</span></div>
            <div class="dev-info-row"><strong>Driver Version:</strong> <span>v${dev.driverVersion}</span></div>
            <div class="dev-info-row"><strong>Digital Signer:</strong> <span>${dev.signer}</span></div>
          </div>
          <div class="dev-driver-actions">
            <button class="dev-action-btn" id="dev-act-details">Driver Details</button>
            <button class="dev-action-btn" id="dev-act-update">Update Driver</button>
            <button class="dev-action-btn" id="dev-act-rollback" ${canRollback ? '' : 'disabled'}>Roll Back Driver</button>
            <button class="dev-action-btn" id="dev-act-toggle">${isWorking ? 'Disable Device' : 'Enable Device'}</button>
            <button class="dev-action-btn danger" id="dev-act-uninstall">Uninstall Device</button>
          </div>
        `;
        setupDriverTabEvents(contentEl);
      } else if (tabName === "details") {
        contentEl.innerHTML = `
          <div class="dev-details-select-wrap">
            <label>Property</label>
            <select id="dev-details-select" class="dev-select">
              <option value="desc">Device Description</option>
              <option value="hwid">Hardware IDs</option>
              <option value="mfg">Manufacturer</option>
              <option value="ver">Driver Version</option>
              <option value="loc">Physical Location</option>
              <option value="power">Power State</option>
            </select>
          </div>
          <div class="dev-details-val-box" id="dev-details-val">${dev.name}</div>
        `;
        const sel = contentEl.querySelector("#dev-details-select");
        const val = contentEl.querySelector("#dev-details-val");
        sel.addEventListener("change", () => {
          if (sel.value === "desc") val.textContent = dev.name;
          else if (sel.value === "hwid") val.textContent = dev.hardwareId;
          else if (sel.value === "mfg") val.textContent = dev.manufacturer;
          else if (sel.value === "ver") val.textContent = "v" + dev.driverVersion;
          else if (sel.value === "loc") val.textContent = dev.location;
          else if (sel.value === "power") val.textContent = dev.powerState;
        });
      } else if (tabName === "resources") {
        contentEl.innerHTML = `
          <div class="dev-resources-title">Resource settings:</div>
          <div class="dev-resources-box">
            <div class="dev-resource-row"><strong>I/O Range:</strong> <code>${dev.resources.io}</code></div>
            <div class="dev-resource-row"><strong>IRQ Line:</strong> <code>${dev.resources.irq}</code></div>
            <div class="dev-resource-row"><strong>Memory Range:</strong> <code>${dev.resources.mem}</code></div>
          </div>
          <div style="font-size: 11px; color: #8e8e93; margin-top: 8px;">No resource conflicts detected.</div>
        `;
      }
    }

    function setupDriverTabEvents(contentEl) {
      const detailsBtn = contentEl.querySelector("#dev-act-details");
      const updateBtn = contentEl.querySelector("#dev-act-update");
      const rollbackBtn = contentEl.querySelector("#dev-act-rollback");
      const toggleBtn = contentEl.querySelector("#dev-act-toggle");
      const uninstallBtn = contentEl.querySelector("#dev-act-uninstall");

      if (detailsBtn) detailsBtn.onclick = () => alert(`Driver Files for ${dev.name}:\n/system/drivers/${dev.id}.sys (v${dev.driverVersion})\nProvider: ${dev.manufacturer}`);
      if (updateBtn) updateBtn.onclick = () => { modalEl.remove(); onActionTrigger("update", dev); };
      if (rollbackBtn) rollbackBtn.onclick = () => { modalEl.remove(); onActionTrigger("rollback", dev); };
      if (toggleBtn) toggleBtn.onclick = () => {
        if (dev.critical && dev.status === "working") {
          alert("❌ Cannot disable — system critical device");
          return;
        }
        modalEl.remove();
        onActionTrigger(dev.status === "working" ? "disable" : "enable", dev);
      };
      if (uninstallBtn) uninstallBtn.onclick = () => {
        if (dev.critical) {
          alert("❌ Cannot uninstall — system critical device");
          return;
        }
        modalEl.remove();
        onActionTrigger("uninstall", dev);
      };
    }

    modalEl.querySelectorAll(".dev-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        modalEl.querySelectorAll(".dev-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderTabContent(tab.getAttribute("data-tab"));
      });
    });

    modalEl.querySelector("#dev-props-btn-close").onclick = () => modalEl.remove();
    modalEl.querySelector("#dev-props-btn-cancel").onclick = () => modalEl.remove();
    modalEl.querySelector("#dev-props-btn-ok").onclick = () => modalEl.remove();

    renderTabContent("general");
  }

  window.deviceManagerProps = { renderDeviceProperties };
})();

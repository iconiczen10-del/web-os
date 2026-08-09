/* === FILE: settings-apps.js === */
/**
 * WebOS v0.6.5 Settings - Apps Management Section
 */
(function () {
  function renderAppsList(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const titleEl = document.createElement("div");
    titleEl.className = "settings-section-title";
    titleEl.textContent = "Installed Apps";
    containerEl.appendChild(titleEl);

    const installedApps = (window.storeApps || []).filter(app => app.isInstalled);

    if (installedApps.length === 0) {
      const emptyEl = document.createElement("div");
      emptyEl.style.padding = "20px";
      emptyEl.style.color = "#888";
      emptyEl.style.fontSize = "13px";
      emptyEl.textContent = "No installed applications found.";
      containerEl.appendChild(emptyEl);
      return;
    }

    const listEl = document.createElement("div");
    listEl.className = "about-pc-specs";

    installedApps.forEach(app => {
      const row = document.createElement("div");
      row.className = "spec-row";
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "10px 14px";
      row.style.marginBottom = "8px";

      const isSystemApp = app.isPreInstalled || app.preInstalled || app.id === "mbank";

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 24px;">${app.icon}</span>
          <div>
            <div style="font-size: 13px; font-weight: 600; color: #fff;">${app.name}</div>
            <div style="font-size: 11px; color: #888;">${app.size || '15 MB'} • ${app.category || 'Utilities'}</div>
          </div>
        </div>
        <div>
          ${isSystemApp 
            ? `<span style="font-size: 11px; color: #666; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 12px; font-weight: 500;">System App</span>`
            : `<button class="app-uninstall-btn" data-app="${app.id}" style="background: rgba(255, 69, 58, 0.15); color: #ff453a; border: 1px solid rgba(255, 69, 58, 0.3); padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;">Uninstall</button>`
          }
        </div>
      `;

      const btn = row.querySelector(".app-uninstall-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          if (typeof window.showUninstallDialog === "function") {
            window.showUninstallDialog(app, () => {
              if (typeof window.uninstallApp === "function") {
                window.uninstallApp(app.id);
              }
              renderAppsList(containerEl);
            });
          }
        });
      }

      listEl.appendChild(row);
    });

    containerEl.appendChild(listEl);
  }

  window.renderAppsList = renderAppsList;
})();

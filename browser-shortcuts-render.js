/* === FILE: browser-shortcuts-render.js === */
/**
 * WebOS v0.10.0 Browser Shortcuts UI Renderer & Speed Dial Modal
 */
(function () {
  let activeCategory = "All";

  function openAddModal(onNavigate, onRefresh) {
    const existing = document.getElementById("browser-add-sc-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "browser-add-sc-modal";
    modal.style.cssText = "position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);";
    modal.innerHTML = `
      <div style="background: #1e1e24; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; width: 340px; color: #fff; box-shadow: 0 16px 32px rgba(0,0,0,0.5);">
        <div style="font-size: 15px; font-weight: 700; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span>➕ Add Web Shortcut</span>
          <button id="sc-modal-close" style="background:none; border:none; color:#8e8e93; font-size:16px; cursor:pointer;">✕</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
          <div>
            <label style="color:#aaa; display:block; margin-bottom:4px;">Shortcut Name</label>
            <input type="text" id="sc-in-name" placeholder="e.g. My Favorite Site" style="width:100%; box-sizing:border-box; padding:6px 10px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; font-size:12px; outline:none;" />
          </div>
          <div>
            <label style="color:#aaa; display:block; margin-bottom:4px;">Target URL</label>
            <input type="text" id="sc-in-url" placeholder="e.g. www.tyfon.webos or webos://..." style="width:100%; box-sizing:border-box; padding:6px 10px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; font-size:12px; outline:none;" />
          </div>
          <div style="display: flex; gap: 8px;">
            <div style="flex: 1;">
              <label style="color:#aaa; display:block; margin-bottom:4px;">Icon Emoji</label>
              <input type="text" id="sc-in-icon" value="⭐" maxlength="4" style="width:100%; box-sizing:border-box; padding:6px 10px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; font-size:12px; outline:none;" />
            </div>
            <div style="flex: 1;">
              <label style="color:#aaa; display:block; margin-bottom:4px;">Category</label>
              <select id="sc-in-cat" style="width:100%; box-sizing:border-box; padding:6px 8px; background:#2a2a32; border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; font-size:12px; outline:none;">
                <option value="Custom">Custom</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Media">Media</option>
                <option value="System">System</option>
                <option value="Finance">Finance</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button id="sc-modal-cancel" style="flex:1; padding:7px; background:rgba(255,255,255,0.08); border:none; border-radius:6px; color:#aaa; font-weight:600; cursor:pointer;">Cancel</button>
            <button id="sc-modal-save" style="flex:1; padding:7px; background:#0a84ff; border:none; border-radius:6px; color:#fff; font-weight:600; cursor:pointer;">Add Shortcut</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector("#sc-modal-close").onclick = close;
    modal.querySelector("#sc-modal-cancel").onclick = close;
    modal.querySelector("#sc-modal-save").onclick = () => {
      const name = modal.querySelector("#sc-in-name").value.trim();
      const url = modal.querySelector("#sc-in-url").value.trim();
      const icon = modal.querySelector("#sc-in-icon").value.trim() || "⭐";
      const category = modal.querySelector("#sc-in-cat").value;

      if (!name || !url) {
        alert("Please enter both a name and target URL.");
        return;
      }
      if (window.browserShortcuts) {
        window.browserShortcuts.addShortcut({ name, url, icon, category });
      }
      close();
      if (typeof onRefresh === "function") onRefresh();
    };
  }

  function renderShortcutsGrid(containerEl, onNavigate) {
    if (!containerEl || !window.browserShortcuts) return;
    const shortcuts = window.browserShortcuts.getShortcuts();
    const categories = ["All", "Enterprise", "Media", "System", "Finance", "Tools", "Custom"];

    const filtered = activeCategory === "All" 
      ? shortcuts 
      : shortcuts.filter(s => (s.category || "Custom").toLowerCase() === activeCategory.toLowerCase());

    containerEl.innerHTML = `
      <div style="margin-top: 14px; text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="font-size: 13px; font-weight: 700; color: #d1d5db; display: flex; align-items: center; gap: 6px;">
            <span>⚡ Shortcuts & Speed Dial</span>
            <span style="font-size: 11px; font-weight: 400; color: #8e8e93;">(${filtered.length})</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <button id="sc-btn-add" style="padding: 4px 10px; background: rgba(10,132,255,0.2); border: 1px solid rgba(10,132,255,0.4); border-radius: 6px; color: #58a6ff; font-size: 11px; font-weight: 600; cursor: pointer;">➕ Add Shortcut</button>
            <button id="sc-btn-reset" style="padding: 4px 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #8e8e93; font-size: 11px; cursor: pointer;" title="Reset Default Shortcuts">🔄</button>
          </div>
        </div>

        <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;">
          ${categories.map(cat => `
            <button class="sc-cat-chip ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}" style="padding: 3px 10px; border-radius: 12px; border: 1px solid ${activeCategory === cat ? '#0a84ff' : 'rgba(255,255,255,0.1)'}; background: ${activeCategory === cat ? '#0a84ff' : 'rgba(255,255,255,0.04)'}; color: ${activeCategory === cat ? '#fff' : '#aaa'}; font-size: 11px; font-weight: 600; cursor: pointer; white-space: nowrap;">
              ${cat}
            </button>
          `).join("")}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px;">
          ${filtered.map(sc => `
            <div class="hp-sc-card" data-url="${sc.url}" data-id="${sc.id}" style="position: relative; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 10px; cursor: pointer; text-align: center; transition: all 0.2s;">
              <div style="font-size: 24px; margin-bottom: 4px;">${sc.icon}</div>
              <div style="font-size: 12px; font-weight: 700; color: ${sc.color || '#fff'}; margin-bottom: 2px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${sc.name}</div>
              <div style="font-size: 10px; color: #8e8e93; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${sc.badge || sc.category}</div>
              ${!sc.isDefault ? `<button class="sc-del-btn" data-id="${sc.id}" style="position: absolute; top: 4px; right: 4px; background: rgba(255,69,58,0.2); border: none; color: #ff453a; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; cursor: pointer; line-height: 1;" title="Remove Shortcut">✕</button>` : ''}
            </div>
          `).join("")}
          <div id="hp-sc-new-card" style="background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.18); border-radius: 10px; padding: 12px 10px; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80px;">
            <div style="font-size: 20px; color: #58a6ff; margin-bottom: 2px;">➕</div>
            <div style="font-size: 11px; font-weight: 600; color: #58a6ff;">Add Shortcut</div>
          </div>
        </div>
      </div>
    `;

    containerEl.querySelectorAll(".sc-cat-chip").forEach(chip => {
      chip.onclick = () => {
        activeCategory = chip.getAttribute("data-cat");
        renderShortcutsGrid(containerEl, onNavigate);
      };
    });

    containerEl.querySelectorAll(".hp-sc-card").forEach(card => {
      card.onclick = (e) => {
        if (e.target.classList.contains("sc-del-btn")) return;
        const url = card.getAttribute("data-url");
        if (typeof onNavigate === "function") onNavigate(url);
      };
    });

    containerEl.querySelectorAll(".sc-del-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (window.browserShortcuts) window.browserShortcuts.removeShortcut(id);
        renderShortcutsGrid(containerEl, onNavigate);
      };
    });

    const addBtn = containerEl.querySelector("#sc-btn-add");
    const newCard = containerEl.querySelector("#hp-sc-new-card");
    const openAdd = () => openAddModal(onNavigate, () => renderShortcutsGrid(containerEl, onNavigate));
    if (addBtn) addBtn.onclick = openAdd;
    if (newCard) newCard.onclick = openAdd;

    const resetBtn = containerEl.querySelector("#sc-btn-reset");
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm("Reset all browser shortcuts to default?")) {
          if (window.browserShortcuts) window.browserShortcuts.resetShortcuts();
          renderShortcutsGrid(containerEl, onNavigate);
        }
      };
    }
  }

  window.browserShortcutsRender = {
    renderShortcutsGrid,
    openAddModal
  };
})();

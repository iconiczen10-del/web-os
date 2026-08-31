/* === FILE: app-pose.js === */
/**
 * WebOS v0.10.0 POSE Application Controller (Tyfon Inc.)
 * Features 3s canvas intro, status dashboard, manual save/restore/clear, and checklist.
 */
(function () {
  async function renderPoseUI(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    const isActive = window.poseSession ? await window.poseSession.isPoseActive() : false;
    const meta = window.poseSession ? await window.poseSession.getSessionMeta() : null;
    const installedCount = typeof window.getInstalledAppIds === "function" ? window.getInstalledAppIds().length : 0;
    const filesCount = window.webosFS ? window.webosFS.getFiles().length : 0;
    const foldersCount = window.webosFS ? window.webosFS.getFolders().length : 0;
    const balance = window.storeWallet ? window.storeWallet.getBalance() : 50.0;
    const savedTimeStr = meta && meta.savedAt ? new Date(meta.savedAt).toLocaleTimeString() + " (" + new Date(meta.savedAt).toLocaleDateString() + ")" : "Never";
    const storageBytes = meta && meta.sizeBytes ? (meta.sizeBytes / 1024).toFixed(1) + " KB" : (meta ? "1.2 KB" : "0 KB");

    contentEl.className = "window-content pose-app-container";
    contentEl.innerHTML = `
      <div class="pose-header">
        <div class="pose-branding">
          <span class="pose-logo">🧠</span>
          <div>
            <div class="pose-title">POSE Ecosystem v1</div>
            <div class="pose-subtitle">Tyfon Inc. · Persistent Session Manager</div>
          </div>
        </div>
        <div class="pose-status-pill ${isActive ? 'active' : 'inactive'}">
          <span class="pose-dot"></span>
          <span>${isActive ? 'Active (webosdb)' : 'Inactive / Ephemeral'}</span>
        </div>
      </div>

      <div class="pose-metrics-grid">
        <div class="pose-metric-card">
          <div class="pose-metric-label">System Version</div>
          <div class="pose-metric-val">v0.10.0</div>
        </div>
        <div class="pose-metric-card">
          <div class="pose-metric-label">Last Saved</div>
          <div class="pose-metric-val" id="pose-last-saved-val">${savedTimeStr}</div>
        </div>
        <div class="pose-metric-card">
          <div class="pose-metric-label">Storage Footprint</div>
          <div class="pose-metric-val" id="pose-storage-val">${storageBytes}</div>
        </div>
        <div class="pose-metric-card">
          <div class="pose-metric-label">Database Target</div>
          <div class="pose-metric-val">webosdb</div>
        </div>
      </div>

      <div class="pose-actions-row">
        <button class="pose-btn primary" id="pose-save-btn">💾 Save Progress</button>
        <button class="pose-btn secondary" id="pose-restore-btn">🔄 Restore from Save</button>
        <button class="pose-btn danger" id="pose-clear-btn">🗑️ Clear Save</button>
        <button class="pose-btn outline" id="pose-manage-btn">🌐 Manage on Tyfon</button>
      </div>

      <div class="pose-checklist-section">
        <div class="pose-section-heading">Tracked Session Artifacts</div>
        <div class="pose-checklist-grid">
          <div class="pose-check-item"><span>✓</span> Installed Apps (${installedCount})</div>
          <div class="pose-check-item"><span>✓</span> File System (${filesCount} files, ${foldersCount} folders)</div>
          <div class="pose-check-item"><span>✓</span> Mbank Balance ($${balance.toFixed(2)})</div>
          <div class="pose-check-item"><span>✓</span> System Wallpapers & Theme</div>
          <div class="pose-check-item"><span>✓</span> Dock Icon Ordering & Shortcuts</div>
          <div class="pose-check-item"><span>✓</span> Browser Navigation Stack</div>
          <div class="pose-check-item"><span>✓</span> Calendar Events & Schedules</div>
          <div class="pose-check-item"><span>✓</span> Notes Content & Drafts</div>
          <div class="pose-check-item"><span>✓</span> VT-23x / DER-0 System State</div>
          <div class="pose-check-item"><span>✓</span> Device Manager Configurations</div>
        </div>
      </div>
      <div id="pose-feedback-msg" class="pose-feedback-bar" style="display: none;"></div>
    `;

    function showFeedback(text, isError = false) {
      const fb = contentEl.querySelector("#pose-feedback-msg");
      if (!fb) return;
      fb.style.display = "block";
      fb.style.color = isError ? "#ff453a" : "#00ffaa";
      fb.innerText = text;
      setTimeout(() => { fb.style.display = "none"; }, 3500);
    }

    const saveBtn = contentEl.querySelector("#pose-save-btn");
    const restoreBtn = contentEl.querySelector("#pose-restore-btn");
    const clearBtn = contentEl.querySelector("#pose-clear-btn");
    const manageBtn = contentEl.querySelector("#pose-manage-btn");

    if (saveBtn) {
      saveBtn.onclick = async () => {
        saveBtn.disabled = true;
        saveBtn.innerText = "Saving...";
        const res = await window.poseSession.saveSession();
        saveBtn.disabled = false;
        saveBtn.innerText = "💾 Save Progress";
        if (res && res.success) {
          showFeedback("✅ Session successfully serialized and saved to webosdb");
          renderPoseUI(windowEl);
        } else {
          showFeedback("❌ Failed to save session", true);
        }
      };
    }

    if (restoreBtn) {
      restoreBtn.onclick = async () => {
        const res = await window.poseSession.restoreSession();
        if (res && res.success) {
          showFeedback("✅ Session state restored from webosdb");
          renderPoseUI(windowEl);
        } else if (res && res.incompatible) {
          showFeedback(`❌ Incompatible save from ${res.version}. Start fresh required.`, true);
        } else {
          showFeedback(res && res.reason ? "⚠️ " + res.reason : "❌ No save found", true);
        }
      };
    }

    if (clearBtn) {
      clearBtn.onclick = async () => {
        if (!confirm("Are you sure you want to clear your saved session snapshot from webosdb?")) return;
        await window.poseSession.clearSession();
        showFeedback("🗑️ Saved session snapshot cleared");
        renderPoseUI(windowEl);
      };
    }

    if (manageBtn) {
      manageBtn.onclick = () => {
        if (typeof window.openApp === "function") window.openApp("browser");
        setTimeout(() => {
          if (window._browserNavigate) window._browserNavigate("www.tyfon.webos#pose");
        }, 150);
      };
    }
  }

  function initPose(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;
    if (window._poseAnimPlayed) {
      renderPoseUI(windowEl);
    } else {
      window._poseAnimPlayed = true;
      if (window.poseBootAnim && typeof window.poseBootAnim.playPoseAnimation === "function") {
        window.poseBootAnim.playPoseAnimation(contentEl, () => renderPoseUI(windowEl));
      } else {
        renderPoseUI(windowEl);
      }
    }
  }

  window.initPose = initPose;
  window.renderPoseUI = renderPoseUI;
})();

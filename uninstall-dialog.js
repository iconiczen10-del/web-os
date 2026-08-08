/* === FILE: uninstall-dialog.js === */
/**
 * WebOS v0.6.1 Uninstall Dialog Manager
 */
(function () {
  let activeOverlay = null;
  let activeEscapeHandler = null;

  function closeUninstallDialog() {
    if (activeOverlay) {
      activeOverlay.remove();
      activeOverlay = null;
    }
    if (activeEscapeHandler) {
      document.removeEventListener("keydown", activeEscapeHandler);
      activeEscapeHandler = null;
    }
  }

  function showUninstallDialog(appData, onConfirm, onCancel) {
    closeUninstallDialog();

    if (!appData) return;

    const overlay = document.createElement("div");
    overlay.className = "uninstall-overlay";

    const isPaid = appData.price && appData.price > 0;
    const noteHtml = isPaid
      ? `<div class="uninstall-dialog-note">Note: No refund will be issued for paid apps.</div>`
      : "";

    overlay.innerHTML = `
      <div class="uninstall-dialog" onclick="event.stopPropagation()">
        <div class="uninstall-dialog-icon">${appData.icon || "📦"}</div>
        <div class="uninstall-dialog-title">Uninstall ${appData.name || "App"}?</div>
        <div class="uninstall-dialog-message">This app will be removed from your dock and desktop.</div>
        ${noteHtml}
        <div class="uninstall-dialog-actions">
          <button class="uninstall-btn uninstall-btn-cancel" id="un-cancel-btn">Cancel</button>
          <button class="uninstall-btn uninstall-btn-confirm" id="un-confirm-btn">Uninstall</button>
        </div>
      </div>
    `;

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeUninstallDialog();
        if (typeof onCancel === "function") onCancel();
      }
    });

    document.body.appendChild(overlay);
    activeOverlay = overlay;

    const cancelBtn = overlay.querySelector("#un-cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        closeUninstallDialog();
        if (typeof onCancel === "function") onCancel();
      });
    }

    const confirmBtn = overlay.querySelector("#un-confirm-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        closeUninstallDialog();
        if (typeof onConfirm === "function") onConfirm();
      });
    }

    activeEscapeHandler = (e) => {
      if (e.key === "Escape") {
        closeUninstallDialog();
        if (typeof onCancel === "function") onCancel();
      }
    };
    document.addEventListener("keydown", activeEscapeHandler);
  }

  window.showUninstallDialog = showUninstallDialog;
  window.closeUninstallDialog = closeUninstallDialog;
})();

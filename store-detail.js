/* === FILE: store-detail.js === */
/**
 * WebOS v0.6 App Store Detail Modal Component
 */
(function () {
  function closeAppDetail() {
    const existing = document.querySelector(".store-modal-overlay");
    if (existing) {
      existing.remove();
    }
  }

  function showAppDetail(appData) {
    closeAppDetail();

    const overlay = document.createElement("div");
    overlay.className = "store-modal-overlay";

    let primaryActionBtn = "";
    let uninstallBtnHtml = "";
    const isPreInstalled = appData.isPreInstalled || appData.preInstalled || appData.id === "mbank";

    if (appData.isInstalled) {
      if (isPreInstalled) {
        primaryActionBtn = `<button class="store-modal-btn store-modal-btn-secondary" disabled>✓ System App</button>`;
      } else {
        primaryActionBtn = `<button class="store-modal-btn store-modal-btn-secondary" disabled>✓ Installed</button>`;
        uninstallBtnHtml = `<button class="store-modal-btn store-modal-btn-secondary" id="modal-uninstall-btn" style="color: #ff453a; border-color: rgba(255, 69, 58, 0.3);">Uninstall</button>`;
      }
    } else if (appData.price === 0) {
      primaryActionBtn = `<button class="store-modal-btn store-modal-btn-primary" id="modal-install-btn">Install</button>`;
    } else {
      primaryActionBtn = `<button class="store-modal-btn store-modal-btn-primary" id="modal-pay-btn">💳 Pay $${appData.price.toFixed(2)}</button>`;
    }

    overlay.innerHTML = `
      <div class="store-modal" onclick="event.stopPropagation()">
        <div class="store-modal-header">
          <div class="store-modal-icon">${appData.icon}</div>
          <div class="store-modal-name">${appData.name}</div>
          <div class="store-modal-category">${appData.category} • Developer: ${appData.developer || 'WebOS'}</div>
        </div>
        
        <div class="store-modal-info">
          <div class="store-modal-info-item">
            <div class="store-modal-info-value">★ ${appData.rating || '4.5'}</div>
            <div class="store-modal-info-label">RATING</div>
          </div>
          <div class="store-modal-info-item">
            <div class="store-modal-info-value">${appData.downloads || '100k+'}</div>
            <div class="store-modal-info-label">DOWNLOADS</div>
          </div>
          <div class="store-modal-info-item">
            <div class="store-modal-info-value">${appData.size || '15 MB'}</div>
            <div class="store-modal-info-label">SIZE</div>
          </div>
          <div class="store-modal-info-item">
            <div class="store-modal-info-value">${appData.ageRating || '4+'}</div>
            <div class="store-modal-info-label">AGE</div>
          </div>
        </div>

        <div class="store-modal-desc">
          <div>${appData.description}</div>
          <div class="store-modal-desc-long">${appData.longDescription || ''}</div>
        </div>

        <div class="store-modal-actions">
          ${primaryActionBtn}
          ${uninstallBtnHtml}
          <button class="store-modal-btn store-modal-btn-secondary" id="modal-close-btn">Close</button>
        </div>

        <div class="store-modal-footer">
          Verified for WebOS Security Standard
        </div>
      </div>
    `;

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAppDetail();
      }
    });

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector("#modal-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeAppDetail);

    const installBtn = overlay.querySelector("#modal-install-btn");
    if (installBtn) {
      installBtn.addEventListener("click", () => {
        closeAppDetail();
        if (typeof window.installApp === "function") {
          window.installApp(appData.id);
        }
      });
    }

    const payBtn = overlay.querySelector("#modal-pay-btn");
    if (payBtn) {
      payBtn.addEventListener("click", () => {
        closeAppDetail();
        if (typeof window.initiatePurchase === "function") {
          window.initiatePurchase(appData);
        }
      });
    }

    const uninstallBtn = overlay.querySelector("#modal-uninstall-btn");
    if (uninstallBtn) {
      uninstallBtn.addEventListener("click", () => {
        if (typeof window.showUninstallDialog === "function") {
          window.showUninstallDialog(appData, () => {
            if (typeof window.uninstallApp === "function") {
              window.uninstallApp(appData.id);
            }
            closeAppDetail();
          });
        }
      });
    }
  }

  window.showAppDetail = showAppDetail;
  window.closeAppDetail = closeAppDetail;
})();

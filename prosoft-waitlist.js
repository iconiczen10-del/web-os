/* === FILE: prosoft-waitlist.js === */
/**
 * WebOS v0.9.0 ProSoft Waitlist Engine
 * Handles position calculations, priority jump, and status card formatting.
 */
(function () {
  function renderWaitlistWidget(container, onUpdate) {
    if (!container) return;
    const state = window.prosoftState ? window.prosoftState.getWaitlistInfo() : { position: 4827, isPriority: false, isWaitlisted: false, email: "" };

    container.innerHTML = `
      <div class="ps-wl-card">
        <div class="ps-wl-header">
          <span class="ps-wl-badge ${state.isPriority ? 'vip' : ''}">
            ${state.isPriority ? '★ VIP PRIORITY QUEUE' : '📋 STANDARD WAITLIST'}
          </span>
          <span class="ps-wl-live-dot">● LIVE SYNC</span>
        </div>

        <div class="ps-wl-pos-display">
          <div class="ps-wl-label">Your Current Queue Position</div>
          <div class="ps-wl-number">#${state.position.toLocaleString()}</div>
          <div class="ps-wl-sub">Ahead of 12,490+ registered WebOS developers</div>
        </div>

        ${!state.isPriority ? `
          <div class="ps-wl-priority-offer">
            <div class="ps-wl-offer-text">
              <strong>🚀 Don't wait in line!</strong>
              <span>Upgrade to Priority Waitlist to jump straight to spot #47.</span>
            </div>
            <button class="ps-btn ps-btn-accent" id="ps-wl-jump-btn">Skip to #47 for $25</button>
          </div>
        ` : `
          <div class="ps-wl-priority-active">
            <span>✨ Priority VIP status verified. You will receive first-wave beta invites.</span>
          </div>
        `}

        <form class="ps-wl-form" id="ps-wl-signup-form">
          <label class="ps-wl-form-label">Register Developer Email:</label>
          <div class="ps-wl-input-group">
            <input type="email" id="ps-wl-email-input" class="ps-input" placeholder="developer@company.webos" value="${state.email || ''}" required />
            <button type="submit" class="ps-btn ps-btn-primary" id="ps-wl-submit-btn">
              ${state.isWaitlisted ? 'Update Email' : 'Join Free Waitlist'}
            </button>
          </div>
          ${state.isWaitlisted ? `<div class="ps-wl-confirmed">✓ Email registered: ${state.email}</div>` : ''}
        </form>
      </div>
    `;

    const form = container.querySelector("#ps-wl-signup-form");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = container.querySelector("#ps-wl-email-input");
        if (input && input.value) {
          if (window.prosoftState) window.prosoftState.joinWaitlist(input.value.trim());
          if (typeof onUpdate === "function") onUpdate();
        }
      };
    }

    const jumpBtn = container.querySelector("#ps-wl-jump-btn");
    if (jumpBtn) {
      jumpBtn.onclick = () => {
        const prod = window.prosoftState ? window.prosoftState.getProductById("priority") : null;
        if (prod && window.prosoftPayment) {
          window.prosoftPayment.openPaymentModal(prod, () => {
            if (typeof onUpdate === "function") onUpdate();
          });
        }
      };
    }
  }

  window.prosoftWaitlist = {
    renderWaitlistWidget
  };
})();

/* === FILE: wallpapers-render.js === */
/**
 * WebOS v0.6.6.1 Wallpapers PCS UI Renderer & Auth Form
 */
(function () {
  function renderApp(containerEl, onRefresh) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const user = window.wallpapersLogin ? window.wallpapersLogin.getCurrentUser() : null;
    const isPro = window.wallpapersSubscription ? window.wallpapersSubscription.isPro() : false;
    const currentApplied = (document.getElementById("desktop") && document.getElementById("desktop").style.background) || "";

    const mainDiv = document.createElement("div");
    mainDiv.className = "wallpapers-container";
    mainDiv.innerHTML = `
      <div class="wallpapers-header">
        <div class="wallpapers-title">🖼️ Wallpapers PCS</div>
        ${user ? `<div class="wallpapers-user"><span>👤 ${user.name}</span><button id="wp-logout-btn" style="background:none;border:none;color:#f43f5e;cursor:pointer;font-size:11px;font-weight:600;">Sign Out</button></div>` : ''}
      </div>
      <div class="wallpapers-subtitle">by Papers For PC Inc.</div>
    `;

    if (user && mainDiv.querySelector("#wp-logout-btn")) {
      mainDiv.querySelector("#wp-logout-btn").addEventListener("click", () => {
        window.wallpapersLogin.signOut();
        renderApp(containerEl, onRefresh);
      });
    }

    if (!user) {
      renderAuthForm(mainDiv, containerEl, onRefresh);
      containerEl.appendChild(mainDiv);
      return;
    }

    const tierBanner = document.createElement("div");
    tierBanner.className = `wallpapers-tier-banner ${isPro ? "pro" : ""}`;
    if (isPro) {
      const expDate = window.wallpapersSubscription.getExpiryDate() || "Active";
      tierBanner.innerHTML = `<div><div style="font-weight:700;color:#c084fc;font-size:13px;">⭐ Pro Tier Active</div><div style="font-size:11px;color:#cbd5e1;">All 10 wallpapers unlocked • Renews: ${expDate}</div></div>`;
    } else {
      tierBanner.innerHTML = `<div><div style="font-weight:700;color:#38bdf8;font-size:13px;">Free Tier (4 Wallpapers)</div><div style="font-size:11px;color:#cbd5e1;">Upgrade to Pro ($4.99/mo) for 10 wallpapers & ad-free experience</div></div><button id="wp-sub-btn" class="wallpapers-btn wallpapers-btn-pro">Upgrade to Pro</button>`;
      tierBanner.querySelector("#wp-sub-btn").addEventListener("click", () => handleSubscribe(containerEl, onRefresh));
    }
    mainDiv.appendChild(tierBanner);

    const grid = document.createElement("div");
    grid.className = "wallpapers-grid";
    const items = window.wallpapersData || [];

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "wallpapers-card";
      const isLocked = item.tier === "pro" && !isPro;
      const isApplied = currentApplied === item.gradient;
      let badgeHtml = isApplied ? `<span class="wallpapers-card-badge badge-applied">Applied</span>` : item.tier === "pro" ? `<span class="wallpapers-card-badge badge-pro">${isLocked ? "🔒 Pro" : "⭐ Pro"}</span>` : `<span class="wallpapers-card-badge badge-free">Free</span>`;

      card.innerHTML = `<div class="wallpapers-card-preview" style="background:${item.gradient};"></div><div class="wallpapers-card-info"><div class="wallpapers-card-name">${item.name}</div><div class="wallpapers-card-size">${item.size}</div>${badgeHtml}</div>`;
      card.addEventListener("click", () => {
        if (window.wallpapersModal && typeof window.wallpapersModal.openPreviewModal === "function") {
          window.wallpapersModal.openPreviewModal(item, isPro, isApplied, containerEl, () => renderApp(containerEl, onRefresh), () => handleSubscribe(containerEl, onRefresh));
        }
      });
      grid.appendChild(card);
    });

    mainDiv.appendChild(grid);
    if (!isPro) {
      const ads = document.createElement("div");
      ads.className = "wallpapers-ads-banner";
      ads.textContent = "📢 Ads Banner — Upgrade to Wallpapers PCS Pro to remove ads & unlock 4K downloads ($4.99/mo)";
      mainDiv.appendChild(ads);
    }
    containerEl.appendChild(mainDiv);
  }

  function handleSubscribe(containerEl, onRefresh) {
    const res = window.wallpapersSubscription.subscribeToPro();
    alert(res.message);
    if (res.success) renderApp(containerEl, onRefresh);
  }

  function renderAuthForm(mainDiv, containerEl, onRefresh) {
    let isSignUp = false;
    const formDiv = document.createElement("div");
    formDiv.className = "wallpapers-login-form";

    function drawForm() {
      formDiv.innerHTML = `
        <div style="font-size:16px;font-weight:700;color:#fff;text-align:center;">${isSignUp ? "Create Account" : "Sign In to Wallpapers PCS"}</div>
        <div style="font-size:11px;color:#94a3b8;text-align:center;margin-bottom:8px;">Sign in to save favorites & apply wallpapers</div>
        ${isSignUp ? `<input type="text" id="wp-name" class="wallpapers-input" placeholder="Full Name" />` : ''}
        <input type="email" id="wp-email" class="wallpapers-input" placeholder="Email Address" />
        <input type="password" id="wp-pass" class="wallpapers-input" placeholder="Password (min 4 chars)" />
        <button id="wp-auth-btn" class="wallpapers-btn wallpapers-btn-primary">${isSignUp ? "Create Account" : "Sign In"}</button>
        <button id="wp-toggle-btn" style="background:none;border:none;color:#38bdf8;cursor:pointer;font-size:11px;margin-top:4px;">${isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</button>
      `;

      formDiv.querySelector("#wp-toggle-btn").addEventListener("click", () => {
        isSignUp = !isSignUp;
        drawForm();
      });

      formDiv.querySelector("#wp-auth-btn").addEventListener("click", () => {
        const email = formDiv.querySelector("#wp-email").value;
        const pass = formDiv.querySelector("#wp-pass").value;
        let res = isSignUp
          ? window.wallpapersLogin.signUp(formDiv.querySelector("#wp-name").value, email, pass)
          : window.wallpapersLogin.signIn(email, pass);

        if (res.success) {
          renderApp(containerEl, onRefresh);
        } else {
          alert(res.message);
        }
      });
    }

    drawForm();
    mainDiv.appendChild(formDiv);
  }

  window.wallpapersRender = { renderApp };
})();

/* === FILE: browser-dev-login.js === */
/**
 * Developer Portal Stage 1 - Login & Signup Handler
 */
(function () {
  function renderLoginPage(containerEl, onSuccess) {
    let mode = "login";
    
    function draw() {
      containerEl.innerHTML = `
        <div class="dev-stage-wrap">
          <div class="dev-stage-header">
            <h1 class="dev-stage-title">🔧 WebOS Developer Portal</h1>
            <p class="dev-stage-sub">Access developer resources, system internals, and hidden knowledge.</p>
          </div>
          <div class="dev-auth-card">
            <div class="dev-auth-tabs">
              <button class="dev-auth-tab ${mode === 'login' ? 'active' : ''}" id="btn-mode-login">Sign In</button>
              <button class="dev-auth-tab ${mode === 'signup' ? 'active' : ''}" id="btn-mode-signup">Create Account</button>
            </div>
            <div id="dev-auth-msg" class="dev-auth-err" style="display:none;"></div>
            ${mode === 'login' ? `
              <div class="dev-form-group"><label>Username</label><input type="text" id="dev-login-user" placeholder="Enter username..." /></div>
              <div class="dev-form-group"><label>Password</label><input type="password" id="dev-login-pass" placeholder="Enter password..." /></div>
              <button class="dev-btn-primary" id="dev-btn-submit">Sign In</button>
            ` : `
              <div class="dev-form-group"><label>Username (min 3 chars)</label><input type="text" id="dev-signup-user" placeholder="Choose username..." /></div>
              <div class="dev-form-group"><label>Email</label><input type="email" id="dev-signup-email" placeholder="dev@webos.com" /></div>
              <div class="dev-form-group"><label>Password (min 4 chars)</label><input type="password" id="dev-signup-pass" placeholder="Create password..." /></div>
              <div class="dev-form-group"><label>Confirm Password</label><input type="password" id="dev-signup-confirm" placeholder="Confirm password..." /></div>
              <button class="dev-btn-primary" id="dev-btn-submit">Create Account</button>
            `}
          </div>
        </div>
      `;

      containerEl.querySelector("#btn-mode-login").onclick = () => { mode = "login"; draw(); };
      containerEl.querySelector("#btn-mode-signup").onclick = () => { mode = "signup"; draw(); };

      const msgEl = containerEl.querySelector("#dev-auth-msg");
      const submitBtn = containerEl.querySelector("#dev-btn-submit");

      submitBtn.onclick = () => {
        if (mode === "login") {
          const u = containerEl.querySelector("#dev-login-user").value.trim();
          const p = containerEl.querySelector("#dev-login-pass").value;
          if (!u || !p) {
            msgEl.textContent = "Please fill in all fields.";
            msgEl.style.display = "block";
            return;
          }
          onSuccess(u);
        } else {
          const u = containerEl.querySelector("#dev-signup-user").value.trim();
          const e = containerEl.querySelector("#dev-signup-email").value.trim();
          const p = containerEl.querySelector("#dev-signup-pass").value;
          const c = containerEl.querySelector("#dev-signup-confirm").value;

          if (u.length < 3) { msgEl.textContent = "Username must be at least 3 characters."; msgEl.style.display = "block"; return; }
          if (!e.includes("@") || !e.includes(".")) { msgEl.textContent = "Please enter a valid email address."; msgEl.style.display = "block"; return; }
          if (p.length < 4) { msgEl.textContent = "Password must be at least 4 characters."; msgEl.style.display = "block"; return; }
          if (p !== c) { msgEl.textContent = "Passwords do not match."; msgEl.style.display = "block"; return; }

          onSuccess(u);
        }
      };
    }
    draw();
  }

  window.devPortalLogin = { renderLoginPage };
})();

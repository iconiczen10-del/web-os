/* === FILE: browser-dev-tabs.js === */
/**
 * Developer Portal Stage 5 - Tab Renderers (Docs, Puzzle, Secrets, FAQ, Owner)
 */
(function () {
  function renderDocsTab(containerEl) {
    containerEl.innerHTML = `
      <div class="dev-docs-wrap">
        <h2>📚 WebOS Technical Documentation</h2>
        <div class="dev-doc-sec">
          <h3>1. Technology Stack</h3>
          <p>WebOS is built strictly using Vanilla HTML5, CSS3, and ES6+ JavaScript. It uses zero external frameworks, CDNs, or build tools.</p>
        </div>
        <div class="dev-doc-sec">
          <h3>2. Modular Architecture</h3>
          <p>Every file handles a single responsibility and strictly adheres to a 150-line limit for maximum readability and clean organization.</p>
        </div>
        <div class="dev-doc-sec">
          <h3>3. Offline First & Privacy</h3>
          <p>WebOS runs 100% locally inside the browser. No network requests or external tracking APIs are ever initiated.</p>
        </div>
      </div>
    `;
  }

  function renderPuzzleTab(containerEl) {
    let showHint = false;
    function draw() {
      containerEl.innerHTML = `
        <div class="dev-puzzle-wrap">
          <h2>🧩 Settings Developer Password Puzzle</h2>
          <p>The developer options in Settings require a 4-digit passcode. Use the clues below to solve it.</p>
          <div class="dev-clues-grid">
            <div class="dev-clue-card"><h4>Clue 1: First Digit</h4><p>"Look where the terms end." (In Settings → About OS, scroll to the end of License)</p></div>
            <div class="dev-clue-card"><h4>Clue 2: Second Digit</h4><p>"The CPU has a ghost core." (Monitor CPU load 60-69% range)</p></div>
            <div class="dev-clue-card"><h4>Clue 3: Third Digit</h4><p>"Money appears from nowhere." (Mbank initial bonus deposit amount)</p></div>
            <div class="dev-clue-card"><h4>Clue 4: Fourth Digit</h4><p>"The void speaks." (Type 'clue' in Terminal)</p></div>
          </div>
          <div class="dev-spoiler-box">
            <button class="dev-btn-sec" id="btn-toggle-hint">${showHint ? 'Hide Code Hint' : 'Show Code Hint'}</button>
            ${showHint ? `<div class="dev-hint-content">💡 Digits in order: <strong>9 - 6 - 1 - 0</strong></div>` : ''}
          </div>
        </div>
      `;
      containerEl.querySelector("#btn-toggle-hint").onclick = () => { showHint = !showHint; draw(); };
    }
    draw();
  }

  function renderSecretsTab(containerEl) {
    containerEl.innerHTML = `
      <div class="dev-secrets-wrap">
        <h2>🔑 Hidden Terminal Commands & Easter Eggs</h2>
        <div class="dev-sec-list">
          <div class="dev-sec-item"><code>owner</code> / <code>hanish</code> — Displays OS creator recognition</div>
          <div class="dev-sec-item"><code>clue</code> — Reveals passcode clue 4</div>
          <div class="dev-sec-item"><code>puzzle</code> — Details password hunt instructions</div>
          <div class="dev-sec-item"><code>digits</code> — Lists all discovered password digits</div>
          <div class="dev-sec-item"><code>matrix</code> — Triggers the matrix terminal effect</div>
          <div class="dev-sec-item"><code>coffee</code> — Serves a hot coffee in terminal</div>
          <div class="dev-sec-item"><code>sudo</code> — Reports security violation attempt</div>
        </div>
      </div>
    `;
  }

  function renderFAQTab(containerEl) {
    containerEl.innerHTML = `
      <div class="dev-faq-wrap">
        <h2>❓ Frequently Asked Questions</h2>
        <div class="dev-faq-item"><strong>Q: Is WebOS running on a remote server?</strong><p>A: No. WebOS runs entirely client-side in your browser's JS runtime engine.</p></div>
        <div class="dev-faq-item"><strong>Q: How do I unlock Developer Settings?</strong><p>A: Go to Settings → For Developers and enter passcode 9610.</p></div>
        <div class="dev-faq-item"><strong>Q: What is the latest version?</strong><p>A: WebOS v0.7.4.3 (Developer Terminal v1).</p></div>
      </div>
    `;
  }

  function renderOwnerTab(containerEl) {
    containerEl.innerHTML = `
      <div class="dev-owner-wrap">
        <div class="dev-owner-title">WebOS — Created & Built by HANISH</div>
        <pre class="dev-ascii">
  ██╗  ██╗ █████╗ ███╗   ██╗██╗███████╗██╗  ██╗
  ██║  ██║██╔══██╗████╗  ██║██║██╔════╝██║  ██║
  ███████║███████║██╔██╗ ██║██║███████╗███████║
  ██╔══██║██╔══██║██║╚██╗██║██║╚════██║██╔══██║
  ██║  ██║██║  ██║██║ ╚████║██║███████║██║  ██║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝
        </pre>
        <div class="dev-owner-stats">
          <div>Version History: v0.1 → v0.7.4.3</div>
          <div>24 Versions Built • 158 Total Files • 13,542 Lines of Code</div>
        </div>
        <p class="dev-owner-quote">"The best OS is the one you build yourself." — HANISH</p>
      </div>
    `;
  }

  window.devPortalTabs = {
    renderDocsTab,
    renderPuzzleTab,
    renderSecretsTab,
    renderFAQTab,
    renderOwnerTab
  };
})();

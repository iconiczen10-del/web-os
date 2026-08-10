/* === FILE: browser-aitalks-pages-2.js === */
/**
 * AI Talks Inc. Company Website Page Content Templates (Part 2)
 */
(function () {
  function getBlogPageHTML() {
    return `
      <div class="aitalks-section">
        <h2>AI Talks Engineering Blog</h2>
        <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
          <div class="aitalks-card">
            <div style="font-size: 11px; color: #38bdf8;">August 2026 • Product Release</div>
            <h3 style="margin: 4px 0;">Announcing AI Chat v0.7.2 on WebOS</h3>
            <p>Today we launch AI Chat on WebOS with 3 subscription tiers, instant response simulation, and Mbank payment integration.</p>
          </div>
          <div class="aitalks-card">
            <div style="font-size: 11px; color: #38bdf8;">July 2026 • AI Research</div>
            <h3 style="margin: 4px 0;">Client-Side Conversational Intelligence</h3>
            <p>How local knowledge graphs allow instant zero-latency responses without remote cloud server requests.</p>
          </div>
          <div class="aitalks-card">
            <div style="font-size: 11px; color: #38bdf8;">June 2026 • Ecosystem</div>
            <h3 style="margin: 4px 0;">WebOS HH1 Architecture Deep Dive</h3>
            <p>Exploring how 150-line modular design rules make WebOS applications clean, maintainable, and robust.</p>
          </div>
        </div>
      </div>
    `;
  }

  function getContactPageHTML() {
    return `
      <div class="aitalks-section" style="max-width: 500px;">
        <h2>Contact AI Talks Inc.</h2>
        <p style="color: #94a3b8; font-size: 13px;">Get in touch with our team in San Francisco, Berlin, or Singapore.</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 12px; margin-top: 16px; font-size: 12px; color: #cbd5e1;">
          <p>📧 Email: <a style="color: #38bdf8;">support@aitalks.webos</a></p>
          <p>🏢 HQ: 100 Artificial Intelligence Way, San Francisco, CA 94105</p>
        </div>
      </div>
    `;
  }

  if (window.aiTalksPages) {
    window.aiTalksPages.getBlogPageHTML = getBlogPageHTML;
    window.aiTalksPages.getContactPageHTML = getContactPageHTML;
  }
})();

/* === FILE: browser-aitalks-pages.js === */
/**
 * AI Talks Inc. Company Website Page Content Templates
 */
(function () {
  function getHomePageHTML() {
    return `
      <div class="aitalks-hero">
        <span style="font-size: 48px;">🤖</span>
        <h1>AI Talks Inc.</h1>
        <p>Intelligent Conversation, Accessible to All.</p>
      </div>

      <div class="aitalks-section">
        <h2>Flagship Product: AI Chat for WebOS</h2>
        <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
          Experience conversational AI running 100% locally in your browser. From coding help and technical specs to math solutions and jokes, AI Chat is designed for seamless productivity on WebOS.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 20px;">
          <div class="aitalks-card">
            <h3>⚡ Local Response Engine</h3>
            <p>Runs offline in browser memory without external API dependencies or latency.</p>
          </div>
          <div class="aitalks-card">
            <h3>💎 3 Subscription Tiers</h3>
            <p>Free ($0), Plus ($100), and Pro ($300) plans tailored for every WebOS power user.</p>
          </div>
          <div class="aitalks-card">
            <h3>🎭 Custom AI Personalities</h3>
            <p>Switch between Friendly, Professional, and Sarcastic tones in Pro Tier.</p>
          </div>
        </div>
      </div>
    `;
  }

  function getAboutPageHTML() {
    return `
      <div class="aitalks-section" style="max-width: 720px;">
        <h2>About AI Talks Inc.</h2>
        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.8; text-align: justify;">
          <p>AI Talks Inc. is a pioneering technology company at the forefront of conversational artificial intelligence. Founded in 2024 by a team of machine learning researchers and software engineers, AI Talks has quickly established itself as a leader in accessible, browser-based AI assistants. Our flagship product, AI Chat, brings intelligent conversation directly to the WebOS platform.</p>
          
          <p>Our mission is to democratize AI — making powerful language models available to everyone without the need for expensive hardware or complex installations. AI Chat runs entirely within the browser, leveraging advanced natural language processing algorithms to understand and respond to user queries with remarkable accuracy.</p>
          
          <p>The company's core technology is built on a proprietary response engine that combines pattern matching, contextual understanding, and a vast knowledge base spanning topics from science and technology to entertainment and daily life. Our AI doesn't just answer questions — it engages in meaningful conversation, tells jokes, offers advice, and even assists with coding tasks.</p>
          
          <p>AI Talks Inc. is headquartered in San Francisco, California, with additional offices in Berlin and Singapore. Our team of 85 employees includes researchers, engineers, designers, and customer experience specialists all dedicated to one goal: making AI helpful, accessible, and delightful for every user.</p>
          
          <p>We believe that AI should be accessible at every level. That's why AI Chat offers a generous free tier alongside our Plus and Pro subscriptions, ensuring that everyone can experience the power of conversational AI. Our Pro tier includes advanced features like code generation, custom AI personalities, and detailed technical responses.</p>
          
          <p>As we continue to grow, AI Talks remains committed to ethical AI development, user privacy, and continuous improvement based on community feedback. We're proud to be part of the WebOS ecosystem and look forward to bringing even more intelligent features to your desktop in the future.</p>
          
          <p style="font-weight: 700; color: #38bdf8; text-align: center; margin-top: 24px;">AI Talks Inc. — Intelligent Conversation, Accessible to All.</p>
        </div>
      </div>
    `;
  }

  function getProductsPageHTML() {
    return `
      <div class="aitalks-section">
        <h2>AI Chat Subscription Plans</h2>
        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 20px;">Compare features across Free, Plus, and Pro tiers for AI Chat.</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #e2e8f0; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);">
              <th style="padding: 10px;">Feature</th>
              <th style="padding: 10px;">Free ($0)</th>
              <th style="padding: 10px;">Plus ($100)</th>
              <th style="padding: 10px; color: #a855f7;">Pro ($300)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 10px; font-weight: 600;">Session Messages</td>
              <td style="padding: 10px;">5 msgs</td>
              <td style="padding: 10px;">50 msgs</td>
              <td style="padding: 10px; color: #38bdf8; font-weight: 700;">Unlimited</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 10px; font-weight: 600;">Response Speed</td>
              <td style="padding: 10px;">1.5s delay</td>
              <td style="padding: 10px;">0.5s delay</td>
              <td style="padding: 10px; color: #34d399; font-weight: 700;">Instant (0ms)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 10px; font-weight: 600;">Math Capabilities</td>
              <td style="padding: 10px;">+, -</td>
              <td style="padding: 10px;">+, -, *, /, %</td>
              <td style="padding: 10px;">Full Scientific</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 10px; font-weight: 600;">Code Generation</td>
              <td style="padding: 10px; color: #94a3b8;">None</td>
              <td style="padding: 10px;">Basic Tips</td>
              <td style="padding: 10px; color: #a855f7; font-weight: 700;">Full Code Suite</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: 600;">Personalities</td>
              <td style="padding: 10px; color: #94a3b8;">Standard</td>
              <td style="padding: 10px; color: #94a3b8;">Standard</td>
              <td style="padding: 10px; color: #a855f7;">Friendly, Prof., Sarcastic</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  window.aiTalksPages = {
    getHomePageHTML,
    getAboutPageHTML,
    getProductsPageHTML
  };
})();

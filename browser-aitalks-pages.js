/* === FILE: browser-aitalks-pages.js === */
/**
 * AI Talks Inc. Company Website Page Content Templates
 */
(function () {
  function getHomePageHTML() {
    return `
      <div class="aitalks-aurora-bg"></div>
      
      <div class="aitalks-hero">
        <div class="aitalks-badge-pill">
          <span>✨</span> Next-Generation Client-Side AI Intelligence
        </div>
        <h1>Intelligent Conversation,<br/><span style="background: linear-gradient(135deg, #38bdf8 0%, #ec4899 50%, #fbbf24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Vibrantly Accessible</span></h1>
        <p>
          Experience lightning-fast local neural reasoning running 100% on-device inside WebOS. Zero server lag, total privacy, rich personality matrix, and deep domain intelligence.
        </p>

        <div class="aitalks-hero-actions">
          <button class="aitalks-btn-gradient primary aitalks-nav-link" data-path="/blog">
            <span>🔥 Explore 9 Tech Blogs</span>
          </button>
          <button class="aitalks-btn-gradient secondary aitalks-nav-link" data-path="/products">
            <span>💎 View Pro Plans</span>
          </button>
        </div>

        <div class="aitalks-stats-ribbon" style="max-width: 860px;">
          <div class="aitalks-stat-card stat-purple">
            <div class="aitalks-stat-val">0 ms</div>
            <div class="aitalks-stat-label">Inference Latency</div>
          </div>
          <div class="aitalks-stat-card stat-cyan">
            <div class="aitalks-stat-val">100%</div>
            <div class="aitalks-stat-label">Client-Side Offline</div>
          </div>
          <div class="aitalks-stat-card stat-pink">
            <div class="aitalks-stat-val">350+</div>
            <div class="aitalks-stat-label">Knowledge Nodes</div>
          </div>
          <div class="aitalks-stat-card stat-amber">
            <div class="aitalks-stat-val">6 Tonal</div>
            <div class="aitalks-stat-label">AI Personalities</div>
          </div>
        </div>
      </div>

      <div class="aitalks-section">
        <div class="aitalks-section-header">
          <h2>⚡ Flagship Capabilities</h2>
          <p>Engineered from the ground up for maximum responsiveness, privacy, and desktop elegance.</p>
        </div>

        <div class="aitalks-bento-grid">
          <div class="aitalks-bento-card bento-violet">
            <div class="bento-icon">🔮</div>
            <h3>Local Neural Response Engine</h3>
            <p>Runs directly within WebOS memory cache. Instant zero-latency responses without telemetry collection or cloud server dependencies.</p>
          </div>

          <div class="aitalks-bento-card bento-cyan">
            <div class="bento-icon">🛡️</div>
            <h3>Air-Gapped Privacy Shield</h3>
            <p>Your queries, chat history, and tokens never leave your local machine. Built with end-to-end client isolation.</p>
          </div>

          <div class="aitalks-bento-card bento-pink">
            <div class="bento-icon">🎭</div>
            <h3>Dynamic Persona Synthesizer</h3>
            <p>Switch seamlessly between Friendly, Professional, Sarcastic, Cyberpunk, and Creative modes to match your workflow.</p>
          </div>

          <div class="aitalks-bento-card bento-amber">
            <div class="bento-icon">🧮</div>
            <h3>Symbolic Scientific Math</h3>
            <p>Instantly solves complex arithmetic, algebraic formulas, percentages, trigonometry, and scientific conversions.</p>
          </div>

          <div class="aitalks-bento-card bento-emerald">
            <div class="bento-icon">💳</div>
            <h3>Mbank Direct Sync</h3>
            <p>Activate Plus and Pro subscriptions instantly using virtual Mbank card accounts with 1-click ledger confirmation.</p>
          </div>

          <div class="aitalks-bento-card bento-blue">
            <div class="bento-icon">🚀</div>
            <h3>Max AI Database Gateways</h3>
            <p>Unlock enterprise-grade research nodes and deep knowledge databases with seamless in-app challenge verifications.</p>
          </div>
        </div>

        <!-- Interactive Playground Widget -->
        <div class="aitalks-playground-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div style="font-weight: 800; font-size: 15px; color: #ffffff; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🎨</span>
              <span>Interactive Personality Playground</span>
            </div>
            <span style="font-size: 11px; color: #38bdf8; background: rgba(56, 189, 248, 0.15); padding: 3px 10px; border-radius: 999px; font-weight: 600; border: 1px solid rgba(56, 189, 248, 0.3);">Live Simulation</span>
          </div>

          <div class="aitalks-pill-group" id="aitalks-personality-selector">
            <div class="aitalks-personality-pill active" data-persona="friendly">🌸 Friendly Mode</div>
            <div class="aitalks-personality-pill" data-persona="professional">💼 Professional Mode</div>
            <div class="aitalks-personality-pill" data-persona="sarcastic">😏 Sarcastic Mode</div>
            <div class="aitalks-personality-pill" data-persona="cyberpunk">⚡ Cyberpunk Mode</div>
          </div>

          <div style="margin-bottom: 12px; font-size: 11px; color: #94a3b8; font-weight: 600;">
            TEST PROMPTS (CLICK TO PREVIEW):
          </div>
          
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;" id="aitalks-prompt-selector">
            <button class="aitalks-prompt-pill" data-prompt="What is WebOS?">"What is WebOS?"</button>
            <button class="aitalks-prompt-pill" data-prompt="Tell me a joke">"Tell me a joke"</button>
            <button class="aitalks-prompt-pill" data-prompt="How fast is this AI?">"How fast is this AI?"</button>
            <button class="aitalks-prompt-pill" data-prompt="Write a quick rhyme">"Write a quick rhyme"</button>
          </div>

          <div class="aitalks-chat-preview" id="aitalks-preview-box">
            <div class="aitalks-bubble-user" id="aitalks-preview-user">What is WebOS?</div>
            <div class="aitalks-bubble-bot" id="aitalks-preview-bot">
              🌸 <strong>Friendly AI:</strong> WebOS is your delightful desktop operating system inside the browser! It combines fluid multitasking, native apps, simulated internet banking, and of course — me, your friendly AI companion! Let's build something awesome today! ✨
            </div>
          </div>
        </div>

        <!-- Community Spotlight Banner -->
        <div style="margin-top: 32px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 20px;">
          <div style="font-weight: 800; font-size: 14px; color: #fff; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>🌟</span> User Testimonials
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 12px; border-left: 3px solid #38bdf8;">
              <div style="font-size: 11px; color: #38bdf8; font-weight: 700; margin-bottom: 4px;">Alex Rivera • Lead Engineer</div>
              <div style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">"The zero-latency local responses make AI Talks indispensable for coding and quick system diagnostics."</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 12px; border-left: 3px solid #ec4899;">
              <div style="font-size: 11px; color: #ec4899; font-weight: 700; margin-bottom: 4px;">Elena Rostova • UI/UX Designer</div>
              <div style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">"The sarcastic personality tier is pure gold. Best desktop AI companion experience on WebOS!"</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 12px; border-left: 3px solid #fbbf24;">
              <div style="font-size: 11px; color: #fbbf24; font-weight: 700; margin-bottom: 4px;">Marcus Chen • Security Researcher</div>
              <div style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">"100% offline and zero data leaves the browser. Complete peace of mind for sensitive data."</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getAboutPageHTML() {
    return `
      <div class="aitalks-aurora-bg" style="height: 240px;"></div>
      <div class="aitalks-section" style="max-width: 760px;">
        <div class="aitalks-section-header" style="text-align: left;">
          <div class="aitalks-badge-pill" style="margin-bottom: 8px;">About Us</div>
          <h2 style="font-size: 28px;">Pioneering Local Conversational Intelligence</h2>
          <p style="font-size: 14px; color: #cbd5e1;">Founded with the mission to democratize on-device AI without corporate cloud lock-in.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin: 20px 0;">
          <div style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(15, 23, 42, 0.6)); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 16px;">
            <div style="font-size: 24px; margin-bottom: 6px;">🌍</div>
            <div style="font-weight: 700; color: #fff; font-size: 14px;">Global Footprint</div>
            <div style="font-size: 12px; color: #94a3b8;">San Francisco • Berlin • Singapore</div>
          </div>
          <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(15, 23, 42, 0.6)); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 16px;">
            <div style="font-size: 24px; margin-bottom: 6px;">👥</div>
            <div style="font-weight: 700; color: #fff; font-size: 14px;">85+ Specialists</div>
            <div style="font-size: 12px; color: #94a3b8;">ML Researchers, WASM Engineers & Designers</div>
          </div>
          <div style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.6)); border: 1px solid rgba(236, 72, 153, 0.3); border-radius: 12px; padding: 16px;">
            <div style="font-size: 24px; margin-bottom: 6px;">🔒</div>
            <div style="font-weight: 700; color: #fff; font-size: 14px;">Zero Telemetry</div>
            <div style="font-size: 12px; color: #94a3b8;">100% Privacy by cryptographic architecture</div>
          </div>
        </div>

        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.8; text-align: justify; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 22px; border-radius: 16px;">
          <p>AI Talks Inc. is a pioneering technology company at the forefront of conversational artificial intelligence. Founded in 2024 by a team of machine learning researchers and software engineers, AI Talks has quickly established itself as a leader in accessible, browser-based AI assistants. Our flagship product, AI Chat, brings intelligent conversation directly to the WebOS platform.</p>
          
          <p>Our mission is to democratize AI — making powerful language models available to everyone without the need for expensive hardware or complex installations. AI Chat runs entirely within the browser, leveraging advanced natural language processing algorithms to understand and respond to user queries with remarkable accuracy.</p>
          
          <p>The company's core technology is built on a proprietary response engine that combines pattern matching, contextual understanding, and a vast knowledge base spanning topics from science and technology to entertainment and daily life.</p>
          
          <p style="font-weight: 700; color: #38bdf8; text-align: center; margin-top: 20px;">AI Talks Inc. — Intelligent Conversation, Accessible to All.</p>
        </div>
      </div>
    `;
  }

  function getProductsPageHTML() {
    return `
      <div class="aitalks-aurora-bg" style="height: 240px;"></div>
      <div class="aitalks-section">
        <div class="aitalks-section-header">
          <div class="aitalks-badge-pill" style="margin-bottom: 8px;">Subscription Tiers</div>
          <h2 style="font-size: 28px;">Transparent, Power-Packed Plans</h2>
          <p>Choose the tier that matches your intelligence needs on WebOS.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin: 24px 0;">
          <!-- Free Tier -->
          <div style="background: linear-gradient(145deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 16px; padding: 20px; display: flex; flex-direction: column;">
            <div style="color: #34d399; font-weight: 800; font-size: 18px; margin-bottom: 4px;">Free Starter</div>
            <div style="font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 12px;">$0 <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">/ forever</span></div>
            <ul style="font-size: 12px; color: #cbd5e1; line-height: 2; padding-left: 18px; margin: 0 0 20px 0; flex: 1;">
              <li>5 Session Messages</li>
              <li>1.5s Response Delay</li>
              <li>Basic Arithmetic (+, -)</li>
              <li>Standard Personality</li>
            </ul>
            <button class="aitalks-btn-gradient secondary" style="width: 100%; justify-content: center;">Included by Default</button>
          </div>

          <!-- Plus Tier -->
          <div style="background: linear-gradient(145deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 16px; padding: 20px; display: flex; flex-direction: column;">
            <div style="color: #38bdf8; font-weight: 800; font-size: 18px; margin-bottom: 4px;">Plus Tier</div>
            <div style="font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 12px;">$100 <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">/ one-time</span></div>
            <ul style="font-size: 12px; color: #cbd5e1; line-height: 2; padding-left: 18px; margin: 0 0 20px 0; flex: 1;">
              <li>50 Session Messages</li>
              <li>0.5s Fast Responses</li>
              <li>Expanded Math (+, -, *, /, %)</li>
              <li>Basic Code Tips & Guidance</li>
            </ul>
            <button class="aitalks-btn-gradient primary" style="width: 100%; justify-content: center;">Upgrade with Mbank</button>
          </div>

          <!-- Pro Tier -->
          <div style="background: linear-gradient(145deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(15, 23, 42, 0.9) 100%); border: 2px solid rgba(168, 85, 247, 0.5); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; position: relative; box-shadow: 0 10px 30px rgba(168, 85, 247, 0.25);">
            <div style="position: absolute; top: -10px; right: 16px; background: linear-gradient(90deg, #ec4899, #a855f7); color: #fff; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 999px; text-transform: uppercase;">Best Value</div>
            <div style="color: #c084fc; font-weight: 800; font-size: 18px; margin-bottom: 4px;">Pro Unlimited</div>
            <div style="font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 12px;">$300 <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">/ one-time</span></div>
            <ul style="font-size: 12px; color: #cbd5e1; line-height: 2; padding-left: 18px; margin: 0 0 20px 0; flex: 1;">
              <li><strong>Unlimited</strong> Session Messages</li>
              <li><strong>Instant (0ms)</strong> Response Latency</li>
              <li>Full Scientific Math Engine</li>
              <li>Complete Code Suite Generation</li>
              <li>Friendly, Professional & Sarcastic Personas</li>
            </ul>
            <button class="aitalks-btn-gradient primary" style="width: 100%; justify-content: center; background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);">Unlock Pro Now</button>
          </div>
        </div>
      </div>
    `;
  }

  window.aiTalksPages = {
    getHomePageHTML,
    getAboutPageHTML,
    getProductsPageHTML
  };
})();


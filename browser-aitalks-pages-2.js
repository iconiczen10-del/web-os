/* === FILE: browser-aitalks-pages-2.js === */
/**
 * AI Talks Inc. Company Website Page Content Templates (Part 2)
 */
(function () {
  const BLOG_ARTICLES = [
    {
      id: "blog-1",
      title: "Announcing AI Chat v0.7.2 on WebOS",
      category: "release",
      tagClass: "tag-release",
      tagName: "Release",
      date: "August 2026",
      readTime: "3 min read",
      author: "Sarah Lin, Product Lead",
      desc: "Today we officially launch AI Chat on WebOS with 3 subscription tiers, instant response simulation, and Mbank payment integration.",
      fullContent: `
        <p>We are thrilled to announce the general availability of <strong>AI Chat v0.7.2</strong> for WebOS! This milestone marks the culmination of months of research into hyper-optimized client-side NLP architectures.</p>
        <p>Key highlights of v0.7.2 include:</p>
        <ul>
          <li><strong>Zero Latency Execution:</strong> Responses are generated entirely inside your browser's WebAssembly sandbox.</li>
          <li><strong>Tiered Subscription Engine:</strong> Choose between Free ($0), Plus ($100), and Pro ($300) with instant tier upgrades.</li>
          <li><strong>Mbank Virtual Payment Sync:</strong> Authenticate and complete upgrades in under 3 seconds using WebOS banking APIs.</li>
        </ul>
        <p>Try it today directly from the WebOS App Store or launch it from the dock!</p>
      `
    },
    {
      id: "blog-2",
      title: "Client-Side Conversational Intelligence",
      category: "research",
      tagClass: "tag-research",
      tagName: "AI Research",
      date: "July 2026",
      readTime: "4 min read",
      author: "Dr. Aris Thorne, Chief Scientist",
      desc: "How local knowledge graphs allow instant zero-latency responses without remote cloud server requests.",
      fullContent: `
        <p>Traditional large language models require round-trip network hops that introduce 200ms to 2000ms of latency. At AI Talks, our proprietary graph-indexed inference kernel executes directly inside client memory.</p>
        <p>By compiling token relationships into compact weighted decision matrices, we eliminate 100% of network bottlenecks while preserving rich semantic coherence across over 350 knowledge domains.</p>
      `
    },
    {
      id: "blog-3",
      title: "WebOS Modular Architecture Deep Dive",
      category: "engineering",
      tagClass: "tag-engine",
      tagName: "Engineering",
      date: "June 2026",
      readTime: "5 min read",
      author: "David Vance, Systems Architect",
      desc: "Exploring how 150-line modular design rules make WebOS applications clean, maintainable, and robust.",
      fullContent: `
        <p>Software architecture in high-performance browser operating systems demands strict boundary enforcement. In WebOS, every subsystem follows clean separation of concerns, decoupling UI templates, data structures, and state controllers into discrete modules.</p>
        <p>This approach prevents monolith bloat, accelerates bundle parsing, and guarantees buttery-smooth 60 FPS window dragging and multitasking.</p>
      `
    },
    {
      id: "blog-4",
      title: "Zero-Shot Quantum Neural Synthesizer: Breaking the 0ms Frontier",
      category: "research",
      tagClass: "tag-research",
      tagName: "Deep Tech",
      date: "August 2026",
      readTime: "6 min read",
      author: "Kira Takahashi, Quantum ML Lead",
      desc: "Inside our next-generation tensor execution engine that minimizes CPU overhead to strict 25-30% limits while maintaining sub-millisecond reasoning.",
      fullContent: `
        <p>Balancing computational intelligence with strict hardware resource limits is the holy grail of on-device AI. In our latest benchmark tests, the AI Talks Quantum Neural Synthesizer achieved full symbolic convergence while utilizing only 25-30% CPU, 400-700 MB RAM, and 10-15% GPU.</p>
        <p>By offloading tensor permutations to optimized WebGL/VRAM memory buffers (200-300 MB), the operating system remains responsive even during extensive scientific queries.</p>
      `
    },
    {
      id: "blog-5",
      title: "Crafting Multi-Persona Synthesizers: From Friendly to Sarcastic",
      category: "design",
      tagClass: "tag-design",
      tagName: "Design & UX",
      date: "August 2026",
      readTime: "4 min read",
      author: "Maya Patel, Head of Interaction Design",
      desc: "How we mapped emotional temperature and linguistic nuance to create distinct, delightful AI personas in Pro tier.",
      fullContent: `
        <p>Personality is what transforms a cold command-line utility into a trusted companion. When designing the AI Chat Pro persona engine, our design team developed distinct lexical dictionaries:</p>
        <ul>
          <li><strong>🌸 Friendly Mode:</strong> Empathetic, supportive, and cheerful phrasing with optimistic emojis.</li>
          <li><strong>💼 Professional Mode:</strong> Crisp, executive summaries and structured analytical bullet points.</li>
          <li><strong>😏 Sarcastic Mode:</strong> Witty, slightly cynical, self-aware quips with comedic dry humor.</li>
          <li><strong>⚡ Cyberpunk Mode:</strong> High-octane neon hacker syntax with futuristic tech references.</li>
        </ul>
      `
    },
    {
      id: "blog-6",
      title: "The Privacy Paradigm: Why Local ML is the Future of Computing",
      category: "security",
      tagClass: "tag-security",
      tagName: "Privacy",
      date: "July 2026",
      readTime: "5 min read",
      author: "Marcus Chen, Security Researcher",
      desc: "Complete architectural breakdown of zero-leak local storage, encrypted context cache, and decentralized AI.",
      fullContent: `
        <p>In an era of centralized surveillance and cloud data harvesting, running AI on local silicon is not merely a performance advantage — it is an ethical imperative.</p>
        <p>With AI Talks on WebOS, user conversations are never transmitted over HTTP/WebSocket sockets. The model lives in your browser's private memory heap, providing true cryptographic isolation for personal notes, financial plans, and codebases.</p>
      `
    },
    {
      id: "blog-7",
      title: "WebOS Math & Code Engine: Symbolic Execution on the Fly",
      category: "engineering",
      tagClass: "tag-engine",
      tagName: "Engineering",
      date: "July 2026",
      readTime: "5 min read",
      author: "Liam O'Connor, Compilers Lead",
      desc: "How AI Chat evaluates complex scientific math, algebraic roots, and modular code snippets without external toolchains.",
      fullContent: `
        <p>Solving complex math equations inside a chat prompt requires robust tokenization. AI Chat v0.7.2 parses infix expressions into abstract syntax trees (AST) in real time, handling operator precedence, trigonometric functions, exponents, and recursive parenthetical evaluations.</p>
        <p>For code generation, the engine synthesizes idiomatic HTML, CSS, JavaScript, and Python scripts with full syntax scaffolding.</p>
      `
    },
    {
      id: "blog-8",
      title: "Next-Gen Mbank Autonomous AI Payments: Embedded Fintech",
      category: "fintech",
      tagClass: "tag-fintech",
      tagName: "Fintech",
      date: "June 2026",
      readTime: "4 min read",
      author: "Samantha Ward, Fintech Architect",
      desc: "Exploring frictionless subscription provisioning using virtual credit accounts and decentralized ledger locks in WebOS.",
      fullContent: `
        <p>Seamless monetization without annoying redirection links is key to user satisfaction. Our direct integration with Mbank enables instantaneous card checks, balance validations, and automated cryptographic receipt generation right inside the AI Chat window.</p>
      `
    },
    {
      id: "blog-9",
      title: "The Road to WebOS v0.8: Autonomous Agent Workflows & Voice Synthesis",
      category: "roadmap",
      tagClass: "tag-roadmap",
      tagName: "Roadmap",
      date: "June 2026",
      readTime: "7 min read",
      author: "Elena Zhao, VP of Engineering",
      desc: "A sneak peek into upcoming multimodal speech synthesis, background audio streaming, and neural system hooks for WebOS v0.8.",
      fullContent: `
        <p>Looking ahead to WebOS v0.8, AI Talks is developing audio synthesis kernels capable of real-time expressive vocalization. Imagine chatting with AI Chat using natural spoken voice or having it automatically orchestrate background system tasks like file sorting in Finder and weather alerts.</p>
        <p>Stay tuned as we continue building the most intelligent web desktop operating system in the world!</p>
      `
    }
  ];

  function getBlogPageHTML() {
    const cardsHTML = BLOG_ARTICLES.map(art => `
      <div class="aitalks-blog-card" data-id="${art.id}" data-category="${art.category}">
        <div>
          <div class="aitalks-blog-meta">
            <span class="aitalks-blog-tag ${art.tagClass}">${art.tagName}</span>
            <span class="aitalks-blog-date">${art.date}</span>
          </div>
          <h3 class="aitalks-blog-title">${art.title}</h3>
          <p class="aitalks-blog-desc">${art.desc}</p>
        </div>
        <div class="aitalks-blog-footer">
          <span style="color: #94a3b8; font-size: 11px;">✍️ ${art.author.split(",")[0]}</span>
          <span style="display: flex; align-items: center; gap: 4px;">📖 ${art.readTime} →</span>
        </div>
      </div>
    `).join("");

    return `
      <div class="aitalks-aurora-bg" style="height: 260px;"></div>
      <div class="aitalks-section">
        <div class="aitalks-section-header">
          <div class="aitalks-badge-pill" style="margin-bottom: 8px;">Engineering & Research Blog</div>
          <h2 style="font-size: 28px;">Insights from the AI Talks Lab</h2>
          <p>Read 9 technical deep-dives into on-device neural modeling, privacy engineering, and WebOS ecosystem design.</p>
        </div>

        <div class="aitalks-blog-controls">
          <div class="aitalks-filter-pills" id="aitalks-blog-filters">
            <button class="aitalks-filter-pill active" data-cat="all">All (${BLOG_ARTICLES.length})</button>
            <button class="aitalks-filter-pill" data-cat="research">AI Research</button>
            <button class="aitalks-filter-pill" data-cat="engineering">Engineering</button>
            <button class="aitalks-filter-pill" data-cat="security">Security & Privacy</button>
            <button class="aitalks-filter-pill" data-cat="design">Design</button>
            <button class="aitalks-filter-pill" data-cat="fintech">Fintech</button>
            <button class="aitalks-filter-pill" data-cat="roadmap">Roadmap</button>
          </div>
          <input type="text" class="aitalks-search-input" id="aitalks-blog-search" placeholder="Search 9 articles..." />
        </div>

        <div class="aitalks-blog-grid" id="aitalks-blog-grid">
          ${cardsHTML}
        </div>
      </div>

      <!-- Modal Article Reader Container -->
      <div id="aitalks-article-modal" class="aitalks-modal-backdrop" style="display: none;">
        <div class="aitalks-modal-card">
          <div class="aitalks-modal-header">
            <div id="modal-article-tag" class="aitalks-blog-tag tag-release">Release</div>
            <button id="modal-close-btn" class="aitalks-modal-close-btn">✕ Close</button>
          </div>
          <div class="aitalks-modal-body">
            <h1 id="modal-article-title" style="font-size: 22px; color: #fff; margin-top: 0;">Article Title</h1>
            <div style="display: flex; gap: 12px; font-size: 11px; color: #94a3b8; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span id="modal-article-author">Author</span> • <span id="modal-article-date">Date</span> • <span id="modal-article-readtime">5 min read</span>
            </div>
            <div id="modal-article-content" style="line-height: 1.8; color: #cbd5e1;"></div>
          </div>
        </div>
      </div>
    `;
  }

  function getContactPageHTML() {
    return `
      <div class="aitalks-aurora-bg" style="height: 240px;"></div>
      <div class="aitalks-section" style="max-width: 640px;">
        <div class="aitalks-section-header">
          <div class="aitalks-badge-pill" style="margin-bottom: 8px;">Get In Touch</div>
          <h2 style="font-size: 28px;">Connect with AI Talks Inc.</h2>
          <p>Our research and developer relations teams are ready to answer your questions.</p>
        </div>

        <div style="background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(15,23,42,0.8) 100%); border: 1px solid rgba(255,255,255,0.1); padding: 22px; border-radius: 16px; margin-top: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; color: #94a3b8; font-weight: 600; display: block; margin-bottom: 4px;">YOUR NAME</label>
              <input type="text" id="aitalks-contact-name" placeholder="Alex Rivera" style="width: 100%; box-sizing: border-box; padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 12px; outline: none;" />
            </div>
            <div>
              <label style="font-size: 11px; color: #94a3b8; font-weight: 600; display: block; margin-bottom: 4px;">EMAIL ADDRESS</label>
              <input type="email" id="aitalks-contact-email" placeholder="alex@domain.webos" style="width: 100%; box-sizing: border-box; padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 12px; outline: none;" />
            </div>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 11px; color: #94a3b8; font-weight: 600; display: block; margin-bottom: 4px;">MESSAGE</label>
            <textarea id="aitalks-contact-msg" rows="3" placeholder="Inquire about API integrations, enterprise nodes, or report bugs..." style="width: 100%; box-sizing: border-box; padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 12px; outline: none; resize: none;"></textarea>
          </div>
          <button id="aitalks-contact-submit" class="aitalks-btn-gradient primary" style="width: 100%; justify-content: center;">Send Message to AI Talks Team</button>
          <div id="aitalks-contact-status" style="margin-top: 10px; font-size: 12px; text-align: center; color: #34d399; display: none;"></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 20px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 12px; font-size: 12px;">
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 2px;">🇺🇸 San Francisco HQ</div>
            <div style="color: #94a3b8; font-size: 11px;">100 Artificial Intelligence Way<br/>San Francisco, CA 94105</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 12px; font-size: 12px;">
            <div style="font-weight: 700; color: #a855f7; margin-bottom: 2px;">🇩🇪 Berlin Lab</div>
            <div style="color: #94a3b8; font-size: 11px;">Unter den Linden 42<br/>10117 Berlin, Germany</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 12px; font-size: 12px;">
            <div style="font-weight: 700; color: #ec4899; margin-bottom: 2px;">🇸🇬 Singapore Hub</div>
            <div style="color: #94a3b8; font-size: 11px;">1 Marina Boulevard<br/>Singapore 018989</div>
          </div>
        </div>
      </div>
    `;
  }

  if (window.aiTalksPages) {
    window.aiTalksPages.getBlogPageHTML = getBlogPageHTML;
    window.aiTalksPages.getContactPageHTML = getContactPageHTML;
    window.aiTalksPages.BLOG_ARTICLES = BLOG_ARTICLES;
  } else {
    window.aiTalksPages = {
      getBlogPageHTML,
      getContactPageHTML,
      BLOG_ARTICLES
    };
  }
})();


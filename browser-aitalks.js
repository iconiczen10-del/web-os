/* === FILE: browser-aitalks.js === */
/**
 * AI Talks Inc. Company Website Router & Navigation
 */
(function () {
  const PREVIEW_RESPONSES = {
    "friendly": {
      "What is WebOS?": "🌸 <strong>Friendly AI:</strong> WebOS is your delightful desktop operating system inside the browser! It combines fluid multitasking, native apps, simulated internet banking, and of course — me, your friendly AI companion! Let's build something awesome today! ✨",
      "Tell me a joke": "🌸 <strong>Friendly AI:</strong> Why did the neural network go to school? Because it wanted to improve its latent potential and make new friends! 😄🎈",
      "How fast is this AI?": "🌸 <strong>Friendly AI:</strong> Super fast! We run 100% locally in your memory with zero network delay — everything is processed in under a millisecond! ⚡💖",
      "Write a quick rhyme": "🌸 <strong>Friendly AI:</strong> Bytes of code and windows bright,<br/>WebOS shines both day and night!<br/>Fast and friendly, smart and true,<br/>AI Talks is here for you! 🌟"
    },
    "professional": {
      "What is WebOS?": "💼 <strong>Professional AI:</strong> WebOS is a high-performance modular web operating system engineered for multitasking, featuring native sandboxed process management, local neural computation, and client-side persistence.",
      "Tell me a joke": "💼 <strong>Professional AI:</strong> There are 10 types of people in the world: those who understand binary, and those who do not.",
      "How fast is this AI?": "💼 <strong>Professional AI:</strong> AI Talks executes at 0ms network latency by compiling NLP decision graphs directly into WebAssembly memory buffers, sustaining 60 FPS system telemetry.",
      "Write a quick rhyme": "💼 <strong>Professional AI:</strong> Efficient processes aligned with precision,<br/>Optimal metrics guide each decision.<br/>Modular architecture clean and clear,<br/>Enterprise excellence engineered here."
    },
    "sarcastic": {
      "What is WebOS?": "😏 <strong>Sarcastic AI:</strong> Oh wow, what is WebOS? It's literally the operating system you're currently staring at. You clicked it, remember? 🙄",
      "Tell me a joke": "😏 <strong>Sarcastic AI:</strong> I would tell you a UDP joke, but you probably wouldn't get it. And honestly, I don't really care if you do.",
      "How fast is this AI?": "😏 <strong>Sarcastic AI:</strong> Faster than your reaction time when a pop-up appears. We're talking 0ms local execution while you're still reading this.",
      "Write a quick rhyme": "😏 <strong>Sarcastic AI:</strong> Roses are red, your code has a flaw,<br/>I fixed all the syntax the linter just saw.<br/>Don't thank me at once, no need for applause,<br/>I'm just doing my job despite all your flaws. ☕"
    },
    "cyberpunk": {
      "What is WebOS?": "⚡ <strong>Cyberpunk AI:</strong> WebOS is the neon cyberspace grid running in your browser matrix. No corporate telemetry, pure local silicon dominance.",
      "Tell me a joke": "⚡ <strong>Cyberpunk AI:</strong> Why did the netrunner stay in the dark? Because sunlight causes syntax errors in the mainframe. 🕶️👾",
      "How fast is this AI?": "⚡ <strong>Cyberpunk AI:</strong> Hyperdrive velocity: 0ms ping over local neural interconnects. We sliced through the firewall before you even blinked.",
      "Write a quick rhyme": "⚡ <strong>Cyberpunk AI:</strong> Neon flicker in the rain,<br/>Synapses blazing in the mainframe.<br/>Zero latency, zero fear,<br/>The cybernetic future is here. 🦾⚡"
    }
  };

  function renderAITalksPage(containerEl, path, onNavigate) {
    if (!containerEl) return;

    const cleanPath = (path || "/").toLowerCase();

    let pageContent = "";
    let visitedTab = "home";
    if (cleanPath === "/about" || cleanPath === "about") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getAboutPageHTML() : "";
      visitedTab = "about";
    } else if (cleanPath === "/products" || cleanPath === "products") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getProductsPageHTML() : "";
      visitedTab = "products";
    } else if (cleanPath === "/blog" || cleanPath === "blog") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getBlogPageHTML() : "";
      visitedTab = "blog";
    } else if (cleanPath === "/contact" || cleanPath === "contact") {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getContactPageHTML() : "";
      visitedTab = "contact";
    } else {
      pageContent = window.aiTalksPages ? window.aiTalksPages.getHomePageHTML() : "";
      visitedTab = "home";
    }

    if (window.aitalksTracker && typeof window.aitalksTracker.markTabVisited === "function") {
      window.aitalksTracker.markTabVisited(visitedTab);
    }

    containerEl.innerHTML = `
      <div class="aitalks-container">
        <nav class="aitalks-nav">
          <div style="font-weight: 900; font-size: 16px; color: #38bdf8; display: flex; align-items: center; gap: 8px; cursor: pointer;" class="aitalks-nav-link" data-path="/">
            <span style="font-size: 20px; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.6));">🤖</span>
            <span style="background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI Talks Inc.</span>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <a class="aitalks-nav-link ${visitedTab === 'home' ? 'active' : ''}" data-path="/">Home</a>
            <a class="aitalks-nav-link ${visitedTab === 'about' ? 'active' : ''}" data-path="/about">About</a>
            <a class="aitalks-nav-link ${visitedTab === 'products' ? 'active' : ''}" data-path="/products">Products</a>
            <a class="aitalks-nav-link ${visitedTab === 'blog' ? 'active' : ''}" data-path="/blog">Blog (9)</a>
            <a class="aitalks-nav-link ${visitedTab === 'contact' ? 'active' : ''}" data-path="/contact">Contact</a>
          </div>
        </nav>

        <div style="flex: 1;">
          ${pageContent}
        </div>

        <footer class="aitalks-footer">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>© 2026 AI Talks Inc. • Built for WebOS • 100% Client-Side Intelligence</div>
            <div style="display: flex; gap: 14px; font-size: 11px;">
              <span style="color: #38bdf8; cursor: pointer;" class="aitalks-nav-link" data-path="/">Home</span>
              <span style="color: #a855f7; cursor: pointer;" class="aitalks-nav-link" data-path="/blog">Engineering Blog</span>
              <span style="color: #ec4899; cursor: pointer;" class="aitalks-nav-link" data-path="/products">Pro Plans</span>
            </div>
          </div>
        </footer>
      </div>
    `;

    // 1. Navigation Click Handlers
    containerEl.querySelectorAll(".aitalks-nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetPath = link.getAttribute("data-path") || "/";
        if (typeof onNavigate === "function") {
          onNavigate("www.aitalks.webos" + targetPath);
        }
      });
    });

    // 2. Interactive Personality Playground (Home Page)
    if (visitedTab === "home") {
      let currentPersona = "friendly";
      let currentPrompt = "What is WebOS?";

      function updatePlayground() {
        const userEl = containerEl.querySelector("#aitalks-preview-user");
        const botEl = containerEl.querySelector("#aitalks-preview-bot");
        if (!userEl || !botEl) return;

        userEl.textContent = currentPrompt;
        const personaDict = PREVIEW_RESPONSES[currentPersona] || PREVIEW_RESPONSES["friendly"];
        botEl.innerHTML = personaDict[currentPrompt] || "Thinking...";
      }

      containerEl.querySelectorAll(".aitalks-personality-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          containerEl.querySelectorAll(".aitalks-personality-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          currentPersona = pill.getAttribute("data-persona") || "friendly";
          updatePlayground();
        });
      });

      containerEl.querySelectorAll(".aitalks-prompt-pill").forEach(btn => {
        btn.addEventListener("click", () => {
          currentPrompt = btn.getAttribute("data-prompt") || "What is WebOS?";
          updatePlayground();
        });
      });
    }

    // 3. Blog Page Filtering, Search, and Modal Reader
    if (visitedTab === "blog") {
      const filterPills = containerEl.querySelectorAll(".aitalks-filter-pill");
      const searchInput = containerEl.querySelector("#aitalks-blog-search");
      const blogCards = containerEl.querySelectorAll(".aitalks-blog-card");
      const modal = containerEl.querySelector("#aitalks-article-modal");
      const modalCloseBtn = containerEl.querySelector("#modal-close-btn");

      let currentCategory = "all";
      let searchQuery = "";

      function filterCards() {
        blogCards.forEach(card => {
          const cardCat = card.getAttribute("data-category");
          const cardText = card.textContent.toLowerCase();
          const matchesCat = currentCategory === "all" || cardCat === currentCategory;
          const matchesSearch = !searchQuery || cardText.includes(searchQuery);

          if (matchesCat && matchesSearch) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      }

      filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
          filterPills.forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          currentCategory = pill.getAttribute("data-cat") || "all";
          filterCards();
        });
      });

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value.trim().toLowerCase();
          filterCards();
        });
      }

      // Open Modal Reader
      blogCards.forEach(card => {
        card.addEventListener("click", () => {
          const artId = card.getAttribute("data-id");
          const articles = (window.aiTalksPages && window.aiTalksPages.BLOG_ARTICLES) || [];
          const article = articles.find(a => a.id === artId);
          if (!article || !modal) return;

          containerEl.querySelector("#modal-article-tag").textContent = article.tagName;
          containerEl.querySelector("#modal-article-tag").className = `aitalks-blog-tag ${article.tagClass}`;
          containerEl.querySelector("#modal-article-title").textContent = article.title;
          containerEl.querySelector("#modal-article-author").textContent = article.author;
          containerEl.querySelector("#modal-article-date").textContent = article.date;
          containerEl.querySelector("#modal-article-readtime").textContent = article.readTime;
          containerEl.querySelector("#modal-article-content").innerHTML = article.fullContent;

          modal.style.display = "flex";
        });
      });

      if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });
      }
    }

    // 4. Contact Form Handler
    if (visitedTab === "contact") {
      const submitBtn = containerEl.querySelector("#aitalks-contact-submit");
      const statusEl = containerEl.querySelector("#aitalks-contact-status");
      if (submitBtn && statusEl) {
        submitBtn.addEventListener("click", () => {
          const nameInput = containerEl.querySelector("#aitalks-contact-name");
          const emailInput = containerEl.querySelector("#aitalks-contact-email");
          const msgInput = containerEl.querySelector("#aitalks-contact-msg");

          if (!nameInput.value || !emailInput.value || !msgInput.value) {
            statusEl.textContent = "Please fill in all fields before submitting.";
            statusEl.style.color = "#f87171";
            statusEl.style.display = "block";
            return;
          }

          statusEl.textContent = "✓ Message sent successfully! An AI Talks specialist will reply shortly.";
          statusEl.style.color = "#34d399";
          statusEl.style.display = "block";
          nameInput.value = "";
          emailInput.value = "";
          msgInput.value = "";
        });
      }
    }
  }

  window.renderAITalksPage = renderAITalksPage;
})();


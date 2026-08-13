/* === FILE: browser-news-render.js === */
/**
 * WebOS v0.7.2.3 Browser News Portal UI Renderer
 */
(function () {
  let currentCategory = "All";
  let searchQuery = "";

  function renderNewsPortal(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const allNews = window.browserNewsData || [];
    const newsData = allNews;
    const totalCount = allNews.length;

    const wrapper = document.createElement("div");
    wrapper.className = "news-portal-container fading-in";

    // Header
    const header = document.createElement("div");
    header.className = "news-portal-header";
    header.innerHTML = `
      <div class="news-brand">
        <span class="news-brand-icon">📰</span>
        <div>
          <h2 class="news-brand-title">Tech Chronicle</h2>
          <div class="news-brand-sub">WebOS Official News, Releases & Ecosystem Daily (${totalCount} Articles)</div>
        </div>
      </div>
      <div class="news-search-box">
        <input type="text" class="news-search-input" placeholder="Search ${totalCount} news articles..." value="${searchQuery}" />
      </div>
    `;
    wrapper.appendChild(header);

    // Categories Bar
    const categories = ["All", "OS Release", "Hardware", "App Store", "Security", "AI", "Fintech", "Development", "Design"];
    const catBar = document.createElement("div");
    catBar.className = "news-cat-bar";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `news-cat-btn ${currentCategory === cat ? 'active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        currentCategory = cat;
        renderNewsPortal(containerEl);
      });
      catBar.appendChild(btn);
    });
    wrapper.appendChild(catBar);

    // Search Filter
    const searchInput = header.querySelector(".news-search-input");
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderArticlesGrid(gridEl, newsData, containerEl);
    });

    // Main Grid Container
    const gridEl = document.createElement("div");
    gridEl.className = "news-grid";
    wrapper.appendChild(gridEl);

    renderArticlesGrid(gridEl, newsData, containerEl);

    containerEl.appendChild(wrapper);
  }

  function renderArticlesGrid(gridEl, newsData, containerEl) {
    gridEl.innerHTML = "";

    let filtered = newsData.filter(art => {
      const matchesCat = currentCategory === "All" || art.category.toLowerCase().includes(currentCategory.toLowerCase());
      const matchesSearch = !searchQuery || art.title.toLowerCase().includes(searchQuery) || art.summary.toLowerCase().includes(searchQuery) || art.category.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = `<div class="news-empty">No news articles found matching your query.</div>`;
      return;
    }

    // Featured Article (if first item in filtered list and no search filter active)
    if (!searchQuery && currentCategory === "All" && filtered[0]) {
      const feat = filtered[0];
      const featCard = document.createElement("div");
      featCard.className = "news-featured-card";
      featCard.innerHTML = `
        <div class="news-feat-badge">${feat.badge || 'FEATURED STORY'}</div>
        <h3 class="news-feat-title">${feat.title}</h3>
        <p class="news-feat-summary">${feat.summary}</p>
        <div class="news-feat-meta">
          <span>${feat.author}</span> • <span>${feat.date}</span> • <span class="news-read-time">${feat.readTime}</span>
        </div>
      `;
      featCard.addEventListener("click", () => {
        if (typeof window.openNewsArticleModal === "function") window.openNewsArticleModal(feat, containerEl);
      });
      gridEl.appendChild(featCard);

      filtered = filtered.slice(1);
    }

    // Grid Cards
    filtered.forEach(art => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <div class="news-card-header">
          <span class="news-card-cat">${art.category}</span>
          <span class="news-card-time">${art.readTime}</span>
        </div>
        <h4 class="news-card-title">${art.title}</h4>
        <p class="news-card-summary">${art.summary}</p>
        <div class="news-card-footer">
          <span class="news-card-author">${art.author.split('•')[0]}</span>
          <span class="news-card-date">${art.date}</span>
        </div>
      `;
      card.addEventListener("click", () => {
        if (typeof window.openNewsArticleModal === "function") window.openNewsArticleModal(art, containerEl);
      });
      gridEl.appendChild(card);
    });
  }

  window.renderNewsPage = renderNewsPortal;
})();

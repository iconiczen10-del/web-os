/* === FILE: browser-search.js === */
/**
 * WebOS v0.6.5 Browser Search Page Renderer
 */
(function () {
  function search(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    const db = window.browserSearchData ? window.browserSearchData.getDatabase() : [];

    return db.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.description.toLowerCase().includes(q)) return true;
      return item.keywords.some((kw) => kw.includes(q) || q.includes(kw));
    });
  }

  function renderSearchPage(containerEl, query, onNavigate) {
    if (!containerEl) return;
    const cleanQuery = query ? decodeURIComponent(query).trim() : "";
    const results = search(cleanQuery);

    let resultsHtml = "";
    if (!cleanQuery) {
      resultsHtml = `
        <div style="padding: 24px; text-align: center; color: #8e8e93;">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <div>Type a search term above to explore the WebOS ecosystem.</div>
        </div>
      `;
    } else if (results.length === 0) {
      resultsHtml = `
        <div style="padding: 24px; text-align: center; color: #8e8e93;">
          <div style="font-size: 32px; margin-bottom: 8px;">🤔</div>
          <div style="font-size: 16px; color: #ffffff; font-weight: 600; margin-bottom: 6px;">No results found for "${cleanQuery}"</div>
          <div style="font-size: 13px;">Try searching for: <a href="#" class="search-suggest" data-q="mbank" style="color: #0a84ff; text-decoration: none;">mbank</a>, <a href="#" class="search-suggest" data-q="internet" style="color: #0a84ff; text-decoration: none;">internet</a>, <a href="#" class="search-suggest" data-q="apps" style="color: #0a84ff; text-decoration: none;">apps</a>, or <a href="#" class="search-suggest" data-q="webos" style="color: #0a84ff; text-decoration: none;">webos</a>.</div>
        </div>
      `;
    } else {
      resultsHtml = results.map((item) => `
        <div class="search-result-card" style="margin-bottom: 16px; padding: 12px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
          <div style="font-size: 11px; color: #30d158; font-weight: 500; margin-bottom: 2px;">${item.url}</div>
          <a href="#" class="search-title-link" data-url="${item.url}" style="font-size: 16px; font-weight: 600; color: #64d2ff; text-decoration: none; display: inline-block; margin-bottom: 4px;">${item.title}</a>
          <div style="font-size: 13px; color: #c7c7cc; line-height: 1.4;">${item.description}</div>
        </div>
      `).join("");
    }

    containerEl.innerHTML = `
      <div style="padding: 20px 24px; max-width: 720px; margin: 0 auto; color: #ffffff;">
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <input type="text" id="sr-input" value="${cleanQuery}" placeholder="Search WebOS ecosystem..." style="flex: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px; outline: none;" />
          <button id="sr-btn" style="padding: 10px 18px; border-radius: 8px; border: none; background: #0a84ff; color: #fff; font-weight: 600; cursor: pointer; font-size: 13px;">Search</button>
        </div>
        <div style="font-size: 12px; color: #8e8e93; margin-bottom: 16px;">
          ${cleanQuery ? `Search results for: <strong style="color: #fff;">${cleanQuery}</strong> (${results.length} found)` : 'Search Engine'}
        </div>
        <div>${resultsHtml}</div>
      </div>
    `;

    const input = containerEl.querySelector("#sr-input");
    const btn = containerEl.querySelector("#sr-btn");

    function doExecSearch() {
      const q = input.value.trim();
      if (typeof onNavigate === "function") {
        onNavigate("webos://search?q=" + encodeURIComponent(q));
      }
    }

    if (btn) btn.addEventListener("click", doExecSearch);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") doExecSearch();
      });
    }

    containerEl.querySelectorAll(".search-title-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("data-url");
        if (typeof onNavigate === "function") onNavigate(url);
      });
    });

    containerEl.querySelectorAll(".search-suggest").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const q = link.getAttribute("data-q");
        if (typeof onNavigate === "function") onNavigate("webos://search?q=" + encodeURIComponent(q));
      });
    });
  }

  window.browserSearch = {
    renderSearchPage,
    search
  };
})();

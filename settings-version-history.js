/* === FILE: settings-version-history.js === */
/**
 * WebOS v0.6.2 Standalone Version History Tab Renderer
 */
(function () {
  function renderVersionHistory(containerEl) {
    if (!containerEl) return;

    containerEl.innerHTML = "";

    const titleEl = document.createElement("div");
    titleEl.className = "settings-section-title";
    titleEl.textContent = "Version History";
    containerEl.appendChild(titleEl);

    const changelogList = document.createElement("div");
    changelogList.className = "changelog-list";

    const data = window.changelogData || window.CHANGELOG_DATA || [
      {
        version: "v0.6.2",
        date: "August 2026",
        features: ["Redesigned About OS with CSS-drawn window logo", "Detailed system information table", "Version History tab"]
      }
    ];

    data.forEach(entry => {
      const card = document.createElement("div");
      card.className = "changelog-card";

      const header = document.createElement("div");
      header.className = "changelog-version";
      header.textContent = entry.version;

      const date = document.createElement("div");
      date.className = "changelog-date";
      date.textContent = `Released ${entry.date}`;

      const ul = document.createElement("ul");
      ul.className = "changelog-items";

      entry.features.forEach(feat => {
        const li = document.createElement("li");
        li.textContent = feat;
        ul.appendChild(li);
      });

      card.appendChild(header);
      card.appendChild(date);
      card.appendChild(ul);
      changelogList.appendChild(card);
    });

    containerEl.appendChild(changelogList);
  }

  window.renderVersionHistory = renderVersionHistory;
})();

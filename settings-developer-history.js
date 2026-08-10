/* === FILE: settings-developer-history.js === */
/**
 * WebOS v0.7.2.2 Developer Tab - Version History Sub-Tab Renderer
 */
(function () {
  function renderDevVersionHistory(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const historyWrapper = document.createElement("div");
    historyWrapper.className = "settings-history-content fading-in";

    const changelogList = document.createElement("div");
    changelogList.className = "changelog-list";

    const data = window.changelogData || window.CHANGELOG_DATA || [];

    data.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "changelog-card";

      const header = document.createElement("div");
      header.className = "changelog-version";
      header.textContent = entry.version;
      card.appendChild(header);

      if (entry.date) {
        const date = document.createElement("div");
        date.className = "changelog-date";
        date.textContent = `Released ${entry.date}`;
        card.appendChild(date);
      }

      const ul = document.createElement("ul");
      ul.className = "changelog-items";

      (entry.features || []).forEach((feat) => {
        const li = document.createElement("li");
        li.textContent = feat;
        ul.appendChild(li);
      });

      card.appendChild(ul);
      changelogList.appendChild(card);
    });

    historyWrapper.appendChild(changelogList);
    containerEl.appendChild(historyWrapper);
  }

  window.renderDevVersionHistory = renderDevVersionHistory;
})();

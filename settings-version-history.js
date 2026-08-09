/* === FILE: settings-version-history.js === */
/**
 * WebOS v0.7 Version History & Re-locking Lock Screen Renderer
 */
(function () {
  function renderVersionHistory(containerEl) {
    if (!containerEl) return;
    renderLockScreen(containerEl);
  }

  function renderLockScreen(containerEl) {
    containerEl.innerHTML = "";

    const lockContainer = document.createElement("div");
    lockContainer.className = "settings-lock-container";

    const iconEl = document.createElement("div");
    iconEl.className = "settings-lock-icon";
    iconEl.textContent = "🔒";

    const titleEl = document.createElement("div");
    titleEl.className = "settings-lock-title";
    titleEl.textContent = "Version History is Locked";

    const subtitleEl = document.createElement("div");
    subtitleEl.className = "settings-lock-subtitle";
    subtitleEl.textContent = "Enter the password to access the changelog.";

    const inputEl = document.createElement("input");
    inputEl.type = "password";
    inputEl.className = "settings-lock-input";
    inputEl.placeholder = "Enter password";

    const errorEl = document.createElement("div");
    errorEl.className = "settings-lock-error";
    errorEl.textContent = "Incorrect password. Try again.";

    const btnEl = document.createElement("button");
    btnEl.className = "settings-lock-btn";
    btnEl.textContent = "Unlock";

    let errorTimer = null;

    function attemptUnlock() {
      const val = inputEl.value;
      if (val === "9610") {
        iconEl.textContent = "🔓";
        lockContainer.classList.add("fading-out");
        setTimeout(() => {
          renderHistoryContent(containerEl);
        }, 300);
      } else {
        inputEl.classList.add("error");
        errorEl.classList.add("visible");
        if (errorTimer) clearTimeout(errorTimer);
        errorTimer = setTimeout(() => {
          inputEl.value = "";
          inputEl.classList.remove("error");
          errorEl.classList.remove("visible");
        }, 2000);
      }
    }

    btnEl.addEventListener("click", attemptUnlock);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") attemptUnlock();
    });

    lockContainer.appendChild(iconEl);
    lockContainer.appendChild(titleEl);
    lockContainer.appendChild(subtitleEl);
    lockContainer.appendChild(inputEl);
    lockContainer.appendChild(errorEl);
    lockContainer.appendChild(btnEl);

    containerEl.appendChild(lockContainer);
    setTimeout(() => inputEl.focus(), 50);
  }

  function renderHistoryContent(containerEl) {
    containerEl.innerHTML = "";

    const titleEl = document.createElement("div");
    titleEl.className = "settings-section-title";
    titleEl.textContent = "Version History";
    containerEl.appendChild(titleEl);

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

      const date = document.createElement("div");
      date.className = "changelog-date";
      date.textContent = `Released ${entry.date}`;

      const ul = document.createElement("ul");
      ul.className = "changelog-items";

      entry.features.forEach((feat) => {
        const li = document.createElement("li");
        li.textContent = feat;
        ul.appendChild(li);
      });

      card.appendChild(header);
      card.appendChild(date);
      card.appendChild(ul);
      changelogList.appendChild(card);
    });

    historyWrapper.appendChild(changelogList);
    containerEl.appendChild(historyWrapper);
  }

  window.renderVersionHistory = renderVersionHistory;
})();

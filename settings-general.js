/* === FILE: settings-general.js === */
/**
 * WebOS v0.5.1 Settings - General Toggles Section
 */
(function () {
  const SETTINGS = [
    { id: "darkmode", key: "webos-setting-darkmode", label: "Dark Mode", default: false },
    { id: "sound", key: "webos-setting-sound", label: "Sound Effects", default: true },
    { id: "notifications", key: "webos-setting-notifications", label: "Notifications", default: true }
  ];

  function applySettingEffect(settingId, isEnabled) {
    if (settingId === "darkmode") {
      if (isEnabled) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
  }

  // Restore dark mode setting on initial script load
  const initialDarkMode = localStorage.getItem("webos-setting-darkmode") === "true";
  applySettingEffect("darkmode", initialDarkMode);

  function renderGeneralSection(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const titleEl = document.createElement("div");
    titleEl.className = "settings-section-title";
    titleEl.textContent = "General";
    containerEl.appendChild(titleEl);

    const generalSection = document.createElement("div");
    generalSection.className = "settings-general-section";

    SETTINGS.forEach(setting => {
      const savedVal = localStorage.getItem(setting.key);
      const isActive = savedVal !== null ? savedVal === "true" : setting.default;

      const row = document.createElement("div");
      row.className = "setting-row";
      row.innerHTML = `
        <span class="setting-label">${setting.label}</span>
        <div class="setting-toggle ${isActive ? 'on' : ''}" data-id="${setting.id}" data-key="${setting.key}">
          <div class="setting-toggle-knob"></div>
        </div>
      `;

      const toggleEl = row.querySelector(".setting-toggle");
      toggleEl.addEventListener("click", () => {
        const isOn = toggleEl.classList.toggle("on");
        localStorage.setItem(setting.key, isOn ? "true" : "false");
        applySettingEffect(setting.id, isOn);
      });

      generalSection.appendChild(row);
    });

    containerEl.appendChild(generalSection);
  }

  window.renderGeneralSection = renderGeneralSection;
  window.applySettingEffect = applySettingEffect;
})();

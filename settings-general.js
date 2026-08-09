/* === FILE: settings-general.js === */
/**
 * WebOS v0.7 Settings - General Toggles Section
 * In-memory toggles state. Defaults to OFF on boot.
 */
(function () {
  const toggleStates = {
    darkmode: false,
    sound: false,
    notifications: false
  };

  const SETTINGS = [
    { id: "darkmode", label: "Dark Mode" },
    { id: "sound", label: "Sound Effects" },
    { id: "notifications", label: "Notifications" }
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

  // Ensure default off on boot
  applySettingEffect("darkmode", false);

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
      const isActive = toggleStates[setting.id] || false;

      const row = document.createElement("div");
      row.className = "setting-row";
      row.innerHTML = `
        <span class="setting-label">${setting.label}</span>
        <div class="setting-toggle ${isActive ? 'on' : ''}" data-id="${setting.id}">
          <div class="setting-toggle-knob"></div>
        </div>
      `;

      const toggleEl = row.querySelector(".setting-toggle");
      toggleEl.addEventListener("click", () => {
        const isOn = toggleEl.classList.toggle("on");
        toggleStates[setting.id] = isOn;
        applySettingEffect(setting.id, isOn);
      });

      generalSection.appendChild(row);
    });

    containerEl.appendChild(generalSection);
  }

  window.renderGeneralSection = renderGeneralSection;
  window.applySettingEffect = applySettingEffect;
})();

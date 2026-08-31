/* === FILE: control-toggles.js === */
/**
 * WebOS v0.9.1 Control Center Quick Toggles Engine
 * Manages Wi-Fi, Sound, Dark Mode, Game Mode, Battery, and Settings real-time effects.
 */
(function () {
  const toggles = {
    wifi: true,
    sound: true,
    dark: false,
    game: false
  };

  function getBatteryLevel() {
    if (window.devicesData && typeof window.devicesData.getDevice === "function") {
      const bat = window.devicesData.getDevice("battery");
      if (bat && bat.installed && bat.status === "working") return "94%";
    }
    return "94%";
  }

  function getToggleStates() {
    return {
      wifi: toggles.wifi,
      sound: toggles.sound,
      dark: toggles.dark,
      game: toggles.game,
      battery: getBatteryLevel()
    };
  }

  function toggleWiFi() {
    toggles.wifi = !toggles.wifi;
    window._wifiDisabled = !toggles.wifi;

    const netIndicator = document.getElementById("topbar-wifi-indicator");
    if (netIndicator) netIndicator.textContent = toggles.wifi ? "📶" : "❌";

    if (window.notificationBus) {
      if (!toggles.wifi) {
        window.notificationBus.notify("Wi-Fi Disconnected", "Internet connection disabled via Control Center.", "📡", "Network");
      } else {
        setTimeout(() => {
          window.notificationBus.notify("Wi-Fi Reconnected", "Connected to BoltLink 5 GHz network.", "📶", "Network");
        }, 1000);
      }
    }
    return toggles.wifi;
  }

  function toggleSound() {
    toggles.sound = !toggles.sound;
    window._audioDisabled = !toggles.sound;

    if (window.notificationBus) {
      const msg = toggles.sound ? "Audio output enabled." : "Audio output muted via Control Center.";
      window.notificationBus.notify(toggles.sound ? "Sound Enabled" : "Sound Muted", msg, toggles.sound ? "🔊" : "🔇", "Audio");
    }
    return toggles.sound;
  }

  function toggleDark() {
    toggles.dark = !toggles.dark;
    document.body.classList.toggle("dark-mode", toggles.dark);

    const desktop = document.getElementById("desktop");
    if (desktop) {
      if (toggles.dark) {
        desktop.classList.add("dark-desktop");
      } else {
        desktop.classList.remove("dark-desktop");
      }
    }
    return toggles.dark;
  }

  function toggleGameMode() {
    toggles.game = !toggles.game;
    window._gameModeEnabled = toggles.game;

    if (window.notificationBus) {
      const msg = toggles.game ? "GPU boosted to max clocks. Background processes throttled." : "Standard power profile restored.";
      window.notificationBus.notify(toggles.game ? "🎮 Game Mode Active" : "🎮 Game Mode Disabled", msg, "🎮", "System");
    }
    return toggles.game;
  }

  function renderToggles(container, onUpdate) {
    if (!container) return;
    const st = getToggleStates();

    container.innerHTML = `
      <div class="cc-toggle-item ${st.wifi ? 'active' : ''}" id="cc-toggle-wifi">
        <div class="cc-toggle-circle"><span class="cc-toggle-icon">📶</span></div>
        <div class="cc-toggle-meta"><span class="cc-toggle-name">Wi-Fi</span><span class="cc-toggle-val">${st.wifi ? 'ON' : 'OFF'}</span></div>
      </div>
      <div class="cc-toggle-item ${st.sound ? 'active' : ''}" id="cc-toggle-sound">
        <div class="cc-toggle-circle"><span class="cc-toggle-icon">🔊</span></div>
        <div class="cc-toggle-meta"><span class="cc-toggle-name">Sound</span><span class="cc-toggle-val">${st.sound ? 'ON' : 'OFF'}</span></div>
      </div>
      <div class="cc-toggle-item ${st.dark ? 'active' : ''}" id="cc-toggle-dark">
        <div class="cc-toggle-circle"><span class="cc-toggle-icon">💡</span></div>
        <div class="cc-toggle-meta"><span class="cc-toggle-name">Dark</span><span class="cc-toggle-val">${st.dark ? 'ON' : 'OFF'}</span></div>
      </div>
      <div class="cc-toggle-item ${st.game ? 'active' : ''}" id="cc-toggle-game">
        <div class="cc-toggle-circle"><span class="cc-toggle-icon">🎮</span></div>
        <div class="cc-toggle-meta"><span class="cc-toggle-name">Game</span><span class="cc-toggle-val">${st.game ? 'ON' : 'OFF'}</span></div>
      </div>
      <div class="cc-toggle-item active" id="cc-toggle-battery">
        <div class="cc-toggle-circle"><span class="cc-toggle-icon">🔋</span></div>
        <div class="cc-toggle-meta"><span class="cc-toggle-name">Battery</span><span class="cc-toggle-val">${st.battery}</span></div>
      </div>
      <div class="cc-toggle-item active" id="cc-toggle-settings">
        <div class="cc-toggle-circle"><span class="cc-toggle-icon">⚙️</span></div>
        <div class="cc-toggle-meta"><span class="cc-toggle-name">Settings</span><span class="cc-toggle-val">Open</span></div>
      </div>
    `;

    container.querySelector("#cc-toggle-wifi").onclick = () => { toggleWiFi(); if (onUpdate) onUpdate(); };
    container.querySelector("#cc-toggle-sound").onclick = () => { toggleSound(); if (onUpdate) onUpdate(); };
    container.querySelector("#cc-toggle-dark").onclick = () => { toggleDark(); if (onUpdate) onUpdate(); };
    container.querySelector("#cc-toggle-game").onclick = () => { toggleGameMode(); if (onUpdate) onUpdate(); };
    container.querySelector("#cc-toggle-battery").onclick = () => {
      if (typeof window.openApp === "function") window.openApp("settings");
      if (window.closeControlCenter) window.closeControlCenter();
    };
    container.querySelector("#cc-toggle-settings").onclick = () => {
      if (typeof window.openApp === "function") window.openApp("settings");
      if (window.closeControlCenter) window.closeControlCenter();
    };
  }

  window.controlToggles = {
    getToggleStates,
    toggleWiFi,
    toggleSound,
    toggleDark,
    toggleGameMode,
    renderToggles
  };
})();

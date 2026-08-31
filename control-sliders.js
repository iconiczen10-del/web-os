/* === FILE: control-sliders.js === */
/**
 * WebOS v0.9.1 Control Center Brightness & Volume Sliders
 * Controls desktop brightness filter and global system volume state.
 */
(function () {
  let brightness = 80;
  let volume = 60;

  function getBrightness() { return brightness; }
  function getVolume() { return volume; }

  function setBrightness(val) {
    brightness = Math.max(10, Math.min(100, parseInt(val, 10) || 80));
    applyBrightnessFilter();
    return brightness;
  }

  function setVolume(val) {
    volume = Math.max(0, Math.min(100, parseInt(val, 10) || 0));
    window._systemVolume = volume;
    if (volume === 0) {
      window._audioDisabled = true;
    } else if (window._audioDisabled && window.controlToggles && window.controlToggles.getToggleStates().sound) {
      window._audioDisabled = false;
    }
    return volume;
  }

  function applyBrightnessFilter() {
    const desktop = document.getElementById("desktop");
    if (desktop) {
      const factor = brightness / 100;
      desktop.style.filter = `brightness(${factor})`;
    }
  }

  function renderSliders(container, onUpdate) {
    if (!container) return;

    container.innerHTML = `
      <div class="cc-slider-card">
        <div class="cc-slider-header">
          <span class="cc-slider-label">☀️ Display Brightness</span>
          <span class="cc-slider-val" id="cc-bright-val">${brightness}%</span>
        </div>
        <div class="cc-slider-wrap">
          <input type="range" min="15" max="100" value="${brightness}" class="cc-slider-input" id="cc-bright-range" />
        </div>
      </div>
      <div class="cc-slider-card">
        <div class="cc-slider-header">
          <span class="cc-slider-label">🔊 Master Volume</span>
          <span class="cc-slider-val" id="cc-vol-val">${volume}%</span>
        </div>
        <div class="cc-slider-wrap">
          <input type="range" min="0" max="100" value="${volume}" class="cc-slider-input" id="cc-vol-range" />
        </div>
      </div>
    `;

    const bRange = container.querySelector("#cc-bright-range");
    const bVal = container.querySelector("#cc-bright-val");
    if (bRange) {
      bRange.oninput = (e) => {
        const val = setBrightness(e.target.value);
        if (bVal) bVal.textContent = `${val}%`;
      };
    }

    const vRange = container.querySelector("#cc-vol-range");
    const vVal = container.querySelector("#cc-vol-val");
    if (vRange) {
      vRange.oninput = (e) => {
        const val = setVolume(e.target.value);
        if (vVal) vVal.textContent = `${val}%`;
      };
    }
  }

  // Initialize filter
  applyBrightnessFilter();

  window.controlSliders = {
    getBrightness,
    getVolume,
    setBrightness,
    setVolume,
    renderSliders,
    applyBrightnessFilter
  };
})();

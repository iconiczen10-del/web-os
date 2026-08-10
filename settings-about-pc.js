/* === FILE: settings-about-pc.js === */
/**
 * WebOS v0.7 Settings - About PC Section (Custom Hardware Specs)
 */
(function () {
  function getHardwareSpecs() {
    const width = window.screen ? window.screen.width : 2880;
    const height = window.screen ? window.screen.height : 1800;

    return [
      { label: "Processor", value: "Cyclone 1st Gen X9 @ 2.1 GHz (2C/4T)" },
      { label: "CPU Architecture", value: "x86-64, 14nm, 35W TDP" },
      { label: "CPU Cache", value: "L1: 128KB, L2: 512KB, L3: 3MB" },
      { label: "GPU", value: "Star R Pro — 2GB GDDR5" },
      { label: "GPU Architecture", value: "Star Kepler, 640 Cores @ 1,354 MHz" },
      { label: "Memory", value: "Black U5000 — 8GB DDR4 @ 5000 MHz" },
      { label: "Memory Config", value: "2 × 4GB Dual Channel, CL16-18-18-38" },
      { label: "Storage", value: "Bolt NV-256 — 256GB NVMe M.2 SSD" },
      { label: "Storage Speed", value: "Read: 3,500 MB/s | Write: 2,400 MB/s" },
      { label: "Motherboard", value: "Bolt B350-M (mATX, LGA 1150)" },
      { label: "PSU", value: "Volt 450W 80+ Bronze" },
      { label: "Cooling", value: "Cyclone Frost Air Cooler" },
      { label: "Display", value: `15.6" WebOS Retina — ${width}×${height} @ 220 PPI` },
      { label: "Audio", value: "Star Audio HD (24-bit / 192 kHz)" },
      { label: "Network", value: "BoltLink Wi-Fi 5 + Bluetooth 4.2" },
      { label: "OS", value: "WebOS v0.7.4 (64-bit Browser Runtime)" }
    ];
  }

  function renderAboutPC(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const titleEl = document.createElement("div");
    titleEl.className = "settings-section-title";
    titleEl.textContent = "About This PC";
    containerEl.appendChild(titleEl);

    const specsContainer = document.createElement("div");
    specsContainer.className = "about-pc-specs";

    const specs = getHardwareSpecs();
    specs.forEach(spec => {
      const row = document.createElement("div");
      row.className = "spec-row";
      row.innerHTML = `
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      `;
      specsContainer.appendChild(row);
    });

    containerEl.appendChild(specsContainer);
  }

  window.renderAboutPC = renderAboutPC;
})();


/* === FILE: settings-about-os-sections.js === */
/**
 * WebOS v0.7 About OS System Info, Credits, License & Footer Sections
 */
(function () {
  if (!window._webosBootTime) {
    window._webosBootTime = (1.5 + Math.random() * 2).toFixed(1) + " seconds";
  }
  if (!window._webosPid) {
    window._webosPid = Math.floor(1000 + Math.random() * 9000).toString();
  }
  if (!window._webosStartTime) {
    window._webosStartTime = Date.now();
  }

  function getEngineInfo() {
    const ua = navigator.userAgent || "";
    if (ua.includes("Chrome")) return { render: "Blink", js: "V8" };
    if (ua.includes("Safari") && !ua.includes("Chrome")) return { render: "WebKit", js: "JavaScriptCore" };
    if (ua.includes("Firefox")) return { render: "Gecko", js: "SpiderMonkey" };
    return { render: "Unknown", js: "Unknown" };
  }

  function formatUptime() {
    const elapsedSec = Math.floor((Date.now() - window._webosStartTime) / 1000);
    const hrs = Math.floor(elapsedSec / 3600);
    const mins = Math.floor((elapsedSec % 3600) / 60);
    const secs = elapsedSec % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    return `${mins}m ${secs}s`;
  }

  function renderSystemInfo(containerEl) {
    const now = new Date();
    const buildNum = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}.${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
    const engines = getEngineInfo();

    let memoryStr = "Not available (use Chrome)";
    if (window.performance && performance.memory) {
      memoryStr = `${Math.round(performance.memory.usedJSHeapSize / (1024 * 1024))} MB`;
    }

    const rows = [
      { label: "Software Version", value: "v0.7.2 (Beta)" },
      { label: "Build Number", value: buildNum },
      { label: "Kernel", value: "WebOS Kernel 1.0" },
      { label: "Architecture", value: "x64 Browser Runtime" },
      { label: "Boot Time", value: window._webosBootTime },
      { label: "Uptime", value: formatUptime(), isUptime: true },
      { label: "Process ID", value: window._webosPid },
      { label: "User Agent", value: "WebOS/0.7.2" },
      { label: "Render Engine", value: engines.render },
      { label: "JavaScript Engine", value: engines.js },
      { label: "Color Depth", value: `${screen.colorDepth}-bit` },
      { label: "Viewport", value: `${screen.width}×${screen.height} @ ${window.devicePixelRatio || 1}x` },
      { label: "Language", value: navigator.language || "en-US" },
      { label: "Cookies Enabled", value: navigator.cookieEnabled ? "Yes" : "No" },
      { label: "Do Not Track", value: navigator.doNotTrack || "Not available" },
      { label: "Online Status", value: navigator.onLine ? "Online" : "Offline" },
      { label: "Memory (JS Heap)", value: memoryStr }
    ];

    const div = document.createElement("div");
    div.className = "about-os-divider";
    div.textContent = "─── System Information ───";
    containerEl.appendChild(div);

    rows.forEach(r => {
      const card = document.createElement("div");
      card.className = "about-os-info-card";
      card.innerHTML = `<span class="about-os-info-label">${r.label}</span><span class="about-os-info-value" ${r.isUptime ? 'id="about-os-uptime-val"' : ''}>${r.value}</span>`;
      containerEl.appendChild(card);
    });

    const uptimeEl = containerEl.querySelector("#about-os-uptime-val");
    if (uptimeEl) {
      if (containerEl._uptimeInterval) clearInterval(containerEl._uptimeInterval);
      containerEl._uptimeInterval = setInterval(() => {
        if (uptimeEl) uptimeEl.textContent = formatUptime();
      }, 1000);
    }
  }

  function renderCredits(containerEl) {
    const div = document.createElement("div");
    div.className = "about-os-divider";
    div.textContent = "─── Credits ───";
    containerEl.appendChild(div);

    const credits = [
      { icon: "👤", title: "Lead Developer", name: "You", sub: "Architecture, Design, Development" },
      { icon: "🤖", title: "AI Assistant", name: "Google AI Studio", sub: "Code Generation, Debugging" },
      { icon: "🎨", title: "Design Inspiration", name: "macOS Sequoia", sub: "Visual Language & UX Patterns" },
      { icon: "🔧", title: "Built With", name: "HTML5, CSS3, JavaScript (ES6+)", sub: "No Frameworks. No Libraries. 100% Vanilla." },
      { icon: "📦", title: "Dependencies", name: "None", sub: "Zero external resources" }
    ];

    credits.forEach(c => {
      const card = document.createElement("div");
      card.className = "about-os-credit-card";
      card.innerHTML = `
        <div class="about-os-credit-icon">${c.icon}</div>
        <div class="about-os-credit-info">
          <div class="about-os-credit-title">${c.title}</div>
          <div class="about-os-credit-name">${c.name}</div>
          <div class="about-os-credit-sub">${c.sub}</div>
        </div>
      `;
      containerEl.appendChild(card);
    });
  }

  function renderLicenseAndFooter(containerEl) {
    const div = document.createElement("div");
    div.className = "about-os-divider";
    div.textContent = "─── License ───";
    containerEl.appendChild(div);

    const lic = document.createElement("div");
    lic.className = "about-os-license-block";
    lic.textContent = `MIT License\n\nCopyright (c) 2026 WebOS Project\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
    containerEl.appendChild(lic);

    const year = new Date().getFullYear();
    const footer = document.createElement("div");
    footer.className = "about-os-footer";
    footer.innerHTML = `
      <div class="about-os-footer-copy">© ${year} WebOS Project. All rights reserved.</div>
      <div class="about-os-footer-made">Made with ❤️ in the Browser.</div>
    `;
    containerEl.appendChild(footer);
  }

  window.renderAboutOSSystemInfo = renderSystemInfo;
  window.renderAboutOSCredits = renderCredits;
  window.renderAboutOSLicenseAndFooter = renderLicenseAndFooter;
})();

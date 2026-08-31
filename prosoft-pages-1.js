/* === FILE: prosoft-pages-1.js === */
/**
 * WebOS v0.9.0 ProSoft Website - Pages 1 (Tabs 1-5)
 * Home, V3D Engine, Gallery, Products, Showcase.
 */
(function () {
  function renderHome(container, onTab) {
    container.innerHTML = `
      <div class="ps-home-hero">
        <canvas class="ps-particles-canvas" id="ps-hero-canvas"></canvas>
        <div class="ps-hero-content">
          <div class="ps-v3d-badge-pulse">V3D ENGINE v1 • PRE-LAUNCH</div>
          <h1 class="ps-hero-title">PROSOFT INC.</h1>
          <div class="ps-hero-tagline" id="ps-tagline-text"></div>
          <div class="ps-progress-box">
            <div class="ps-progress-header">
              <span>Engine Development Progress</span>
              <strong>78% Complete</strong>
            </div>
            <div class="ps-progress-bar"><div class="ps-progress-fill" style="width: 78%;"></div></div>
          </div>
          <div class="ps-hero-actions">
            <button class="ps-btn ps-btn-primary" id="ps-hero-buy-btn">Get Early Access — $99</button>
            <button class="ps-btn ps-btn-secondary" id="ps-hero-teaser-btn">▶ Watch Teaser</button>
          </div>
          <div class="ps-countdown-box" id="ps-countdown-box">
            <div class="ps-cd-title">COUNTDOWN TO V3D v1 LAUNCH</div>
            <div class="ps-cd-grid">
              <div class="ps-cd-item"><span class="ps-cd-val" id="ps-cd-days">14</span><span class="ps-cd-lbl">DAYS</span></div>
              <div class="ps-cd-item"><span class="ps-cd-val" id="ps-cd-hrs">07</span><span class="ps-cd-lbl">HOURS</span></div>
              <div class="ps-cd-item"><span class="ps-cd-val" id="ps-cd-min">32</span><span class="ps-cd-lbl">MINS</span></div>
              <div class="ps-cd-item"><span class="ps-cd-val" id="ps-cd-sec">00</span><span class="ps-cd-lbl">SECS</span></div>
            </div>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector("#ps-hero-canvas");
    if (canvas && window.prosoftAnim) window.prosoftAnim.initParticles(canvas);

    const tagEl = container.querySelector("#ps-tagline-text");
    if (tagEl && window.prosoftAnim) window.prosoftAnim.typeText(tagEl, "THE FUTURE OF WEBOS GRAPHICS");

    const cdBox = container.querySelector("#ps-countdown-box");
    if (cdBox && window.prosoftAnim) window.prosoftAnim.startCountdown(cdBox);

    const buyBtn = container.querySelector("#ps-hero-buy-btn");
    if (buyBtn) {
      buyBtn.onclick = () => {
        const prod = window.prosoftState ? window.prosoftState.getProductById("early") : null;
        if (prod && window.prosoftPayment) window.prosoftPayment.openPaymentModal(prod, () => onTab("products"));
      };
    }

    const teaserBtn = container.querySelector("#ps-hero-teaser-btn");
    if (teaserBtn) {
      teaserBtn.onclick = () => {
        if (window.prosoftAnim) window.prosoftAnim.showTeaserVideo(container);
      };
    }
  }

  function renderEngine(container) {
    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">CORE ARCHITECTURE</span>
          <h2 class="ps-section-title">V3D Graphics Engine v1</h2>
          <p class="ps-section-sub">Next-generation hardware rasterization built natively for WebOS desktops.</p>
        </div>
        <div class="ps-features-grid">
          <div class="ps-feat-card"><div class="ps-feat-icon">⚡</div><h3>Low-Overhead Pipeline</h3><p>Direct WebGL2/WebGPU abstraction with zero unnecessary draw call stalls.</p></div>
          <div class="ps-feat-card"><div class="ps-feat-icon">🔮</div><h3>Real-time PBR Lighting</h3><p>Physically based shading with HDR tone mapping and metallic reflection maps.</p></div>
          <div class="ps-feat-card"><div class="ps-feat-icon">📐</div><h3>Procedural Meshes</h3><p>Built-in geometric primitives, displacement waves, and tessellators.</p></div>
          <div class="ps-feat-card"><div class="ps-feat-icon">🏎️</div><h3>60 FPS Guaranteed</h3><p>Frame-time stabilization engine tailored for Star R Pro and Cyclone CPUs.</p></div>
        </div>
        <div class="ps-table-wrap">
          <div class="ps-table-title">V3D v1 vs Traditional Browser Renderers</div>
          <table class="ps-specs-table">
            <thead><tr><th>Feature</th><th>V3D v1</th><th>Standard Canvas</th><th>Legacy 3D</th></tr></thead>
            <tbody>
              <tr><td>Draw Call Latency</td><td class="ps-highlight">&lt; 0.12 ms</td><td>1.45 ms</td><td>2.10 ms</td></tr>
              <tr><td>Shader Compiling</td><td class="ps-highlight">Pre-warmed Cache</td><td>Runtime JIT</td><td>Blocking JIT</td></tr>
              <tr><td>Memory Footprint</td><td class="ps-highlight">18 MB Base</td><td>85 MB</td><td>140 MB</td></tr>
              <tr><td>WebOS Integration</td><td class="ps-highlight">100% Native API</td><td>Generic Layer</td><td>Wrapper Plugin</td></tr>
            </tbody>
          </table>
        </div>
        <div class="ps-callout-box"><span>🚀 Expected Launch Window:</span> <strong>WebOS v0.10.0 Release</strong></div>
      </div>
    `;
  }

  function renderGallery(container, onTab) {
    const scenes = [
      { id: "cube", name: "Wireframe Tesseract", desc: "Dynamic rotating 4D hypercube vertex buffer.", shape: "cube" },
      { id: "sphere", name: "PBR Chrome Sphere", desc: "Ray-marched reflective surface with ambient bounce.", shape: "sphere" },
      { id: "torus", name: "Plasma Torus Knot", desc: "High-frequency mathematical ribbon manifold.", shape: "torus" },
      { id: "particles", name: "Cosmic Particle Cloud", desc: "10,000 GPU instanced floating luminous points.", shape: "particles" },
      { id: "wave", name: "Displacement Ocean", desc: "Real-time Gerstner wave fluid vertex shader.", shape: "wave" },
      { id: "color", name: "Volumetric Color Prism", desc: "Subsurface light diffusion and spectral caustics.", shape: "prism" }
    ];

    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">INTERACTIVE PREVIEWS</span>
          <h2 class="ps-section-title">V3D Demo Scene Showcase</h2>
          <p class="ps-section-sub">Preview the official demonstration modules running in our internal beta builds.</p>
        </div>
        <div class="ps-gallery-grid">
          ${scenes.map(s => `
            <div class="ps-scene-card">
              <div class="ps-scene-preview ps-shape-${s.shape}"><div class="ps-shape-core"></div><span class="ps-scene-badge">⏳ Coming Soon</span></div>
              <div class="ps-scene-body">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <button class="ps-btn ps-btn-sm ps-btn-primary ps-unlock-btn">Unlock with Early Access — $99</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".ps-unlock-btn").forEach(btn => {
      btn.onclick = () => {
        const prod = window.prosoftState ? window.prosoftState.getProductById("early") : null;
        if (prod && window.prosoftPayment) window.prosoftPayment.openPaymentModal(prod, () => onTab("products"));
      };
    });
  }

  function renderProducts(container) {
    const products = window.prosoftState ? window.prosoftState.getProducts() : [];
    const activeTier = window.prosoftState ? window.prosoftState.getPurchasedTier() : null;

    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">ACCESS TIERS</span>
          <h2 class="ps-section-title">Choose Your V3D Package</h2>
          <p class="ps-section-sub">Support independent WebOS graphics development and secure pre-launch perks.</p>
        </div>
        <div class="ps-products-grid">
          ${products.map(p => {
            const isPurchased = activeTier === p.id;
            return `
              <div class="ps-prod-card ${isPurchased ? 'active' : ''}">
                ${isPurchased ? '<div class="ps-prod-badge">ACTIVE TIER ✓</div>' : ''}
                <div class="ps-prod-header">
                  <h3 class="ps-prod-name">${p.name}</h3>
                  <div class="ps-prod-price">$${p.price}<span class="ps-prod-period"> / ${p.period}</span></div>
                </div>
                <p class="ps-prod-desc">${p.desc}</p>
                <ul class="ps-prod-perks">
                  ${p.perks.map(perk => `<li><span>✓</span> ${perk}</li>`).join("")}
                </ul>
                <button class="ps-btn ${isPurchased ? 'ps-btn-secondary' : 'ps-btn-primary'} ps-buy-btn" data-id="${p.id}" ${isPurchased ? 'disabled' : ''}>
                  ${isPurchased ? 'Owned' : `Purchase with Mbank ($${p.price})`}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".ps-buy-btn").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const prod = window.prosoftState ? window.prosoftState.getProductById(id) : null;
        if (prod && window.prosoftPayment) window.prosoftPayment.openPaymentModal(prod, () => renderProducts(container));
      };
    });
  }

  function renderShowcase(container) {
    const quotes = [
      { text: "V3D delivers rendering speeds we previously thought impossible inside browser environments.", author: "Marcus Vance", role: "Principal Graphics Lead" },
      { text: "The low draw call overhead allowed our team to run 60 FPS simulations without frame drops.", author: "Elena Rostova", role: "Technical Shader Artist" },
      { text: "ProSoft is fundamentally reshaping what native desktop apps can accomplish in WebOS.", author: "David K.", role: "WebOS Community Dev" },
      { text: "The PBR pipeline and procedural mesh engines are unmatched in lightweight efficiency.", author: "Aria Chen", role: "DevRel Director" },
      { text: "We have already ported our 3D CAD viewer prototypes to the V3D pre-release dev kit.", author: "Ethan Ray", role: "Systems Architect" }
    ];

    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">INDUSTRY ACCLAIM</span>
          <h2 class="ps-section-title">What Developers Are Saying</h2>
        </div>
        <div class="ps-quote-carousel" id="ps-quote-box">
          <div class="ps-quote-icon">“</div>
          <div class="ps-quote-body" id="ps-quote-text">${quotes[0].text}</div>
          <div class="ps-quote-author" id="ps-quote-author">— <strong>${quotes[0].author}</strong>, ${quotes[0].role}</div>
          <div class="ps-quote-dots" id="ps-quote-dots">
            ${quotes.map((_, i) => `<span class="ps-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join("")}
          </div>
        </div>
      </div>
    `;

    let qIdx = 0;
    const txtEl = container.querySelector("#ps-quote-text");
    const authEl = container.querySelector("#ps-quote-author");
    const dots = container.querySelectorAll(".ps-dot");

    function setQuote(idx) {
      qIdx = idx;
      if (txtEl) txtEl.textContent = quotes[idx].text;
      if (authEl) authEl.innerHTML = `— <strong>${quotes[idx].author}</strong>, ${quotes[idx].role}`;
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }

    const timer = setInterval(() => {
      setQuote((qIdx + 1) % quotes.length);
    }, 3000);

    dots.forEach(d => {
      d.onclick = () => {
        clearInterval(timer);
        setQuote(parseInt(d.getAttribute("data-idx"), 10));
      };
    });
  }

  window.prosoftPages1 = {
    renderHome,
    renderEngine,
    renderGallery,
    renderProducts,
    renderShowcase
  };
})();

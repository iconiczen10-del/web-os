/* === FILE: prosoft-pages-2.js === */
/**
 * WebOS v0.9.0 ProSoft Website - Pages 2 (Tabs 6-10)
 * Community, Support, About, Careers, Waitlist.
 */
(function () {
  function renderCommunity(container, onTab) {
    const isFounder = window.prosoftState && window.prosoftState.getPurchasedTier() === "founder";
    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">DEVELOPER FORUMS</span>
          <h2 class="ps-section-title">ProSoft Community Hub</h2>
          <p class="ps-section-sub">Join 4,827+ graphics programmers discussing shaders, models, and V3D integrations.</p>
        </div>
        <div class="ps-community-grid">
          <div class="ps-threads-list">
            <div class="ps-thread-item"><div class="ps-thread-tag">SHADER</div><h4>Porting HLSL compute shaders into V3D v1</h4><span>👤 DevAlex • 💬 28 replies • 🔥 Hot</span></div>
            <div class="ps-thread-item"><div class="ps-thread-tag">BENCHMARK</div><h4>Star R Pro GPU: 60 FPS stress test results</h4><span>👤 RayCaster99 • 💬 42 replies • 📌 Pinned</span></div>
            <div class="ps-thread-item"><div class="ps-thread-tag">DEV-KIT</div><h4>Early dev-kit integration notes for WebOS</h4><span>👤 ProSoftElena • 💬 67 replies</span></div>
          </div>
          <div class="ps-lounge-card ${isFounder ? 'unlocked' : 'locked'}">
            <div class="ps-lounge-badge">${isFounder ? '🌟 UNLOCKED' : '🔒 FOUNDERS ONLY'}</div>
            <h3>Founder's Private Lounge</h3>
            <p>${isFounder ? 'Welcome esteemed Founder! Private Discord & engine roadmaps available.' : 'Reserved exclusively for Founder Edition backers. Direct access to engine architects.'}</p>
            ${!isFounder ? '<button class="ps-btn ps-btn-sm ps-btn-accent" id="ps-get-founder-btn">Get Founder\'s Edition — $999</button>' : ''}
          </div>
        </div>
      </div>
    `;

    const fBtn = container.querySelector("#ps-get-founder-btn");
    if (fBtn) {
      fBtn.onclick = () => {
        const prod = window.prosoftState ? window.prosoftState.getProductById("founder") : null;
        if (prod && window.prosoftPayment) window.prosoftPayment.openPaymentModal(prod, () => onTab("products"));
      };
    }
  }

  function renderSupport(container) {
    const faqs = [
      { q: "What is V3D v1?", a: "V3D v1 is an ultra-lightweight, hardware-accelerated 3D rendering engine built natively for WebOS desktop applications." },
      { q: "When is the official launch?", a: "V3D v1 is slated for general release alongside the upcoming WebOS v0.10.0 platform update." },
      { q: "How do Mbank payments work?", a: "Payments are processed securely via WebOS Mbank card balances in real-time with zero external fees." },
      { q: "Are pre-launch purchases refundable?", a: "Yes, all tiers can be refunded directly to your Mbank account prior to the official v0.10.0 release." }
    ];

    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">HELP & FAQ</span>
          <h2 class="ps-section-title">Support Center</h2>
        </div>
        <div class="ps-faq-accordion">
          ${faqs.map((f, i) => `
            <div class="ps-faq-item ${i === 0 ? 'open' : ''}">
              <div class="ps-faq-q"><span>${f.q}</span><span class="ps-faq-icon">+</span></div>
              <div class="ps-faq-a"><p>${f.a}</p></div>
            </div>
          `).join("")}
        </div>
        <div class="ps-contact-card">
          <h4>Need further developer assistance?</h4>
          <p>Email our engineering team: <code>support@prosoft.webos</code></p>
          <small class="ps-text-dim">Notice: Pre-launch developer support is currently prioritizing Founder and Dev-Preview tiers.</small>
        </div>
      </div>
    `;

    container.querySelectorAll(".ps-faq-q").forEach(qEl => {
      qEl.onclick = () => {
        const item = qEl.parentElement;
        item.classList.toggle("open");
      };
    });
  }

  function renderAbout(container) {
    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">OUR MISSION</span>
          <h2 class="ps-section-title">About ProSoft Inc.</h2>
          <p class="ps-section-sub">Pioneering lightweight, uncompromising desktop graphics for the open web.</p>
        </div>
        <div class="ps-timeline">
          <div class="ps-tl-item"><div class="ps-tl-dot"></div><div class="ps-tl-date">Q1 2026</div><h4>Company Founded</h4><p>Formed by veterans of high-performance rendering engines.</p></div>
          <div class="ps-tl-item"><div class="ps-tl-dot"></div><div class="ps-tl-date">Q2 2026</div><h4>V3D Architecture Announced</h4><p>Introduced our proprietary zero-overhead draw call protocol.</p></div>
          <div class="ps-tl-item"><div class="ps-tl-dot"></div><div class="ps-tl-date">Q3 2026</div><h4>Pre-Launch Campaign</h4><p>VIP Waitlist, Dev Kit seeding, and community beta rollout.</p></div>
        </div>
        <div class="ps-team-grid">
          <div class="ps-team-card"><div class="ps-team-avatar">👨‍💻</div><h4>Ethan Ray</h4><div class="ps-team-role">Lead Systems Architect</div></div>
          <div class="ps-team-card"><div class="ps-team-avatar">👩‍🔬</div><h4>Elena Rostova</h4><div class="ps-team-role">Shader Specialist</div></div>
          <div class="ps-team-card"><div class="ps-team-avatar">👨‍🔧</div><h4>Marcus Vance</h4><div class="ps-team-role">Engine Core Lead</div></div>
          <div class="ps-team-card"><div class="ps-team-avatar">👩‍💼</div><h4>Aria Chen</h4><div class="ps-team-role">Developer Relations</div></div>
        </div>
      </div>
    `;
  }

  function renderCareers(container) {
    const jobs = [
      { title: "Senior Graphics Engineer", team: "Engine Core", loc: "Remote (WebOS)", desc: "Optimize low-level WebGL2/WebGPU buffer allocations and compute queues." },
      { title: "Shader & VFX Specialist", team: "Visuals", loc: "Remote (WebOS)", desc: "Author custom PBR BRDF functions, volumetric clouds, and post-fx." },
      { title: "3D Tools Programmer", team: "SDK", loc: "Remote (WebOS)", desc: "Build mesh import pipelines and scene graph serialization tools." },
      { title: "QA Graphics Tester", team: "Quality", loc: "Remote (WebOS)", desc: "Validate frame-time parity across Cyclone and Star R Pro GPUs." }
    ];

    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">JOIN THE CREW</span>
          <h2 class="ps-section-title">Careers at ProSoft Inc.</h2>
          <p class="ps-section-sub">Help build the foundational 3D graphics layer of WebOS before the grand launch.</p>
        </div>
        <div class="ps-jobs-grid">
          ${jobs.map(j => `
            <div class="ps-job-card">
              <div class="ps-job-header">
                <h3>${j.title}</h3>
                <span class="ps-job-loc">${j.loc}</span>
              </div>
              <span class="ps-job-team">📁 ${j.team}</span>
              <p class="ps-job-desc">${j.desc}</p>
              <button class="ps-btn ps-btn-sm ps-btn-primary ps-apply-btn" data-title="${j.title}">Apply for Role</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".ps-apply-btn").forEach(btn => {
      btn.onclick = () => {
        const title = btn.getAttribute("data-title");
        alert(`Thank you for your interest in ${title}! Applications are recorded in your WebOS profile.`);
      };
    });
  }

  function renderWaitlist(container, onTab) {
    container.innerHTML = `
      <div class="ps-page-container">
        <div class="ps-section-header">
          <span class="ps-section-badge">EARLY ACCESS QUEUE</span>
          <h2 class="ps-section-title">V3D Developer Waitlist</h2>
          <p class="ps-section-sub">Reserve your place in line to receive private beta drops and release alerts.</p>
        </div>
        <div id="ps-waitlist-widget-slot"></div>
      </div>
    `;
    const slot = container.querySelector("#ps-waitlist-widget-slot");
    if (slot && window.prosoftWaitlist) {
      window.prosoftWaitlist.renderWaitlistWidget(slot, () => renderWaitlist(container, onTab));
    }
  }

  window.prosoftPages2 = {
    renderCommunity,
    renderSupport,
    renderAbout,
    renderCareers,
    renderWaitlist
  };
})();

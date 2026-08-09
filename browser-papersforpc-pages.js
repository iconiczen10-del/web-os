/* === FILE: browser-papersforpc-pages.js === */
/**
 * WebOS v0.7 Papers For PC Inc. Page Templates
 */
(function () {
  function renderHome(containerEl, onNavigate) {
    return `<div class="papers-hero"><h1>Papers For PC Inc.</h1><p>Beautiful Wallpapers for Your Desktop Operating System</p><button class="papers-btn" id="pf-hero-cta" style="margin-top:20px;">Explore Wallpapers PCS</button></div><div class="papers-section"><h2>Our Featured Product</h2><div class="papers-card" style="display:flex;gap:16px;align-items:center;"><div style="font-size:48px;">🖼️</div><div><h3>Wallpapers PCS</h3><p>10 high-resolution wallpapers ranging from 38MB to 100MB. Available in Free & Pro tiers on the WebOS App Store.</p></div></div></div><div class="papers-section"><h2>Why Choose Papers For PC?</h2><div class="papers-cards"><div class="papers-card"><h3>🎨 Curated Designs</h3><p>Crafted specifically for modern desktop monitors with stunning contrast and depth.</p></div><div class="papers-card"><h3>⚡ High Quality</h3><p>Zero compression artifacts. Full 4K uncompressed gradient textures.</p></div><div class="papers-card"><h3>💎 Affordable Pro Tier</h3><p>Access all 10 wallpapers for just $4.99/month through your Mbank wallet.</p></div></div></div>`;
  }

  function renderAbout() {
    return `<div class="papers-hero" style="padding:40px 24px;"><h1>About Papers For PC Inc.</h1><p>Founded in 2026 in San Francisco, CA</p></div><div class="papers-section"><h2>Our Mission</h2><p style="color:#cbd5e1;line-height:1.6;margin-bottom:24px;">Papers For PC Inc. was born from a simple belief: your desktop is your digital sanctuary, and it deserves to look extraordinary. We build lightweight, ultra-high quality wallpaper applications for WebOS.</p><h2>The Executive Team</h2><div class="papers-team"><div class="papers-team-member"><div class="papers-team-avatar">👨‍💻</div><div class="papers-team-name">Alex Vance</div><div class="papers-team-role">Founder & CEO</div></div><div class="papers-team-member"><div class="papers-team-avatar">👩‍🎨</div><div class="papers-team-name">Elena Rostova</div><div class="papers-team-role">Lead Visual Artist</div></div><div class="papers-team-member"><div class="papers-team-avatar">👨‍🔧</div><div class="papers-team-name">Marcus Chen</div><div class="papers-team-role">Head of WebOS Ops</div></div><div class="papers-team-member"><div class="papers-team-avatar">👩‍💼</div><div class="papers-team-name">Sophia Sterling</div><div class="papers-team-role">Community Director</div></div></div></div>`;
  }

  function renderProducts() {
    return `<div class="papers-hero" style="padding:36px 24px;"><h1>Products & Pricing</h1><p>Wallpapers PCS — The Ultimate Desktop Background Suite</p></div><div class="papers-section"><h2>Free vs Pro Tier Comparison</h2><div class="papers-cards" style="grid-template-columns:1fr 1fr;"><div class="papers-card"><h3 style="color:#38bdf8;">Free Tier — $0</h3><p>• Access to 4 Wallpapers</p><p>• Standard 1080p Resolution</p><p>• Supported by subtle ads</p></div><div class="papers-card" style="border-color:rgba(168,85,247,0.4);"><h3 style="color:#c084fc;">Pro Tier — $4.99 / mo</h3><p>• Unlocks all 10 Wallpapers</p><p>• Full 4K Uncompressed Quality</p><p>• 100% Ad-Free Experience</p><p>• One-click Mbank Auto-Billing</p></div></div></div>`;
  }

  function renderContact() {
    return `<div class="papers-section" style="max-width:500px;margin:0 auto;padding-top:24px;"><h2>Contact Papers For PC Inc.</h2><p style="color:#94a3b8;font-size:12px;margin-bottom:16px;">Questions, support requests, or media inquiries?</p><div class="papers-contact-form"><input type="text" class="papers-input" placeholder="Your Name" /><input type="email" class="papers-input" placeholder="Your Email" /><textarea class="papers-input" style="height:80px;" placeholder="Your Message"></textarea><button class="papers-btn" onclick="alert('Thank you for contacting Papers For PC Inc. We will respond shortly!')">Send Message</button></div><div style="margin-top:24px;font-size:12px;color:#94a3b8;line-height:1.6;"><div>📧 Email: support@papersforpc.webos</div><div>📍 HQ: 123 Market Street, San Francisco, CA 94105</div></div></div>`;
  }

  function renderPress() {
    return `<div class="papers-section"><h2>Press Release</h2><div class="papers-card" style="margin-bottom:20px;"><h3 style="font-size:16px;">Papers For PC Inc. Launches Wallpapers PCS on WebOS</h3><div style="font-size:11px;color:#888;margin-bottom:10px;">San Francisco, CA — August 2026</div><p style="color:#cbd5e1;line-height:1.5;">Papers For PC Inc. today announced the official debut of Wallpapers PCS on the WebOS App Store. Offering 10 hand-curated gradient wallpapers with instant desktop integration, Wallpapers PCS represents a milestone in browser-based desktop customization.</p></div></div>`;
  }

  function renderCareers() {
    return `<div class="papers-section"><h2>Join Our Team</h2><p style="color:#94a3b8;font-size:12px;margin-bottom:16px;">Help us build the next generation of WebOS visual apps.</p><div class="papers-job-listing"><div><div class="papers-job-title">Senior Wallpaper Artist</div><div class="papers-job-meta">Full-Time • San Francisco, CA</div></div><button class="papers-btn" onclick="alert('Application submitted for Senior Wallpaper Artist!')">Apply</button></div><div class="papers-job-listing"><div><div class="papers-job-title">WebOS UX Designer</div><div class="papers-job-meta">Remote • Full-Time</div></div><button class="papers-btn" onclick="alert('Application submitted for WebOS UX Designer!')">Apply</button></div><div class="papers-job-listing"><div><div class="papers-job-title">App Store Marketing Manager</div><div class="papers-job-meta">Full-Time • San Francisco, CA</div></div><button class="papers-btn" onclick="alert('Application submitted for Marketing Manager!')">Apply</button></div><div class="papers-job-listing"><div><div class="papers-job-title">Junior WebOS Developer</div><div class="papers-job-meta">Internship • Remote</div></div><button class="papers-btn" onclick="alert('Application submitted for Junior Developer Internship!')">Apply</button></div></div>`;
  }

  window.browserPapersForPCPages = {
    renderHome,
    renderAbout,
    renderProducts,
    renderContact,
    renderPress,
    renderCareers
  };
})();

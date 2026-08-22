/* === FILE: webtube-payment-steps.js === */
/**
 * WebOS v0.8.3 WebTube 7-Step Payment Flow View Generator
 */
(function () {
  function getStepHTML(step, selectedTier, balance) {
    const tiers = window.webtubeTiers.TIERS;

    if (step === 1) {
      return `
        <div class="webtube-pay-step">
          <div class="webtube-pay-title">Step 1: Choose Your Subscription Plan</div>
          <div class="webtube-pay-grid">
            ${Object.values(tiers).map(t => `
              <div class="webtube-tier-card ${t.id === selectedTier.id ? 'active' : ''}" data-tier="${t.id}">
                <div class="webtube-tier-badge" style="background:${t.color};">${t.badge}</div>
                <div class="webtube-tier-name">${t.name}</div>
                <div class="webtube-tier-price">$${t.price.toFixed(2)}</div>
                <div class="webtube-tier-perks">
                  <div>• Max Quality: ${t.maxQuality}</div>
                  <div>• Video Catalog: ${t.videoAccessPct}%</div>
                  <div>• Comments: ${t.comments}</div>
                  <div>• Ads Intensity: ${t.adsIntensity}/10</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (step === 2) {
      return `
        <div class="webtube-pay-step">
          <div class="webtube-pay-title">Step 2: Account Review</div>
          <div class="webtube-pay-box">
            <div class="webtube-pay-row"><span>User Account:</span><strong>WebOS User (Standard)</strong></div>
            <div class="webtube-pay-row"><span>Selected Tier:</span><strong>WebTube ${selectedTier.name}</strong></div>
            <div class="webtube-pay-row"><span>Platform:</span><strong>WorldPlay Inc. Entertainment Suite</strong></div>
          </div>
        </div>
      `;
    }

    if (step === 3) {
      return `
        <div class="webtube-pay-step">
          <div class="webtube-pay-title">Step 3: Select Payment Method</div>
          <div class="webtube-pay-box">
            <div class="webtube-pay-row"><span>Method:</span><strong>🏦 Mbank Virtual Banking Wallet</strong></div>
            <div class="webtube-pay-row"><span>Current Mbank Balance:</span><strong style="color:#27c93f;">$${balance.toFixed(2)}</strong></div>
          </div>
        </div>
      `;
    }

    if (step === 4) {
      const diff = balance - selectedTier.price;
      return `
        <div class="webtube-pay-step">
          <div class="webtube-pay-title">Step 4: Order Summary</div>
          <div class="webtube-pay-box">
            <div class="webtube-pay-row"><span>Plan Price:</span><strong>$${selectedTier.price.toFixed(2)}</strong></div>
            <div class="webtube-pay-row"><span>Balance Before:</span><strong>$${balance.toFixed(2)}</strong></div>
            <div class="webtube-pay-row"><span>Balance After:</span><strong style="color:${diff >= 0 ? '#27c93f' : '#ff453a'};">$${diff.toFixed(2)}</strong></div>
          </div>
        </div>
      `;
    }

    if (step === 5) {
      return `
        <div class="webtube-pay-step">
          <div class="webtube-pay-title">Step 5: Security Verification</div>
          <div class="webtube-pay-box">
            <div style="font-size:12px; margin-bottom:10px;">Confirm your subscription to <strong>WebTube ${selectedTier.name}</strong> ($${selectedTier.price.toFixed(2)}):</div>
            <label style="font-size:12px; display:block; margin-bottom:6px;">Type <strong>CONFIRM</strong> to proceed:</label>
            <input type="text" id="webtube-verify-input" placeholder="Type CONFIRM" style="width:100%; padding:8px; background:#1e1e24; border:1px solid #333; color:#fff; border-radius:6px;" />
          </div>
        </div>
      `;
    }

    if (step === 6) {
      return `
        <div class="webtube-pay-step" style="text-align:center;">
          <div class="webtube-pay-title">Step 6: Processing Transaction...</div>
          <div style="font-size:13px; color:#8e8e93; margin-bottom:16px;">Contacting Mbank Secure Gateway</div>
          <div class="webtube-progress-bar"><div class="webtube-progress-fill" style="width:100%; animation:webtubeBar 3s ease;"></div></div>
        </div>
      `;
    }

    return `
      <div class="webtube-pay-step" style="text-align:center;">
        <div style="font-size:40px; margin-bottom:8px;">🎉</div>
        <div class="webtube-pay-title">Step 7: Subscription Activated!</div>
        <div style="font-size:13px; color:#ffd700; margin-bottom:16px;">Welcome to WebTube ${selectedTier.name} by WorldPlay Inc.</div>
        <div class="webtube-pay-box">
          <div class="webtube-pay-row"><span>Transaction ID:</span><strong>WP-${Math.floor(Math.random()*899999+100000)}</strong></div>
          <div class="webtube-pay-row"><span>New Balance:</span><strong>$${(balance - selectedTier.price).toFixed(2)}</strong></div>
        </div>
      </div>
    `;
  }

  window.webtubePaymentSteps = { getStepHTML };
})();

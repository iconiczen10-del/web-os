/* === FILE: aichat-maxdb-gates.js === */
/**
 * Max AI Database - 3 Purchase Verification Gates
 */
(function () {
  function renderGateCheckScreen(containerEl, onGatesPassed, onCancel) {
    if (!containerEl) return;

    let q1Ans = "";
    let q2Ans = "";
    let q3Ans = "";
    let gateErr = "";

    function checkGate1() {
      const a1 = q1Ans.trim().toLowerCase();
      const a2 = q2Ans.trim().toLowerCase();
      const a3 = q3Ans.trim().toLowerCase();

      const pass1 = a1.includes("ai talks") || a1.includes("aitalks");
      const pass2 = a2.includes("intelligent conversation") || a2.includes("accessible to all");
      const pass3 = a3.includes("san francisco") || a3.includes("sf");

      return pass1 && pass2 && pass3;
    }

    function checkGate2() {
      const activePlan = window.buynetManager ? window.buynetManager.getActivePlan() : null;
      return activePlan && activePlan.id === "ultimate";
    }

    function checkGate3() {
      return window.aitalksTracker ? window.aitalksTracker.hasVisitedAll() : false;
    }

    function draw() {
      const g1Ok = checkGate1();
      const g2Ok = checkGate2();
      const g3Ok = checkGate3();

      const currentPlan = window.buynetManager && window.buynetManager.getActivePlan() ? window.buynetManager.getActivePlan().name : "Default (200 KB/s)";
      const missingTabs = window.aitalksTracker ? window.aitalksTracker.getMissingTabs() : ["home", "about", "products", "blog", "contact"];

      containerEl.innerHTML = `
        <div class="maxdb-gate-container">
          <div class="maxdb-gate-header">
            <h3>🔒 Max AI Database Verification Gates</h3>
            <p>Complete all 3 security gates to unlock access purchase.</p>
          </div>

          ${gateErr ? `<div class="maxdb-gate-err">${gateErr}</div>` : ''}

          <!-- GATE 1 -->
          <div class="maxdb-gate-card ${g1Ok ? 'passed' : ''}">
            <div class="maxdb-gate-title">
              <span>Gate 1: AI Talks Security Questions</span>
              <span class="maxdb-gate-status">${g1Ok ? '✅ PASSED' : '❌ PENDING'}</span>
            </div>
            <div class="maxdb-gate-body">
              <label class="maxdb-field-lbl">1. Who develops AI Chat?</label>
              <input type="text" id="g1-q1" class="maxdb-input" placeholder="e.g. AI Talks Inc." value="${q1Ans}" />

              <label class="maxdb-field-lbl">2. What is the company tagline?</label>
              <input type="text" id="g1-q2" class="maxdb-input" placeholder="e.g. Intelligent Conversation, Accessible to All" value="${q2Ans}" />

              <label class="maxdb-field-lbl">3. Where is AI Talks Inc. headquartered?</label>
              <input type="text" id="g1-q3" class="maxdb-input" placeholder="e.g. San Francisco" value="${q3Ans}" />
            </div>
          </div>

          <!-- GATE 2 -->
          <div class="maxdb-gate-card ${g2Ok ? 'passed' : ''}">
            <div class="maxdb-gate-title">
              <span>Gate 2: Internet Speed Requirement (BUYNET Ultimate)</span>
              <span class="maxdb-gate-status">${g2Ok ? '✅ PASSED' : '❌ FAILED'}</span>
            </div>
            <div class="maxdb-gate-body">
              <p style="margin:0 0 6px 0; font-size:11px;">Requires <strong>Ultimate 1 Gbps</strong> BUYNET plan. Current: <strong>${currentPlan}</strong>.</p>
              ${!g2Ok ? `<p style="margin:0; font-size:11px; color:#ff7b72;">❌ Ultimate internet plan required. Open Browser → BUYNET to upgrade.</p>` : ''}
            </div>
          </div>

          <!-- GATE 3 -->
          <div class="maxdb-gate-card ${g3Ok ? 'passed' : ''}">
            <div class="maxdb-gate-title">
              <span>Gate 3: Website Exploration (www.aitalks.webos)</span>
              <span class="maxdb-gate-status">${g3Ok ? '✅ PASSED' : '❌ INCOMPLETE'}</span>
            </div>
            <div class="maxdb-gate-body">
              <p style="margin:0 0 6px 0; font-size:11px;">Must visit all 5 tabs on AI Talks site.</p>
              ${!g3Ok ? `<p style="margin:0; font-size:11px; color:#ff7b72;">❌ Missing tabs: <strong>${missingTabs.join(', ')}</strong>. Open Browser → www.aitalks.webos to explore.</p>` : '<p style="margin:0; font-size:11px; color:#30d158;">✅ All 5 website tabs explored.</p>'}
            </div>
          </div>

          <div class="maxdb-gate-actions">
            <button id="gate-btn-cancel" class="maxdb-btn secondary">Cancel</button>
            <button id="gate-btn-submit" class="maxdb-btn primary">Proceed to Payment</button>
          </div>
        </div>
      `;

      const q1El = containerEl.querySelector("#g1-q1");
      const q2El = containerEl.querySelector("#g1-q2");
      const q3El = containerEl.querySelector("#g1-q3");

      if (q1El) q1El.addEventListener("input", (e) => { q1Ans = e.target.value; });
      if (q2El) q2El.addEventListener("input", (e) => { q2Ans = e.target.value; });
      if (q3El) q3El.addEventListener("input", (e) => { q3Ans = e.target.value; });

      const cancelBtn = containerEl.querySelector("#gate-btn-cancel");
      if (cancelBtn) cancelBtn.addEventListener("click", onCancel);

      const submitBtn = containerEl.querySelector("#gate-btn-submit");
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          if (!checkGate1()) {
            gateErr = "❌ Gate 1 failed: Incorrect answer(s) to security questions. Check AI Talks site for details.";
            draw();
            return;
          }
          if (!checkGate2()) {
            gateErr = `❌ Gate 2 failed: Ultimate 1 Gbps plan required. Current plan: ${currentPlan}.`;
            draw();
            return;
          }
          if (!checkGate3()) {
            gateErr = `❌ Gate 3 failed: Explore the full AI Talks website first. Missing tabs: ${missingTabs.join(', ')}.`;
            draw();
            return;
          }

          gateErr = "";
          if (typeof onGatesPassed === "function") onGatesPassed();
        });
      }
    }

    draw();
  }

  window.maxDBGates = {
    renderGateCheckScreen
  };
})();

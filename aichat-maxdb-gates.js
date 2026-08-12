/* === FILE: aichat-maxdb-gates.js === */
/**
 * Max AI Database - 3 Purchase Verification Gates
 */
(function () {
  const G1_QUESTIONS = [
    { id: "q1", title: "1. Who develops AI Chat?", ans: "AI Talks Inc.", opts: ["AI Talks Inc.", "WebOS Foundation", "OpenAI Labs", "CyberTech Solutions", "NeuralNet Corp", "Bolt Systems Inc."] },
    { id: "q2", title: "2. What is the company tagline?", ans: "Intelligent Conversation, Accessible to All", opts: ["Empowering Intelligence, One Click at a Time", "Intelligent Conversation, Accessible to All", "Fast, Local, and Cloud-Powered AI", "The Future of Browser Computing", "AI Assistant for Next Generation OS", "Smart Solutions for Modern Web"] },
    { id: "q3", title: "3. Where is AI Talks Inc. headquartered?", ans: "San Francisco", opts: ["New York", "Seattle", "San Francisco", "Austin", "Boston", "Tokyo"] }
  ];

  function renderGateCheckScreen(containerEl, onGatesPassed, onCancel) {
    if (!containerEl) return;
    let qAns = { q1: "", q2: "", q3: "" };
    let gateErr = "";

    function checkGate1() { return G1_QUESTIONS.every(q => qAns[q.id] === q.ans); }
    function checkGate2() {
      const activePlan = window.buynetManager ? window.buynetManager.getActivePlan() : null;
      return activePlan && activePlan.id === "ultimate";
    }
    function checkGate3() { return window.aitalksTracker ? window.aitalksTracker.hasVisitedAll() : false; }

    function renderQuestion(q) {
      const optsHtml = q.opts.map(opt => `
        <label class="maxdb-mcq-opt">
          <input type="radio" name="${q.id}" value="${opt}" ${qAns[q.id] === opt ? "checked" : ""}>
          <span>${opt}</span>
        </label>
      `).join("");
      return `<div class="maxdb-mcq-q"><label class="maxdb-field-lbl">${q.title}</label><div class="maxdb-mcq-grid">${optsHtml}</div></div>`;
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
              <span>Gate 1: AI Talks Security Questions (MCQ)</span>
              <span class="maxdb-gate-status">${g1Ok ? '✅ PASSED' : '❌ PENDING'}</span>
            </div>
            <div class="maxdb-gate-body">${G1_QUESTIONS.map(renderQuestion).join("")}</div>
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

      containerEl.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
          qAns[e.target.name] = e.target.value;
          draw();
        });
      });

      const cancelBtn = containerEl.querySelector("#gate-btn-cancel");
      if (cancelBtn) cancelBtn.addEventListener("click", onCancel);

      const submitBtn = containerEl.querySelector("#gate-btn-submit");
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          if (!checkGate1()) { gateErr = "❌ Gate 1 failed: Select correct answers for all 3 security questions."; draw(); return; }
          if (!checkGate2()) { gateErr = `❌ Gate 2 failed: Ultimate 1 Gbps plan required. Current plan: ${currentPlan}.`; draw(); return; }
          if (!checkGate3()) { gateErr = `❌ Gate 3 failed: Explore the full AI Talks website first. Missing tabs: ${missingTabs.join(', ')}.`; draw(); return; }
          gateErr = "";
          if (typeof onGatesPassed === "function") onGatesPassed();
        });
      }
    }

    draw();
  }

  window.maxDBGates = { renderGateCheckScreen };
})();

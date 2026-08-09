/* === FILE: boot-screen-progress.js === */
/**
 * WebOS v0.7.1.1 Boot Screen Progress & Hardware Detection Messages
 */
(function () {
  const BOOT_MESSAGES = [
    { time: 200, text: "WebOS Kernel 1.0 (x64 Browser Runtime)" },
    { time: 450, text: "Bolt B350-M motherboard — POST OK" },
    { time: 700, text: "Cyclone 1st Gen X9 detected — 2 cores, 4 threads" },
    { time: 950, text: "Black U5000 — 8GB DDR4 @ 5000 MHz initialized" },
    { time: 1200, text: "Star R Pro GPU initialized — 2GB GDDR5" },
    { time: 1450, text: "Bolt NV-256 mounted — 256GB NVMe M.2 SSD" },
    { time: 1700, text: "BoltLink Wi-Fi 5 — connected" },
    { time: 1950, text: "Loading window manager... [OK]" },
    { time: 2200, text: "Starting app registry... 10 apps registered" },
    { time: 2500, text: "Initializing Mbank secure wallet... [OK]" },
    { time: 2700, text: "Ready." }
  ];

  function getProgressAtTime(elapsed) {
    if (elapsed < 400) return 0;
    if (elapsed >= 2800) return 100;

    const t = elapsed - 400; // 0 to 2400 ms
    if (t <= 800) {
      return Math.round((t / 800) * 35);
    } else if (t <= 1500) {
      return Math.round(35 + ((t - 800) / 700) * 20);
    } else if (t <= 2000) {
      return Math.round(55 + ((t - 1500) / 500) * 30);
    } else if (t <= 2500) {
      return Math.round(85 + ((t - 2000) / 500) * 14);
    } else {
      return 100;
    }
  }

  function startBootSimulation(fillEl, percentEl, msgContainer, onDone) {
    const startTime = Date.now();
    let displayedMsgIndex = -1;
    let animFrame = null;

    function step() {
      const elapsed = Date.now() - startTime;

      const progress = getProgressAtTime(elapsed);
      if (fillEl) fillEl.style.width = progress + "%";
      if (percentEl) percentEl.textContent = progress + "%";

      for (let i = displayedMsgIndex + 1; i < BOOT_MESSAGES.length; i++) {
        if (elapsed >= BOOT_MESSAGES[i].time) {
          displayedMsgIndex = i;
          appendBootMessage(msgContainer, BOOT_MESSAGES[i].text);
        }
      }

      if (elapsed < 2800) {
        animFrame = requestAnimationFrame(step);
      } else {
        if (fillEl) fillEl.style.width = "100%";
        if (percentEl) percentEl.textContent = "100%";
        if (typeof onDone === "function") onDone();
      }
    }

    animFrame = requestAnimationFrame(step);
  }

  function appendBootMessage(container, text) {
    if (!container) return;
    const msg = document.createElement("div");
    msg.className = "boot-message";
    msg.textContent = text;
    container.appendChild(msg);

    const children = Array.from(container.children);
    if (children.length > 3) {
      const oldest = children[0];
      oldest.classList.add("fading-out");
      setTimeout(() => oldest.remove(), 300);
    }
  }

  window.startBootSimulation = startBootSimulation;
})();


/* === FILE: dero-errors.js === */
/**
 * WebOS v0.9.2.1 DER-0 Error Definitions & Dialog System
 */
(function () {
  const ERROR_DEFS = {
    "der-service-stop": {
      title: "System Error",
      msg: "DER-service.exe has stopped working. System halted this thread.",
      icon: "❌",
      buttons: [{ label: "Close Program", action: "close" }]
    },
    "mem-alloc-fail": {
      title: "Fatal Memory Exception",
      msg: "Memory allocation failed at virtual address 0x7F3A.",
      icon: "🧠",
      buttons: [{ label: "OK", action: "close" }]
    },
    "wifi-corrupt": {
      title: "Device Driver Failure",
      msg: "BoltLink Wi-Fi 5 driver corrupted. Network adapter disabled.",
      icon: "🌐",
      buttons: [{ label: "OK", action: "close" }]
    },
    "gpu-crash": {
      title: "Display Pipeline Panic",
      msg: "GPU driver crash detected. Star R Pro pipeline unresponsive.",
      icon: "🎮",
      buttons: [
        { label: "Restart Driver", action: "restart-gpu" },
        { label: "Ignore", action: "close" }
      ]
    },
    "disk-write-fail": {
      title: "I/O Hardware Fault",
      msg: "Disk write failed. Bolt NV-64 partition table corrupted.",
      icon: "💾",
      buttons: [
        { label: "Retry", action: "close" },
        { label: "Cancel", action: "close" }
      ]
    },
    "crit-shutdown": {
      title: "System Halt",
      msg: "DER-0 has corrupted critical kernel files. WebOS cannot continue.",
      icon: "☣️",
      buttons: [{ label: "Shut Down", action: "shutdown" }]
    },
    "der-config-crash": {
      title: "Registry Fault",
      msg: "System configuration registry missing. Settings daemon halted.",
      icon: "⚙️",
      buttons: [{ label: "OK", action: "close" }]
    }
  };

  function showError(errorId, onClose) {
    const def = ERROR_DEFS[errorId] || ERROR_DEFS["der-service-stop"];
    const overlay = document.createElement("div");
    overlay.className = "dero-error-overlay";
    overlay.innerHTML = `
      <div class="dero-error-modal">
        <div class="dero-error-header">
          <span class="dero-error-icon">${def.icon}</span>
          <span class="dero-error-title">${def.title}</span>
        </div>
        <div class="dero-error-body">${def.msg}</div>
        <div class="dero-error-actions">
          ${def.buttons.map((b, i) => `
            <button class="dero-btn ${i === 0 ? 'primary' : ''}" data-act="${b.action}">${b.label}</button>
          `).join("")}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelectorAll(".dero-btn").forEach(btn => {
      btn.onclick = () => {
        const act = btn.getAttribute("data-act");
        overlay.remove();
        if (act === "shutdown" && window.deroEffects) {
          window.deroEffects.triggerBSOD();
        } else if (act === "restart-gpu" && window.deroEffects) {
          window.deroEffects.screenGlitch();
        }
        if (onClose) onClose(act);
      };
    });

    if (window.deroEffects) {
      window.deroEffects.applyWindowShake(3);
      setTimeout(() => window.deroEffects.stopWindowShake(), 400);
    }
  }

  window.deroErrors = {
    showError,
    ERROR_DEFS
  };
})();

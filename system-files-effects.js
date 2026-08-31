/* === FILE: system-files-effects.js === */
/**
 * WebOS v0.9.2.1.2 Real System File Deletion Consequences Engine
 */
(function () {
  const sysState = {
    kernelDeleted: false,
    explorerDeleted: false,
    bootmgrDeleted: false,
    gpuDeleted: false,
    registryDeleted: false,
    pagefileDeleted: false,
    fontsDeleted: false,
    vtOptimizerDeleted: false,
    vtConfigDeleted: false,
    vtEngineDeleted: false,
    vtDatabaseDeleted: false,
    vtServiceDeleted: false
  };

  function triggerKernelMissingPanic() {
    sysState.kernelDeleted = true;
    const crash = document.createElement("div");
    crash.className = "dero-bsod-screen";
    crash.id = "kernel-panic-screen";
    crash.style.background = "#000000";
    crash.style.zIndex = "999999";
    crash.innerHTML = `
      <div class="bsod-content" style="color: #ff5555; font-family: monospace;">
        <div class="bsod-face" style="font-size: 56px;">💀 KERNEL_SECURITY_CHECK_FAILURE</div>
        <div class="bsod-heading" style="color: #ffffff; margin-top: 16px;">CRITICAL SYSTEM HALT: ntoskrnl.wsys is missing or corrupted.</div>
        <div class="bsod-desc" style="color: #aaaaaa; margin-top: 12px;">WebOS Kernel could not execute required entry point. System halted to prevent hardware fault.</div>
        <div style="margin-top: 24px; padding: 12px; background: #1a0000; border: 1px solid #ff2222; border-radius: 6px;">
          <div>STOP: 0x0000007B (INACCESSIBLE_BOOT_KERNEL)</div>
          <div>Path: /System/Kernel/ntoskrnl.wsys</div>
        </div>
        <button id="btn-panic-reboot" style="margin-top: 28px; padding: 10px 20px; background: #ff3333; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Force Reboot System</button>
      </div>
    `;
    document.body.appendChild(crash);
    const btn = crash.querySelector("#btn-panic-reboot");
    if (btn) btn.onclick = () => window.location.reload();
  }

  function applyDeletionEffect(file) {
    if (!file) return;
    const name = file.name;

    if (name === "ntoskrnl.wsys" || name === "kernel-core.wsys") {
      triggerKernelMissingPanic();
    } else if (name === "explorer.wsys" || name === "desktop-render.wsys") {
      sysState.explorerDeleted = true;
      const desk = document.getElementById("desktop") || document.body;
      desk.style.background = "#000000";
      const shortcuts = document.getElementById("desktop-shortcuts");
      if (shortcuts) shortcuts.style.display = "none";
      const dock = document.getElementById("dock");
      if (dock) dock.style.opacity = "0.1";
      if (window.notificationBus) window.notificationBus.notify("Explorer Terminated", "explorer.wsys deleted. Desktop shell halted.", "🖥️", "Shell Host", "settings");
    } else if (name === "bootmgr.wsys") {
      sysState.bootmgrDeleted = true;
      sessionStorage.setItem("webos_boot_fail", "true");
      if (window.notificationBus) window.notificationBus.notify("Boot Sector Warning", "bootmgr.wsys deleted. System will fail on next boot.", "⚡", "Bootloader", "settings");
    } else if (name === "star-rpro-driver.wsys" || name === "markred-display-driver.wsys") {
      sysState.gpuDeleted = true;
      document.body.style.filter = "contrast(180%) saturate(30%) grayscale(40%)";
      if (window.notificationBus) window.notificationBus.notify("Display Adapter Failed", "GPU driver removed. Reverting to 640x480 generic VGA fallback.", "🎮", "GPU Subsystem", "monitor");
    } else if (name === "registry.wsys" || name === "system-config.wsys") {
      sysState.registryDeleted = true;
      if (window.notificationBus) window.notificationBus.notify("Registry Corrupt", "System configuration database destroyed. Settings inoperable.", "🗄️", "Config Subsystem", "settings");
    } else if (name === "pagefile.wsys") {
      sysState.pagefileDeleted = true;
      if (window.notificationBus) window.notificationBus.notify("Low Memory Warning", "pagefile.wsys deleted. RAM usage spiked to 99%.", "💾", "Memory Manager", "monitor");
    } else if (name.startsWith("webos-") && file.folder === "/System/Fonts") {
      sysState.fontsDeleted = true;
      document.body.style.fontFamily = "'Courier New', Courier, monospace";
    } else if (name === "VT-optimizer.wsys") {
      sysState.vtOptimizerDeleted = true;
      const vt = document.getElementById("topbar-vt-container");
      if (vt) vt.style.display = "none";
      if (window.updateEffects) window.updateEffects.setCPUOptimized(false);
    } else if (name === "VT-config.wsys") {
      sysState.vtConfigDeleted = true;
    } else if (name === "VT-engine.wsys") {
      sysState.vtEngineDeleted = true;
      if (window.updateEffects) window.updateEffects.setCPUOptimized(false);
    } else if (name === "VT-database.wsys") {
      sysState.vtDatabaseDeleted = true;
    } else if (name === "VT-service.wsys") {
      sysState.vtServiceDeleted = true;
      const vt = document.getElementById("topbar-vt-container");
      if (vt) vt.style.opacity = "0.3";
    }
  }

  window.systemFilesEffects = {
    sysState,
    applyDeletionEffect,
    triggerKernelMissingPanic
  };
})();

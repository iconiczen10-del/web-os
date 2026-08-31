/* === FILE: pose-boot-check.js === */
/**
 * WebOS v0.10.0 POSE Boot Check & Version Guard
 * Checks IndexedDB on boot. Restores if active+valid, or shows incompatible modal.
 */
(function () {
  const CURRENT_OS_VERSION = "v0.10.0";

  function showIncompatibleModal(savedVersion, onFresh) {
    const overlay = document.createElement("div");
    overlay.id = "pose-incompatible-modal";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.85)";
    overlay.style.backdropFilter = "blur(12px)";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.fontFamily = "system-ui, -apple-system, sans-serif";

    overlay.innerHTML = `
      <div style="background: #1c1c1e; border: 1px solid rgba(255,69,58,0.4); border-radius: 14px; width: 380px; padding: 24px; color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.6); text-align: center;">
        <div style="font-size: 36px; margin-bottom: 12px;">❌</div>
        <div style="font-size: 18px; font-weight: 700; color: #ff453a; margin-bottom: 12px;">Incompatible Session</div>
        <div style="font-size: 13px; color: #d1d5db; line-height: 1.6; margin-bottom: 8px;">
          POSE save was created on <b>${savedVersion || "earlier version"}</b>.<br/>
          Current system version: <b>${CURRENT_OS_VERSION}</b>.
        </div>
        <div style="font-size: 12px; color: #8e8e93; margin-bottom: 20px;">
          This save cannot be used with newer OS architecture.
        </div>
        <button id="pose-start-fresh-btn" style="background: #0a84ff; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s;">Start Fresh</button>
      </div>
    `;

    document.body.appendChild(overlay);
    const btn = overlay.querySelector("#pose-start-fresh-btn");
    if (btn) {
      btn.onclick = async () => {
        if (window.poseSession) await window.poseSession.clearSession();
        overlay.remove();
        if (typeof onFresh === "function") onFresh();
      };
    }
  }

  async function checkBootSession(onComplete) {
    if (!window.webosDB || !window.poseSession) {
      if (typeof onComplete === "function") onComplete({ restored: false });
      return;
    }

    try {
      const isActive = await window.poseSession.isPoseActive();
      if (!isActive) {
        console.log("[POSE Boot] POSE is inactive — fresh start");
        if (typeof onComplete === "function") onComplete({ restored: false });
        return;
      }

      const meta = await window.poseSession.getSessionMeta();
      const session = await window.webosDB.getState("pose-session");

      if (!session) {
        console.log("[POSE Boot] POSE is active but no saved session — fresh start");
        if (typeof onComplete === "function") onComplete({ restored: false });
        return;
      }

      const savedVersion = (meta && meta.version) || session.version;
      if (savedVersion !== CURRENT_OS_VERSION) {
        console.warn(`[POSE Boot] Version mismatch: save is ${savedVersion}, current is ${CURRENT_OS_VERSION}`);
        showIncompatibleModal(savedVersion, () => {
          if (typeof onComplete === "function") onComplete({ restored: false, incompatible: true });
        });
        return;
      }

      const res = window.poseSession.applySnapshot(session);
      console.log("[POSE Boot] Successfully restored session snapshot for " + CURRENT_OS_VERSION);
      if (typeof onComplete === "function") onComplete({ restored: true });
    } catch (e) {
      console.error("[POSE Boot] Error during boot check:", e);
      if (typeof onComplete === "function") onComplete({ restored: false, error: e });
    }
  }

  window.poseBootCheck = {
    checkBootSession,
    showIncompatibleModal
  };
})();

/* === FILE: eta-version.js === */
/**
 * WebOS v0.10.0 ETA Version Compatibility Check
 * Validates package OS requirements against running system.
 */
(function () {
  const CURRENT_VERSION = "v0.10.0";

  function parseVersion(vStr) {
    if (!vStr) return [0, 0, 0];
    const clean = vStr.replace(/^v/, "");
    return clean.split(".").map(n => parseInt(n, 10) || 0);
  }

  function checkVersion(requiresOS) {
    if (!requiresOS) {
      return { passed: true, status: "pass", icon: "✅", message: `Compatible with ${CURRENT_VERSION}` };
    }

    const req = parseVersion(requiresOS);
    const curr = parseVersion(CURRENT_VERSION);

    let isCompatible = true;
    for (let i = 0; i < Math.max(req.length, curr.length); i++) {
      const r = req[i] || 0;
      const c = curr[i] || 0;
      if (c < r) { isCompatible = false; break; }
      if (c > r) { isCompatible = true; break; }
    }

    return {
      passed: isCompatible,
      status: isCompatible ? "pass" : "fail",
      icon: isCompatible ? "✅" : "❌",
      message: isCompatible
        ? `Compatible (Requires ${requiresOS} or higher)`
        : `Incompatible (Requires ${requiresOS}, current is ${CURRENT_VERSION})`
    };
  }

  window.etaVersion = { checkVersion, CURRENT_VERSION };
})();

/* === FILE: eta-duplicate.js === */
/**
 * WebOS v0.10.0 ETA Duplicate Check Module
 * Checks if the requested app or file is already installed or present in target path.
 */
(function () {
  function checkDuplicate(id, type) {
    if (type === "app" || type === "pose") {
      const installed = typeof window.getInstalledAppIds === "function" ? window.getInstalledAppIds() : [];
      const exists = installed.includes(id);
      return {
        passed: !exists,
        isDuplicate: exists,
        status: exists ? "warn" : "pass",
        icon: exists ? "⚠️" : "✅",
        message: exists ? "Already Installed (Will Reinstall/Overwrite)" : "New Package (Not Installed)"
      };
    }

    return {
      passed: true,
      isDuplicate: false,
      status: "pass",
      icon: "✅",
      message: "Ready to Download"
    };
  }

  window.etaDuplicate = { checkDuplicate };
})();

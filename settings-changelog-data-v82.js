/* === FILE: settings-changelog-data-v82.js === */
/**
 * WebOS v0.8.2 Changelog Entry Data
 */
(function () {
  window.CHANGELOG_V82 = [
    {
      version: "v0.8.2",
      date: "2026-08-16",
      title: "Device Manager & DriverManager Website",
      type: "major",
      summary: "Integrated a comprehensive Windows-style Device Manager inside Settings and launched the official DriverManager website (www.dmanager.webos) with 15 hardware devices, 14 hardware partners, 5-second asynchronous operations, and real-time hardware state effects.",
      features: [
        "🔧 Device Manager in Settings with Windows-style tree view",
        "🖥️ 15 hardware devices across 12 categories with 14 unique manufacturers",
        "📋 Device properties dialog with General, Driver, Details, and Resources tabs",
        "⏳ 5-second progress bars for all device operations (Disable, Enable, Update, Rollback, Uninstall, Scan)",
        "🔒 Critical device protection for CPU, RAM, Motherboard, and Boot Loader",
        "⚡ Real-time hardware effects: disabling Wi-Fi cuts internet, disabling GPU switches to basic renderer, disabling audio disables player",
        "🌐 Official DriverManager website at www.dmanager.webos featuring 7 tabs (Home, Drivers, Companies, Downloads, Updates, Support, About)",
        "🏢 14 Hardware partner companies cataloged with driver downloads",
        "🔄 All drivers start at v1.0.0.0 on boot and updates apply for the session without requiring a reboot",
        "📡 Driver downloads dynamically use active BUYNET connection speed",
        "🚀 Global version alignment across all system components to v0.8.2"
      ]
    }
  ];
})();

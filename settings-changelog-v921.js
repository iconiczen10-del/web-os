/* === FILE: settings-changelog-v921.js === */
/**
 * WebOS v0.9.2.1 & v0.9.2.1.1 Changelog Data
 */
(function () {
  window.CHANGELOG_V921 = [
    {
      version: "v0.9.2.1.2",
      date: "2026-08-27",
      title: "Real System Files & VT-23x/DER-0 Structures",
      badge: "Architecture",
      features: [
        "Real Windows-style System folder structure with 100+ files and 12 GB storage footprint",
        "Subfolders for Kernel, Desktop, Boot, Drivers (GPU/Audio/Net/Display/USB/Input/Power/Storage), Config, Fonts, Logs, and Temp",
        "Complete removal of protection flags — all files and folders are fully deletable",
        "Real deletion consequences: kernel panic on ntoskrnl delete, shell shutdown on explorer delete, and boot sector failure",
        "VT-23x package folder (1.2 GB) in Finder with 5 subsystem binaries after installation",
        "DER-0 package folder (3.2 GB) in Finder with 6 attack vectors and DER-00 neutralization target",
        "Progressive DER dump files generation in Downloads filling storage up to 30+ GB",
        "Nested subfolder navigation and context menu file operations in Finder"
      ]
    },
    {
      version: "v0.9.2.1.1",
      date: "2026-08-27",
      title: "AI Chat Knowledge Tab Scroll Fix",
      badge: "Fix",
      features: [
        "AI Chat Knowledge tab scrollable with full topic access",
        "Preserved scroll position during category expand and collapse",
        "Thin blue scrollbar styling with touch-action pan-y",
        "Max-height and overflow constraints on .kb-container and .kb-content-list",
        "Fixed question clipping and inaccessible lower topic views"
      ]
    },
    {
      version: "v0.9.2.1",
      date: "2026-08-27",
      title: "DER-0 Corrupt Update",
      badge: "Security",
      features: [
        "DER-0 corrupt update package in WebOS Update tab",
        "5-minute progressive corruption timeline after install",
        "Storage filled with junk temporary payload files",
        "Window jitter and shaking physical feedback",
        "Random app launches with corrupted strings",
        "Critical hardware driver deletions across minutes 2-5",
        "6 authentic system error and hardware fault dialogs",
        "Blue Screen of Death (BSOD) with crash dump progress & stats screen",
        "System recovery via deleting DER-00 from Finder /System/DER-0 or Safe Mode reboot"
      ]
    }
  ];
})();

/* === FILE: system-files-data-2.js === */
/**
 * WebOS v0.9.2.1.2 System Folder Files & Structure (Part 2: Config, Fonts, Logs, Temp, Pagefile)
 */
(function () {
  const foldersPart2 = [
    { id: "sys-config", name: "Config", path: "/System/Config", parentPath: "/System", icon: "🔧", protected: false },
    { id: "sys-fonts", name: "Fonts", path: "/System/Fonts", parentPath: "/System", icon: "🔤", protected: false },
    { id: "sys-logs", name: "Logs", path: "/System/Logs", parentPath: "/System", icon: "📜", protected: false },
    { id: "sys-temp", name: "Temp", path: "/System/Temp", parentPath: "/System", icon: "🗑️", protected: false }
  ];

  const filesPart2 = [
    // Config (868 MB)
    { name: "registry.wsys", folder: "/System/Config", ext: ".wsys", type: "WebOS System Registry Database", sizeMB: 420, icon: "🗄️" },
    { name: "system-config.wsys", folder: "/System/Config", ext: ".wsys", type: "Core System Configuration", sizeMB: 180, icon: "⚙️" },
    { name: "user-config.wsys", folder: "/System/Config", ext: ".wsys", type: "User Profile Configuration", sizeMB: 120, icon: "👤" },
    { name: "network-config.wsys", folder: "/System/Config", ext: ".wsys", type: "Network Protocol Stack Config", sizeMB: 65, icon: "🌐" },
    { name: "display-config.wsys", folder: "/System/Config", ext: ".wsys", type: "Display Resolution Registry", sizeMB: 48, icon: "🖥️" },
    { name: "power-config.wsys", folder: "/System/Config", ext: ".wsys", type: "Power Policy & ACPI Config", sizeMB: 35, icon: "⚡" },

    // Fonts (107 MB)
    { name: "webos-sans.wsys", folder: "/System/Fonts", ext: ".wsys", type: "WebOS Sans Primary Font", sizeMB: 28, icon: "🔤" },
    { name: "webos-mono.wsys", folder: "/System/Fonts", ext: ".wsys", type: "WebOS Monospace Terminal Font", sizeMB: 22, icon: "🔤" },
    { name: "webos-serif.wsys", folder: "/System/Fonts", ext: ".wsys", type: "WebOS Serif Display Font", sizeMB: 25, icon: "🔤" },
    { name: "webos-icons.wsys", folder: "/System/Fonts", ext: ".wsys", type: "WebOS System Vector Icons Font", sizeMB: 32, icon: "🔤" },

    // Logs (258 MB)
    { name: "system.log", folder: "/System/Logs", ext: ".log", type: "System Event Log", sizeMB: 85, icon: "📜" },
    { name: "boot.log", folder: "/System/Logs", ext: ".log", type: "Boot Sequence Log", sizeMB: 42, icon: "📜" },
    { name: "error.log", folder: "/System/Logs", ext: ".log", type: "Kernel Error Diagnostics", sizeMB: 38, icon: "📜" },
    { name: "update.log", folder: "/System/Logs", ext: ".log", type: "WebOS Update Audit Log", sizeMB: 65, icon: "📜" },
    { name: "security.log", folder: "/System/Logs", ext: ".log", type: "Security Authorization Log", sizeMB: 28, icon: "📜" },

    // Temp (~35 MB)
    { name: "tmp-0001.tmp", folder: "/System/Temp", ext: ".tmp", type: "Temporary Cache Stream", sizeMB: 12, icon: "📄" },
    { name: "tmp-0002.tmp", folder: "/System/Temp", ext: ".tmp", type: "Temporary Render Buffer", sizeMB: 8, icon: "📄" },
    { name: "tmp-0003.tmp", folder: "/System/Temp", ext: ".tmp", type: "Temporary IPC Socket Data", sizeMB: 15, icon: "📄" },

    // Root System Pagefile (1.2 GB) & Subsystem Binaries
    { name: "pagefile.wsys", folder: "/System", ext: ".wsys", type: "WebOS Virtual Memory Pagefile", sizeMB: 1228.8, icon: "💾" },
    { name: "ntdll.wsys", folder: "/System", ext: ".wsys", type: "WebOS NT Layer Dynamic Library", sizeMB: 210, icon: "⚙️" },
    { name: "user32.wsys", folder: "/System", ext: ".wsys", type: "User Interface Subsystem", sizeMB: 195, icon: "⚙️" },
    { name: "gdi32.wsys", folder: "/System", ext: ".wsys", type: "Graphics Device Interface", sizeMB: 180, icon: "⚙️" },
    { name: "advapi32.wsys", folder: "/System", ext: ".wsys", type: "Advanced Windows API Subsystem", sizeMB: 140, icon: "⚙️" },
    { name: "kernel32.wsys", folder: "/System", ext: ".wsys", type: "Base Kernel Client Library", sizeMB: 260, icon: "⚙️" },
    { name: "shell32.wsys", folder: "/System", ext: ".wsys", type: "Shell API Library", sizeMB: 220, icon: "⚙️" },
    { name: "comctl32.wsys", folder: "/System", ext: ".wsys", type: "Common Controls Library", sizeMB: 135, icon: "⚙️" },
    { name: "ole32.wsys", folder: "/System", ext: ".wsys", type: "Component Object Model Engine", sizeMB: 110, icon: "⚙️" },
    { name: "ws2_32.wsys", folder: "/System", ext: ".wsys", type: "Windows Sockets 2.0 Library", sizeMB: 95, icon: "⚙️" },
    { name: "crypt32.wsys", folder: "/System", ext: ".wsys", type: "Cryptographic Service Provider", sizeMB: 85, icon: "🔒" },
    { name: "secur32.wsys", folder: "/System", ext: ".wsys", type: "Security Support Provider", sizeMB: 70, icon: "🔒" },
    { name: "imm32.wsys", folder: "/System", ext: ".wsys", type: "Input Method Manager", sizeMB: 40, icon: "⌨️" },
    { name: "winmm.wsys", folder: "/System", ext: ".wsys", type: "Multimedia Audio/Video Core", sizeMB: 65, icon: "🎵" },
    { name: "setupapi.wsys", folder: "/System", ext: ".wsys", type: "Setup & Device Install API", sizeMB: 85, icon: "🔧" },
    { name: "version.wsys", folder: "/System", ext: ".wsys", type: "Version Checking Library", sizeMB: 25, icon: "ℹ️" },
    { name: "dxgi.wsys", folder: "/System", ext: ".wsys", type: "DirectX Graphics Infrastructure", sizeMB: 115, icon: "🎮" },
    { name: "d3d12.wsys", folder: "/System", ext: ".wsys", type: "Direct3D 12 Graphics Runtime", sizeMB: 190, icon: "🎮" },
    { name: "opengl32.wsys", folder: "/System", ext: ".wsys", type: "OpenGL 4.6 Shader Pipeline", sizeMB: 145, icon: "🎨" },
    { name: "vulkan-1.wsys", folder: "/System", ext: ".wsys", type: "Vulkan Low-Overhead API", sizeMB: 130, icon: "⚡" },
    { name: "msvcp140.wsys", folder: "/System", ext: ".wsys", type: "C++ Standard Runtime Library", sizeMB: 75, icon: "⚙️" },
    { name: "vcruntime140.wsys", folder: "/System", ext: ".wsys", type: "Visual C++ Runtime Engine", sizeMB: 60, icon: "⚙️" },
    { name: "ucrtbase.wsys", folder: "/System", ext: ".wsys", type: "Universal C Runtime Base", sizeMB: 85, icon: "⚙️" },
    { name: "rpcrt4.wsys", folder: "/System", ext: ".wsys", type: "Remote Procedure Call Runtime", sizeMB: 90, icon: "📡" },
    { name: "dnsapi.wsys", folder: "/System", ext: ".wsys", type: "DNS Client Resolution API", sizeMB: 50, icon: "🌐" },
    { name: "iphlpapi.wsys", folder: "/System", ext: ".wsys", type: "IP Helper Network Library", sizeMB: 45, icon: "🌐" },
    { name: "netapi32.wsys", folder: "/System", ext: ".wsys", type: "NetBIOS & LAN Management", sizeMB: 55, icon: "🌐" },
    { name: "cfgmgr32.wsys", folder: "/System", ext: ".wsys", type: "Configuration Manager API", sizeMB: 40, icon: "🔧" },
    { name: "wintrust.wsys", folder: "/System", ext: ".wsys", type: "Trust Verification Subsystem", sizeMB: 48, icon: "🛡️" },
    { name: "imagehlp.wsys", folder: "/System", ext: ".wsys", type: "Executable Image Helper", sizeMB: 35, icon: "📄" },
    { name: "psapi.wsys", folder: "/System", ext: ".wsys", type: "Process Status Helper API", sizeMB: 30, icon: "📊" },
    { name: "powrprof.wsys", folder: "/System", ext: ".wsys", type: "Power Profile Helper Library", sizeMB: 28, icon: "🔋" },
    { name: "uxtheme.wsys", folder: "/System", ext: ".wsys", type: "UX Theme Compositor Hooks", sizeMB: 62, icon: "✨" },
    { name: "dwmapi.wsys", folder: "/System", ext: ".wsys", type: "Desktop Window Manager API", sizeMB: 74, icon: "🪟" }
  ];

  window.sysFilesData2 = { folders: foldersPart2, files: filesPart2 };
})();

/* === FILE: system-files-data-1.js === */
/**
 * WebOS v0.9.2.1.2 System Folder Files & Structure (Part 1: Kernel, Desktop, Boot, Drivers)
 */
(function () {
  const foldersPart1 = [
    { id: "sys-kernel", name: "Kernel", path: "/System/Kernel", parentPath: "/System", icon: "⚙️", protected: false },
    { id: "sys-desktop", name: "Desktop", path: "/System/Desktop", parentPath: "/System", icon: "🖥️", protected: false },
    { id: "sys-boot", name: "Boot", path: "/System/Boot", parentPath: "/System", icon: "⚡", protected: false },
    { id: "sys-drivers", name: "Drivers", path: "/System/Drivers", parentPath: "/System", icon: "🔌", protected: false },
    { id: "sys-drv-gpu", name: "GPU", path: "/System/Drivers/GPU", parentPath: "/System/Drivers", icon: "🎮", protected: false },
    { id: "sys-drv-audio", name: "Audio", path: "/System/Drivers/Audio", parentPath: "/System/Drivers", icon: "🔊", protected: false },
    { id: "sys-drv-net", name: "Network", path: "/System/Drivers/Network", parentPath: "/System/Drivers", icon: "🌐", protected: false },
    { id: "sys-drv-disp", name: "Display", path: "/System/Drivers/Display", parentPath: "/System/Drivers", icon: "🖥️", protected: false },
    { id: "sys-drv-usb", name: "USB", path: "/System/Drivers/USB", parentPath: "/System/Drivers", icon: "🔌", protected: false },
    { id: "sys-drv-input", name: "Input", path: "/System/Drivers/Input", parentPath: "/System/Drivers", icon: "⌨️", protected: false },
    { id: "sys-drv-pwr", name: "Power", path: "/System/Drivers/Power", parentPath: "/System/Drivers", icon: "🔋", protected: false },
    { id: "sys-drv-stor", name: "Storage", path: "/System/Drivers/Storage", parentPath: "/System/Drivers", icon: "💾", protected: false }
  ];

  const filesPart1 = [
    // Kernel (2.97 GB = ~3041 MB)
    { name: "ntoskrnl.wsys", folder: "/System/Kernel", ext: ".wsys", type: "WebOS Kernel Executable", sizeMB: 850, icon: "⚙️" },
    { name: "kernel-core.wsys", folder: "/System/Kernel", ext: ".wsys", type: "WebOS Kernel Core", sizeMB: 620, icon: "⚙️" },
    { name: "kernel-memory.wsys", folder: "/System/Kernel", ext: ".wsys", type: "Kernel Memory Manager", sizeMB: 480, icon: "🧠" },
    { name: "kernel-scheduler.wsys", folder: "/System/Kernel", ext: ".wsys", type: "Process Scheduler", sizeMB: 310, icon: "⏱️" },
    { name: "kernel-drivers.wsys", folder: "/System/Kernel", ext: ".wsys", type: "Driver Loader Engine", sizeMB: 290, icon: "🔌" },
    { name: "kernel-io.wsys", folder: "/System/Kernel", ext: ".wsys", type: "I/O Subsystem Core", sizeMB: 240, icon: "🔄" },
    { name: "kernel-api.wsys", folder: "/System/Kernel", ext: ".wsys", type: "System Call API Dispatcher", sizeMB: 180, icon: "📡" },
    { name: "hal.wsys", folder: "/System/Kernel", ext: ".wsys", type: "Hardware Abstraction Layer", sizeMB: 45, icon: "🛡️" },
    { name: "k-security.wsys", folder: "/System/Kernel", ext: ".wsys", type: "Kernel Security Token Subsystem", sizeMB: 26, icon: "🔒" },

    // Desktop (1.9 GB = ~1945 MB)
    { name: "explorer.wsys", folder: "/System/Desktop", ext: ".wsys", type: "WebOS Shell Explorer", sizeMB: 520, icon: "🖥️" },
    { name: "shell.wsys", folder: "/System/Desktop", ext: ".wsys", type: "Desktop Environment Shell", sizeMB: 380, icon: "🐚" },
    { name: "taskbar.wsys", folder: "/System/Desktop", ext: ".wsys", type: "Dock & Taskbar Host", sizeMB: 210, icon: "📊" },
    { name: "start-menu.wsys", folder: "/System/Desktop", ext: ".wsys", type: "Start Menu & Launcher", sizeMB: 180, icon: "🚀" },
    { name: "desktop-render.wsys", folder: "/System/Desktop", ext: ".wsys", type: "Desktop Compositor", sizeMB: 160, icon: "🎨" },
    { name: "window-manager.wsys", folder: "/System/Desktop", ext: ".wsys", type: "Window Surface Manager", sizeMB: 450, icon: "🪟" },
    { name: "theme-engine.wsys", folder: "/System/Desktop", ext: ".wsys", type: "Visual Theme Engine", sizeMB: 45, icon: "✨" },

    // Boot (850 MB)
    { name: "bootmgr.wsys", folder: "/System/Boot", ext: ".wsys", type: "WebOS Boot Manager", sizeMB: 320, icon: "⚡" },
    { name: "boot-loader.wsys", folder: "/System/Boot", ext: ".wsys", type: "Stage-2 Boot Loader", sizeMB: 280, icon: "⚡" },
    { name: "boot-config.wsys", folder: "/System/Boot", ext: ".wsys", type: "BCD Boot Configuration", sizeMB: 85, icon: "⚙️" },
    { name: "boot-fonts.wsys", folder: "/System/Boot", ext: ".wsys", type: "Early Boot Graphic Fonts", sizeMB: 45, icon: "🔤" },
    { name: "boot-splash.wsys", folder: "/System/Boot", ext: ".wsys", type: "Boot Splash Animation", sizeMB: 120, icon: "🖼️" },

    // Drivers (843 MB across subfolders)
    { name: "star-rpro-driver.wsys", folder: "/System/Drivers/GPU", ext: ".wsys", type: "Star R-Pro GPU Driver", sizeMB: 145, icon: "🎮" },
    { name: "star-rpro-utils.wsys", folder: "/System/Drivers/GPU", ext: ".wsys", type: "GPU Shader Utilities", sizeMB: 85, icon: "⚙️" },
    { name: "star-rpro-config.wsys", folder: "/System/Drivers/GPU", ext: ".wsys", type: "GPU Clock & Profile Settings", sizeMB: 25, icon: "🔧" },

    { name: "woosh-audio-driver.wsys", folder: "/System/Drivers/Audio", ext: ".wsys", type: "Star Audio HD Driver", sizeMB: 45, icon: "🔊" },
    { name: "woosh-audio-codec.wsys", folder: "/System/Drivers/Audio", ext: ".wsys", type: "Audio Codec Processor", sizeMB: 30, icon: "🎵" },

    { name: "boltlink-wifi-driver.wsys", folder: "/System/Drivers/Network", ext: ".wsys", type: "BoltLink Wi-Fi 5 Driver", sizeMB: 65, icon: "📶" },
    { name: "boltlink-wifi-firmware.wsys", folder: "/System/Drivers/Network", ext: ".wsys", type: "Wi-Fi Baseband Firmware", sizeMB: 40, icon: "📡" },

    { name: "markred-display-driver.wsys", folder: "/System/Drivers/Display", ext: ".wsys", type: "Retina Display Driver", sizeMB: 95, icon: "🖥️" },
    { name: "markred-display-profiles.wsys", folder: "/System/Drivers/Display", ext: ".wsys", type: "ICC Color Calibration", sizeMB: 35, icon: "🎨" },

    { name: "fastf-usb-driver.wsys", folder: "/System/Drivers/USB", ext: ".wsys", type: "FastF USB 3.2 Host Driver", sizeMB: 30, icon: "🔌" },

    { name: "oq9-mouse-driver.wsys", folder: "/System/Drivers/Input", ext: ".wsys", type: "Precision Mouse Driver", sizeMB: 15, icon: "🖱️" },
    { name: "kkw-keyboard-driver.wsys", folder: "/System/Drivers/Input", ext: ".wsys", type: "HID Keyboard Driver", sizeMB: 18, icon: "⌨️" },

    { name: "highcell-battery-driver.wsys", folder: "/System/Drivers/Power", ext: ".wsys", type: "HighCell Battery Management", sizeMB: 25, icon: "🔋" },

    { name: "bolt-nv64-driver.wsys", folder: "/System/Drivers/Storage", ext: ".wsys", type: "NVMe M.2 Controller Driver", sizeMB: 85, icon: "💾" },
    { name: "bolt-nv64-controller.wsys", folder: "/System/Drivers/Storage", ext: ".wsys", type: "PCIe Bus Storage Interface", sizeMB: 55, icon: "⚡" }
  ];

  window.sysFilesData1 = { folders: foldersPart1, files: filesPart1 };
})();

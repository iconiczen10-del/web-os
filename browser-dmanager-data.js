/* === FILE: browser-dmanager-data.js === */
/**
 * WebOS v0.8.2 DriverManager Website Data & Session Store
 */
(function () {
  const COMPANIES = [
    { id: "cyclone", name: "Cyclone Technologies", icon: "🖥️", category: "Processors", desc: "Pioneering high-efficiency silicon and thermal architectures for WebOS computing." },
    { id: "star", name: "Star Graphics", icon: "🎮", category: "Display Adapters", desc: "Leading visual compute and GPU acceleration chipsets powering markRED displays." },
    { id: "bolt-storage", name: "Bolt Storage", icon: "💾", category: "Disk Drives", desc: "Ultra-fast NVMe flash memory controllers with Bolt NV-64 storage architectures." },
    { id: "black", name: "Black Memory", icon: "🧠", category: "Memory", desc: "High-density DDR4 memory modules built for low-latency browser OS execution." },
    { id: "woosh", name: "woosh Labs", icon: "🔊", category: "Sound, Video & Game", desc: "Spatial audio HD signal processors and low-noise DAC hardware." },
    { id: "bolt-net", name: "Bolt Networks", icon: "🌐", category: "Network Adapters", desc: "Dual-band Wi-Fi 5 transceivers optimized for high-bandwidth BUYNET fiber." },
    { id: "markred", name: "markRED Displays", icon: "🖥️", category: "Monitors", desc: "Precision color-calibrated 220 PPI Retina monitors and display panels." },
    { id: "highcell", name: "highcell Energy", icon: "🔋", category: "Batteries", desc: "Advanced smart power cells and ACPI power management controllers." },
    { id: "oq", name: "OQ Peripherals", icon: "🖱️", category: "Mice & Pointing", desc: "Ergonomic high-DPI optical mice and gesture pointing devices." },
    { id: "kkw", name: "KKW Devices", icon: "⌨️", category: "Keyboards", desc: "Precision mechanical keyboard switches with N-key rollover." },
    { id: "fastf", name: "fastF Technologies", icon: "🔌", category: "USB Controllers", desc: "High-throughput SuperSpeed USB 3.0 host controllers." },
    { id: "volt", name: "Volt Power", icon: "⚡", category: "Power Supplies", desc: "80 Plus Gold certified ATX power distribution units." },
    { id: "bolt-sys", name: "Bolt Systems", icon: "⚡", category: "Motherboards", desc: "Robust B350-M chipset motherboards with integrated PCIe routing." },
    { id: "webos-fnd", name: "WebOS Foundation", icon: "🌐", category: "Boot Loader", desc: "Core open-source kernel and UEFI boot loader firmware maintenance." }
  ];

  const FAQS = [
    { q: "My GPU driver update failed or display is glitching", a: "Use Device Manager in Settings → Devices to disable and re-enable Star R Pro, or roll back to v1.0.0.0." },
    { q: "Wi-Fi won't connect or BUYNET shows connection lost", a: "Check if BoltLink Wi-Fi 5 is enabled in Device Manager. If disabled, click Enable Device (5s)." },
    { q: "Do driver updates persist across WebOS reboots?", a: "Driver updates apply for the active browser session. On reboot or refresh, all drivers initialize at v1.0.0.0." },
    { q: "How fast do drivers download from DriverManager?", a: "Downloads utilize your active BUYNET plan speed (up to 1 Gbps) or default 200 KB/s." }
  ];

  const sessionDownloads = [];

  window.dmanagerData = {
    getCompanies: () => COMPANIES,
    getFaqs: () => FAQS,
    getDownloads: () => sessionDownloads,
    addDownload: (item) => sessionDownloads.unshift(item)
  };
})();

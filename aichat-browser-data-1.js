/* === FILE: aichat-browser-data-1.js === */
/**
 * AI Chat Knowledge Browser Data - Part 1 (WebOS Info & Hardware Specs)
 */
(function () {
  window.KB_DATA_PART1 = [
    {
      id: "w1", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "free", name: "What is WebOS?",
      variants: ["What is WebOS?", "Tell me about WebOS", "Explain WebOS", "What does WebOS do?", "Overview of WebOS", "WebOS definition", "Introduce WebOS", "What kind of OS is WebOS?"],
      answer: "WebOS is a simulated client-side desktop operating system running 100% locally in your browser with zero external network calls."
    },
    {
      id: "w2", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "free", name: "WebOS versions",
      variants: ["WebOS versions", "Version history", "List all WebOS versions", "Current version of WebOS", "WebOS changelog", "What version is this?"],
      answer: "WebOS evolved from v0.1 to v0.7.4.3, introducing Developer Terminal v1, multi-tab system monitor, developer portal, and AI Chat Knowledge Browser."
    },
    {
      id: "w3", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "free", name: "WebOS hardware",
      variants: ["WebOS hardware", "System hardware", "What hardware powers WebOS?", "WebOS PC specs", "Hardware overview", "WebOS machine specs", "Computer specifications"],
      answer: "WebOS runs on a virtual PC powered by Cyclone 1st Gen X9 CPU, Star R Pro GPU, 8GB DDR4 RAM, and Bolt NV-256 SSD."
    },
    {
      id: "w4", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "free", name: "WebOS apps",
      variants: ["WebOS apps", "Available applications", "What apps are installed?", "List installed apps", "WebOS software", "Built-in apps"],
      answer: "WebOS includes Browser, Mbank, BUYNET ISP, App Store, Terminal, System Monitor, AI Chat, Settings, Finder, and Notes."
    },
    {
      id: "w5", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "plus", name: "WebOS browser",
      variants: ["WebOS browser", "Browser app details", "How does WebOS browser work?", "Browser features", "WebOS internet browser"],
      answer: "The Browser app features a tab bar, bookmarks, WebSearch engine, and simulates websites like Mbank, BUYNET, AI Talks, and Dev Portal."
    },
    {
      id: "w6", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "plus", name: "WebOS store",
      variants: ["WebOS store", "App store info", "How to buy apps?", "Store application", "WebOS software store"],
      answer: "The App Store lets you purchase utilities, games, and productivity tools using your virtual Mbank Wallet balance."
    },
    {
      id: "w7", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "plus", name: "WebOS system monitor",
      variants: ["WebOS system monitor", "Task manager app", "CPU monitor", "RAM usage app", "System monitor tabs", "Performance monitor"],
      answer: "System Monitor tracks live CPU load, memory distribution, storage usage, active processes, and system history across multiple tabs."
    },
    {
      id: "w8", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "plus", name: "WebOS settings",
      variants: ["WebOS settings", "Settings app overview", "System preferences", "Developer settings", "How to open settings", "OS preferences"],
      answer: "Settings lets you customize wallpapers, inspect system specifications, view changelogs, and unlock Developer Options with passcode 9610."
    },
    {
      id: "w9", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "plus", name: "WebOS terminal",
      variants: ["WebOS terminal", "Command line interface", "Terminal commands", "How to use terminal?", "Console app", "WebOS CLI"],
      answer: "Terminal provides a full command-line prompt supporting commands like neofetch, clear, help, matrix, coffee, owner, clue, and puzzle."
    },
    {
      id: "w10", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "plus", name: "WebOS boot screen",
      variants: ["WebOS boot screen", "Boot process", "Startup screen", "How does WebOS boot?", "Boot progress bar"],
      answer: "The Boot Screen displays animated initialization progress bar, version badge, and boot sound before presenting the desktop."
    },
    {
      id: "w11", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "pro", name: "WebOS wallpaper",
      variants: ["WebOS wallpaper", "Desktop background", "How to change wallpaper?", "Wallpaper options", "Custom background"],
      answer: "You can change wallpapers in Settings → Appearance, selecting between Twilight Gradient, Neon Grid, Minimal Dark, and Cyberpunk themes."
    },
    {
      id: "w12", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "pro", name: "WebOS files",
      variants: ["WebOS files", "Finder application", "File manager", "How files are stored?", "WebOS directory structure", "File system"],
      answer: "Finder simulates a local file manager allowing you to view system documents, create notes, and organize virtual files."
    },
    {
      id: "w13", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "pro", name: "WebOS developer portal",
      variants: ["WebOS developer portal", "Dev portal website", "www.dev.webos info", "Developer portal stages", "How to access dev portal?", "Dev access pass", "Dev portal features"],
      answer: "The Developer Portal at www.dev.webos requires passing a 5-stage gate including a quiz, easter egg test, and $40 Mbank pass payment."
    },
    {
      id: "w14", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "pro", name: "WebOS founder",
      variants: ["WebOS founder", "Who created WebOS?", "WebOS developer name", "Who built this OS?", "Creator of WebOS", "HANISH WebOS", "WebOS author", "Who made WebOS?"],
      answer: "WebOS was designed and created entirely by HANISH as a single-authored, high-performance browser desktop environment."
    },
    {
      id: "w15", catId: "webos", catName: "WebOS Info", icon: "🏠", minTier: "pro", name: "WebOS future",
      variants: ["WebOS future", "Upcoming WebOS updates", "What is coming next to WebOS?", "WebOS roadmap", "Future versions"],
      answer: "Future WebOS updates plan to expand offline AI intelligence, additional desktop customization, and enhanced browser utilities."
    },

    // Hardware Specs (10 topics)
    {
      id: "h1", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "free", name: "CPU specs",
      variants: ["CPU specs", "Processor specifications", "What CPU is installed?", "Cyclone 1st Gen X9", "CPU speed and cores", "Processor details", "CPU benchmark", "Tell me CPU details"],
      answer: "CPU: Cyclone 1st Gen X9 (2 Cores / 4 Threads @ 2.7 GHz Base / 3.4 GHz Boost, 4MB Cache)."
    },
    {
      id: "h2", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "free", name: "GPU specs",
      variants: ["GPU specs", "Graphics card specifications", "What GPU is installed?", "Star R Pro details", "Graphics card VRAM", "GPU model", "Display adapter"],
      answer: "GPU: Star R Pro Graphics with 2GB GDDR5 VRAM @ 1100 MHz Core Clock."
    },
    {
      id: "h3", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "free", name: "RAM specs",
      variants: ["RAM specs", "Memory specifications", "How much RAM?", "RAM speed and type", "System memory", "RAM capacity", "DDR4 RAM"],
      answer: "RAM: 8GB Single-Channel DDR4 @ 5000 MHz High-Frequency System Memory."
    },
    {
      id: "h4", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "plus", name: "Storage specs",
      variants: ["Storage specs", "SSD details", "Bolt NV-256 info", "Storage capacity", "Hard drive speed", "NVMe SSD specs", "Disk size"],
      answer: "Storage: Bolt NV-256 (256GB NVMe M.2 SSD, 3100 MB/s Read, 1800 MB/s Write)."
    },
    {
      id: "h5", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "plus", name: "Motherboard specs",
      variants: ["Motherboard specs", "Mainboard details", "Bolt B350-M chipset", "Motherboard model", "System board specs", "Bus speed"],
      answer: "Motherboard: Bolt B350-M Micro-ATX Chipset supporting PCIe 3.0 and high-speed bus interfaces."
    },
    {
      id: "h6", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "plus", name: "Display specs",
      variants: ["Display specs", "Screen resolution", "Monitor details", "Display refresh rate", "Screen PPI", "Panel type"],
      answer: "Display: 15.6-inch Retina IPS Panel (1920x1080 resolution @ 60Hz, 220 PPI density)."
    },
    {
      id: "h7", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "plus", name: "Network specs",
      variants: ["Network specs", "Wi-Fi card", "Bluetooth version", "Network adapter", "BoltLink card", "Wireless specs"],
      answer: "Network Adapter: BoltLink Dual-Band Wi-Fi 5 (802.11ac) + Bluetooth 4.2 Module."
    },
    {
      id: "h8", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "pro", name: "PSU specs",
      variants: ["PSU specs", "Power supply details", "Star Power 500W", "PSU wattage", "Power unit rating"],
      answer: "Power Supply: Star Power 500W 80 Plus Bronze Certified Power Supply Unit."
    },
    {
      id: "h9", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "pro", name: "Cooling specs",
      variants: ["Cooling specs", "HydroCool 120 info", "CPU cooler", "Thermal solution", "Liquid cooling"],
      answer: "Cooling: HydroCool 120 All-In-One Liquid Cooler with 120mm PWM silent fan."
    },
    {
      id: "h10", catId: "hardware", catName: "Hardware Specs", icon: "🖥️", minTier: "pro", name: "Hardware overall",
      variants: ["Hardware overall", "Full hardware list", "Complete system specs", "Summarize hardware", "Hardware architecture", "All component specs", "PC summary"],
      answer: "Hardware Summary: Cyclone X9 CPU, Star R Pro GPU, 8GB DDR4 RAM, Bolt NV-256 SSD, HydroCool 120 Liquid, Star Power 500W PSU."
    }
  ];
})();

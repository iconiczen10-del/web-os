/* === FILE: webtube-data.js === */
/**
 * WebOS v0.8.3 WebTube Data — 10 Videos & 10 Channels with Comments
 */
(function () {
  const CHANNELS = [
    { id: "c1", name: "TechTalk", subs: "1.2M", icon: "🎙️", verified: true },
    { id: "c2", name: "AIExplained", subs: "890K", icon: "🧠", verified: true },
    { id: "c3", name: "WebOSMaster", subs: "750K", icon: "🖥️", verified: true },
    { id: "c4", name: "TerminalKid", subs: "280K", icon: "⚡", verified: false },
    { id: "c5", name: "HardwareHub", subs: "560K", icon: "🔧", verified: true },
    { id: "c6", name: "GPUGuru", subs: "450K", icon: "🎮", verified: true },
    { id: "c7", name: "StorageSensei", subs: "390K", icon: "💾", verified: false },
    { id: "c8", name: "AIWhisperer", subs: "480K", icon: "🔮", verified: true },
    { id: "c9", name: "OSBuilder", subs: "320K", icon: "🛠️", verified: false },
    { id: "c10", name: "InternetGuru", subs: "410K", icon: "📡", verified: true }
  ];

  const VIDEOS = [
    {
      id: "v1",
      title: "WebOS v1.0 Predictions",
      channelId: "c1",
      duration: 180,
      durationStr: "3:00",
      views: "4.2M",
      likes: "214K",
      uploadDate: "2 days ago",
      thumbColor: "#1a1025",
      isEarlyAccess: false,
      description: "Everything coming in WebOS v1.0! Multi-window enhancements, new file systems, and speed benchmarks.",
      scenes: [
        { start: 0, end: 30, type: "logo-pulse", data: { text: "WebOS v1.0", subtitle: "Next-Gen Operating System" } },
        { start: 30, end: 60, type: "logo-rotate", data: { speed: 1.5, glow: "#00f0ff" } },
        { start: 60, end: 100, type: "text-slide", data: { title: "New Architecture", points: ["Modular Canvas UI", "Zero Latency", "Offline First"] } },
        { start: 100, end: 140, type: "particle-burst", data: { count: 80, color: "#ffd700" } },
        { start: 140, end: 170, type: "text-slide", data: { title: "Roadmap 2026", points: ["Cloud Sync", "Gaming Engine", "Pro Tools"] } },
        { start: 170, end: 180, type: "logo-pulse", data: { text: "Subscribe for more!", subtitle: "TechTalk Official" } }
      ],
      comments: [
        { user: "AlexCoder", time: "1 day ago", text: "If v1.0 actually supports custom themes natively, this is game over!", likes: 1420 },
        { user: "DevSarah", time: "18 hours ago", text: "The modular pipeline is brilliant. Canvas rendering is ultra smooth.", likes: 890 },
        { user: "PixelKnight", time: "12 hours ago", text: "Can't wait to test the gaming benchmarks on Cyclone X9.", likes: 430 },
        { user: "Maximus99", time: "8 hours ago", text: "WebOS just keeps getting better. Great breakdown TechTalk!", likes: 312 },
        { user: "RetroBit", time: "5 hours ago", text: "WorldPlay video player integration is super crisp.", likes: 195 },
        { user: "LunaDev", time: "3 hours ago", text: "Will there be native WebGL2 support for custom shaders?", likes: 88 },
        { user: "TechEnthusiast", time: "1 hour ago", text: "Watching this on BUYNET 1 Gbps tier, zero lag!", likes: 45 },
        { user: "NerdKing", time: "30 mins ago", text: "Subscribed! Best WebOS channel out there.", likes: 21 },
        { user: "ByteMaster", time: "15 mins ago", text: "Great video quality!", likes: 12 },
        { user: "StarGazer", time: "Just now", text: "Excited for the next update!", likes: 4 }
      ]
    },
    {
      id: "v2",
      title: "AI Chat Pro Review",
      channelId: "c2",
      duration: 210,
      durationStr: "3:30",
      views: "2.8M",
      likes: "185K",
      uploadDate: "4 days ago",
      thumbColor: "#0d1b2a",
      isEarlyAccess: false,
      description: "Is AI Chat Pro worth the $300 upgrade? Testing code generation, personality mods, and math engines.",
      scenes: [
        { start: 0, end: 35, type: "robot-face", data: { eyes: "pulsing", state: "thinking" } },
        { start: 35, end: 75, type: "text-wave", data: { text: "AI Chat Pro Analysis", sub: "Speed & Accuracy Benchmarks" } },
        { start: 75, end: 120, type: "code-typing", data: { lang: "TypeScript", code: "const bot = new AIChatPro({ depth: 99 });\nbot.solveMath('e^(i*pi) + 1'); // Output: 0" } },
        { start: 120, end: 155, type: "emoji-rotate", data: { emojis: ["🤖", "⚡", "🧠", "🔥", "💡"] } },
        { start: 155, end: 190, type: "bar-compare", data: { label: "Response Speed (ms)", a: { name: "Free", val: 820 }, b: { name: "Pro", val: 120 } } },
        { start: 190, end: 210, type: "robot-face", data: { eyes: "happy", state: "verified" } }
      ],
      comments: [
        { user: "SyntaxSam", time: "3 days ago", text: "The code generation alone saved me 10 hours this week.", likes: 920 },
        { user: "Elena_V", time: "2 days ago", text: "MaxDB lookup speeds are genuinely impressive.", likes: 640 },
        { user: "BitFlipper", time: "1 day ago", text: "Worth every penny from my Mbank wallet!", likes: 410 },
        { user: "KevBot", time: "14 hours ago", text: "The personality switch feature is hilarious and fun.", likes: 210 },
        { user: "CodeNinja", time: "6 hours ago", text: "AIExplained always gives the most honest reviews.", likes: 180 },
        { user: "RoboFan", time: "2 hours ago", text: "Does it work fully offline? Yes it does!", likes: 95 },
        { user: "DaisyChain", time: "1 hour ago", text: "Super clean review video.", likes: 44 },
        { user: "WebDevPro", time: "30 mins ago", text: "10/10 production quality!", likes: 19 },
        { user: "FastLane", time: "10 mins ago", text: "Subscribed immediately.", likes: 8 },
        { user: "ZeroCool", time: "Just now", text: "AI Talks Inc. built a real powerhouse.", likes: 3 }
      ]
    },
    {
      id: "v3",
      title: "Best WebOS Settings Guide",
      channelId: "c3",
      duration: 165,
      durationStr: "2:45",
      views: "2.1M",
      likes: "140K",
      uploadDate: "1 week ago",
      thumbColor: "#112211",
      isEarlyAccess: false,
      description: "Master Device Manager, Wallpapers PCS, storage pruning, and developer terminal tricks.",
      scenes: [
        { start: 0, end: 35, type: "settings-ui", data: { title: "Settings Mastery", badge: "v0.8.3" } },
        { start: 35, end: 70, type: "toggle-anim", data: { options: ["Hardware Acceleration", "Dark Mode", "High Refresh Rate"] } },
        { start: 70, end: 110, type: "text-list", data: { title: "Top 5 Performance Tweaks", items: ["1. Disable unused devices", "2. Clean cache storage", "3. Upgrade BUYNET plan", "4. Lock developer tab", "5. Custom wallpaper tier"] } },
        { start: 110, end: 145, type: "highlight", data: { target: "Device Manager", desc: "Keep WHQL drivers updated on dmanager.webos" } },
        { start: 145, end: 165, type: "summary", data: { text: "Optimized for Peak Speed!", rating: "★★★★★" } }
      ],
      comments: [
        { user: "CleanDesk", time: "6 days ago", text: "Disabling unused audio devices sped up my boot by 20%!", likes: 780 },
        { user: "TweakMaster", time: "4 days ago", text: "The Device Manager WHQL tip was pure gold.", likes: 520 },
        { user: "NovaTech", time: "2 days ago", text: "WebOSMaster is the undisputed king of OS guides.", likes: 390 },
        { user: "SpeedFreak", time: "1 day ago", text: "BUYNET 100 Mbps + this guide = instant butter.", likes: 210 },
        { user: "GhostRider", time: "18 hours ago", text: "So clear and easy to follow.", likes: 115 },
        { user: "AeroUI", time: "8 hours ago", text: "Bookmarked for future WebOS builds!", likes: 64 },
        { user: "PixelArt", time: "3 hours ago", text: "The UI animations in this video look fantastic.", likes: 32 },
        { user: "HackerOne", time: "1 hour ago", text: "Great tips.", likes: 14 },
        { user: "Techie77", time: "20 mins ago", text: "Helpful guide as always.", likes: 9 },
        { user: "SimRunner", time: "Just now", text: "Everything running super fast now.", likes: 2 }
      ]
    },
    {
      id: "v4",
      title: "Hidden Terminal Commands",
      channelId: "c4",
      duration: 135,
      durationStr: "2:15",
      views: "1.9M",
      likes: "125K",
      uploadDate: "1 week ago",
      thumbColor: "#150505",
      isEarlyAccess: false,
      description: "Secret shell scripts, easter egg unlocks, and developer mode bypass commands.",
      scenes: [
        { start: 0, end: 25, type: "terminal-draw", data: { title: "WebOS Bash 5.2" } },
        { start: 25, end: 55, type: "matrix-rain", data: { color: "#00ff66", density: 35 } },
        { start: 55, end: 90, type: "command-type", data: { cmd: "sudo webos-unlock --developer --key=HANISH", output: "[SUCCESS] Developer metrics & secret labs unlocked!" } },
        { start: 90, end: 115, type: "ascii-draw", data: { art: [" _    _ _____ ____", "| |  | |  _  / ___|", "| |/\\| | | | \\___ \\", "\\  /\\  / |_| |___) |", " \\/  \\/ \\___/ \\____/"] } },
        { start: 115, end: 135, type: "glitch-out", data: { text: "UNLOCKED ACCESS GRANTED" } }
      ],
      comments: [
        { user: "ShellShock", time: "5 days ago", text: "That matrix rain scene is insane for a canvas renderer!", likes: 890 },
        { user: "RootUser", time: "4 days ago", text: "TerminalKid never misses with the secret commands.", likes: 620 },
        { user: "KernelPanic", time: "2 days ago", text: "Tried the secret key on dev.webos and it worked!", likes: 450 },
        { user: "BinaryGhost", time: "1 day ago", text: "Pure aesthetic vibes on this one.", likes: 230 },
        { user: "C0d3r", time: "16 hours ago", text: "Can't wait to see what v0.8.4 brings to terminal.", likes: 110 },
        { user: "CyberWolf", time: "7 hours ago", text: "Awesome ASCII art generator.", likes: 75 },
        { user: "LinuxLover", time: "3 hours ago", text: "WebOS terminal feels so authentic.", likes: 41 },
        { user: "ZeroDay", time: "1 hour ago", text: "Subscribed and liked!", likes: 20 },
        { user: "ScriptKiddie", time: "25 mins ago", text: "Mind blown 🤯", likes: 11 },
        { user: "EchoOff", time: "Just now", text: "More terminal tricks please!", likes: 5 }
      ]
    },
    {
      id: "v5",
      title: "Cyclone X9 Benchmarked",
      channelId: "c5",
      duration: 195,
      durationStr: "3:15",
      views: "1.5M",
      likes: "98K",
      uploadDate: "2 weeks ago",
      thumbColor: "#1f1505",
      isEarlyAccess: false,
      description: "Full stress tests and thermal benchmarks of the Cyclone 1st Gen X9 2C/4T CPU @ 2.7 GHz.",
      scenes: [
        { start: 0, end: 40, type: "cpu-draw", data: { name: "Cyclone X9", cores: 4, clock: "2.7 GHz" } },
        { start: 40, end: 80, type: "core-pulse", data: { load: 100, temp: "52°C", fanSpeed: "2200 RPM" } },
        { start: 80, end: 125, type: "benchmark-bars", data: { single: 1450, multi: 4890, vsOld: "+38%" } },
        { start: 125, end: 165, type: "compare", data: { winner: "Cyclone X9", efficiency: "94.2%" } },
        { start: 165, end: 195, type: "score-spin", data: { score: "9,840 pts", award: "Editor's Choice" } }
      ],
      comments: [
        { user: "Overclocker", time: "10 days ago", text: "Frost Cooler keeps it at 52C under full load. Excellent thermals.", likes: 540 },
        { user: "SiliconFan", time: "8 days ago", text: "Cyclone Technologies really hit a home run with X9 architecture.", likes: 410 },
        { user: "Benchmarker", time: "5 days ago", text: "4,890 multi-core score crushes previous generation.", likes: 290 },
        { user: "RigBuilder", time: "3 days ago", text: "Paired with Star R Pro GPU and it's a beast.", likes: 180 },
        { user: "ThermalPaste", time: "1 day ago", text: "Great detailed breakdown HardwareHub.", likes: 95 },
        { user: "VoltWatt", time: "12 hours ago", text: "Power consumption is super low too.", likes: 60 },
        { user: "ChipArchitect", time: "4 hours ago", text: "Clean canvas animation on the CPU cores.", likes: 33 },
        { user: "GamerX", time: "2 hours ago", text: "Smooth 60fps playback!", likes: 18 },
        { user: "PCMaster", time: "30 mins ago", text: "Best hardware channel.", likes: 7 },
        { user: "IronCore", time: "Just now", text: "Buying this immediately.", likes: 2 }
      ]
    },
    {
      id: "v6",
      title: "Star R Pro GPU Review",
      channelId: "c6",
      duration: 180,
      durationStr: "3:00",
      views: "1.1M",
      likes: "82K",
      uploadDate: "2 weeks ago",
      thumbColor: "#1a0826",
      isEarlyAccess: false,
      description: "Star Graphics flagship GPU reviewed with 3D wireframe render stress tests.",
      scenes: [
        { start: 0, end: 35, type: "gpu-draw", data: { name: "Star R Pro", vram: "4 GB GDDR5" } },
        { start: 35, end: 75, type: "particle-wave", data: { speed: 2, color: "#ff007a" } },
        { start: 75, end: 115, type: "spec-text", data: { cuda: 1024, tdp: "75W", pcie: "Gen 3 x16" } },
        { start: 115, end: 155, type: "render-demo", data: { model: "3D Wireframe Cube", fps: 60 } },
        { start: 155, end: 180, type: "outro", data: { channel: "GPUGuru", score: "9.5/10" } }
      ],
      comments: [
        { user: "VRAMLover", time: "9 days ago", text: "The 3D rotating wireframe demo was sick!", likes: 610 },
        { user: "FrameRateKing", time: "6 days ago", text: "Solid 60fps across the board on 1080p.", likes: 420 },
        { user: "PixelDriver", time: "4 days ago", text: "WHQL drivers from dmanager.webos fixed all micro-stutters.", likes: 310 },
        { user: "ShaderCoder", time: "2 days ago", text: "Star Graphics did an amazing job with power efficiency.", likes: 150 },
        { user: "GPUFanatic", time: "1 day ago", text: "GPUGuru always has the best render tests.", likes: 88 },
        { user: "3DArtist", time: "10 hours ago", text: "Handles complex meshes effortlessly.", likes: 52 },
        { user: "ApexGamer", time: "5 hours ago", text: "Game Center games run silky smooth with this.", likes: 29 },
        { user: "RayTracer", time: "2 hours ago", text: "Great video quality on WebTube.", likes: 14 },
        { user: "PolygonKid", time: "40 mins ago", text: "Subbed!", likes: 6 },
        { user: "AlphaRender", time: "Just now", text: "Top tier review.", likes: 3 }
      ]
    },
    {
      id: "v7",
      title: "Bolt NV-64 Speed Test",
      channelId: "c7",
      duration: 150,
      durationStr: "2:30",
      views: "890K",
      likes: "64K",
      uploadDate: "3 weeks ago",
      thumbColor: "#051520",
      isEarlyAccess: false,
      description: "64 GB PCIe NVMe M.2 SSD benchmarked: 2400 MB/s Sequential Read tests.",
      scenes: [
        { start: 0, end: 30, type: "ssd-draw", data: { model: "Bolt NV-64", capacity: "64 GB" } },
        { start: 30, end: 70, type: "speed-bars", data: { read: "2,400 MB/s", write: "1,850 MB/s" } },
        { start: 70, end: 105, type: "number-counter", data: { iops: 320000, latency: "0.04 ms" } },
        { start: 105, end: 135, type: "compare", data: { sata: "550 MB/s", nvme: "2400 MB/s", speedup: "4.3x" } },
        { start: 135, end: 150, type: "summary", data: { title: "Lightning Fast Storage", rating: "Gold Badge" } }
      ],
      comments: [
        { user: "StorageGeek", time: "12 days ago", text: "2.4 GB/s read speeds make WebOS boot in under 2 seconds.", likes: 490 },
        { user: "FlashMaster", time: "8 days ago", text: "Bolt Storage makes the most reliable NVMe drives.", likes: 330 },
        { user: "DataHoarder", time: "5 days ago", text: "IOPS numbers are insane for such a compact drive.", likes: 210 },
        { user: "NANDWizard", time: "2 days ago", text: "StorageSensei delivers pure facts as always.", likes: 120 },
        { user: "DriveHealth", time: "18 hours ago", text: "SMART status shows 100% health after heavy writes.", likes: 74 },
        { user: "FastBoot", time: "8 hours ago", text: "Zero bottleneck in system monitor.", likes: 41 },
        { user: "SpeedyByte", time: "3 hours ago", text: "Love the animated bar charts.", likes: 22 },
        { user: "TechJunkie", time: "1 hour ago", text: "Super crisp canvas visuals.", likes: 11 },
        { user: "SSDPro", time: "20 mins ago", text: "Worth upgrading!", likes: 5 },
        { user: "MicroChip", time: "Just now", text: "Great video!", likes: 1 }
      ]
    },
    {
      id: "v8",
      title: "AI Chat v2 Rumors",
      channelId: "c8",
      duration: 225,
      durationStr: "3:45",
      views: "2.3M",
      likes: "165K",
      uploadDate: "3 weeks ago",
      thumbColor: "#1d0e1a",
      isEarlyAccess: false,
      description: "Leaked roadmap from AI Talks Inc. reveals offline vision models and voice synthesis.",
      scenes: [
        { start: 0, end: 40, type: "particle-burst", data: { count: 100, color: "#ff0055" } },
        { start: 40, end: 85, type: "teaser-text", data: { title: "PROJECT OMNI", sub: "Next-Gen AI Engine" } },
        { start: 85, end: 130, type: "feature-list", data: { features: ["Real-time Voice Synthesis", "Canvas Vision Analysis", "Multi-Agent Collaboration", "Sub-10ms Inference"] } },
        { start: 130, end: 175, type: "hype-wave", data: { amplitude: 25, freq: 0.08 } },
        { start: 175, end: 205, type: "countdown", data: { target: "Q3 2026", msg: "Major Announcement" } },
        { start: 205, end: 225, type: "mystery", data: { text: "Stay Tuned to AIWhisperer", icon: "🔮" } }
      ],
      comments: [
        { user: "AIOracle", time: "14 days ago", text: "Offline voice synthesis would change everything!", likes: 820 },
        { user: "NeuralMind", time: "10 days ago", text: "AI Talks Inc. is quietly building the best offline stack.", likes: 590 },
        { user: "WhisperFan", time: "6 days ago", text: "The hype wave visual was so well animated.", likes: 370 },
        { user: "VisionCoder", time: "3 days ago", text: "Canvas vision analysis is going to be huge for Paint app.", likes: 210 },
        { user: "OmniLeak", time: "1 day ago", text: "I heard beta testing begins next month.", likes: 140 },
        { user: "DeepLearn", time: "14 hours ago", text: "AIWhisperer leaks are 99% accurate historically.", likes: 85 },
        { user: "VoiceSynth", time: "5 hours ago", text: "Hyped for v2!", likes: 46 },
        { user: "FutureTech", time: "2 hours ago", text: "Best tech video platform.", likes: 25 },
        { user: "AIFanatic", time: "35 mins ago", text: "Max tier quality looks pristine.", likes: 12 },
        { user: "SmartBot", time: "Just now", text: "Can't wait!", likes: 4 }
      ]
    },
    {
      id: "v9",
      title: "WebOS Boot Screen History",
      channelId: "c9",
      duration: 140,
      durationStr: "2:20",
      views: "750K",
      likes: "58K",
      uploadDate: "1 month ago",
      thumbColor: "#0b1c1e",
      isEarlyAccess: true,
      description: "Exclusive deep dive: Evolution of WebOS boot sequence from v0.1 to v0.8.3.",
      scenes: [
        { start: 0, end: 30, type: "boot-v1", data: { ver: "v0.1 Alpha", logo: "Simple Text", time: "5.4s" } },
        { start: 30, end: 60, type: "boot-v4", data: { ver: "v0.4 Beta", logo: "Pulsing Glow", time: "3.2s" } },
        { start: 60, end: 90, type: "boot-v6", data: { ver: "v0.6 Modern", logo: "Traffic Lights", time: "2.1s" } },
        { start: 90, end: 120, type: "boot-v8", data: { ver: "v0.8.3 Current", logo: "Ultra Fast Canvas", time: "1.4s" } },
        { start: 120, end: 140, type: "side-by-side", data: { title: "4x Boot Speed Improvement", status: "Instant Ready" } }
      ],
      comments: [
        { user: "OldTimer", time: "20 days ago", text: "I remember v0.1! The progress is unbelievable.", likes: 450 },
        { user: "BootLover", time: "15 days ago", text: "The boot sound and animation in v0.8.3 is so satisfying.", likes: 310 },
        { user: "KernelDev", time: "9 days ago", text: "Optimizing boot stages down to 1.4s is genuine wizardry.", likes: 210 },
        { user: "RetroOS", time: "4 days ago", text: "OSBuilder always brings top tier nostalgic content.", likes: 130 },
        { user: "HistoryBuff", time: "2 days ago", text: "Love early access videos like this.", likes: 78 },
        { user: "FastBooter", time: "16 hours ago", text: "Side-by-side comparison was awesome.", likes: 42 },
        { user: "WebFan", time: "6 hours ago", text: "Super cool retro look.", likes: 23 },
        { user: "AlphaTester", time: "2 hours ago", text: "Glad I bought Max Tier for this!", likes: 15 },
        { user: "ByteKing", time: "45 mins ago", text: "Awesome video!", likes: 7 },
        { user: "ClockWork", time: "Just now", text: "10/10 quality.", likes: 2 }
      ]
    },
    {
      id: "v10",
      title: "BUYNET Plans Explained",
      channelId: "c10",
      duration: 180,
      durationStr: "3:00",
      views: "680K",
      likes: "49K",
      uploadDate: "1 month ago",
      thumbColor: "#191005",
      isEarlyAccess: true,
      description: "Which ISP tier is best for 4K WebTube streaming and high-speed downloads?",
      scenes: [
        { start: 0, end: 35, type: "buynet-logo", data: { name: "BUYNET ISP", slogan: "Fiber Speed in Browser" } },
        { start: 35, end: 75, type: "plan-cards", data: { count: 5, plans: ["Starter 10M", "Everyday 50M", "Performance 100M", "Pro 250M", "Ultimate 1G"] } },
        { start: 75, end: 120, type: "speed-compare", data: { free: "200 KB/s (360p)", everyday: "50 Mbps (720p)", ultimate: "1 Gbps (4K 60fps)" } },
        { start: 120, end: 155, type: "price-text", data: { bestValue: "Performance ($29.99/mo)", topTier: "Ultimate ($79.99/mo)" } },
        { start: 155, end: 180, type: "recommendation", data: { pick: "Performance Tier for 1080p HD Streaming", channel: "InternetGuru" } }
      ],
      comments: [
        { user: "FiberFan", time: "18 days ago", text: "Upgraded to 1 Gbps and WebTube 4K loads instantly with zero buffering!", likes: 520 },
        { user: "BudgetStreamer", time: "12 days ago", text: "Performance tier is definitely the sweet spot for $29.99.", likes: 360 },
        { user: "PingMaster", time: "7 days ago", text: "Default 200 KB/s was painfully buffering, so glad I upgraded.", likes: 240 },
        { user: "NetworkNerd", time: "3 days ago", text: "InternetGuru explained the bandwidth tiers perfectly.", likes: 150 },
        { user: "StreamKing", time: "1 day ago", text: "The Mbank automatic deduction makes paying so easy.", likes: 88 },
        { user: "WebSurfer", time: "15 hours ago", text: "Great graphics and speed comparison tables.", likes: 51 },
        { user: "UltraFast", time: "5 hours ago", text: "Ultimate plan is pure speed heaven.", likes: 30 },
        { user: "DataPack", time: "2 hours ago", text: "Informative guide!", likes: 16 },
        { user: "RouterGuy", time: "30 mins ago", text: "Subscribed to both BUYNET and InternetGuru.", likes: 8 },
        { user: "WifiPro", time: "Just now", text: "Excellent video!", likes: 3 }
      ]
    }
  ];

  window.webtubeData = {
    getChannels: () => CHANNELS,
    getChannelById: (id) => CHANNELS.find(c => c.id === id),
    getVideos: () => VIDEOS,
    getVideoById: (id) => VIDEOS.find(v => v.id === id)
  };
})();

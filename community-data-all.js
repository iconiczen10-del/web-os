/* === FILE: community-data-all.js === */
/**
 * WebOS v0.8.1 CommunityPCS Master Data & Categories Aggregator
 */
(function () {
  const CATEGORIES = [
    { id: "general", name: "General Discussion", icon: "🏠", desc: "General chat about WebOS, setups, and community appreciation." },
    { id: "apps", name: "Apps & Store", icon: "📱", desc: "Discussions, reviews, and guides for Store applications & utilities." },
    { id: "hardware", name: "Hardware & Specs", icon: "🖥️", desc: "Cyclone X9, Star R Pro, Bolt NV-64, and performance benchmarks." },
    { id: "bugs", name: "Bugs & Issues", icon: "🐛", desc: "Troubleshooting, bug reporting, and stability fixes across releases." },
    { id: "tips", name: "Tips & Tricks", icon: "💡", desc: "Keyboard shortcuts, efficiency hacks, and system optimization." },
    { id: "custom", name: "Customization", icon: "🎨", desc: "Wallpapers, dock styling, desktop layouts, and UI personalization." },
    { id: "future", name: "Future & Wishlist", icon: "🚀", desc: "Feature requests, roadmap predictions, and WebOS v1.0 ideas." }
  ];

  function getAllThreads() {
    const gen = window.communityGeneral || [];
    const apps = window.communityApps || [];
    const hw = window.communityHardware || [];
    const bugs = window.communityBugs || [];
    const tips = window.communityTips || [];
    const cust = window.communityCustom || [];
    const fut = window.communityFuture || [];
    return [...gen, ...apps, ...hw, ...bugs, ...tips, ...cust, ...fut];
  }

  function findThread(id) {
    const numId = parseInt(id, 10);
    const threads = getAllThreads();
    return threads.find(t => t.id === numId) || null;
  }

  function getCategoryThreads(catName) {
    const threads = getAllThreads();
    return threads.filter(t => t.category.toLowerCase() === catName.toLowerCase());
  }

  function getTopContributors() {
    return [
      { name: "SystemSage", role: "Moderator", posts: 412, badge: "🛡️ Lead Mod", joined: "May 2026", likes: 890 },
      { name: "WebOS_Fanatic", role: "Moderator", posts: 342, badge: "🛡️ Community Mod", joined: "May 2026", likes: 760 },
      { name: "KernelKrafter", role: "Member", posts: 210, badge: "⭐ Elite Tech", joined: "Jun 2026", likes: 520 },
      { name: "AI_Whisperer", role: "Member", posts: 184, badge: "🤖 AI Guru", joined: "Jun 2026", likes: 440 },
      { name: "ByteWizard", role: "Member", posts: 145, badge: "🧙 Code Master", joined: "Jun 2026", likes: 380 },
      { name: "WallpaperQueen", role: "Member", posts: 130, badge: "🎨 Art Lead", joined: "Jul 2026", likes: 310 },
      { name: "StorageSensei", role: "Member", posts: 122, badge: "💾 Bolt Specialist", joined: "Jul 2026", likes: 290 },
      { name: "TerminalKid", role: "Member", posts: 118, badge: "⚡ CLI Hacker", joined: "Jul 2026", likes: 275 },
      { name: "BootMaster", role: "Member", posts: 105, badge: "⏱️ Kernel Fastboot", joined: "Jul 2026", likes: 240 },
      { name: "PixelPusher", role: "Member", posts: 94, badge: "📐 UI Designer", joined: "Aug 2026", likes: 215 },
      { name: "AppAddict", role: "Member", posts: 92, badge: "🛒 Store Explorer", joined: "Aug 2026", likes: 198 },
      { name: "CycloneX9Lover", role: "Member", posts: 89, badge: "🔥 Hardware Fan", joined: "Aug 2026", likes: 185 }
    ];
  }

  function getCommunityRules() {
    return [
      { num: 1, title: "Be Respectful & Welcoming", desc: "Treat every member with courtesy. Harassment, toxicity, or discriminatory remarks are strictly prohibited." },
      { num: 2, title: "Keep Discussions Relevant", desc: "Post threads in their appropriate category. Use descriptive titles so other members can find answers easily." },
      { num: 3, title: "No Spam or Unsolicited Ads", desc: "Commercial promotion, chain letters, duplicate posts, and unauthorized external links are disallowed." },
      { num: 4, title: "Report Bugs with Reproducible Steps", desc: "When posting in Bugs & Issues, include your WebOS version and exact steps to reproduce the issue." },
      { num: 5, title: "Have Fun & Share Knowledge", desc: "Share your custom desktop setups, workflow tips, terminal secrets, and feature ideas with fellow enthusiasts." }
    ];
  }

  window.communityData = {
    CATEGORIES,
    getAllThreads,
    findThread,
    getCategoryThreads,
    getTopContributors,
    getCommunityRules
  };
})();

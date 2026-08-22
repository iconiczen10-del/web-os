/* === FILE: community-data-bugs.js === */
/**
 * WebOS v0.8.1 CommunityPCS - Bugs & Issues Data (5 threads)
 */
(function () {
  window.communityBugs = [
    {
      id: 22,
      title: "Storage not freeing up",
      category: "Bugs & Issues",
      author: "WebSurfer_99",
      authorRole: "New Member",
      authorPosts: 18,
      date: "2026-08-12",
      likes: 12,
      hot: false,
      posts: [
        { author: "WebSurfer_99", role: "New Member", posts: 18, date: "2026-08-12", likes: 3, content: "I deleted a 500MB video from Downloads but free space didn't increase in Settings. Any ideas?" },
        { author: "StorageSensei", role: "Member", posts: 122, date: "2026-08-12", likes: 8, content: "Make sure to open Trash and click 'Empty Trash'! Files are moved to Trash first until emptied." },
        { author: "FinderFriend", role: "Member", posts: 44, date: "2026-08-13", likes: 4, content: "Once emptied, storageManager instantly updates the free space." }
      ]
    },
    {
      id: 23,
      title: "Finder crash after delete",
      category: "Bugs & Issues",
      author: "DataDiver",
      authorRole: "Member",
      authorPosts: 33,
      date: "2026-08-13",
      likes: 9,
      hot: false,
      posts: [
        { author: "DataDiver", role: "Member", posts: 33, date: "2026-08-13", likes: 3, content: "Experienced a brief blank screen when deleting a file during active search in Finder." },
        { author: "KernelKrafter", role: "Member", posts: 210, date: "2026-08-13", likes: 6, content: "Fixed in v0.8.0! The file operation event dispatcher now safely clears search filters." }
      ]
    },
    {
      id: 24,
      title: "Boot screen stuck at 99%",
      category: "Bugs & Issues",
      author: "BootMaster",
      authorRole: "Member",
      authorPosts: 105,
      date: "2026-08-13",
      likes: 17,
      hot: true,
      posts: [
        { author: "BootMaster", role: "Member", posts: 105, date: "2026-08-13", likes: 5, content: "Had an instance where the boot screen stayed at 99% for an extra second on low-end hardware." },
        { author: "CycloneX9Lover", role: "Member", posts: 89, date: "2026-08-14", likes: 4, content: "That was the Mbank wallet hydration timeout. Resolved in the latest boot orchestrator." },
        { author: "ByteWizard", role: "Member", posts: 145, date: "2026-08-14", likes: 5, content: "The fallback timer now enforces a 3.2s hard maximum guarantee." },
        { author: "SystemSage", role: "Moderator", posts: 412, date: "2026-08-15", likes: 6, content: "Tested across multiple browsers, boots consistently under 2.8s now." }
      ]
    },
    {
      id: 25,
      title: "AI Chat typing frozen",
      category: "Bugs & Issues",
      author: "CyberNaut",
      authorRole: "Member",
      authorPosts: 52,
      date: "2026-08-14",
      likes: 8,
      hot: false,
      posts: [
        { author: "CyberNaut", role: "Member", posts: 52, date: "2026-08-14", likes: 3, content: "AI Chat typing animation lagged when switching tabs rapidly." },
        { author: "AI_Whisperer", role: "Member", posts: 184, date: "2026-08-14", likes: 6, content: "The animation controller now pauses when tab is hidden to save CPU cycles." }
      ]
    },
    {
      id: 26,
      title: "Dock icons overlapping",
      category: "Bugs & Issues",
      author: "DockDoctor",
      authorRole: "Member",
      authorPosts: 63,
      date: "2026-08-15",
      likes: 11,
      hot: false,
      posts: [
        { author: "DockDoctor", role: "Member", posts: 63, date: "2026-08-15", likes: 4, content: "When installing 6+ apps from Store, dock overflowed slightly on small resolutions." },
        { author: "PixelPusher", role: "Member", posts: 94, date: "2026-08-15", likes: 4, content: "Dock auto-scaling and flex wrapping with subtle padding fixed this completely." },
        { author: "ThemeThief", role: "Member", posts: 56, date: "2026-08-16", likes: 3, content: "Smooth icon scaling down to 40px keeps everything pristine." }
      ]
    }
  ];
})();

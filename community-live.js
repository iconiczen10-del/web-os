/* === FILE: community-live.js === */
/**
 * WebOS v0.8.1 CommunityPCS Live Simulated Activity Engine
 */
(function () {
  const MEMBER_POOL = [
    "WebOS_Fanatic", "CycloneX9Lover", "BoltNV64", "AI_Whisperer", "WallpaperQueen",
    "TerminalKid", "StarRPro_Fan", "PixelPusher", "KernelKrafter", "WebSurfer_99",
    "OS_Builder", "ByteWizard", "CyberNaut", "DataDiver", "RAMRaider",
    "GPU_Guru", "StorageSensei", "FinderFriend", "DockDoctor", "BootMaster",
    "CloudCoder", "PixelPerfect", "SystemSage", "AppAddict", "ThemeThief",
    "SiliconSamurai", "SwiftCoder", "NeonDriver", "QuantumQuark", "EchoFalcon"
  ];

  let onlineCount = Math.floor(38 + Math.random() * 22);
  let totalMembers = 2847;
  let latestNewMember = "WebSurfer_99";
  let recentActivities = [
    { text: "SystemSage replied to 'WebOS appreciation thread'", time: "Just now", type: "reply" },
    { text: "AI_Whisperer liked a post in 'AI Chat worth $300 Pro?'", time: "1m ago", type: "like" },
    { text: "StorageSensei shared a tip in 'Storage cleanup guide'", time: "2m ago", type: "post" },
    { text: "PixelPerfect joined CommunityPCS!", time: "3m ago", type: "join" },
    { text: "TerminalKid posted in 'Keyboard shortcuts guide'", time: "4m ago", type: "reply" }
  ];

  function getOnlineCount() { return onlineCount; }
  function getTotalMembers() { return totalMembers; }
  function getRecentActivities() { return recentActivities; }
  function getLatestMember() { return latestNewMember; }

  function triggerNewMember() {
    const name = MEMBER_POOL[Math.floor(Math.random() * MEMBER_POOL.length)];
    totalMembers++;
    latestNewMember = name;
    recentActivities.unshift({
      text: `🎉 ${name} just joined CommunityPCS!`,
      time: "Just now",
      type: "join"
    });
    if (recentActivities.length > 5) recentActivities.pop();
    updateLiveDOM();
  }

  function triggerActivity() {
    const user = MEMBER_POOL[Math.floor(Math.random() * MEMBER_POOL.length)];
    const threads = window.communityData ? window.communityData.getAllThreads() : [];
    if (threads.length === 0) return;
    const thread = threads[Math.floor(Math.random() * threads.length)];
    const types = ["reply", "like", "post"];
    const t = types[Math.floor(Math.random() * types.length)];

    let text = "";
    if (t === "reply") {
      text = `${user} replied to '${thread.title}'`;
      thread.likes = (thread.likes || 10) + 1;
    } else if (t === "like") {
      text = `${user} liked a post in '${thread.title}'`;
    } else {
      text = `${user} shared thoughts in '${thread.category}'`;
    }

    recentActivities.unshift({ text, time: "Just now", type: t });
    if (recentActivities.length > 5) recentActivities.pop();
    updateLiveDOM();
  }

  function updateOnline() {
    onlineCount = Math.floor(35 + Math.random() * 30);
    updateLiveDOM();
  }

  function updateLiveDOM() {
    document.querySelectorAll(".community-live-online-val").forEach(el => {
      el.textContent = `${onlineCount} users online now`;
    });
    document.querySelectorAll(".community-live-members-val").forEach(el => {
      el.textContent = totalMembers.toLocaleString();
    });
    document.querySelectorAll(".community-live-activity-list").forEach(listEl => {
      listEl.innerHTML = recentActivities.map(act => `
        <div class="community-activity-item community-act-${act.type}">
          <div class="community-act-dot"></div>
          <div class="community-act-text">${act.text}</div>
          <div class="community-act-time">${act.time}</div>
        </div>
      `).join("");
    });
  }

  function startLiveLoops() {
    if (window._communityLoopsStarted) return;
    window._communityLoopsStarted = true;

    setInterval(updateOnline, 12000 + Math.random() * 8000);
    setInterval(triggerActivity, 15000);
    setInterval(triggerNewMember, 35000 + Math.random() * 20000);
  }

  function getRandomUser() {
    return MEMBER_POOL[Math.floor(Math.random() * MEMBER_POOL.length)];
  }

  window.communityLive = {
    getOnlineCount,
    getTotalMembers,
    getRecentActivities,
    getLatestMember,
    getRandomUser,
    updateLiveDOM,
    startLiveLoops
  };
})();

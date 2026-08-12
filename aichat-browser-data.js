/* === FILE: aichat-browser-data.js === */
/**
 * AI Chat Knowledge Browser Data Aggregator & Category Metadata
 */
(function () {
  const CATEGORIES = [
    { id: "webos", name: "WebOS Info", icon: "🏠", description: "System features, history, apps, and developer specs" },
    { id: "hardware", name: "Hardware Specs", icon: "🖥️", description: "Virtual PC processor, GPU, memory, and cooling specs" },
    { id: "general", name: "General Knowledge", icon: "🧠", description: "Science, geography, technology, and cosmic facts" },
    { id: "jokes", name: "Jokes", icon: "😂", description: "Programming, tech, and classic humorous banter" },
    { id: "quotes", name: "Quotes", icon: "💡", description: "Inspirational, software design, and wisdom quotes" },
    { id: "coding", name: "Coding", icon: "💻", description: "JavaScript algorithms, CSS layouts, and DOM manipulation" },
    { id: "about", name: "About AI", icon: "🤖", description: "AI Chat origins, capabilities, and system identity" }
  ];

  function getAllTopics() {
    const p1 = window.KB_DATA_PART1 || [];
    const p2 = window.KB_DATA_PART2 || [];
    const p3 = window.KB_DATA_PART3 || [];
    return [...p1, ...p2, ...p3];
  }

  function getCategories() {
    return CATEGORIES;
  }

  window.aiBrowserData = {
    getAllTopics,
    getCategories
  };
})();

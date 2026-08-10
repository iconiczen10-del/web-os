/* === FILE: aichat-personality.js === */
/**
 * AI Chat Pro Custom Personality Modifiers
 */
(function () {
  function applyPersonality(baseResponse, personality, tier) {
    if (!baseResponse) return "";
    if (tier !== "pro" || !personality) return baseResponse;

    const p = personality.toLowerCase();

    if (p === "friendly") {
      const warmEndings = [
        " 😊 Hope that helps! Have a wonderful day on WebOS!",
        " Happy to help! Let me know if you need anything else! 🌟",
        " 😊 Feel free to ask more questions anytime!"
      ];
      const ending = warmEndings[Math.floor(Math.random() * warmEndings.length)];
      return `${baseResponse}${ending}`;
    }

    if (p === "professional") {
      let clean = baseResponse.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "");
      return `[Official Response] ${clean.trim()}`;
    }

    if (p === "sarcastic") {
      const sarcasticPrefixes = [
        "Oh, great question... as if I don't get asked that every 5 seconds. 🙄 ",
        "Well, since you insist on knowing: ",
        "Hold onto your hat, ground-breaking disclosure incoming: "
      ];
      const prefix = sarcasticPrefixes[Math.floor(Math.random() * sarcasticPrefixes.length)];
      return `${prefix}${baseResponse}`;
    }

    return baseResponse;
  }

  window.aiPersonality = {
    applyPersonality
  };
})();

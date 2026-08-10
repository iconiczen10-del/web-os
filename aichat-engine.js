/* === FILE: aichat-engine.js === */
/**
 * AI Chat Core Response Engine & Orchestrator
 */
(function () {
  let sessionMessageCount = 0;

  const TIER_LIMITS = { free: 5, plus: 50, pro: Infinity };
  const TIER_DELAYS = { free: 1500, plus: 500, pro: 0 };

  function getMessageCount() { return sessionMessageCount; }
  function getMessageLimit(tier) { return TIER_LIMITS[tier] || 5; }
  function isLimitReached(tier) { return sessionMessageCount >= getMessageLimit(tier); }
  function resetSessionCount() { sessionMessageCount = 0; }

  function hasTimeQuery(input) {
    return /(what time|current time|what day|what date|today's date|clock)/i.test(input);
  }

  function getTimeResponse() {
    const now = new Date();
    return `Current Date & Time: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  function findKnowledgeMatch(input, currentTier) {
    const knowledge = window.aiKnowledge || [];
    const cleanInput = input.toLowerCase();
    const allowedTiers = currentTier === "pro" ? ["free", "plus", "pro"] : (currentTier === "plus" ? ["free", "plus"] : ["free"]);

    let bestMatch = null;
    let maxHits = 0;

    for (const entry of knowledge) {
      if (!allowedTiers.includes(entry.tier)) continue;
      let hits = 0;
      for (const kw of entry.keywords) {
        if (cleanInput.includes(kw.toLowerCase())) hits++;
      }
      if (hits > maxHits) {
        maxHits = hits;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestMatch.responses && bestMatch.responses.length > 0) {
      const idx = Math.floor(Math.random() * bestMatch.responses.length);
      return bestMatch.responses[idx];
    }
    return null;
  }

  async function getResponse(userInput, currentTier, personality) {
    const tier = currentTier || "free";
    const limit = getMessageLimit(tier);

    if (sessionMessageCount >= limit) {
      return {
        text: `⚠️ Message Limit Reached (${sessionMessageCount}/${limit} messages used). Please upgrade your subscription to Plus or Pro for more messages!`,
        isLimit: true
      };
    }

    sessionMessageCount++;
    const cleanInput = (userInput || "").toLowerCase().trim();
    let responseText = "";

    if (cleanInput === "help") {
      responseText = window.aiFallback ? window.aiFallback.getHelpText(tier) : "Type 'topics' to browse!";
    } else if (cleanInput === "topics") {
      responseText = window.aiCommands ? window.aiCommands.getTopicsText(tier) : "Categories: WebOS, Hardware, Jokes, Coding, General";
    } else if (cleanInput === "examples") {
      responseText = window.aiCommands ? window.aiCommands.getExamplesText(tier) : "Try asking: What is WebOS?";
    } else if (cleanInput.startsWith("category")) {
      const cat = cleanInput.replace("category", "").trim();
      responseText = window.aiCommands ? window.aiCommands.getCategoryText(cat, tier) : window.aiFallback.getHelpText(tier);
    } else if (window.aiMath && window.aiMath.isMathExpression(userInput)) {
      responseText = window.aiMath.solveMath(userInput, tier);
    } else if (hasTimeQuery(userInput)) {
      responseText = getTimeResponse();
    } else {
      const exactMatch = findKnowledgeMatch(userInput, tier);
      if (exactMatch) {
        responseText = exactMatch;
      } else if (window.aiMatching) {
        const matches = window.aiMatching.findWordMatches(userInput, tier);
        const formatted = window.aiMatching.formatMatchResponse(matches, tier);
        if (formatted) {
          responseText = formatted;
        } else {
          responseText = window.aiFallback ? window.aiFallback.getHelpText(tier) : "Ask me anything!";
        }
      } else {
        responseText = window.aiFallback ? window.aiFallback.getHelpText(tier) : "Ask me anything!";
      }
    }

    if (window.aiPersonality) {
      responseText = window.aiPersonality.applyPersonality(responseText, personality, tier);
    }

    const delay = TIER_DELAYS[tier] || 0;
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return { text: responseText, isLimit: false };
  }

  window.aiEngine = {
    getResponse,
    getMessageCount,
    getMessageLimit,
    isLimitReached,
    resetSessionCount
  };
})();

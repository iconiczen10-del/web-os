/* === FILE: aichat-engine.js === */
/**
 * AI Chat Core Response Engine
 */
(function () {
  let sessionMessageCount = 0;

  const TIER_LIMITS = {
    free: 5,
    plus: 50,
    pro: Infinity
  };

  const TIER_DELAYS = {
    free: 1500,
    plus: 500,
    pro: 0
  };

  const FALLBACKS = {
    free: [
      "I'm not sure about that in my Free Knowledge Base. Try asking about WebOS or basic math!",
      "I don't have an answer for that yet. Upgrade to Plus or Pro for expanded knowledge!",
      "Hmm, I couldn't find that in my database. Ask me 'what is webos' or 'tell me a joke'!"
    ],
    plus: [
      "That query didn't match my Plus Knowledge index. Try asking about CPU specs or coding tips!",
      "I don't have specific data on that yet. Upgrade to Pro Tier for full AI coverage!"
    ],
    pro: [
      "Fascinating topic! While my current knowledge index doesn't have a direct hit for that query, feel free to ask about code generation, quantum computing, or WebOS history!",
      "That's a unique question! My Pro Knowledge engine is ready for coding algorithms, scientific concepts, or custom math calculations."
    ]
  };

  function getMessageCount() { return sessionMessageCount; }
  function getMessageLimit(tier) { return TIER_LIMITS[tier] || 5; }
  function isLimitReached(tier) { return sessionMessageCount >= getMessageLimit(tier); }
  function resetSessionCount() { sessionMessageCount = 0; }

  function hasTimeQuery(input) {
    return /(what time|current time|what day|what date|today's date|what month|clock)/i.test(input);
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
    let maxKeywordHits = 0;

    for (const entry of knowledge) {
      if (!allowedTiers.includes(entry.tier)) continue;
      let hits = 0;
      for (const kw of entry.keywords) {
        if (cleanInput.includes(kw.toLowerCase())) {
          hits++;
        }
      }
      if (hits > maxKeywordHits) {
        maxKeywordHits = hits;
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

    let responseText = "";

    if (window.aiMath && window.aiMath.isMathExpression(userInput)) {
      responseText = window.aiMath.solveMath(userInput, tier);
    } else if (hasTimeQuery(userInput)) {
      responseText = getTimeResponse();
    } else {
      const match = findKnowledgeMatch(userInput, tier);
      if (match) {
        responseText = match;
      } else {
        const fallbackList = FALLBACKS[tier] || FALLBACKS.free;
        responseText = fallbackList[Math.floor(Math.random() * fallbackList.length)];
      }
    }

    if (window.aiPersonality) {
      responseText = window.aiPersonality.applyPersonality(responseText, personality, tier);
    }

    const delay = TIER_DELAYS[tier] || 0;
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return {
      text: responseText,
      isLimit: false
    };
  }

  window.aiEngine = {
    getResponse,
    getMessageCount,
    getMessageLimit,
    isLimitReached,
    resetSessionCount
  };
})();

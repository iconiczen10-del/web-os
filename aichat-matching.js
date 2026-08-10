/* === FILE: aichat-matching.js === */
/**
 * AI Chat Smart Word Matching & Priority Sorting Engine
 */
(function () {
  const STOP_WORDS = new Set([
    "what", "is", "the", "in", "a", "an", "and", "or", "to", "of", "for",
    "with", "about", "can", "you", "tell", "me", "how", "do", "i", "want",
    "know", "that", "it", "on", "at", "this", "are", "be", "has", "have",
    "from", "they", "them", "we", "us"
  ]);

  function isLevenshtein1(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let diff = 0;
    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
      if (a[i] !== b[j]) {
        diff++;
        if (diff > 1) return false;
        if (a.length > b.length) i++;
        else if (b.length > a.length) j++;
        else { i++; j++; }
      } else {
        i++; j++;
      }
    }
    return diff + (a.length - i) + (b.length - j) <= 1;
  }

  function getPriority(category, keyword) {
    const kw = (keyword || "").toLowerCase();
    const cat = (category || "").toLowerCase();
    if (["cpu", "gpu", "ram", "storage", "specs", "processor", "graphics", "memory", "motherboard", "display", "network"].some(k => kw.includes(k) || cat.includes("hardware"))) return 1;
    if (["webos", "version", "apps", "system", "finder", "browser", "store", "settings", "monitor"].some(k => kw.includes(k) || cat.includes("webos"))) return 2;
    if (["joke", "quote", "math", "time", "help", "topics", "examples", "who are you"].some(k => kw.includes(k) || cat.includes("joke") || cat.includes("quote") || cat.includes("about"))) return 3;
    if (["capital", "planet", "einstein", "science", "earth", "light", "mountain", "ocean", "html", "css", "javascript"].some(k => kw.includes(k) || cat.includes("general"))) return 4;
    if (["loop", "array", "function", "variable", "string", "code", "reverse", "sort"].some(k => kw.includes(k) || cat.includes("coding"))) return 5;
    return 4;
  }

  function findWordMatches(userInput, currentTier) {
    const cleanInput = (userInput || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ");
    const words = cleanInput.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
    if (words.length === 0) return null;

    const knowledge = window.aiKnowledge || [];
    const allowedTiers = currentTier === "pro" ? ["free", "plus", "pro"] : (currentTier === "plus" ? ["free", "plus"] : ["free"]);

    const matches = [];
    const seenMatchedWords = new Set();

    for (const entry of knowledge) {
      if (!allowedTiers.includes(entry.tier)) continue;
      for (const kw of entry.keywords) {
        const cleanKw = kw.toLowerCase();
        for (const word of words) {
          const isExact = word === cleanKw;
          const isContains = cleanKw.includes(word) || word.includes(cleanKw);
          const isFuzzy = word.length > 3 && isLevenshtein1(word, cleanKw);

          if (isExact || isContains || isFuzzy) {
            if (!seenMatchedWords.has(word)) {
              seenMatchedWords.add(word);
              const priority = getPriority(entry.category, word);
              const response = entry.responses[Math.floor(Math.random() * entry.responses.length)];
              matches.push({ word, priority, response, category: entry.category });
            }
          }
        }
      }
    }

    matches.sort((a, b) => a.priority - b.priority);
    return matches;
  }

  function formatMatchResponse(matches, tier) {
    if (!matches || matches.length === 0) return null;

    const upgradeMarketing = tier === "free" ? "\n\n⚡ Upgrade to Plus ($100) or Pro ($300) for more topics!" : (tier === "plus" ? "\n\n🚀 Upgrade to Pro ($300) for unlimited messages & full code generator!" : "");

    if (matches.length === 1) {
      const m = matches[0];
      return `I found something about '${m.word}' in your question:\n\n${m.response}\n\n💡 Also try asking about: 'webos specs', 'tell me a joke', or 'what is html'${upgradeMarketing}`;
    }

    if (matches.length >= 2 && matches.length <= 3) {
      const m1 = matches[0];
      const others = matches.slice(1).map(m => `• '${m.word}' — ask me about this`).join("\n");
      return `I found multiple topics in your question! Here's the most relevant:\n\n${m1.response}\n\nI also found:\n${others}${upgradeMarketing}`;
    }

    // 4+ matches
    const m1 = matches[0];
    const otherWords = matches.slice(1, 4).map(m => `'${m.word}'`).join(", ");
    return `I found several topics in your question! Here's the best match:\n\n${m1.response}\n\nI also found: ${otherWords}. Which would you like to explore?${upgradeMarketing}`;
  }

  window.aiMatching = {
    findWordMatches,
    formatMatchResponse
  };
})();

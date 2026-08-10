/* === FILE: aichat-commands.js === */
/**
 * AI Chat Category, Topics, and Examples Command Handlers
 */
(function () {
  function getTopicsText(tier) {
    const t = tier || "free";
    if (t === "free") {
      return `📂 Available Categories (Free Tier):
• WebOS (5 topics)
• Knowledge (5 topics)
• Jokes (3 topics)
• Math (Simple)
• Time & Date
• About Me

⚡ Upgrade to Plus ($100) or Pro ($300) to unlock Coding & Quotes!`;
    }
    if (t === "plus") {
      return `📂 Available Categories (Plus Tier):
• WebOS (10 topics)
• Knowledge (12 topics)
• Jokes (10 topics)
• Coding (4 topics)
• Quotes (5 topics)
• Math (Advanced)
• Time & About Me

🚀 Upgrade to Pro ($300) for complete 106+ topic access!`;
    }
    return `📂 All Categories (Pro Tier Unlocked):
• WebOS (15 topics - complete specs & history)
• Knowledge (20 topics - full science & tech)
• Jokes (20 topics)
• Coding (Full code generators with examples)
• Quotes (10 quotes)
• Math (Scientific calculations)
• Personalities (3 modes)
• About Me (5 topics)`;
  }

  function getExamplesText(tier) {
    return `💡 Try asking me one of these sample questions:
1. "What is WebOS?"
2. "What CPU and RAM specs do I have?"
3. "Tell me a programming joke"
4. "What is the capital of France?"
5. "What time is it?"
6. "How do I reverse a string in JavaScript?"`;
  }

  function getCategoryText(catName, tier) {
    const clean = (catName || "").toLowerCase().trim();
    if (clean.includes("webos") || clean.includes("hardware") || clean.includes("specs")) {
      return `🏠 WebOS Topics:\n• What is WebOS?\n• CPU specs / GPU specs / RAM specs\n• What version am I running?\n• WebOS architecture & history`;
    }
    if (clean.includes("joke") || clean.includes("funny")) {
      return `😂 Joke Topics:\nAsk "tell me a joke" or "programming joke"!`;
    }
    if (clean.includes("coding") || clean.includes("code")) {
      return `💻 Coding Topics:\n• What is HTML / CSS / JS?\n• Coding tips (arrays, functions, variables)\n• Code generation (reverse string, fibonacci, palindrome)`;
    }
    if (clean.includes("quote")) {
      return `💡 Quote Topics:\nAsk "give me a quote" or "motivational quote"!`;
    }
    if (clean.includes("general") || clean.includes("knowledge") || clean.includes("science")) {
      return `🧠 Knowledge Topics:\n• Capital of France\n• Largest planet\n• Who is Einstein?\n• Speed of light\n• Quantum computing`;
    }
    return window.aiFallback ? window.aiFallback.getHelpText(tier) : "Type 'help' to see available topics!";
  }

  window.aiCommands = {
    getTopicsText,
    getExamplesText,
    getCategoryText
  };
})();

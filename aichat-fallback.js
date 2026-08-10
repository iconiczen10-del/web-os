/* === FILE: aichat-fallback.js === */
/**
 * AI Chat Tier-Aware Help, Welcome, and Marketing Prompts
 */
(function () {
  function getWelcomeText(tier) {
    const t = tier || "free";
    let footer = "";
    if (t === "free") {
      footer = "\n\n⚡ Upgrade to Plus — $100 for 50 messages, coding help, more knowledge";
    } else if (t === "plus") {
      footer = "\n\nYou're on Plus. 50 messages. 🚀 Pro unlocks unlimited — $300";
    } else {
      footer = "\n\nYou're on Pro. Unlimited messages. All features unlocked.";
    }

    return `🤖 AI Chat: Hello! I'm your WebOS assistant. Here's what I can help with:

🏠 WebOS — specs, hardware, versions, apps
🧠 Knowledge — science, geography, tech facts
😂 Jokes — programming humor, dad jokes
💡 Quotes — motivational & tech quotes
💻 Coding — JS, HTML, CSS tips
🔢 Math — simple to advanced calculations
🕐 Time — current time & date
🤖 About Me — who I am, what I do

Type "help" to see all topics!${footer}`;
  }

  function getHelpText(tier) {
    const t = tier || "free";
    if (t === "free") {
      return `AI: Here's what I can help with (Free tier — 5 messages):

🏠 WebOS — 5 topics: "What is WebOS?", "CPU specs", "GPU specs", "RAM specs", "What version?"
🧠 Knowledge — 5 topics: "Capital of France", "Largest planet", "Who is Einstein?", "What is HTML?", "What is CSS?"
😂 Jokes — 3 jokes available
🔢 Math — Simple only (addition +, subtraction -)
🕐 Time — Current time & date
🤖 About Me — "Who are you?"

🔒 Locked on Free: Coding help, Quotes, Advanced math, Full knowledge

⚡ Upgrade to Plus ($100) — 50 messages, coding, quotes, 70 topics!
🚀 Upgrade to Pro ($300) — Unlimited, code generation, custom personality, 106+ topics!

Type a category name to explore it, or ask me anything!`;
    }

    if (t === "plus") {
      return `AI: Here's what I can help with (Plus tier — 50 messages):

🏠 WebOS — 10 topics
🧠 Knowledge — 12 topics
😂 Jokes — 10 jokes
💻 Coding — Basic tips (arrays, loops, functions, variables, if-else)
💡 Quotes — 5 quotes
🔢 Math — Advanced (+, -, *, /, %)
🕐 Time — Current time & date
🤖 About Me — 4 topics

🚀 Upgrade to Pro ($300) — Unlimited messages, code generation, 106+ topics, custom AI personality!

Type a category name to explore it!`;
    }

    return `AI: Here's everything I can do (Pro — Unlimited):

🏠 WebOS — 15 topics (complete knowledge)
🧠 Knowledge — 20 topics (full general knowledge)
😂 Jokes — 20 jokes (all)
💻 Coding — Full code generation with examples
💡 Quotes — 10 quotes (all)
🔢 Math — Complete (sqrt, pow, sin, cos, log, +, -, *, /, %)
🕐 Time — Live clock
🤖 About Me — 5 topics
🎭 Personalities — Friendly, Professional, Sarcastic
📂 Knowledge Browser — Browse all topics by category

You have access to everything! Type "topics" to browse categories, or ask me anything!`;
  }

  window.aiFallback = {
    getWelcomeText,
    getHelpText
  };
})();

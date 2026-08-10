/* === FILE: aichat-knowledge-pro.js === */
/**
 * AI Chat Knowledge Base - Pro Tier Entries
 */
(function () {
  window.AI_KNOWLEDGE_PRO = [
    {
      keywords: ["webos history", "webos versions list", "webos browser", "webos system monitor", "hh1 architecture", "webos specs"],
      tier: "pro",
      category: "webos",
      responses: [
        "WebOS Evolution: v0.1 (Desktop Shell) → v0.2 (Window Manager) → v0.3 (Finder & Notes) → v0.4 (Monitor & Topbar) → v0.5 (Dock Reorder & Snapping) → v0.6 (App Store & Mbank) → v0.6.6 (Lock Screen & Modular Loaders) → v0.7 (Client-Side State Wipe) → v0.7.1.1 (Multi-Tab System Monitor) → v0.7.1.1.A (Unmerged Changelog Sync) → v0.7.2 (AI Chat & AI Talks Inc.).",
        "HH1 Architecture Principle: Every component is decoupled into clean files capped at 150 lines, running 100% offline with zero external network dependencies or build tools."
      ]
    },
    {
      keywords: ["motherboard", "psu", "cooling", "display specs", "network specs"],
      tier: "pro",
      category: "hardware",
      responses: [
        "Motherboard: Bolt B350-M Chipset. Power Supply: Star Power 500W Bronze. Cooling: HydroCool 120 Liquid System. Display: 15.6\" Retina 220 PPI. Network: BoltLink Wi-Fi 5 + BT 4.2."
      ]
    },
    {
      keywords: ["quantum computing", "theory of relativity", "dna structure", "black hole", "machine learning", "neural network", "blockchain", "crispr"],
      tier: "pro",
      category: "general",
      responses: [
        "Quantum Computing harnesses qubits and quantum superposition to execute parallel computations exponentially faster than classical bits for complex cryptography and simulation.",
        "Machine Learning algorithms train statistical models on datasets to recognize patterns and make predictions without explicit step-by-step programming.",
        "DNA (Deoxyribonucleic Acid) forms a double-helix polymer carrying genetic instructions for development, functioning, and reproduction in all living organisms.",
        "A Black Hole is a region of spacetime where gravitational attraction is so strong that nothing — not even light — can escape its event horizon."
      ]
    },
    {
      keywords: ["code generation", "reverse string", "fibonacci", "palindrome", "sort algorithm", "dom manipulation", "flexbox", "grid"],
      tier: "pro",
      category: "coding",
      responses: [
        "```javascript\n// Reverse String Code\nfunction reverseString(str) {\n  return str.split('').reverse().join('');\n}\nconsole.log(reverseString('WebOS')); // 'SObeW'\n```",
        "```javascript\n// Fibonacci Sequence Generator\nfunction fibonacci(n) {\n  const seq = [0, 1];\n  for (let i = 2; i < n; i++) {\n    seq[i] = seq[i - 1] + seq[i - 2];\n  }\n  return seq;\n}\nconsole.log(fibonacci(8)); // [0,1,1,2,3,5,8,13]\n```",
        "```javascript\n// Palindrome Checker\nfunction isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}\nconsole.log(isPalindrome('A man a plan a canal Panama')); // true\n```",
        "```css\n/* CSS Centering Grid */\n.center-box {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}\n```"
      ]
    },
    {
      keywords: ["what can you do", "your capabilities", "pro features"],
      tier: "pro",
      category: "about",
      responses: [
        "With Pro Tier unlocked, I feature unlimited session messages, instant 0ms responses, complete code generation, advanced scientific math, custom personalities (Friendly, Professional, Sarcastic), and full knowledge base access!"
      ]
    }
  ];
})();

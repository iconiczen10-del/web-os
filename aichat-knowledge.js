/* === FILE: aichat-knowledge.js === */
/**
 * AI Chat Knowledge Base Combiner
 */
(function () {
  const freeEntries = window.AI_KNOWLEDGE_FREE || [];
  const plusEntries = window.AI_KNOWLEDGE_PLUS || [];
  const proEntries = window.AI_KNOWLEDGE_PRO || [];

  const combined = [...freeEntries, ...plusEntries, ...proEntries];

  window.aiKnowledge = combined;
})();

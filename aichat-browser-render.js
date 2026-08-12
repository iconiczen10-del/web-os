/* === FILE: aichat-browser-render.js === */
/**
 * AI Chat Knowledge Browser - Category & Topic HTML Generator
 */
(function () {
  function generateCategoryHTML(cat, filteredTopics, allTopics, tier, isCollapsed) {
    const isTopicLocked = window.aiKnowledgeBrowser ? window.aiKnowledgeBrowser.isTopicLocked : () => false;
    const catTopics = filteredTopics.filter(t => t.catId === cat.id);
    if (catTopics.length === 0) return "";

    const allCatTopics = allTopics.filter(t => t.catId === cat.id);
    const unlockedCount = allCatTopics.filter(t => !isTopicLocked(t, tier)).length;
    const catPct = Math.round((unlockedCount / allCatTopics.length) * 100);

    const topicCardsHtml = catTopics.map(topic => {
      const locked = isTopicLocked(topic, tier);
      const badgeHtml = locked ? `<span class="kb-lock-badge ${topic.minTier}">${topic.minTier.toUpperCase()} 🔒</span>` : `<span class="kb-unlocked-badge">✓ READY</span>`;

      const variantsHtml = topic.variants.map(v => `
        <div class="kb-question-item ${locked ? 'locked' : ''}" data-question="${v.replace(/"/g, '&quot;')}" data-locked="${locked}">
          <span>${v}</span>
          ${locked ? `<span class="kb-q-lock">🔒</span>` : `<span class="kb-q-ask">💬 Ask</span>`}
        </div>
      `).join("");

      return `
        <div class="kb-topic-card ${locked ? 'locked-card' : ''}">
          <div class="kb-topic-header"><span class="kb-topic-title">${topic.name}</span>${badgeHtml}</div>
          <div class="kb-variants-list">${variantsHtml}</div>
        </div>
      `;
    }).join("");

    return `
      <div class="kb-category-box" data-cat="${cat.id}">
        <div class="kb-category-header" data-cat="${cat.id}">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:18px;">${cat.icon}</span>
            <div>
              <div style="font-weight:700; font-size:13px; color:#fff;">${cat.name} (${catTopics.length} topics)</div>
              <div style="font-size:10px; color:#8b949e;">${unlockedCount}/${allCatTopics.length} unlocked (${catPct}%)</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="kb-progress-bar-wrap"><div class="kb-progress-bar-fill" style="width:${catPct}%;"></div></div>
            <span style="font-size:12px; color:#8b949e;">${isCollapsed ? '▶' : '▼'}</span>
          </div>
        </div>
        ${!isCollapsed ? `<div class="kb-category-body">${topicCardsHtml}</div>` : ''}
      </div>
    `;
  }

  window.aiBrowserRender = { generateCategoryHTML };
})();

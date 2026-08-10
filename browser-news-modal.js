/* === FILE: browser-news-modal.js === */
/**
 * WebOS v0.7.2.3 Browser News Article Reader Modal Renderer
 */
(function () {
  function openArticleModal(article, containerEl) {
    if (!containerEl || !article) return;

    const modalOverlay = document.createElement("div");
    modalOverlay.className = "news-modal-overlay fading-in";

    const paragraphs = article.content ? article.content.split('\n\n').map(p => `<p>${p}</p>`).join('') : '';

    modalOverlay.innerHTML = `
      <div class="news-modal-content">
        <div class="news-modal-close">✕ Close</div>
        <div class="news-modal-cat">${article.category} • ${article.badge || 'NEWS'}</div>
        <h2 class="news-modal-title">${article.title}</h2>
        <div class="news-modal-meta">
          <span>${article.author}</span> | <span>Published ${article.date}</span> | <span>${article.readTime}</span>
        </div>
        <div class="news-modal-body">
          ${paragraphs}
        </div>
        <button class="news-modal-back-btn">← Back to News Feed</button>
      </div>
    `;

    const closeBtn = modalOverlay.querySelector(".news-modal-close");
    const backBtn = modalOverlay.querySelector(".news-modal-back-btn");

    function closeModal() {
      modalOverlay.classList.add("fading-out");
      setTimeout(() => modalOverlay.remove(), 200);
    }

    closeBtn.addEventListener("click", closeModal);
    backBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    containerEl.appendChild(modalOverlay);
  }

  window.openNewsArticleModal = openArticleModal;
})();

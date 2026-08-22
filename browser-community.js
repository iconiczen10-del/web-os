/* === FILE: browser-community.js === */
/**
 * WebOS v0.8.1 CommunityPCS Website Router & Event Controller
 */
(function () {
  function renderCommunityPage(containerEl, path, onNavigate) {
    if (!containerEl) return;
    if (window.communityLive) window.communityLive.startLiveLoops();

    const cleanPath = path ? path.trim() : "/";
    let bodyHTML = "";
    let activeNavPath = "/";

    if (cleanPath === "" || cleanPath === "/") {
      activeNavPath = "/";
      bodyHTML = window.communityRenderHome ? window.communityRenderHome.renderHomeView() : "";
    } else if (cleanPath.startsWith("/forums")) {
      activeNavPath = "/forums";
      bodyHTML = window.communityRenderHome ? window.communityRenderHome.renderForumsView() : "";
    } else if (cleanPath.startsWith("/thread")) {
      activeNavPath = "/forums";
      let threadId = 1;
      if (cleanPath.includes("id=")) {
        threadId = cleanPath.split("id=")[1].split("&")[0];
      } else if (cleanPath.startsWith("/thread/")) {
        threadId = cleanPath.replace("/thread/", "");
      }
      bodyHTML = window.communityRenderThread ? window.communityRenderThread.renderThreadView(threadId) : "";
    } else if (cleanPath.startsWith("/members")) {
      activeNavPath = "/members";
      bodyHTML = window.communityRenderPages ? window.communityRenderPages.renderMembersView() : "";
    } else if (cleanPath.startsWith("/about")) {
      activeNavPath = "/about";
      bodyHTML = window.communityRenderPages ? window.communityRenderPages.renderAboutView() : "";
    } else {
      activeNavPath = "/";
      bodyHTML = window.communityRenderHome ? window.communityRenderHome.renderHomeView() : "";
    }

    const headerNavHTML = window.communityRenderHome ? window.communityRenderHome.renderHeaderNav(activeNavPath) : "";

    containerEl.innerHTML = `
      <div class="community-root">
        ${headerNavHTML}
        <main class="community-main-viewport">${bodyHTML}</main>
        <footer class="community-footer">
          <div>🌐 CommunityPCS — Official WebOS Forum • v0.8.1</div>
          <div>Simulated Offline Community Hub</div>
        </footer>
      </div>
    `;

    bindEvents(containerEl, onNavigate);
    if (cleanPath.startsWith("/thread") && window.communityRenderThread) {
      window.communityRenderThread.setupTypingIndicator();
    }
  }

  function bindEvents(containerEl, onNavigate) {
    const handleNav = (targetPath) => {
      if (typeof onNavigate === "function") {
        onNavigate("www.communitypcs.webos" + targetPath);
      }
    };

    containerEl.querySelectorAll("[data-path]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        handleNav(el.getAttribute("data-path"));
      });
    });

    containerEl.querySelectorAll(".community-thread-link, .community-thread-row").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const id = el.getAttribute("data-id") || el.getAttribute("data-thread-id");
        if (id) handleNav(`/thread?id=${id}`);
      });
    });

    containerEl.querySelectorAll(".community-expand-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const catName = btn.getAttribute("data-cat");
        const card = btn.closest(".community-category-card");
        if (!card) return;
        const list = card.querySelector(".community-cat-thread-list");
        const catThreads = window.communityData ? window.communityData.getCategoryThreads(catName) : [];
        if (list && catThreads.length > 0) {
          list.innerHTML = catThreads.map(t => `
            <div class="community-thread-row" data-thread-id="${t.id}">
              <div class="community-thread-main">
                <div class="community-thread-title">
                  ${t.hot ? '<span class="community-hot-badge">🔥</span>' : ''}
                  <a href="#" class="community-thread-link" data-id="${t.id}">${t.title}</a>
                </div>
                <div class="community-thread-meta"><span>by <strong>${t.author}</strong></span><span>• ${t.date}</span></div>
              </div>
              <div class="community-thread-stats">
                <div class="community-stat-bubble">💬 ${t.posts.length - 1} replies</div>
                <div class="community-stat-bubble">👍 ${t.likes}</div>
              </div>
            </div>
          `).join("");
          btn.style.display = "none";
          list.querySelectorAll(".community-thread-row").forEach(r => {
            r.addEventListener("click", () => handleNav(`/thread?id=${r.getAttribute("data-thread-id")}`));
          });
        }
      });
    });

    containerEl.querySelectorAll(".community-like-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isLiked = btn.getAttribute("data-liked") === "true";
        let count = parseInt(btn.getAttribute("data-count") || "0", 10);
        count = isLiked ? Math.max(0, count - 1) : count + 1;
        btn.setAttribute("data-liked", (!isLiked).toString());
        btn.setAttribute("data-count", count.toString());
        const valEl = btn.querySelector(".community-like-val");
        if (valEl) valEl.textContent = count;
        btn.classList.toggle("liked", !isLiked);
      });
    });

    const replySubmit = containerEl.querySelector("#community-submit-reply");
    const replyInput = containerEl.querySelector("#community-reply-input");
    if (replySubmit && replyInput) {
      replySubmit.addEventListener("click", () => {
        const text = replyInput.value.trim();
        if (!text) return;
        const threadId = replySubmit.getAttribute("data-thread-id");
        const thread = window.communityData ? window.communityData.findThread(threadId) : null;
        if (thread) {
          thread.posts.push({
            author: "webos-user",
            role: "Member",
            posts: 16,
            date: "Just now",
            likes: 0,
            content: text
          });
          renderCommunityPage(containerEl, `/thread?id=${threadId}`, onNavigate);
        }
      });
    }
  }

  window.renderCommunityPage = renderCommunityPage;
})();

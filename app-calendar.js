/* === FILE: app-calendar.js === */
/**
 * WebOS v0.6 Monthly Calendar App
 */
(function () {
  const STORAGE_KEY = "webos-calendar-events";

  function getEvents() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    try { return JSON.parse(saved); } catch (e) { return {}; }
  }

  function saveEvent(dateStr, text) {
    const events = getEvents();
    if (!text.trim()) {
      delete events[dateStr];
    } else {
      events[dateStr] = text.trim();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function initCalendar(windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    contentEl.style.padding = "12px";
    contentEl.style.background = "#181820";
    contentEl.style.color = "#ffffff";
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";

    let currentDate = new Date();

    function render() {
      const events = getEvents();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = currentDate.toLocaleString("default", { month: "long" });

      const today = new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

      let gridHtml = "";
      for (let i = 0; i < firstDay; i++) {
        gridHtml += `<div style="padding: 8px;"></div>`;
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month + 1}-${day}`;
        const hasEvent = !!events[dateKey];
        const isToday = isCurrentMonth && today.getDate() === day;

        gridHtml += `
          <div class="cal-day" data-date="${dateKey}" data-day="${day}" style="padding: 8px 4px; border-radius: 8px; text-align: center; cursor: pointer; background: ${isToday ? '#007aff' : 'rgba(255,255,255,0.04)'}; position: relative; font-size: 13px; font-weight: ${isToday ? '700' : '400'};">
            ${day}
            ${hasEvent ? `<div style="width: 4px; height: 4px; border-radius: 50%; background: #ff9f0a; position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%);"></div>` : ''}
          </div>
        `;
      }

      contentEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <button id="cal-prev" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 16px;">◀</button>
          <div style="font-size: 15px; font-weight: 600;">${monthName} ${year}</div>
          <button id="cal-next" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 16px;">▶</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 11px; color: #888; margin-bottom: 6px;">
          <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; flex: 1;" id="cal-grid">
          ${gridHtml}
        </div>
      `;

      contentEl.querySelector("#cal-prev").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        render();
      });
      contentEl.querySelector("#cal-next").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        render();
      });

      contentEl.querySelectorAll(".cal-day").forEach(dayEl => {
        dayEl.addEventListener("click", () => {
          const key = dayEl.getAttribute("data-date");
          const dayNum = dayEl.getAttribute("data-day");
          const existing = events[key] || "";
          const note = prompt(`Events for ${monthName} ${dayNum}, ${year}:`, existing);
          if (note !== null) {
            saveEvent(key, note);
            render();
          }
        });
      });
    }

    render();
  }

  window.initCalendar = initCalendar;
})();

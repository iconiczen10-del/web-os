/* === FILE: app-calculator.js === */
/**
 * WebOS v0.3 Calculator Application UI
 */
(function () {
  window.initCalculator = function (windowEl) {
    const contentEl = windowEl.querySelector(".window-content");
    if (!contentEl) return;

    const calcState = new window.CalcState();

    contentEl.innerHTML = `
      <div class="calc-display" id="calc-display">0</div>
      <div class="calc-buttons">
        <button class="calc-btn calc-btn-clear" data-action="clear">C</button>
        <button class="calc-btn calc-btn-digit" data-action="sign">±</button>
        <button class="calc-btn calc-btn-digit" data-action="percent">%</button>
        <button class="calc-btn calc-btn-operator" data-action="op" data-val="÷">÷</button>
        
        <button class="calc-btn calc-btn-digit" data-val="7">7</button>
        <button class="calc-btn calc-btn-digit" data-val="8">8</button>
        <button class="calc-btn calc-btn-digit" data-val="9">9</button>
        <button class="calc-btn calc-btn-operator" data-action="op" data-val="×">×</button>
        
        <button class="calc-btn calc-btn-digit" data-val="4">4</button>
        <button class="calc-btn calc-btn-digit" data-val="5">5</button>
        <button class="calc-btn calc-btn-digit" data-val="6">6</button>
        <button class="calc-btn calc-btn-operator" data-action="op" data-val="-">-</button>
        
        <button class="calc-btn calc-btn-digit" data-val="1">1</button>
        <button class="calc-btn calc-btn-digit" data-val="2">2</button>
        <button class="calc-btn calc-btn-digit" data-val="3">3</button>
        <button class="calc-btn calc-btn-operator" data-action="op" data-val="+">+</button>
        
        <button class="calc-btn calc-btn-digit calc-btn-zero" data-val="0">0</button>
        <button class="calc-btn calc-btn-digit" data-action="decimal">.</button>
        <button class="calc-btn calc-btn-equals" data-action="equals">=</button>
      </div>
    `;

    const displayEl = contentEl.querySelector("#calc-display");
    const buttons = contentEl.querySelectorAll(".calc-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");
        const action = btn.getAttribute("data-action");
        let displayVal = "0";

        if (action === "clear") {
          calcState.reset();
          displayVal = "0";
        } else if (action === "sign") {
          displayVal = calcState.handleToggleSign();
        } else if (action === "percent") {
          displayVal = calcState.handlePercent();
        } else if (action === "op") {
          displayVal = calcState.handleOperator(val);
        } else if (action === "decimal") {
          displayVal = calcState.handleDecimal();
        } else if (action === "equals") {
          displayVal = calcState.handleEquals();
        } else if (val) {
          displayVal = calcState.handleDigit(val);
        }

        displayEl.textContent = displayVal;
      });
    });
  };
})();

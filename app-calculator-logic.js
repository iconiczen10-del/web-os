/* === FILE: app-calculator-logic.js === */
/**
 * WebOS v0.3 Calculator Math & State Logic
 */
(function () {
  class CalcState {
    constructor() {
      this.reset();
    }

    reset() {
      this.currentInput = "0";
      this.previousInput = null;
      this.operator = null;
      this.shouldResetDisplay = false;
    }

    handleDigit(digit) {
      if (this.currentInput === "0" || this.shouldResetDisplay) {
        this.currentInput = digit;
        this.shouldResetDisplay = false;
      } else {
        this.currentInput += digit;
      }
      return this.currentInput;
    }

    handleDecimal() {
      if (this.shouldResetDisplay) {
        this.currentInput = "0.";
        this.shouldResetDisplay = false;
        return this.currentInput;
      }
      if (!this.currentInput.includes(".")) {
        this.currentInput += ".";
      }
      return this.currentInput;
    }

    handleOperator(op) {
      if (this.previousInput !== null && this.operator && !this.shouldResetDisplay) {
        this.handleEquals();
      }
      this.previousInput = this.currentInput;
      this.operator = op;
      this.shouldResetDisplay = true;
      return this.currentInput;
    }

    handleEquals() {
      if (this.previousInput === null || !this.operator) return this.currentInput;

      const prev = parseFloat(this.previousInput);
      const curr = parseFloat(this.currentInput);
      let result = 0;

      if (this.operator === "÷") {
        if (curr === 0) {
          this.reset();
          this.currentInput = "Error";
          return "Error";
        }
        result = prev / curr;
      } else if (this.operator === "×") {
        result = prev * curr;
      } else if (this.operator === "-") {
        result = prev - curr;
      } else if (this.operator === "+") {
        result = prev + curr;
      }

      this.currentInput = String(Number(result.toFixed(8)));
      this.previousInput = null;
      this.operator = null;
      this.shouldResetDisplay = true;
      return this.currentInput;
    }

    handleToggleSign() {
      if (this.currentInput !== "0" && this.currentInput !== "Error") {
        this.currentInput = this.currentInput.startsWith("-")
          ? this.currentInput.slice(1)
          : "-" + this.currentInput;
      }
      return this.currentInput;
    }

    handlePercent() {
      if (this.currentInput !== "Error") {
        const val = parseFloat(this.currentInput) / 100;
        this.currentInput = String(val);
      }
      return this.currentInput;
    }
  }

  window.CalcState = CalcState;
})();

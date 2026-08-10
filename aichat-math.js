/* === FILE: aichat-math.js === */
/**
 * AI Chat Tier-Gated Math Expression Engine
 */
(function () {
  function isMathExpression(input) {
    if (!input) return false;
    const clean = input.trim().toLowerCase();
    if (/^(what is|calculate|solve|eval|math:?)\s+/i.test(clean)) {
      const expr = clean.replace(/^(what is|calculate|solve|eval|math:?)\s+/i, "");
      return /^[0-9\s\+\-\*\/\%\(\)\.\,a-z]+$/i.test(expr) && /[0-9]/.test(expr);
    }
    return /^[\d\s\+\-\*\/\%\(\)\.\,]+$/.test(clean) && /[\+\-\*\/\%]/.test(clean);
  }

  function solveMath(input, tier) {
    const cleanExpr = input.trim().toLowerCase()
      .replace(/^(what is|calculate|solve|eval|math:?)\s+/i, "")
      .replace(/x/g, "*")
      .replace(/÷/g, "/");

    const currentTier = tier || "free";

    // Check tier operator permissions
    if (currentTier === "free") {
      if (/[\*\/\%]|sqrt|pow|sin|cos|log|pi/i.test(cleanExpr)) {
        return "Math Error: Free Tier only supports basic addition (+) and subtraction (-). Upgrade to Plus or Pro for multiplication, division, and advanced functions!";
      }
    } else if (currentTier === "plus") {
      if (/sqrt|pow|sin|cos|log|pi/i.test(cleanExpr)) {
        return "Math Error: Plus Tier supports +, -, *, /, and %. Upgrade to Pro Tier for scientific functions like sqrt, pow, sin, cos, and log!";
      }
    }

    try {
      // Safe evaluation for allowed mathematical operations
      let expr = cleanExpr
        .replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)")
        .replace(/pow\(([^,]+),([^)]+)\)/g, "Math.pow($1,$2)")
        .replace(/sin\(([^)]+)\)/g, "Math.sin($1)")
        .replace(/cos\(([^)]+)\)/g, "Math.cos($1)")
        .replace(/log\(([^)]+)\)/g, "Math.log($1)")
        .replace(/pi/g, "Math.PI");

      // Sanitize: only allow numbers, math operators, Math functions, parens
      if (!/^[0-9\s\+\-\*\/\%\.\(\)|Math\.sqrt|Math\.pow|Math\.sin|Math\.cos|Math\.log|Math\.PI,]+$/.test(expr)) {
        return "Invalid math expression syntax.";
      }

      const result = Function('"use strict"; return (' + expr + ')')();
      if (typeof result === "number" && !isNaN(result)) {
        return `Calculation Result: ${result}`;
      }
      return "Unable to evaluate math expression.";
    } catch (err) {
      return "Error evaluating mathematical expression.";
    }
  }

  window.aiMath = {
    isMathExpression,
    solveMath
  };
})();

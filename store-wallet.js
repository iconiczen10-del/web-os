/* === FILE: store-wallet.js === */
/**
 * WebOS v0.6 Mbank Virtual Wallet Engine
 */
(function () {
  const BALANCE_KEY = "webos-mbank-balance";
  const TX_KEY = "webos-mbank-transactions";
  const DEFAULT_BALANCE = 50.00;

  function getBalance() {
    const val = localStorage.getItem(BALANCE_KEY);
    if (val === null) {
      setBalance(DEFAULT_BALANCE);
      return DEFAULT_BALANCE;
    }
    const num = parseFloat(val);
    return isNaN(num) ? DEFAULT_BALANCE : num;
  }

  function setBalance(amount) {
    const rounded = Math.max(0, Math.round(amount * 100) / 100);
    localStorage.setItem(BALANCE_KEY, rounded.toFixed(2));
    return rounded;
  }

  function canAfford(amount) {
    return getBalance() >= amount;
  }

  function getTransactions() {
    const saved = localStorage.getItem(TX_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }

  function addTransaction(type, amount, description) {
    const txs = getTransactions();
    const newTx = {
      id: "MB-" + Date.now().toString(36).toUpperCase(),
      type,
      amount: Math.round(amount * 100) / 100,
      description,
      date: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    txs.unshift(newTx);
    if (txs.length > 50) txs.pop();
    localStorage.setItem(TX_KEY, JSON.stringify(txs));
    return newTx;
  }

  function deductFunds(amount, description) {
    if (!canAfford(amount)) return false;
    const current = getBalance();
    setBalance(current - amount);
    addTransaction("purchase", amount, description);
    return true;
  }

  function depositFunds(amount) {
    const current = getBalance();
    const newBal = setBalance(current + amount);
    addTransaction("deposit", amount, "Added Funds via Top-up");
    return newBal;
  }

  window.storeWallet = {
    getBalance,
    setBalance,
    canAfford,
    deductFunds,
    depositFunds,
    getTransactions,
    addTransaction
  };
})();

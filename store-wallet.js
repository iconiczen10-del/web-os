/* === FILE: store-wallet.js === */
/**
 * WebOS v0.7 Mbank Virtual Wallet Engine
 * Fully in-memory state. Resets on boot ($50.00 default).
 */
(function () {
  const DEFAULT_BALANCE = 50.00;
  let balance = DEFAULT_BALANCE;
  let transactions = [];

  function getBalance() {
    return balance;
  }

  function setBalance(amount) {
    balance = Math.max(0, Math.round(amount * 100) / 100);
    return balance;
  }

  function canAfford(amount) {
    return getBalance() >= amount;
  }

  function getTransactions() {
    return transactions;
  }

  function addTransaction(type, amount, description) {
    const newTx = {
      id: "MB-" + Date.now().toString(36).toUpperCase(),
      type,
      amount: Math.round(amount * 100) / 100,
      description,
      date: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    transactions.unshift(newTx);
    if (transactions.length > 50) transactions.pop();
    return newTx;
  }

  function deductFunds(amount, description) {
    if (!canAfford(amount)) return false;
    const current = getBalance();
    setBalance(current - amount);
    addTransaction("purchase", amount, description);
    return true;
  }

  function depositFunds(amount, description = "Added Funds via Top-up") {
    const current = getBalance();
    const newBal = setBalance(current + amount);
    addTransaction("deposit", amount, description);
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

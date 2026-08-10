/* === FILE: aichat-login.js === */
/**
 * AI Chat Dummy In-Memory Authentication System
 */
(function () {
  let currentUser = null;
  const usersDatabase = [];

  function validateEmail(email) {
    return email && email.includes("@") && email.includes(".");
  }

  function validatePassword(password) {
    return password && password.length >= 4;
  }

  function signUp(name, email, password) {
    if (!name || name.trim().length === 0) {
      return { success: false, error: "Please enter your name." };
    }
    if (!validateEmail(email)) {
      return { success: false, error: "Invalid email format (must contain @ and .)." };
    }
    if (!validatePassword(password)) {
      return { success: false, error: "Password must be at least 4 characters long." };
    }

    const existing = usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password
    };

    usersDatabase.push(newUser);
    currentUser = newUser;

    return { success: true, user: currentUser };
  }

  function signIn(email, password) {
    if (!email || !password) {
      return { success: false, error: "Please provide both email and password." };
    }

    const user = usersDatabase.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, error: "Incorrect email or password." };
    }

    currentUser = user;
    return { success: true, user: currentUser };
  }

  function signOut() {
    currentUser = null;
    if (window.aiSubscription) {
      window.aiSubscription.setTier("free");
    }
  }

  function isLoggedIn() {
    return currentUser !== null;
  }

  function getCurrentUser() {
    return currentUser;
  }

  window.aiLogin = {
    signUp,
    signIn,
    signOut,
    isLoggedIn,
    getCurrentUser
  };
})();

/* === FILE: wallpapers-login.js === */
/**
 * WebOS v0.7 Wallpapers PCS Dummy Auth System
 * Fully in-memory state. Always starts logged out on boot.
 */
(function () {
  let currentUser = null;

  function getCurrentUser() {
    return currentUser;
  }

  function validateEmail(email) {
    if (!email || typeof email !== "string") return false;
    const trimmed = email.trim();
    return trimmed.includes("@") && trimmed.includes(".") && trimmed.length >= 5;
  }

  function validatePassword(password) {
    return typeof password === "string" && password.trim().length >= 4;
  }

  function signUp(name, email, password) {
    if (!name || !name.trim()) {
      return { success: false, message: "Please enter your full name." };
    }
    if (!validateEmail(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }
    if (!validatePassword(password)) {
      return { success: false, message: "Password must be at least 4 characters long." };
    }

    currentUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      createdAt: Date.now(),
      loggedIn: true
    };

    return { success: true, user: currentUser };
  }

  function signIn(email, password) {
    if (!validateEmail(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }
    if (!validatePassword(password)) {
      return { success: false, message: "Password must be at least 4 characters." };
    }

    currentUser = {
      name: email.split("@")[0] || "User",
      email: email.trim().toLowerCase(),
      password: password,
      createdAt: Date.now(),
      loggedIn: true
    };
    return { success: true, user: currentUser };
  }

  function signOut() {
    currentUser = null;
  }

  function isLoggedIn() {
    return getCurrentUser() !== null;
  }

  window.wallpapersLogin = {
    getCurrentUser,
    validateEmail,
    validatePassword,
    signUp,
    signIn,
    signOut,
    isLoggedIn
  };
})();

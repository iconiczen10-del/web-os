/* === FILE: webosdb.js === */
/**
 * WebOS v0.10.0 webosdb IndexedDB Storage Layer
 * Database: "webosdb", Version: 1, Object Store: "state"
 */
(function () {
  const DB_NAME = "webosdb";
  const DB_VERSION = 1;
  const STORE_NAME = "state";
  let dbInstance = null;

  function openDB() {
    return new Promise((resolve, reject) => {
      if (dbInstance) {
        return resolve(dbInstance);
      }
      if (!window.indexedDB) {
        console.warn("IndexedDB not supported, falling back to in-memory/localStorage");
        return resolve(null);
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = (event) => {
        dbInstance = event.target.result;
        resolve(dbInstance);
      };

      request.onerror = (event) => {
        console.error("IndexedDB open error:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  function setState(key, value) {
    return openDB().then((db) => {
      if (!db) {
        try { localStorage.setItem("webosdb_" + key, JSON.stringify(value)); } catch(e) {}
        return true;
      }
      return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_NAME], "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(value, key);
        req.onsuccess = () => resolve(true);
        req.onerror = (e) => reject(e.target.error);
      });
    });
  }

  function getState(key) {
    return openDB().then((db) => {
      if (!db) {
        try {
          const raw = localStorage.getItem("webosdb_" + key);
          return raw ? JSON.parse(raw) : null;
        } catch(e) { return null; }
      }
      return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_NAME], "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
        req.onerror = (e) => reject(e.target.error);
      });
    });
  }

  function deleteState(key) {
    return openDB().then((db) => {
      if (!db) {
        try { localStorage.removeItem("webosdb_" + key); } catch(e) {}
        return true;
      }
      return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_NAME], "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = (e) => reject(e.target.error);
      });
    });
  }

  function clearAllState() {
    return openDB().then((db) => {
      if (!db) {
        try {
          Object.keys(localStorage).filter(k => k.startsWith("webosdb_")).forEach(k => localStorage.removeItem(k));
        } catch(e) {}
        return true;
      }
      return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_NAME], "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.clear();
        req.onsuccess = () => resolve(true);
        req.onerror = (e) => reject(e.target.error);
      });
    });
  }

  window.webosDB = {
    openDB,
    setState,
    getState,
    deleteState,
    clearAllState
  };
})();

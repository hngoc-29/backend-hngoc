const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDuAugpIY7IuTnpJBgLJqNuH-O_I3sLqqY",
  authDomain: "hngoc-webdite.firebaseapp.com/",
  projectId: "hngoc-webdite",
  storageBucket: "hngoc-webdite.appspot.com",
  messagingSenderId: "449492241681",
  appId: "1:449492241681:web:b7f38b8089358e75ce90b0",
  measurementId: "G-BSYVHRPN3G"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };

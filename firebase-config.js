// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZwfK0EeiXeROOiKZfeycutcgT4ZLOJGM",
  authDomain: "barbershop-malcoms4pf.firebaseapp.com",
  databaseURL: "https://barbershop-malcoms4pf-default-rtdb.firebaseio.com",
  projectId: "barbershop-malcoms4pf",
  storageBucket: "barbershop-malcoms4pf.firebasestorage.app",
  messagingSenderId: "752032528448",
  appId: "1:752032528448:web:253e472f04c8d9436387a5",
  measurementId: "G-TZ5NQ26C4M"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

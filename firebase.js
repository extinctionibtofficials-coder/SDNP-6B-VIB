// Configurations for Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5A7CVNtSDFvFTtsx8P06ma1-pj61Ar2Q",
  authDomain: "classweb-26.firebaseapp.com",
  databaseURL: "https://classweb-26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "classweb-26",
  storageBucket: "classweb-26.firebasestorage.app",
  messagingSenderId: "701735462891",
  appId: "1:701735462891:web:bdf19556a2acea2a179bae",
  measurementId: "G-TBQGGX89WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

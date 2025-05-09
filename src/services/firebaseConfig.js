// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication


// Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyD7CwvAFS4_Mw2PftFCEu2GSe7qPS2fmYI",
    authDomain: "canteensandcc.firebaseapp.com",
    projectId: "canteensandcc",
    storageBucket: "canteensandcc.firebasestorage.app",
    messagingSenderId: "228578072562",
    appId: "1:228578072562:web:2ce33c5db9271b853a3d6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Authentication


export { db,auth };
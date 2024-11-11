// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-obWr4ydMXvxGiLomVyVenoWHrBEPwtE",
    authDomain: "culturebuddy-508ce.firebaseapp.com",
    projectId: "culturebuddy-508ce",
    storageBucket: "culturebuddy-508ce.firebasestorage.app",
    messagingSenderId: "681317594916",
    appId: "1:681317594916:web:0d89bd3f06a0a6d28365b1",
    measurementId: "G-RQEX60WPG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

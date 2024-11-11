// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service:
export const firestore = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service:
export const storage = getStorage(app);

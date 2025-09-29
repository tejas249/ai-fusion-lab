// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore }from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-fusion-lab-25ffd.firebaseapp.com",
  projectId: "ai-fusion-lab-25ffd",
  storageBucket: "ai-fusion-lab-25ffd.firebasestorage.app",
  messagingSenderId: "293413335079",
  appId: "1:293413335079:web:1eb3e991197d6acf19de02",
  measurementId: "G-9W3CSCBPSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


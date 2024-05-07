// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "xuthi-6f838.firebaseapp.com",
  projectId: "xuthi-6f838",
  storageBucket: "xuthi-6f838.appspot.com",
  messagingSenderId: "20077621458",
  appId: "1:20077621458:web:4cb380ee66f6284fe17d0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
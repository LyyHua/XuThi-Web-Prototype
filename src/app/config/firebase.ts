// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "xuthi-6f838.firebaseapp.com",
  projectId: "xuthi-6f838",
  storageBucket: "xuthi-6f838.appspot.com",
  messagingSenderId: "20077621458",
  appId: "1:20077621458:web:4cb380ee66f6284fe17d0b"
};

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LePD9UpAAAAACA8cZVvM9hMSA0ueFUEjwmjk_mo')
})

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const createPaymentLink = httpsCallable(functions, 'createPaymentLink');
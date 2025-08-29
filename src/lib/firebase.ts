// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "khanhnn-insights",
  "appId": "1:163641152572:web:e5d343947e69ac6c03df39",
  "storageBucket": "khanhnn-insights.firebasestorage.app",
  "apiKey": "AIzaSyA_nMxp05bE_E_pIkmlY4JT9TCO5piJ7Ho",
  "authDomain": "khanhnn-insights.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "163641152572"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

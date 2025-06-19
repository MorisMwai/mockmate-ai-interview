// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeLOfmwgkCtPKh1iRV1XkchLm_1P5y-e8",
  authDomain: "mockmate-6cc53.firebaseapp.com",
  projectId: "mockmate-6cc53",
  storageBucket: "mockmate-6cc53.firebasestorage.app",
  messagingSenderId: "1085097540044",
  appId: "1:1085097540044:web:3ab8540f464caa10f24569",
  measurementId: "G-GJK57H7037"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
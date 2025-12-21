import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmrV7emSxJKaZHd0rX4MVuZoenbhP3FvQ",
  authDomain: "terbangmelampauinya.firebaseapp.com",
  projectId: "terbangmelampauinya",
  storageBucket: "terbangmelampauinya.firebasestorage.app",
  messagingSenderId: "479992795170",
  appId: "1:479992795170:web:e7c1e6661b35dca5bb7a7b",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);

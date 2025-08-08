// Firebase config and initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuqjckcoKvc30XqGzvKdIUm1PL0iYlKUI",
  authDomain: "stratotaskauth.firebaseapp.com",
  projectId: "stratotaskauth",
  storageBucket: "stratotaskauth.firebasestorage.app",
  messagingSenderId: "175083032176",
  appId: "1:175083032176:web:94c8023f0f04971a60eeb5",
  measurementId: "G-RQCVB5XNDK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

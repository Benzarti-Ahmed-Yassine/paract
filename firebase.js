// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjg2hBH_cWrI3j7Sk2GfIts3IW8eMZVTE",
  authDomain: "paract.firebaseapp.com",
  projectId: "paract",
  storageBucket: "paract.firebasestorage.app",
  messagingSenderId: "965990330632",
  appId: "1:965990330632:web:436651d740564579483cbd",
  measurementId: "G-61KV5Z30SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
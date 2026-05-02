// Firebase Configuration
// Reusing existing Firebase project: lexi-5f30c

const firebaseConfig = {
  apiKey: "AIzaSyDG7F_3OPPd1Yat0E3T2yuU1m9b49hAfJM",
  authDomain: "lexi-5f30c.firebaseapp.com",
  projectId: "lexi-5f30c",
  storageBucket: "lexi-5f30c.firebasestorage.app",
  messagingSenderId: "528229011220",
  appId: "1:528229011220:web:2106c158e389480c87fc01"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Make available globally for visitor access
window.db = db;
window.firebase = firebase;

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Admin email
const ADMIN_EMAIL = 'muhamad.shkeir@gmail.com';

console.log('Firebase initialized successfully');

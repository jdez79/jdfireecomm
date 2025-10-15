// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'Firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiwi65UE1WswKiDgDbxVPXB45w0evPYFw",
  authDomain: "jdfireecomm.firebaseapp.com",
  projectId: "jdfireecomm",
  storageBucket: "jdfireecomm.firebasestorage.app",
  messagingSenderId: "1003710322923",
  appId: "1:1003710322923:web:2100cc1751cf957a5f46ae",
  measurementId: "G-1GFV6RFWB8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
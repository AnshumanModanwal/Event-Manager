// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfbdcsNKgjIej8A8q3kqPRH_bjpmA3VxU",
  authDomain: "event-manager-authenticate.firebaseapp.com",
  projectId: "event-manager-authenticate",
  storageBucket: "event-manager-authenticate.appspot.com",
  messagingSenderId: "551501539704",
  appId: "1:551501539704:web:d024c84e118fd022c1808d",
  measurementId: "G-1M9VL6N3T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth  = getAuth(app)
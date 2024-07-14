// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "mern-auth-449f7.firebaseapp.com",
  projectId: "mern-auth-449f7",
  storageBucket: "mern-auth-449f7.appspot.com",
  messagingSenderId: "785505971475",
  appId: "1:785505971475:web:8aed7e98f66aa3f056bee6",
  measurementId: "G-89S1RDLDGR",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

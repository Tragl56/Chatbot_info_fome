// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6iO1bHS2Cm7bSMR9RHrouNzkc85FDE_I",
  authDomain: "mobile-f795c.firebaseapp.com",
  projectId: "mobile-f795c",
  storageBucket: "mobile-f795c.appspot.com",
  messagingSenderId: "555942470965",
  appId: "1:555942470965:web:9c8de3d71322e3490d187c",
  measurementId: "G-GCJ4XDENV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
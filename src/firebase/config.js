import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBobnPb-5U9zkzq4g0kCOLPs5CQTfxTeXI",
  authDomain: "the-movies-48bb9.firebaseapp.com",
  projectId: "the-movies-48bb9",
  storageBucket: "the-movies-48bb9.appspot.com",
  messagingSenderId: "358447554989",
  appId: "1:358447554989:web:bcde90870e5c72c0094124",
  measurementId: "G-QWW1BWJ27L",
};
// initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// // const analytics = getAnalytics(app);
export const db = firebase.firestore();

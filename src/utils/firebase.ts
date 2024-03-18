// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLU7TgJO_LOU4UysXCjSfA0KkgGxyI8VA",
  authDomain: "blog-advance1.firebaseapp.com",
  projectId: "blog-advance1",
  storageBucket: "blog-advance1.appspot.com",
  messagingSenderId: "685341199244",
  appId: "1:685341199244:web:fcb54959d2d585113d24a9",
  measurementId: "G-WXV0KQ462R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseStorage = getStorage(app);

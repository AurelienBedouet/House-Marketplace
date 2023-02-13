// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiur6QwGTmrlrfXVmoraWGppMveVt0s8Y",
  authDomain: "house-marketplace-app-1e329.firebaseapp.com",
  projectId: "house-marketplace-app-1e329",
  storageBucket: "house-marketplace-app-1e329.appspot.com",
  messagingSenderId: "804200272666",
  appId: "1:804200272666:web:44021912fd1864f72012a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

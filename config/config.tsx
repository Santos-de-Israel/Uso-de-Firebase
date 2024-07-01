// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcmAjme9t0KkTpqthDO6x3lr2GewBzDmA",
  authDomain: "prueba-18af0.firebaseapp.com",
  databaseURL: "https://prueba-18af0-default-rtdb.firebaseio.com",
  projectId: "prueba-18af0",
  storageBucket: "prueba-18af0.appspot.com",
  messagingSenderId: "197594526083",
  appId: "1:197594526083:web:4a6393e9310a379f6806b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
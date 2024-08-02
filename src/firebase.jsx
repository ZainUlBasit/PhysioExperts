// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDkvwL4NVGcXu2aFnrBY_zCLXvhysJgbY",
  authDomain: "physioexpert-5b505.firebaseapp.com",
  projectId: "physioexpert-5b505",
  storageBucket: "physioexpert-5b505.appspot.com",
  messagingSenderId: "378933418988",
  appId: "1:378933418988:web:cb3c58edbab57d26d83ec9",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

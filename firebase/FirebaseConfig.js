import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArZIq6fOZbaWqLWUom11PmjokdrL-IC6w",
  authDomain: "equip9-524ca.firebaseapp.com",
  projectId: "equip9-524ca",
  storageBucket: "equip9-524ca.appspot.com",
  messagingSenderId: "250584030685",
  appId: "1:250584030685:web:9533472e97f3982989ea34",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDNiCinHyQRklBtI9LvbUqMuwUzTG_bGGs",
  authDomain: "plant-app-d11b6.firebaseapp.com",
  databaseURL: "https://plant-app-d11b6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plant-app-d11b6",
  storageBucket: "plant-app-d11b6.appspot.com",
  messagingSenderId: "186759607554",
  appId: "1:186759607554:web:424685356cb4f3732afe1b",
  measurementId: "G-X3SKPRV6QH",
  storageBucket: "plant-app-d11b6.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const local_store = getReactNativePersistence(ReactNativeAsyncStorage);
const auth = initializeAuth(app, {
  persistence: local_store
});


const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage, auth };
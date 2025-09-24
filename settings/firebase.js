// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9tEe_e_e1ZuD060Gi2J1frbbUjeknQxk",
  authDomain: "copreneur-bb161.firebaseapp.com",
  projectId: "copreneur-bb161",
  storageBucket: "copreneur-bb161.firebasestorage.app",
  messagingSenderId: "934548988621",
  appId: "1:934548988621:web:ee1a7b02cb66c97eb1ff84"
};

// Initialize Firebase
const app =getApps.length == 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
export { auth, db };


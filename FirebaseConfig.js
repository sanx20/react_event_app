import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1VBJb6FBo8_HlrtX1VOvTCWws34xonlQ",
    authDomain: "react-event-app-c7cf8.firebaseapp.com",
    projectId: "react-event-app-c7cf8",
    storageBucket: "react-event-app-c7cf8.firebasestorage.app",
    messagingSenderId: "510523978785",
    appId: "1:510523978785:web:8a91cecce92acdbcb6df60"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
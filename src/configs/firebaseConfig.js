// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { config } from "@/envs";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = config?.FIREBASE;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();

export const google = new GoogleAuthProvider();

export const facebook = new FacebookAuthProvider();
facebook.addScope("email");
facebook.addScope("user_friends");

export const storage = getStorage(initializeApp(firebaseConfig));

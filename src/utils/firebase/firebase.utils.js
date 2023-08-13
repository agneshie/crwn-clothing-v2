import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAle7mAoNe3V_hwN4qhF8TEdKY0_G9Q3Ys",
  authDomain: "crwn-clothing-db-5d97e.firebaseapp.com",
  projectId: "crwn-clothing-db-5d97e",
  storageBucket: "crwn-clothing-db-5d97e.appspot.com",
  messagingSenderId: "1015233244559",
  appId: "1:1015233244559:web:7c159c6e23c2582127affa"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log("Error creating the user, ", error.message);
    }
  }
  return userDocRef;
}


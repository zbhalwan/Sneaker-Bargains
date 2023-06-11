// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User} from "firebase/auth";
import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "./firebase.config";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export let userSignedIn = false;


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const name = user.displayName;
    const email = user.email;
    const photoUrl = user.photoURL;

    localStorage.setItem('name', name || '');
    localStorage.setItem('email', email || '');
    localStorage.setItem('photoUrl', photoUrl || '');
    
    userSignedIn = true;

  } else {
    // User is signed out
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('photoUrl');
    userSignedIn = false;
    
  }
});



export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then( async (result) => {
        console.log("result");
        
        
        const name = result.user?.displayName;
        const email = result.user?.email;
        const photoUrl = result.user?.photoURL;
        const uid = result.user?.uid; // Get the user's unique ID

        localStorage.setItem('name', name || '');
        localStorage.setItem('email', email || '');
        localStorage.setItem('photoUrl', photoUrl || '');

        // adding user to database
        await setDoc(doc(db, "users", uid), {
          name: name,
          email: email,
          uid: uid
        });
       
        console.log(name, email, photoUrl);
        console.log(result);

        location.reload();

        console.log(result);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  export const signOutWithGoogle = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);

      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('photoUrl');

      console.log(localStorage.getItem('name'));
      location.reload();

      })
      .catch((error) => {
        console.log(error);
      });
  };;




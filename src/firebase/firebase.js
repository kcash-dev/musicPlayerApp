import { initializeApp } from 'firebase/app'
import "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithCredential, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConfig } from '../config/config'

const app = initializeApp(firebaseConfig)

const auth = getAuth()

export { auth, onAuthStateChanged, signInWithCredential, createUserWithEmailAndPassword, signOut };
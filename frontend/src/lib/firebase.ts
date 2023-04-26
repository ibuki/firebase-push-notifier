
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../config';
import { useAuthState as useAuthStateBase } from 'react-firebase-hooks/auth';

const app = initializeApp(firebaseConfig);
// FIXME: It becomes blank screen when wrong firebase config.
const auth = getAuth(app)
export const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
export const signOut = () => firebaseSignOut(auth)
export const currentUser = () => auth.currentUser
export const useAuthState = () => useAuthStateBase(auth)

export const db = getFirestore(app);

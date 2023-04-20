import * as admin from "firebase-admin";

export const initializeApp = () => admin.apps.length || admin.initializeApp();

export const decodeToken = (idToken: string) => admin.auth().verifyIdToken(idToken).catch((error) => console.error(error));

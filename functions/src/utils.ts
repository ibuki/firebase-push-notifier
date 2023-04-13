import * as admin from "firebase-admin";
/**
 * sendMulticast
 * @param {string[]} tokens
 */
export async function sendMulticast(tokens: string[]) {
  admin.apps.length || admin.initializeApp();
  const message = {
    notification: {title: "sendMessageSample", body: new Date().toISOString()},
    tokens,
  };
  const response = await admin.messaging().sendMulticast(message);
  console.log(response);
}

import * as admin from "firebase-admin";
/**
 * sendMulticast
 * @param {string[]} tokens
 * @param {string} body
 */
export async function sendMulticast(tokens: string[], body = "") {
  admin.apps.length || admin.initializeApp();
  const message = {
    notification: {title: "sendMessageSample", body: body || new Date().toISOString()},
    tokens,
  };
  const response = await admin.messaging().sendMulticast(message);
  console.log(response);
}

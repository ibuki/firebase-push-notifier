import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {sendMulticast} from "./utils";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const sendMessages = functions.https.onRequest((request, response) => {
  console.log("body:", request.body);
  console.log("query:", request.query);
  if (typeof request.query.deviceToken === "string") {
    sendMulticast([request.query.deviceToken]);
    response.send("Message sent");
  } else {
    response.send("Please add query ?deviceToken=xxx");
  }
});

export const storeData = functions.https.onRequest(
  async (request, response) => {
    admin.apps.length || admin.initializeApp();
    console.log(admin.firestore().collection("restaurants"));
    const doc = await admin.firestore().collection("restaurants").
      add({body: request.body, createdAt: new Date(), query: request.query});
    doc.collection("ratings").add({rate: 123});
    response.send(await admin.firestore().collection("restaurants")
      .orderBy("createdAt", "desc").get()
      .then((snapshot) => snapshot.docs[0].data()));
  });

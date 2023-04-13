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

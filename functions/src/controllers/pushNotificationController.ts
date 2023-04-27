import * as admin from "firebase-admin";
import {RequestHandler} from "express";
import {sendMulticast} from "../utils";

export const publishPushNotification: RequestHandler = async (req, res) => {
  const pushNotificationId = req.params.pushNotificationId;
  const doc = await admin.firestore().collection("pushNotifications").doc(pushNotificationId).get();
  const pushNotification = doc.data();
  const snapshot = await admin.firestore().collection("deviceTokenGroups").doc(pushNotification?.deviceTokenGroupId).collection("deviceTokens").limit(1000).get();
  const deviceTokens = snapshot.docs.map((doc) => doc.data());
  const targets = deviceTokens.map((deviceToken) => deviceToken.token);
  await sendMulticast(targets, pushNotification?.content);
  return res.json({message: req.params.pushNotificationId});
};

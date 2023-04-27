import * as admin from "firebase-admin";
import {RequestHandler} from "express";
import {sendMulticast} from "../utils";

export const publishPushNotification: RequestHandler = async (req, res) => {
  const pushNotificationId = req.params.pushNotificationId;
  const doc = await admin.firestore().collection("pushNotifications").doc(pushNotificationId).get();
  const deviceTokenGroupId = doc.data()?.deviceTokenGroupId;
  const snapshot = await admin.firestore().collection("deviceTokenGroups").doc(deviceTokenGroupId).collection("deviceTokens").limit(1000).get();
  const deviceTokens = snapshot.docs.map((doc) => doc.data());
  const targets = deviceTokens.map((deviceToken) => deviceToken.token);
  await sendMulticast(targets);
  return res.json({message: req.params.pushNotificationId});
};

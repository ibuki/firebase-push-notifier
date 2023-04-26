import * as admin from "firebase-admin";
import {RequestHandler} from "express";

export const indexDeviceTokenGroups: RequestHandler = async (req, res) => {
  const limit = req.query.limit != null ? +req.query.limit : 1000;
  const snapshot = await admin.firestore().collection("restaurants")
    .orderBy("createdAt", "desc").limit(limit).get();
  const records = snapshot.docs.map((doc) => doc.data());
  return res.json({records});
};

export const publishDeviceTokenGroup: RequestHandler = async (req, res) => {
  return res.json({message: req.params.deviceTokenGroupId});
};

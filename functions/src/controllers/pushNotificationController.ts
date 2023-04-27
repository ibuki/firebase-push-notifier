import {RequestHandler} from "express";

export const publishPushNotification: RequestHandler = async (req, res) => {
  return res.json({message: req.params.pushNotificationId});
};

import {Router} from "express";
import {indexDeviceTokenGroups} from "../controllers/deviceTokenGroupController";
import {publishPushNotification} from "../controllers/pushNotificationController";

const router = Router();

// DeviceTokenGroup
router.get("/api/device_tokens", indexDeviceTokenGroups);
router.post("/api/push_notifications/:pushNotificationId/publish", publishPushNotification);

// 404 Error
router.all("/*", (_req, res) => res.status(404).json({message: "404 Not found"}));

export default router;

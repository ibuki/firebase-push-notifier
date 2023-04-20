import {Router} from "express";
import {indexDeviceTokenGroups} from "../controllers/deviceTokenGroupController";

const router = Router();

// DeviceTokenGroup
router.get("/device_tokens", indexDeviceTokenGroups);

// 404 Error
router.all("/*", (_req, res) => res.status(404).json({message: "404 Not found"}));

export default router;

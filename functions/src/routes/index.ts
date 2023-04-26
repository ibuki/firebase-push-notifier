import {Router} from "express";
import {indexDeviceTokenGroups, publishDeviceTokenGroup} from "../controllers/deviceTokenGroupController";

const router = Router();

// DeviceTokenGroup
router.get("/device_tokens", indexDeviceTokenGroups);
router.post("/device_token_groups/:deviceTokenGroupId/publish", publishDeviceTokenGroup);

// 404 Error
router.all("/*", (_req, res) => res.status(404).json({message: "404 Not found"}));

export default router;

import {Router} from "express";

const router = Router();
router.all("/*", (req, res) => res.send("It works!\n" + req.path));

export default router;

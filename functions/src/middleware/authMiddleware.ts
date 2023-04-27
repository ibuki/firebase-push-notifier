import {RequestHandler} from "express";
import {decodeToken, initializeApp} from "../utils/firebaseUtils";

export const firebaseAuthMiddleware: RequestHandler = async (req, res, next) => {
  initializeApp();
  if (req.headers.authorization) {
    const idToken = req.headers.authorization.split(" ")[1] || "";
    const decodedToken = await decodeToken(idToken);
    if (!decodedToken) return res.status(401).json({msg: "unauthorized"});
    console.log("Auth success!", decodeToken);
  }
  return next();
};

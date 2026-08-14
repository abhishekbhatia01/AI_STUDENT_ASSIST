import * as newAccessToken from "../controller/refreshAccessToken.controller.js";
import express from "express";
const router = express.Router();


router.post("/refresh-token", newAccessToken.getNewAccessToken);

export default router;
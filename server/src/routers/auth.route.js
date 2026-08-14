import * as authController from "../controller/user.controller.js";
import express from "express";
const router = express.Router();

router.post("/signup", authController.register);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);
router.post("/login", authController.login);

export default router;

import * as authController from "../controller/user.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  resendOTPSchema,
  verifyOTPSchema,
} from "../validators/auth.validator.js";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(registerSchema),
  authController.register,
);
router.post(
  "/verify-otp",
  validateRequest(verifyOTPSchema),
  authController.verifyOTP,
);
router.post(
  "/resend-otp",
  validateRequest(resendOTPSchema),
  authController.resendOTP,
);
router.post("/login", validateRequest(loginSchema), authController.login);
router.get("/getMe", authMiddleware, authController.getMe);

export default router;

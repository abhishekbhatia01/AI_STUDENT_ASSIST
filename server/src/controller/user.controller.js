import asyncHandler from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  await authService.verifyOTP(email, otp);

  res.status(200).json({
    message: "OTP verified successfully",
  });
});

export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.resendOTP(email);

  res.status(200).json({
    message: "OTP resent successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);

  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  })
  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
});
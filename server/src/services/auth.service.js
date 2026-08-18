import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";

import * as userRepository from "../repositories/user.repository.js";
import * as otpRepository from "../repositories/otp.repository.js";

import { generateOTP, getOtpHtml } from "../utils/email.utils.js";
import { sendEmail } from "./email.service.js";
import AppErrors from "../utils/AppErrors.utils.js";
import {
  generateAcessToken,
  generateRefreshToken,
} from "../utils/jwt.utils.js";

export const registerUser = async ({
  fullname,
  email,
  password,
}) => {
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new AppErrors("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await sequelize.transaction(async (t) => {
    const newUser = await userRepository.createUser(
      {
        fullname,
        email,
        password: hashedPassword,
      },
      t,
    );

    const otp = generateOTP();

    await otpRepository.createOTP(
      {
        otp,
        userId: newUser.id,
        email: newUser.email,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      t,
    );

    return { newUser, otp };
  });

  await sendEmail(
    email,
    "AI Student Assistant - Email Verification Code",
    `Your OTP is ${result.otp}`,
    getOtpHtml(result.otp),
  );

  const { password: _, ...userWithoutPassword } = result.newUser.toJSON();

  return userWithoutPassword;
};

export const verifyOTP = async (email, otp) => {
  const existingOTP = await otpRepository.findOTPByEmail(email);
  if (!existingOTP) {
    throw new AppErrors("OTP not found", 404);
  }

  if (existingOTP.isUsed) {
    throw new AppErrors("OTP has already been used", 400);
  }

  if (existingOTP.expiresAt < new Date()) {
    throw new AppErrors("OTP has expired", 400);
  }

  if (existingOTP.otp !== otp) {
    throw new AppErrors("Invalid OTP", 400);
  }
  await existingOTP.update({ isUsed: true });
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  await user.update({ isVerified: true });

  return user;
};

export const resendOTP = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  if (user.isVerified) {
    throw new AppErrors("User is already verified", 400);
  }

  await otpRepository.deleteOTPByEmail(email);
  const otp = generateOTP();

  await otpRepository.createOTP({
    otp,
    userId: user.id,
    email: user.email,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail(
    email,
    "AI Student Assistant - Email Verification Code",
    `Your OTP is ${otp}`,
    getOtpHtml(otp),
  );
};

export const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  if (!user.isVerified) {
    throw new AppErrors("User is not verified", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppErrors("Invalid credentials", 400);
  }

  const accessToken = generateAcessToken(user);
  const refreshToken = generateRefreshToken(user);

  const { password: _, ...userWithoutPassword } = user.toJSON();

  return {
    user: userWithoutPassword,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const getMe = async (id) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  const { password: _, ...userWithoutPass } = user.toJSON();

  return userWithoutPass;
};

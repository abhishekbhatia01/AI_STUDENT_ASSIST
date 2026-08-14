import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";

import * as userRepository from "../repositories/user.repository.js";
import * as otpRepository from "../repositories/otp.repository.js";

import { generateOTP, getOtpHtml } from "../utils/email.utils.js";
import { sendEmail } from "../services/email.service.js";
import AppErrors from "../utils/AppErrors.utils.js";

export const registerUser = async ({
  fullname,
  email,
  password,
  confirmPassword,
}) => {
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new AppErrors("User already exists", 400);
  }

  if (password !== confirmPassword) {
    throw new AppErrors("Passwords do not match", 400);
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

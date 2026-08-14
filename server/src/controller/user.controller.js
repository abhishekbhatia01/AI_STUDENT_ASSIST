import User from "../model/user.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../services/email.service.js";
import {
  welcomeEmailHtml,
  generateOTP,
  getOtpHtml,
} from "../utils/email.utils.js";
import { sequelize } from "../config/db.js";
import OTP from "../model/otp.js";

export const createUser = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { fullname, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      await t.rollback();
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      await t.rollback();
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      {
        fullname,
        email,
        password: hashedPassword,
      },
      { transaction: t },
    );

    const otp = generateOTP();
    await OTP.create(
      {
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        userId: newUser.id,
      },
      { transaction: t },
    );

    await t.commit();

    await sendEmail(
      email,
      "AI Student Assistant - Email Verification Code",
      `Your OTP is ${otp}`,
      getOtpHtml(otp),
    );
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return res
      .status(201)
      .json({ message: "User created successfully", userWithoutPassword });
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return res
      .status(200)
      .json({ message: "Login successful", userWithoutPassword });
  } catch (error) {
    return res
      .json(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/config.js";


export const generateAcessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}


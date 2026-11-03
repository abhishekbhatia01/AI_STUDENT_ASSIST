import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../config/config.js";
import { generateAcessToken } from "../utils/jwt.utils.js";
import AppErrors from "../utils/AppErrors.utils.js";

export const generateNewAccessToken = (refreshToken) => {
  let decode;
  try {
    decode = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch {
    throw new AppErrors("Invalid or expired refresh token", 401);
  }

  const newAccessToken = generateAcessToken({
    id: decode.id,
    email: decode.email,
    role: decode.role,
  });

  return newAccessToken;
};

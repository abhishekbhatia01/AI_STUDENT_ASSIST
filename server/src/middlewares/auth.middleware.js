import jwt from "jsonwebtoken";
import AppErrors from "../utils/AppErrors.utils.js";
import { JWT_ACCESS_SECRET } from "../config/config.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new AppErrors(
      "Authentication required. Please log in to continue",
      401,
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppErrors(
      "Authentication required. Please log in to continue",
      401,
    );
  }
};

export default authMiddleware;

import jwt from "jsonwebtoken";
import AppErrors from "../utils/AppErrors.utils.js";
import { JWT_ACCESS_SECRET } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
      throw new AppErrors("Authentication required. Please log in to continue", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppErrors("Authentication required. Please log in to continue", 401);
  }
};


export const authorizedRole = (...requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if(!requiredRole.includes(userRole)) {
            throw new AppErrors("You do not have permission to access this resource", 403);
        }
        next();
    }
}







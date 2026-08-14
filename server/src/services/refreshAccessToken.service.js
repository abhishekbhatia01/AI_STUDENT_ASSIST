import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../config/config.js";
import { generateAcessToken } from "../utils/jwt.utils.js";

export const generateNewAccessToken = (refreshToken) => {
    if (!refreshToken) {
        throw new Error("Refresh token not found");
    }

    const decode = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    
    const newAccessToken = generateAcessToken({
        id: decode.id,
        email: decode.email,
        role: decode.role,
    });


    return newAccessToken;
}
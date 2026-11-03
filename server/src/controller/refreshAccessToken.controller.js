import * as refreshAccessToken from "../services/refreshAccessToken.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppErrors from "../utils/AppErrors.utils.js";

export const getNewAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new AppErrors("Refresh token not found", 401);
  }

  const newAccessToken =
    await refreshAccessToken.generateNewAccessToken(refreshToken);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    message: "New access token generated successfully",
  });
});

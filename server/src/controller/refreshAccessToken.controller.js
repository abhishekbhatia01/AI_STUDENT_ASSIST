import * as refreshAccessToken from "../services/refreshAccessToken.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getNewAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const newAccessToken =
    await refreshAccessToken.generateNewAccessToken(refreshToken);

  res.status(200).json({
    message: "New access token generated successfully",
    accessToken: newAccessToken,
  });
});

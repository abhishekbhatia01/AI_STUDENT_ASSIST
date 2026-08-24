import { generateAiResponse } from "../services/ai.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateResponse = asyncHandler(async (req, res) => {
  const file = req.file;
  const prompt = req.body.prompt;

   

  const response = await generateAiResponse(
    file,
    prompt,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: response,
  });
});
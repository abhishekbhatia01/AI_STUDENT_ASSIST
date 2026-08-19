import { generateAiResponse } from "../services/ai.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateResponse = asyncHandler(async (req, res) => {
  const file = req.file;
  const prompt = req.body.prompt;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file provided",
    });
  }

  const response = await generateAiResponse(file, prompt);

  res.status(200).json({
    success: true,
    data: response,
  });
});
import { generateAiResponse, generateQuiz } from "../services/ai.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateResponse = asyncHandler(async (req, res) => {
  const file = req.file;
  const prompt = req.body.prompt;

  const response = await generateAiResponse(file, prompt, req.user.id);

  res.status(200).json({
    success: true,
    data: response,
  });
});

export const generateQuizResponse = asyncHandler(async (req, res) => {
  const { notes, difficulty } = req.body;

  if (
    typeof notes !== "string" ||
    !notes.trim() ||
    !["easy", "medium", "hard"].includes(difficulty)
  ) {
    return res
      .status(400)
      .json({ message: "Notes and a valid difficulty are required" });
  }

  const quiz = await generateQuiz(notes.trim(), difficulty);

  res.status(200).json({
    success: true,
    data: quiz,
  });
});

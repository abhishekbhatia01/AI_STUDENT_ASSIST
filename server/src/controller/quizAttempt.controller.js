import * as quizAttemptService from "../services/quizAttempt.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createQuizAttempt = asyncHandler(async (req, res) => {
  const { noteId, difficulty, score, totalQuestions, questions } = req.body;

  if (
    !Number.isInteger(Number(noteId)) ||
    !["easy", "medium", "hard"].includes(difficulty) ||
    !Number.isInteger(score) ||
    !Number.isInteger(totalQuestions) ||
    !Array.isArray(questions) ||
    questions.length !== totalQuestions
  ) {
    return res.status(400).json({ message: "Invalid quiz attempt data" });
  }

  const attempt = await quizAttemptService.saveAttempt(req.user.id, {
    noteId: Number(noteId),
    difficulty,
    score,
    totalQuestions,
    questions,
  });

  res.status(201).json({ success: true, data: attempt });
});

export const getQuizAttempts = asyncHandler(async (req, res) => {
  const attempts = await quizAttemptService.getAttempts(
    req.user.id,
    req.query.noteId ? Number(req.query.noteId) : undefined,
  );

  res.status(200).json({ success: true, data: attempts });
});

export const getQuizAttempt = asyncHandler(async (req, res) => {
  const attempt = await quizAttemptService.getAttemptById(
    req.user.id,
    Number(req.params.attemptId),
  );

  if (!attempt) {
    return res.status(404).json({ message: "Quiz attempt not found" });
  }

  res.status(200).json({ success: true, data: attempt });
});

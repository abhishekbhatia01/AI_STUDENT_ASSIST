import QuizAttempt from "../model/quizAttempt.js";

export const createAttempt = async (attempt) => QuizAttempt.create(attempt);

export const getAttemptsByUser = async (userId) =>
  QuizAttempt.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

export const getAttemptsByNote = async (userId, noteId) =>
  QuizAttempt.findAll({
    where: { userId, noteId },
    order: [["createdAt", "DESC"]],
  });

export const getAttemptById = async (userId, attemptId) =>
  QuizAttempt.findOne({
    where: { id: attemptId, userId },
  });

import * as quizAttemptRepository from "../repositories/quizAttempt.repository.js";
import * as notesRepository from "../repositories/notes.repository.js";

export const saveAttempt = async (userId, attemptData) => {
  const note = await notesRepository.getNoteById(userId, attemptData.noteId);

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }

  return quizAttemptRepository.createAttempt({
    userId,
    noteId: note.id,
    noteTitle: note.title,
    difficulty: attemptData.difficulty,
    score: attemptData.score,
    totalQuestions: attemptData.totalQuestions,
    questions: attemptData.questions,
  });
};

export const getAttempts = async (userId, noteId) =>
  noteId
    ? quizAttemptRepository.getAttemptsByNote(userId, noteId)
    : quizAttemptRepository.getAttemptsByUser(userId);

export const getAttemptById = async (userId, attemptId) =>
  quizAttemptRepository.getAttemptById(userId, attemptId);

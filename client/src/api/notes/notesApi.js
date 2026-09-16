import api from "../api";

export const generateNotes = async (file, prompt) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("prompt", prompt);

  const response = await api.post("/ai/generate", formData);

  return response.data;
};

export const generateQuiz = async (notes, difficulty, noteId) => {
  const response = await api.post("/ai/quiz", { notes, difficulty, noteId });
  return response.data;
};

export const getQuizAttempts = async (noteId) => {
  const response = await api.get(
    noteId ? `/quiz-attempts?noteId=${noteId}` : "/quiz-attempts",
  );
  return response.data;
};

export const getQuizAttempt = async (attemptId) => {
  const response = await api.get(`/quiz-attempts/${attemptId}`);
  return response.data;
};

export const saveQuizAttempt = async (attempt) => {
  const response = await api.post("/quiz-attempts", attempt);
  return response.data;
};

export const saveNotes = async (notesData) => {
  const response = await api.post("/notes/save", notesData);
  return response.data;
};

export const getSavedNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const getNoteById = async (noteId) => {
  const response = await api.get(`/notes/${noteId}`);
  return response.data;
};

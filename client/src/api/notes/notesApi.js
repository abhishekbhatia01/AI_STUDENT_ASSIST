import api from "../api";

export const generateNotes = async (file, prompt) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("prompt", prompt);

  const response = await api.post("/ai/generate", formData);

  return response.data;
};

export const createInterviewPreparation = async (preparation) => {
  const formData = new FormData();
  formData.append("companyName", preparation.companyName || "");
  formData.append("targetRole", preparation.targetRole || "");
  formData.append("jobDescription", preparation.jobDescription || "");
  formData.append("preparationType", preparation.preparationType);
  if (preparation.file) formData.append("file", preparation.file);

  const response = await api.post("/interview-preparation", formData);
  return response.data;
};

export const getInterviewPreparations = async () => {
  const response = await api.get("/interview-preparation");
  return response.data;
};

export const getInterviewPreparation = async (preparationId) => {
  const response = await api.get(`/interview-preparation/${preparationId}`);
  return response.data;
};

export const getInterviewQuestions = async (
  preparationId,
  page = 1,
  limit = 5,
  search = "",
  difficulty = "All",
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search.trim()) params.set("search", search.trim());
  if (difficulty !== "All") params.set("difficulty", difficulty);

  const response = await api.get(
    `/interview-preparation/${preparationId}/questions?${params.toString()}`,
  );
  return response.data;
};

export const generateMoreInterviewQuestions = async (preparationId) => {
  const response = await api.post(
    `/interview-preparation/${preparationId}/questions`,
  );
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

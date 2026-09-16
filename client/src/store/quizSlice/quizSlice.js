import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  attempts: [],
  activeQuiz: null,
  activeNote: null,
  loading: true,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizLoading: (state, action) => {
      state.loading = action.payload;
    },
    setQuizNotes: (state, action) => {
      state.notes = action.payload;
    },
    setQuizAttempts: (state, action) => {
      state.attempts = action.payload;
    },
    setActiveQuiz: (state, action) => {
      state.activeQuiz = action.payload;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
    addQuizAttempt: (state, action) => {
      state.attempts = [action.payload, ...state.attempts];
    },
    setQuizError: (state, action) => {
      state.error = action.payload;
    },
    clearQuizData: () => initialState,
  },
});

export const {
  setQuizLoading,
  setQuizNotes,
  setQuizAttempts,
  setActiveQuiz,
  setActiveNote,
  addQuizAttempt,
  setQuizError,
  clearQuizData,
} = quizSlice.actions;

export default quizSlice.reducer;

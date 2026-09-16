import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice.js";
import quizReducer from "./quizSlice/quizSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
  },
});

export default store;

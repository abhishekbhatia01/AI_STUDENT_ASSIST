import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createQuizAttempt,
  getQuizAttempt,
  getQuizAttempts,
} from "../controller/quizAttempt.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getQuizAttempts);
router.get("/:attemptId", authMiddleware, getQuizAttempt);
router.post("/", authMiddleware, createQuizAttempt);

export default router;

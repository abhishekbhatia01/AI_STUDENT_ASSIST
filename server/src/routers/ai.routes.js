import express from "express";
import { generateResponse, generateQuizResponse } from "../controller/ai.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  upload.single("file"),
  generateResponse,
);

router.post("/quiz", authMiddleware, generateQuizResponse);

export default router;

import express from "express";
import { generateResponse } from "../controller/ai.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  upload.single("file"),
  generateResponse,
);

export default router;

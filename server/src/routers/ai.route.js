import express from "express";
import { generateResponse } from "../controller/ai.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/generate", upload.single('file'), generateResponse);

export default router;
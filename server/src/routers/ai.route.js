import express from "express";
import { generateResponse } from "../controller/ai.controller.js";

const router = express.Router();

router.post("/generate", generateResponse);

export default router;
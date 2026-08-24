import * as notesController from "../controller/notes.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/save", authMiddleware, notesController.saveNotes);

export default router;
import * as notesController from "../controller/notes.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, notesController.getSavedNotes);
router.get("/:noteId", authMiddleware, notesController.getNoteById);

router.post(
  "/save",
  authMiddleware,
  upload.single("file"),
  notesController.saveNotes,
);

export default router;

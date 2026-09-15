import * as notesService from "../services/notes.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const saveNotes = asyncHandler(async (req, res) => {
  const notesData = JSON.parse(req.body.notesData);
  const userId = req.user.id;
  const file = req.file;

  const notes = await notesService.saveNotes(notesData, userId, file);

  res.status(200).json({
    success: true,
    message: "Notes saved successfully",
    data: notes,
  });
});

export const getSavedNotes = asyncHandler(async (req, res) => {
  const notes = await notesService.getNotesByUser(req.user.id);

  res.status(200).json({
    success: true,
    data: notes,
  });
});

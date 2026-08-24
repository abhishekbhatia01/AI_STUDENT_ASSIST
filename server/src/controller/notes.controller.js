import * as notesService from "../services/notes.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const saveNotes = asyncHandler(async (req, res) => {
  const notesData = req.body;
  const userId = req.user.id;

  const notes = await notesService.saveNotes(notesData, userId);

  res.status(200).json({
    success: true,
    message: "Notes saved successfully",
    data: notes,
  });
});

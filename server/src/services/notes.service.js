import * as notesRepository from "../repositories/notes.repository.js";
import { uploadImageToImageKit } from "../services/imagekit.service.js";

export const saveNotes = async (notesData, userId, file) => {
  let fileUrl = null;
  let fileId = null;

  if (file) {
    const uploadResult = await uploadImageToImageKit(file);

    fileUrl = uploadResult.url;
    fileId = uploadResult.fileId;
  }

  const note = await notesRepository.saveNotes(
    {
      ...notesData,
      fileUrl,
      fileId,
    },
    userId,
  );

  return note;
};

export const getNotesByUser = async (userId) => {
  return notesRepository.getNotesByUser(userId);
};

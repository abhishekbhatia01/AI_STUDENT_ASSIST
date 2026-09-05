import * as notesRepository from "../repositories/notes.repository.js";

export const saveNotes = async (notesData, userId) => {
  const note = await notesRepository.saveNotes(notesData, userId);
  return note;
};

export const getNotesByUser = async (userId) => {
  return notesRepository.getNotesByUser(userId);
};

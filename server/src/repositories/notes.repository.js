import Note from "../model/notes.model.js";

export const saveNotes = async (notesData, userId) => {
  return Note.create({
    userId,

    title: notesData.title || "AI Generated Notes",

    originalFileName: notesData.originalFileName,

    fileType: notesData.fileType,

    fileUrl: notesData.fileUrl,

    fileId: notesData.fileId,

    outputType: notesData.outputType,

    extractedText: notesData.extractedText,

    prompt: notesData.prompt,

    aiResponse: notesData.aiResponse,
  });
};

export const getNotesByUser = async (userId) => {
  return Note.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

export const getNoteById = async (userId, noteId) => {
  return Note.findOne({
    where: {
      id: noteId,
      userId,
    },
  });
};

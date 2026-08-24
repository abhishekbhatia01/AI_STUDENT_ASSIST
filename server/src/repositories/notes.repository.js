import Note from "../model/notes.model.js";

export const saveNotes = async (notesData, userId) => {
    await Note.create({
        userId,
        title: notesData.title || "AI Generated Notes",
        originalFileName: notesData.originalFileName,
        fileType: notesData.fileType,
        extractedText: notesData.extractedText,
        prompt: notesData.prompt,
        aiResponse: notesData.aiResponse,
    });
}
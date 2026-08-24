import api from "../api";

export const generateNotes = async (file, prompt) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    const response = await api.post("/ai/generate", formData);

    return response.data;   
}

export const saveNotes = async (notesData) => {
    const response = await api.post("/notes/save", notesData);
    return response.data;
}
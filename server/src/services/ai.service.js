import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/config.js";

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});


export const generateAiResponse = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
    });

    return response;
}
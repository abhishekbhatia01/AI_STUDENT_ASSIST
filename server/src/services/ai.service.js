import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/config.js";
import {
  analyzeImage,
  analyzePdf,
  analyzeDocx,
  analyzePpt,
} from "../utils/text-file.utils.js";
import { notes_prompt } from "../utils/prompt.utils.js";
 
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export const generateAiResponse = async (file, prompt, userId) => {
  let extractedText;
  let fileType;
  let originalFileName = null;

  if (file) {
    originalFileName = file.originalname;

    if (file.mimetype.startsWith("image/")) {
      extractedText = await analyzeImage(file);
      fileType = "image";
    } else if (file.mimetype === "application/pdf") {
      extractedText = await analyzePdf(file);
      fileType = "pdf";
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await analyzeDocx(file);
      fileType = "docx";
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      extractedText = await analyzePpt(file);
      fileType = "pptx";
    } else {
      extractedText = prompt;
      fileType = "text";
    }
  }

  const notesPrompt = notes_prompt(extractedText, prompt);

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: notesPrompt,
  });

  const aiResponse = response.candidates[0].content.parts[0].text;

  return {
    title: originalFileName || "AI Generated Notes",
    originalFileName,
    fileType,
    extractedText,
    prompt,
    aiResponse,
  };
};

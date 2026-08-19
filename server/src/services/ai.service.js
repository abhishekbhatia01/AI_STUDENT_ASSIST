import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/config.js";
import {
  analyzeImage,
  analyzePdf,
  analyzeDocx,
  analyzePpt,
} from "../utils/text-file.utils.js";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export const generateAiResponse = async (file, prompt) => {
  if (!file) {
    throw new Error("No file provided");
  }

  let extractedText;

  if (file.mimetype.startsWith("image/")) {
    extractedText = await analyzeImage(file);
  } else if (file.mimetype === "application/pdf") {
    extractedText = await analyzePdf(file);
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    extractedText = await analyzeDocx(file);
  } else if (file.mimetype === 
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    extractedText = await analyzePpt(file);
  }
  else {
    throw new Error("Unsupported file type. Please upload an image or PDF.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `
        Here is the text extracted from the image: ${extractedText}
        Please generate a response based on the following prompt: ${prompt}
    `,
  });

  return response;
};

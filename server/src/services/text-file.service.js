import { createWorker } from "tesseract.js";
import AppErrors from "../utils/AppErrors.utils.js";

export const analyzeImage = async (file) => {
  if(!file){
    throw new AppErrors("No file provided0", 400);
  }

  const worker = await createWorker("eng");

  try {
    const result = await worker.recognize(file.buffer);
    
    const text = result.data.text?.trim();

    return text || "No text found in the image";
  } catch (error) {
    throw new AppErrors("Error analyzing image", 500);
  } finally {
    await worker.terminate();
  }
}
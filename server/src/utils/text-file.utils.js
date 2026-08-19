import { createWorker } from "tesseract.js";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import officeParser from "officeparser";
import AppErrors from "./AppErrors.utils.js";

export const analyzeImage = async (file) => {
  if (!file) {
    throw new AppErrors("No file provided", 400);
  }

  const worker = await createWorker("eng");

  const result = await worker.recognize(file.buffer);

  const text = result.data.text?.trim();

  await worker.terminate();

  return text || "No text found in the image";
};

export const analyzePdf = async (file) => {
  if (!file) {
    throw new AppErrors("No PDF file provided", 400);
  }

  const parse = new PDFParse({
    data: file.buffer,
  });

  const result = await parse.getText();

  await parse.destroy();

  return result.text?.trim() || "No text found in the PDF";
};

export const analyzeDocx = async (file) => {
  if (!file) {
    throw new AppErrors("No DOCX file provided", 400);
  }

  const result = await mammoth.extractRawText({
    buffer: file.buffer,
  });

  return result.value?.trim() || "No text found in the DOCX file";
};

export const analyzePpt = async (file) => {
  if (!file) {
    throw new AppErrors("No PPTX file provided", 400);
  }

  const ast = await officeParser.parseOffice(file.buffer);

  const result = await ast.to("text");

  console.dir(result, { depth: null });

  if (!result) {
    return "No text found in the PPTX";
  }

  // If the result is already a string
  if (typeof result === "string") {
    return result.trim() || "No text found in the PPTX";
  }

  // If officeparser returns an object containing text
  if (typeof result === "object") {
    if (typeof result.text === "string") {
      return result.text.trim() || "No text found in the PPTX";
    }

    if (typeof result.value === "string") {
      return result.value.trim() || "No text found in the PPTX";
    }
  }

  throw new AppErrors("Unable to extract text from PPTX", 500);
};

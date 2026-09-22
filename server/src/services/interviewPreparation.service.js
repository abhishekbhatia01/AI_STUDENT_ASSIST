import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/config.js";
import {
  analyzeDocx,
  analyzePdf,
  analyzePpt,
} from "../utils/text-file.utils.js";
import AppErrors from "../utils/AppErrors.utils.js";
import * as repository from "../repositories/interviewPreparation.repository.js";
import {
  buildHRPrompt,
  buildOAPrompt,
  buildTechnicalInterviewPrompt,
} from "../utils/interview-preparation-prompt.utils.js";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
]);

const extractJobDescription = async (file) => {
  if (!file) return "";
  if (!allowedMimeTypes.has(file.mimetype)) {
    throw new AppErrors("Please upload a PDF, DOCX, PPTX, or TXT file.", 400);
  }
  if (file.mimetype === "application/pdf") return analyzePdf(file);
  if (file.mimetype.endsWith("wordprocessingml.document"))
    return analyzeDocx(file);
  if (file.mimetype.endsWith("presentationml.presentation"))
    return analyzePpt(file);
  return file.buffer.toString("utf8").trim();
};

const parseGeneratedQuestions = (text) => {
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new AppErrors("The AI returned an invalid preparation format.", 502);
  }
  if (
    !parsed ||
    typeof parsed.title !== "string" ||
    !Array.isArray(parsed.questions) ||
    !parsed.questions.length
  ) {
    throw new AppErrors("The AI returned an invalid preparation format.", 502);
  }
  return {
    title: parsed.title,
    questions: parsed.questions.map((question, index) => ({
      id: question.id || index + 1,
      question: String(question.question || ""),
      answer: String(question.answer || ""),
      explanation: String(question.explanation || ""),
      keyPoints: Array.isArray(question.keyPoints)
        ? question.keyPoints.map(String)
        : [],
      difficulty: ["Easy", "Medium", "Hard"].includes(question.difficulty)
        ? question.difficulty
        : "Medium",
    })),
  };
};

const questionSimilarity = (first, second) => {
  const normalize = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3);
  const firstWords = new Set(normalize(first));
  const secondWords = new Set(normalize(second));
  if (!firstWords.size || !secondWords.size) return false;
  const sharedWords = [...firstWords].filter((word) => secondWords.has(word));
  return (
    sharedWords.length / Math.min(firstWords.size, secondWords.size) >= 0.75
  );
};

export const generatePreparation = async (input, userId) => {
  let uploadedText = "";
  try {
    uploadedText = await extractJobDescription(input.file);
  } catch (error) {
    if (error instanceof AppErrors) throw error;
    throw new AppErrors(
      "Unable to extract text from the uploaded JD file.",
      400,
    );
  }

  const pastedText = input.jobDescription?.trim() || "";
  const jobDescription = [pastedText, uploadedText]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join("\n\n");

  if (!jobDescription && !input.targetRole?.trim()) {
    throw new AppErrors(
      "Please paste or upload a job description, or select a target role.",
      400,
    );
  }

  const context = {
    companyName: input.companyName?.trim(),
    targetRole: input.targetRole?.trim(),
    jobDescription,
  };
  let prompt;
  if (input.preparationType === "oa") prompt = buildOAPrompt(context);
  if (input.preparationType === "technical") {
    prompt = buildTechnicalInterviewPrompt(context);
  }
  if (input.preparationType === "hr") prompt = buildHRPrompt(context);

  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
  } catch {
    throw new AppErrors(
      "Interview preparation is temporarily unavailable.",
      502,
    );
  }

  const content = response.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new AppErrors("The AI returned no preparation.", 502);
  const generated = parseGeneratedQuestions(content);

  return repository.createPreparation({
    userId,
    companyName: context.companyName || null,
    targetRole: context.targetRole || null,
    jobDescription: jobDescription || null,
    preparationType: input.preparationType,
    title: generated.title,
    questions: generated.questions,
  });
};

export const getPreparations = (userId) =>
  repository.getPreparationsByUser(userId);

export const getPreparation = async (userId, preparationId) => {
  const preparation = await repository.getPreparationById(
    userId,
    preparationId,
  );
  if (!preparation)
    throw new AppErrors("Interview preparation not found.", 404);
  return preparation;
};

export const generateMoreQuestions = async (userId, preparationId) => {
  const preparation = await getPreparation(userId, preparationId);
  const existingQuestions = preparation.questions || [];
  const context = {
    companyName: preparation.companyName,
    targetRole: preparation.targetRole,
    jobDescription: preparation.jobDescription,
  };

  let prompt;
  if (preparation.preparationType === "oa") {
    prompt = buildOAPrompt(context, existingQuestions);
  } else if (preparation.preparationType === "technical") {
    prompt = buildTechnicalInterviewPrompt(context, existingQuestions);
  } else {
    prompt = buildHRPrompt(context, existingQuestions);
  }

  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
  } catch {
    throw new AppErrors(
      "Unable to generate more questions. Please try again.",
      502,
    );
  }

  const content = response.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new AppErrors(
      "Unable to generate more questions. Please try again.",
      502,
    );
  }

  const generated = parseGeneratedQuestions(content).questions;
  const uniqueQuestions = [];
  for (const question of generated) {
    const duplicatesExisting = existingQuestions.some((existing) =>
      questionSimilarity(existing.question, question.question),
    );
    const duplicatesGenerated = uniqueQuestions.some((existing) =>
      questionSimilarity(existing.question, question.question),
    );

    if (!duplicatesExisting && !duplicatesGenerated) {
      uniqueQuestions.push({
        ...question,
        id: existingQuestions.length + uniqueQuestions.length + 1,
      });
    }

    if (uniqueQuestions.length === 5) break;
  }

  if (!uniqueQuestions.length) {
    throw new AppErrors(
      "No new questions were generated. Please try again.",
      502,
    );
  }

  const questions = [...existingQuestions, ...uniqueQuestions];
  await repository.updatePreparationQuestions(preparation, questions);

  return { questions: uniqueQuestions, totalQuestions: questions.length };
};

import asyncHandler from "../utils/asyncHandler.js";
import AppErrors from "../utils/AppErrors.utils.js";
import * as service from "../services/interviewPreparation.service.js";
import { interviewPreparationSchema } from "../validators/interviewPreparation.validator.js";

const parseRequest = (body) => {
  const result = interviewPreparationSchema.safeParse(body);
  if (!result.success) {
    throw new AppErrors(
      result.error.issues[0]?.message ||
        "Invalid interview preparation request.",
      400,
    );
  }
  return result.data;
};

export const createPreparation = asyncHandler(async (req, res) => {
  const preparation = await service.generatePreparation(
    { ...parseRequest(req.body), file: req.file },
    req.user.id,
  );
  res.status(201).json({ success: true, data: preparation });
});

export const listPreparations = asyncHandler(async (req, res) => {
  const preparations = await service.getPreparations(req.user.id);
  res.status(200).json({ success: true, data: preparations });
});

export const getPreparation = asyncHandler(async (req, res) => {
  const preparation = await service.getPreparation(req.user.id, req.params.id);
  res.status(200).json({ success: true, data: preparation });
});

export const getPreparationQuestions = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 5);
  const search = String(req.query.search || "");
  const difficulty = String(req.query.difficulty || "All");

  if (!Number.isInteger(page) || page < 1) {
    throw new AppErrors("Page must be a positive integer.", 400);
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new AppErrors("Limit must be an integer between 1 and 50.", 400);
  }

  const result = await service.getPreparationQuestions(
    req.user.id,
    req.params.id,
    page,
    limit,
    search,
    difficulty,
  );
  res.status(200).json({
    success: true,
    data: {
      questions: result.questions,
      pagination: result.pagination,
    },
  });
});

export const generateMoreQuestions = asyncHandler(async (req, res) => {
  const result = await service.generateMoreQuestions(
    req.user.id,
    req.params.id,
  );
  res.status(200).json({ success: true, data: result });
});

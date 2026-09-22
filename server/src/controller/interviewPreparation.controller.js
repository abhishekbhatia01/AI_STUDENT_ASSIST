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

export const generateMoreQuestions = asyncHandler(async (req, res) => {
  const result = await service.generateMoreQuestions(
    req.user.id,
    req.params.id,
  );
  res.status(200).json({ success: true, data: result });
});

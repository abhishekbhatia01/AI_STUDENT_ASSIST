import InterviewPreparation from "../model/interviewPreparation.model.js";

export const createPreparation = (data) => InterviewPreparation.create(data);

export const getPreparationsByUser = (userId) =>
  InterviewPreparation.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

export const getPreparationById = (userId, preparationId) =>
  InterviewPreparation.findOne({
    where: { id: preparationId, userId },
  });

export const getPreparationMetadataById = (userId, preparationId) =>
  InterviewPreparation.findOne({
    where: { id: preparationId, userId },
    attributes: { exclude: ["questions"] },
  });

export const updatePreparationQuestions = (preparation, questions) =>
  preparation.update({ questions });

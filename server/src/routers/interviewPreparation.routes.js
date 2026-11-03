import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  createPreparation,
  generateMoreQuestions,
  getPreparation,
  getPreparationQuestions,
  listPreparations,
} from "../controller/interviewPreparation.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", listPreparations);
router.post("/:id/questions", generateMoreQuestions);
router.get("/:id/questions", getPreparationQuestions);
router.get("/:id", getPreparation);
router.post("/", upload.single("file"), createPreparation);

export default router;

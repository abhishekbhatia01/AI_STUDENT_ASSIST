import express from "express";
import * as unblockRequestController from "../controller/unblockRequest.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizedRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/unblock-requests", unblockRequestController.createRequest);
router.get(
  "/admin/unblock-requests",
  authMiddleware,
  authorizedRole("admin"),
  unblockRequestController.getPendingRequests,
);

export default router;

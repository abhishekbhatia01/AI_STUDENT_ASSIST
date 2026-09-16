import express from "express";
import * as adminController from "../controller/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizedRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  authorizedRole("admin"),
  adminController.getAllUsers,
);
router.patch(
  "/users/:userId/block",
  authMiddleware,
  authorizedRole("admin"),
  adminController.setUserBlocked,
);
router.delete(
  "/users/:userId",
  authMiddleware,
  authorizedRole("admin"),
  adminController.deleteUser,
);

export default router;

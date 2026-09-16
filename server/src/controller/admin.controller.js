import asyncHandler from "../utils/asyncHandler.js";
import * as adminService from "../services/admin.service.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getAllUsers();

  res.status(200).json({
    users,
  });
});

export const setUserBlocked = asyncHandler(async (req, res) => {
  const blocked = req.body.blocked;

  if (typeof blocked !== "boolean") {
    return res.status(400).json({
      message: "blocked must be a boolean",
    });
  }

  const user = await adminService.setUserBlocked(
    req.params.userId,
    blocked,
    req.user.id,
  );

  res.status(200).json({
    message: blocked
      ? "User blocked successfully"
      : "User unblocked successfully",
    user: user.toJSON(),
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await adminService.removeUser(req.params.userId, req.user.id);

  res.status(204).send();
});

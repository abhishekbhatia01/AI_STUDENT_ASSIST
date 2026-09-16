import asyncHandler from "../utils/asyncHandler.js";
import * as unblockRequestService from "../services/unblockRequest.service.js";

export const createRequest = asyncHandler(async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message?.trim()) {
    return res.status(400).json({
      message: "Email and a message are required",
    });
  }

  await unblockRequestService.createUnblockRequest(email, message.trim());

  res.status(201).json({
    message: "Your unblock request has been sent to the administrator",
  });
});

export const getPendingRequests = asyncHandler(async (req, res) => {
  const requests = await unblockRequestService.getPendingUnblockRequests();
  res.status(200).json({ requests });
});

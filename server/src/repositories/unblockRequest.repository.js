import UnblockRequest from "../model/unblockRequest.js";

export const findPendingByUserId = async (userId) => {
  return UnblockRequest.findOne({
    where: { userId, status: "pending" },
  });
};

export const createRequest = async (requestData) => {
  return UnblockRequest.create(requestData);
};

export const findAllRequests = async () => {
  return UnblockRequest.findAll({
    where: { status: "pending" },
    order: [["createdAt", "DESC"]],
  });
};

import * as userRepository from "../repositories/user.repository.js";
import * as unblockRequestRepository from "../repositories/unblockRequest.repository.js";
import AppErrors from "../utils/AppErrors.utils.js";

export const createUnblockRequest = async (email, message) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user || !user.isBlocked) {
    throw new AppErrors("Only blocked users can request an unblock", 400);
  }

  const existingRequest = await unblockRequestRepository.findPendingByUserId(
    user.id,
  );
  if (existingRequest) {
    throw new AppErrors("Your unblock request is already pending", 409);
  }

  return unblockRequestRepository.createRequest({
    userId: user.id,
    email: user.email,
    message,
  });
};

export const getPendingUnblockRequests = async () => {
  const requests = await unblockRequestRepository.findAllRequests();
  return requests.map((request) => request.toJSON());
};

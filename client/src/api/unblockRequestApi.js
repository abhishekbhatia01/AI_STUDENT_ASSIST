import api from "./api.js";

export const submitUnblockRequest = async (email, message) => {
  const response = await api.post("/unblock-requests", { email, message });
  return response.data;
};

export const getPendingUnblockRequests = async () => {
  const response = await api.get("/admin/unblock-requests");
  return response.data;
};

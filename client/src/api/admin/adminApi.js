import api from "../api.js";

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const setUserBlocked = async (userId, blocked) => {
  const response = await api.patch(`/admin/users/${userId}/block`, { blocked });
  return response.data;
};

export const deleteUser = async (userId) => {
  await api.delete(`/admin/users/${userId}`);
};

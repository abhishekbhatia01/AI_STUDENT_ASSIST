import * as userRepository from "../repositories/user.repository.js";
import AppErrors from "../utils/AppErrors.utils.js";

export const getAllUsers = async () => {
  const users = await userRepository.findAllUsers();

  return users.map((user) => user.toJSON());
};

const findManageableUser = async (id, adminId) => {
  if (Number(id) === Number(adminId)) {
    throw new AppErrors("You cannot modify your own admin account", 400);
  }

  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  return user;
};

export const setUserBlocked = async (id, blocked, adminId) => {
  const user = await findManageableUser(id, adminId);
  await userRepository.updateUser(user, { isBlocked: blocked });

  return userRepository.findUserById(id);
};

export const removeUser = async (id, adminId) => {
  await findManageableUser(id, adminId);
  await userRepository.deleteUser(id);
};

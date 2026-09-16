import User from "../model/user.js";

export const findUserByEmail = async (email) => {
  return User.findOne({
    where: { email },
  });
};

export const createUser = async (userData, transaction) => {
  return User.create(userData, {
    transaction,
  });
};

export const findUserById = async (id) => {
  return User.findByPk(id);
};

export const findAllUsers = async () => {
  return User.findAll({
    attributes: { exclude: ["password"] },
    order: [["id", "ASC"]],
  });
};

export const deleteUser = async (id) => {
  return User.destroy({ where: { id } });
};

export const updateUser = async (user, updates) => {
  return user.update(updates);
};

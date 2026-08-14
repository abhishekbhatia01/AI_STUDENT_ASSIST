import User from "../model/user.js";

export const findUserByEmail = async (email) => {
  return User.findOne({
    where: { email },
  })
};

export const createUser = async (userData, transaction) => {
    return User.create(userData, {
        transaction
    });
};
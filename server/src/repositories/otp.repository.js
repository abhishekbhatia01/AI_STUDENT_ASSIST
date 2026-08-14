import OTP from "../model/otp.js";

export const createOTP = async (otpData, transaction) => {
  return OTP.create(otpData, {
    transaction,
  });
};

export const findOTPByEmail = async (email) => {
  return OTP.findOne({
    where: { email },
    order: [["createdAt", "DESC"]],
  });
};

export const deleteOTPByEmail = async (email) => {
  return OTP.destroy({
    where: { email },
  });
};

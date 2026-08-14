import OTP from "../model/otp.js";

export const createOTP = async (otpData, transaction) => {
  return OTP.create(otpData, {
    transaction,
  });
};

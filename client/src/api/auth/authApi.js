import api from "../api.js";

export const registerUser = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

export const verifyOTP = async (email, otp) => {
  const response = await api.post("/verify-otp", {
    email,
    otp,
  });
  return response.data;
};

export const resendOTP = async (email) => {
  const response = await api.post("/resend-otp", { email });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/getMe");
  return response.data;
};

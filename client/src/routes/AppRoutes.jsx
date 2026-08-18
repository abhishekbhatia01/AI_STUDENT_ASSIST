import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import VerifyOTP from "../pages/VerifyOTP";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      {/* Protected Routes */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default AppRoutes;
import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Login from "../pages/auth/Login";
import Notes from "../pages/Notes";
import SavedCourses from "../pages/SavedCourses";

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/noteGenerate" element={<Notes />} />
      <Route path="/saved-courses" element={<SavedCourses />} />
      <Route path="*" element={<Login />} />
      {/* Protected Routes */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default AppRoutes;

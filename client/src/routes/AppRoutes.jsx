import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Login from "../pages/auth/Login";
import Notes from "../pages/Notes";
import SavedCourses from "../pages/SavedCourses";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/noteGenerate" element={<Notes />} />
      <Route path="/saved-courses" element={<SavedCourses />} />
      <Route path="*" element={<Login />} />
      {/* Protected Routes */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default AppRoutes;

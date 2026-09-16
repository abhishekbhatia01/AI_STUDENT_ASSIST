import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Login from "../pages/auth/Login";
import Notes from "../pages/Notes";
import SavedCourses from "../pages/SavedCourses";
import NoteDetails from "../pages/NoteDetails";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/noteGenerate" element={<Notes />} />
        <Route path="/saved-courses" element={<SavedCourses />} />
        <Route path="/notes/:noteId" element={<NoteDetails />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;

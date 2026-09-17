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
import GuestRoute from "../components/ProtectedRoute/GuestRoute";
import AdminUsers from "../pages/AdminUsers";
import BlockedAccount from "../pages/auth/BlockedAccount";
import Quiz from "../pages/Quiz";
import Quizzes from "../pages/Quizzes";
import QuizSetup from "../pages/QuizSetup";
import QuizAttemptQuestions from "../pages/QuizAttemptQuestions";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/blocked" element={<BlockedAccount />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/noteGenerate" element={<Notes />} />
        <Route path="/saved-courses" element={<SavedCourses />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:noteId" element={<QuizSetup />} />
        <Route
          path="/quiz-attempts/:attemptId/questions"
          element={<QuizAttemptQuestions />}
        />
        <Route path="/notes/:noteId" element={<NoteDetails />} />
        <Route path="/notes/:noteId/quiz" element={<Quiz />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;

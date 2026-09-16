import express from "express";
import userRoutes from "./src/routers/auth.routes.js";
import "./src/associations/otp.association.js";
import "./src/associations/notes.association.js";
import globalErrorHandler from "./src/middlewares/error.mdiddleware.js";
import AppErrors from "./src/utils/AppErrors.utils.js";
import refreshTokenRoutes from "./src/routers/refreshAccessToken.routes.js";
import coockieParser from "cookie-parser";
import authMiddleware from "./src/middlewares/auth.middleware.js";
import authorizedRole from "./src/middlewares/roleMiddleware.js";
import aiRoutes from "./src/routers/ai.routes.js";
import notesRoutes from "./src/routers/notes.routes.js";
import adminRoutes from "./src/routers/admin.routes.js";
import unblockRequestRoutes from "./src/routers/unblockRequest.routes.js";
import quizAttemptRoutes from "./src/routers/quizAttempt.routes.js";
import cors from "cors";
import "./src/model/unblockRequest.js";
import "./src/model/quizAttempt.js";

const app = express();
app.use(express.static("public"));

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://studyzen.me",
  "https://www.studyzen.me",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(coockieParser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get(
  "/api/protected-route",
  authMiddleware,
  authorizedRole("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "You are authenticated and authorized to access this resource.",
    });
  },
);

app.use("/api", userRoutes);
app.use("/api", refreshTokenRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", unblockRequestRoutes);
app.use("/api/quiz-attempts", quizAttemptRoutes);

app.use((req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;

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
import cors from "cors";

const app = express();
app.use(express.json());
app.use(coockieParser());

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);

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

app.use((req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;

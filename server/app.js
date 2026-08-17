import express from "express";
import { sequelize } from "./src/config/db.js";
import userRoutes from "./src/routers/auth.route.js";
import { PORT } from "./src/config/config.js";
import "./src/associations/otp.association.js";
import globalErrorHandler from "./src/middlewares/error.mdiddleware.js";
import AppErrors from "./src/utils/AppErrors.utils.js";
import refreshTokenRoutes from "./src/routers/refreshAccessToken.route.js";
import coockieParser from "cookie-parser";
import { authMiddleware, authorizedRole }  from "./src/middlewares/auth.middleware.js";
import aiRoutes from "./src/routers/ai.route.js";
const app = express();
app.use(express.json());
app.use(coockieParser());

app.get("/api/protected-route",authMiddleware, authorizedRole("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated and authorized to access this resource.",
  });
});

app.use("/api", userRoutes);
app.use("/api", refreshTokenRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;

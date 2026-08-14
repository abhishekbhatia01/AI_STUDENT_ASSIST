import express from "express";
import { sequelize } from "./src/config/db.js";
import userRoutes from "./src/routers/user.route.js";
import { PORT } from "./src/config/config.js";
import "./src/associations/otp.association.js";
import globalErrorHandler from "./src/middlewares/error.mdiddleware.js";
import AppErrors from "./src/utils/AppErrors.utils.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/user", userRoutes);

app.use((req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);


export default app;
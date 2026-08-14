import express from "express";
import { sequelize } from "./src/config/db.js";
import userRoutes from "./src/routers/user.route.js";
import { PORT } from "./src/config/config.js";
import "./src/associations/otp.association.js";
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/user", userRoutes);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

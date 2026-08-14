import Sequalize from "sequelize";
import {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_HOST,
} from "./config.js";

const sequelize = new Sequalize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    pool: {
      max: 5,
      min: 2,
      aquire: 30000,
      idle: 10000,
    },
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("Error: " + error);
  }
};

export { sequelize, connectDB };

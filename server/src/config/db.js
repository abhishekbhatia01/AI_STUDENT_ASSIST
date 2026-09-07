import Sequelize from "sequelize";
import {
  DATABASE_URL
} from "./config.js";

// const sequelize = new Sequalize(
//   DATABASE_NAME,
//   DATABASE_USER,
//   DATABASE_PASSWORD,
//   {
//     host: DATABASE_HOST,
//     dialect: DATABASE_DIALECT,
//     pool: {
//       max: 5,
//       min: 2,
//       aquire: 30000,
//       idle: 10000,
//     },
//   },
// );

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

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

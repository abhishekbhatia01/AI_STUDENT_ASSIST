import Sequalize from "sequelize";

const sequelize = new Sequalize("student_assist", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 2,
    aquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Error: " + error);
  }
};

export { sequelize, connectDB };

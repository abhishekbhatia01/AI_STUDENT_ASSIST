import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UnblockRequest = sequelize.define(
  "UnblockRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "reviewed"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "UnblockRequests",
  },
);

export default UnblockRequest;

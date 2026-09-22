import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const InterviewPreparation = sequelize.define(
  "InterviewPreparation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    targetRole: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobDescription: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    preparationType: {
      type: DataTypes.ENUM("oa", "technical", "hr"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questions: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    tableName: "interview_preparations",
    timestamps: true,
  },
);

export default InterviewPreparation;

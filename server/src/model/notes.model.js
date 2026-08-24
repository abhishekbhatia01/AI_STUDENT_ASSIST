import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Note = sequelize.define(
  "Note",
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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    originalFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fileType: {
      type: DataTypes.ENUM("image", "pdf", "docx", "pptx", "text"),
      allowNull: true,
    },

    extractedText: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    prompt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    aiResponse: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    tableName: "notes",
    timestamps: true,
  },
);

export default Note;

import User from "../model/user.js";
import Note from "../model/notes.model.js";

User.hasMany(Note, {
  foreignKey: "userId",
  as: "notes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Note.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


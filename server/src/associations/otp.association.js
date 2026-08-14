import User from "../model/user.js";
import OTP from "../model/otp.js";

User.hasMany(OTP, {
    foreignKey: "userId",
    onDelete:  "CASCADE",
});

OTP.belongsTo(User, {
    foreignKey: "userId",
});
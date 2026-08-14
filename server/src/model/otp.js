import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const OTP = sequelize.define(
    "otp",
    {
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }
);

export default OTP;
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const OTP = sequelize.define(
    "otp",
    {
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isUsed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,    
        }
    }
);

export default OTP;
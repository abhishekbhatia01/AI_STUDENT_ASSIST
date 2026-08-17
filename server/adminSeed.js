import bcrypt from "bcrypt";
import User from "./src/model/user.js";
import { sequelize } from "./src/config/db.js";

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected.");

    const existingAdmin = await User.findOne({
      where: {
        email: "admin@aistudentassistant.com",
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      fullname: "System Admin",
      email: "admin@aistudentassistant.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: Admin@123");
    console.log("Role:", admin.role);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
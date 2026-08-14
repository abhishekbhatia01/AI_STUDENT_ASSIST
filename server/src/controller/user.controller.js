import asyncHandler from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body); 

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const { password: _, ...userWithoutPassword } = user.toJSON();

//     return res
//       .status(200)
//       .json({ message: "Login successful", userWithoutPassword });
//   } catch (error) {
//     return res
//       .json(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };


// export const verifyEmail = async (req, res) => {
//   try {
    
//   } catch (error) {
    
//   }
// }


// export const getUser = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     return res.status(200).json({ users });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };

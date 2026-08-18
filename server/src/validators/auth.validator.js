import { email, z } from "zod";

export const registerSchema = z.object({
    fullname: z
    .string()
    .trim()
    .min(3, "Full name must be at least 4 characters long")
    .max(50, "Full name must be at most 50 characters long"),

    email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),

    confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long")
    .max(50, "Confirm password must be at most 50 characters long"),
})
.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

export const verifyOTPSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
    otp: z
    .string()
    .length(6, "OTP must be exactly 6 characters long"),
});

export const resendOTPSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
});


import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const GOOGLE_USER = process.env.GOOGLE_USER;
export const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;


if(!PORT){
    throw new Error("PORT is not defined in the environment variables");
}

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

if(!GOOGLE_USER){
    throw new Error("GOOGLE_USER is not defined in the environment variables");
}

if(!GOOGLE_PASSWORD){
    throw new Error("GOOGLE_PASSWORD is not defined in the environment variables");
}
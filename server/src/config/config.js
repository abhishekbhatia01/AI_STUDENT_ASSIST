import dotenv from "dotenv";
import e from "express";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const GOOGLE_USER = process.env.GOOGLE_USER;
export const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_DIALECT = process.env.DATABASE_DIALECT;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
export const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
export const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;


if(!IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in the environment variables");
}

if(!IMAGEKIT_PUBLIC_KEY){
    throw new Error("IMAGEKIT_PUBLIC_KEY is not defined in the environment variables");
}

if(!IMAGEKIT_URL_ENDPOINT){
    throw new Error("IMAGEKIT_URL_ENDPOINT is not defined in the environment variables");
}

if(!GEMINI_API_KEY){
    throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

if(!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
}

if(!DATABASE_NAME) {
    throw new Error("DATABASE_NAME is not defined in the environment variables");
}

if(!DATABASE_USER) {
    throw new Error("DATABASE_USER is not defined in the environment variables");
}

if(!DATABASE_PASSWORD) {
    throw new Error("DATABASE_PASSWORD is not defined in the environment variables");
}

if(!PORT){
    throw new Error("PORT is not defined in the environment variables");
}

if(!JWT_ACCESS_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

if(!JWT_REFRESH_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

if(!GOOGLE_USER){
    throw new Error("GOOGLE_USER is not defined in the environment variables");
}

if(!GOOGLE_PASSWORD){
    throw new Error("GOOGLE_PASSWORD is not defined in the environment variables");
}
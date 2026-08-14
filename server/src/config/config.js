import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const GOOGLE_USER = process.env.GOOGLE_USER;
export const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_DIALECT = process.env.DATABASE_DIALECT;
export const DATABASE_PORT = process.env.DATABASE_PORT;

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

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

if(!GOOGLE_USER){
    throw new Error("GOOGLE_USER is not defined in the environment variables");
}

if(!GOOGLE_PASSWORD){
    throw new Error("GOOGLE_PASSWORD is not defined in the environment variables");
}
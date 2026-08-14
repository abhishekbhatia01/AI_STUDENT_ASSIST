import { createUser, getUser, login } from "../controller/user.controller.js";
import express from "express";
const router = express.Router();

router.post("/users", createUser);
router.post("/login", login);
router.get("/users", getUser);

export default router;
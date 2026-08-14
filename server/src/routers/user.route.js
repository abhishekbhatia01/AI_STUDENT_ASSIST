import { register } from "../controller/user.controller.js";
import express from "express";
const router = express.Router();

router.post("/users", register);


export default router;
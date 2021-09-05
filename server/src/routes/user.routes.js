import express from "express";
import { registerUserController } from "../controllers/register-user.controllers.js";

const router = express.Router();

router.post("/signup", registerUserController);

export default router;

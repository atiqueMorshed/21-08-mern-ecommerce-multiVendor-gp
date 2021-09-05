import express from "express";
import { check } from "express-validator";
import { registerUserController } from "../controllers/register-user.controllers.js";
const router = express.Router();

router.post(
  "/signup",
  [
    check("username", "Username must be at least 5 characters long.")
      .exists()
      .isLength({ min: 5 }),
    check("email", "Email must be valid").exists().isEmail().normalizeEmail(),
    check(
      "password",
      "Password must be at least 8 characters long and must contain atleast one number."
    )
      .exists()
      .isLength(8)
      .matches(/\d/),
  ],
  registerUserController
);

export default router;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

export const registerUserController = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty())
    return res.status(406).json({ message: validationErrors });

  const { name, username, email, password, userType } = req.body;

  if (
    userType &&
    (userType.toLowerCase() === "admin" ||
      userType !== "user" ||
      userType !== "vendor")
  )
    return res.status(406).json({ message: "Wrong user type." });

  const isDuplicateUsername = await User.findOne({ username });
  if (isDuplicateUsername)
    return res.status(409).json({ message: "Username already exists!" });

  const isDuplicateEmail = await User.findOne({ email });
  if (isDuplicateEmail)
    return res.status(409).json({ message: "Email already exists!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    userType,
  });
  console.log("Inserted User: ", newUser);

  jwt.sign(
    {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
      isReLoginConfirmed: newUser.isReLoginConfirmed,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
    (err, token) => {
      if (err) res.status(500).send(err);
      res.status(200).json({ token });
    }
  );
};

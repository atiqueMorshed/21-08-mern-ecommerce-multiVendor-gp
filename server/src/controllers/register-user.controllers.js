import express from "express";

export const registerUserController = async (req, res) => {
  console.log("WORKS!");
  res.status(200).send("WORKS!");
};

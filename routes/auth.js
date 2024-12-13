require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { addUser, findUserByEmail } = require("../model/user");
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await addUser(email, password);
  res.status(201).json({ message: "User registered successfully", user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, JWT_SECRET);
  res.json({ token });
});

module.exports = router;

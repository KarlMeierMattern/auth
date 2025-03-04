import express from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Send user details to frontend to access username
router.get("/user-info", (req, res) => {
  res.json({ username: req.user.username });
});

export default router;

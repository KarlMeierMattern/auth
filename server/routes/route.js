import express from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { dashboard } from "../controllers/dashboard.js";
import { authenticateJWT } from "../middleware/auth.js";
const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Dashboard (protected)
router.get("/dashboard/:id", authenticateJWT, dashboard);

export default router;

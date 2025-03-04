import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";
import { authenticateJWT } from "./middleware/auth.js";

const app = express();

// Parse incoming json requests
app.use(express.json());

// Handle cookies
app.use(cookieParser());

// CORS policy
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // Allow cookies
  })
);

// Routes
app.use("/", router);

// Private routes (only accessible if JWT is valid)
app.use("/dashboard", authenticateJWT, (req, res) => {
  // This would be the route where users can access the dashboard
  res.json({ message: "Welcome to the dashboard!" });
});

// Error handler middleware

// Connect MongoDB and start server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("App connected to database ✅");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on: http://localhost:${process.env.PORT} ✅`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

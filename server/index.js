import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";

const app = express();

// Parse incoming json requests
app.use(express.json());

// Handle cookies
app.use(cookieParser());

// CORS policy

// Routes
app.use("/", router);

// Error handler middleware

// Connect MongoDB

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

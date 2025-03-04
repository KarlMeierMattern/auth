import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

// Parse incoming json requests
app.use(express.json());

// Handle cookies
app.use(cookieParser());

// CORS policy

// Routes

// Error handler middleware

// Connect MongoDB

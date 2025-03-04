import mongoose from "mongoose";

export const Signup = mongoose.model(
  "Signup",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        trim: true, // Removes leading/trailing spaces
        lowercase: true, // Stores email in lowercase
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex validation
      },
      password: {
        type: String,
        required: true,
        minlength: 8, // Enforces a minimum length
      },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
  )
);

import mongoose from "mongoose";

export const Signup = mongoose.model(
  "Signup",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please provide email"],
        unique: true, // Ensures no duplicate emails
        trim: true, // Removes leading/trailing spaces
        lowercase: true, // Stores email in lowercase
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 8, // Enforces a minimum length
      },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
  )
);

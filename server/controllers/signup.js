import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticated-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Signup } from "../model/signup.js";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // check if email already exists in the database
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      throw new UnauthenticatedError("Email already exists.");
    }

    // hash password before saving to db
    const hashedPassword = await bcrypt.hash(password, 10);

    const addUser = {
      email: email,
      password: hashedPassword,
    };

    const user = await Signup.create(addUser);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true, // Secure against XSS
        secure: process.env.NODE_ENV === "production" || false, // Send only over HTTPS (set to false for local testing)
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 60 * 60 * 1000, // 1 hour
        domain: "localhost", // For local testing, this should be 'localhost'
      })
      .status(StatusCodes.OK)
      .json({ msg: "Signup successful", token: token });
  } catch (error) {
    next(error); // Pass the error to the error handler which handles both custom errors and unexpected server issues.
  }
};

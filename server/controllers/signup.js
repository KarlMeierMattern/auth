import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticated-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Signup } from "../model/signup.js";

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("Please provide email and password");
    }

    // check if username already exists in the database
    const existingUser = await Signup.findOne({ username });
    if (existingUser) {
      throw new UnauthenticatedError("Username already exists.");
    }

    // hash password before saving to db
    const hashedPassword = await bcrypt.hash(password, 10);

    const addUser = {
      username: username,
      password: hashedPassword,
    };

    const user = await Signup.create(addUser);

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true, // Secure against XSS
        secure: process.env.NODE_ENV === "production", // Send only over HTTPS (set to false for local testing)
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 60 * 60 * 1000, // 1 hour
        domain: "localhost", // Add this for dev
      })
      .status(StatusCodes.OK)
      .json({ msg: "Login successful", token: token });
  } catch (error) {
    next(error); // Pass the error to the error handler which handles both custom errors and unexpected server issues.
  }
};

export { signup };

import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticated-error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Signup } from "../model/signup.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // Check if user exists
    const user = await Signup.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    // Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response with cookie
    res
      .cookie("token", token, {
        httpOnly: true, // prevents JavaScript from accessing the cookie, mitigating XSS attacks
        secure: process.env.NODE_ENV === "production", // ensures that the cookie is only sent over HTTPS, which is good practice for production environments
        sameSite: "Strict", // helps prevent CSRF attacks
        maxAge: 60 * 60 * 1000,
        domain: "localhost",
      })
      .status(StatusCodes.OK)
      .json({ msg: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

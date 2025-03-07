import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Signup } from "../model/signup.js";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    // check if email already exists in the database
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      throw new UnauthenticatedError("Email already exists."); // immediately stops execution of try block and jumps to catch block
    }

    // create user
    const user = await Signup.create({
      email,
      password,
    });

    // generate random salt & hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update with hashed password
    user.password = hashedPassword;
    await user.save();

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
      .status(StatusCodes.CREATED)
      .json({ msg: "Signup successful", token: token, user });
  } catch (error) {
    next(error); // passes errors to the error handler
  }
};

import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticated-error.js";
import { Signup } from "../model/signup.js";

export const dashboard = async (req, res, next) => {
  // Access the user's email from req.user
  const userEmail = req.user.email;

  // Send a welcome message
  res.json({ message: userEmail });
};

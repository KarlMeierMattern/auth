import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Authentication Middleware
export const authenticateJWT = (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]); // Get JWT from HTTP-only cookie (web app) or auth header (for mobile)

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Once you call next(), req.user object (containing decoded JWT payload) is available to the next middleware or route handler
    next(); // pass control to the next middleware or route handler
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid token" });
  }
};

// Here’s how the flow works with your authentication middleware:
// Client Makes a Request: The client (e.g., the dashboard component) makes a request to a protected route.
// Authentication Middleware: The request hits the authenticateJWT middleware:
// It checks for the token in cookies or the authorization header.
// If the token is missing or invalid, it responds with an error (401 Unauthorized or 403 Forbidden).
// If the token is valid, it decodes the token and attaches the user information to req.user.
// Call next(): After successfully verifying the token, you call next() to pass control to the next middleware or route handler.
// Access User Info in Dashboard: In the dashboard route handler, you can access req.user to get user-specific data or perform authorization checks.
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Authentication Middleware
export const authenticateJWT = (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]); // Get JWT from HTTP-only cookie or auth header (for mobile)

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid token" });
  }
};

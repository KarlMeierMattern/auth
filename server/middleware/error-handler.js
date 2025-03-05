import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticated-error.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof UnauthenticatedError) {
    return res.status(err.statusCode).json({ msg: message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong, try again later");
};

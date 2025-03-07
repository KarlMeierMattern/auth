import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  // unauthenticated
  if (err instanceof UnauthenticatedError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // bad request
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // Handle ValidationError
  if (err.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }

  // catch all error
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong, try again later");
};

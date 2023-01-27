import { ErrorRequestHandler } from "express";
import { UnauthorizedError } from "express-jwt";
import { ZodError } from "zod";
import logger from "../logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  logger.info(error);
  if (error instanceof ZodError) {
    res.status(400).json({
      error,
    });
    return;
  }

  if (error instanceof UnauthorizedError) {
    res.status(401).json({
      error: "Unauthorized, please sign in!",
    });
    return;
  }

  logger.warn(error);
  res.status(500).json({
    error: "Something went wrong, please try again later!",
  });
};

export default errorHandler;

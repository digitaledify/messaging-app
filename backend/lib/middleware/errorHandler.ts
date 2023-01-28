import { Prisma } from "@prisma/client";
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

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      res.status(404).json({
        error: error.message,
      });
    }
  }

  logger.warn(error);
  res.status(500).json({
    error: "Something went wrong, please try again later!",
  });
};

export default errorHandler;

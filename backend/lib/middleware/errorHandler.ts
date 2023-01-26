import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    res.json({
      error: true,
      cause: error.message,
    });
    return;
  }

  res.json({
    error: true,
    cause: "Something went wrong, please try again later!",
  });
};

export default errorHandler;

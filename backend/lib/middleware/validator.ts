import { NextFunction, Request, Response } from "express";
import {  ZodSchema } from "zod";

function validator(
  schema: ZodSchema,
  checkIn: "query" | "params" | "body" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const zodResult = schema.safeParse(req[checkIn]);
    console.log("🚀 ~ file: validator.ts:10 ~ return ~ req[checkIn]", req[checkIn])
    if (!zodResult.success) {
      next(zodResult.error);
    }
    next();
  };
}

export default validator;

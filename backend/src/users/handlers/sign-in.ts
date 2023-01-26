import { RequestHandler } from "express";
import { SignInDataSchema } from "../zod-schemas";

const signInHandler: RequestHandler = (req, res, next) => {
  const { email, password, rememberMe } = SignInDataSchema.parse(req.body);
};

export default signInHandler;

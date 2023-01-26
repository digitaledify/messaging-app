import { Router } from "express";
import { userHandlers } from ".";
import validator from "../../lib/middleware/validator";
import { SignInDataSchema, SignUpDataSchema } from "./zod-schemas";

const userRouter = Router({
  mergeParams: true,
});

userRouter.post(
  "/sign-in",
  validator(SignInDataSchema),
  userHandlers.signInHandler
);

userRouter.post(
  "/sign-up",
  validator(SignUpDataSchema),
  userHandlers.signUpHandler
);

export default userRouter;

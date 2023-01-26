import { z } from "zod";

export const SignInDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().default(false),
});

export const SignUpDataSchema = SignInDataSchema.merge(
  z.object({
    name: z.string(),
  })
);

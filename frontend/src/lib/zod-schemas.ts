import { z } from "zod";

export const SignInDataSchema = z.object({
  username: z.string().trim(),
  password: z.string().min(6),
  rememberMe: z.boolean().default(false),
});

export const SignUpDataSchema = SignInDataSchema.merge(
  z.object({
    name: z.string().trim(),
    email: z
      .string()
      .email()
      .trim()
      .transform((v) => v.toLocaleLowerCase()),
  })
);

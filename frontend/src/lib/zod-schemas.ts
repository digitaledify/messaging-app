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

export const UpdateUserSchema = SignUpDataSchema.merge(
  z.object({
    avatar: z.string().optional(),
  })
);

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

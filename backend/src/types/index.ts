import { z } from "zod";
import { EmailQueryParamsSchema } from "../../lib/zod-schemas";

export interface AuthState {
  user: SafeUser;
  token: string;
}

export interface SafeUser {
  name: string;
  email: string;
  username: string;
  avatar: string | null;
}

export interface APIError {
  error: string | { message: string } | string[] | { message: string }[];
}

export type EmailQueryParam = z.infer<typeof EmailQueryParamsSchema>;

export interface SendEmailOptions {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
}

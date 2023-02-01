import { z } from "zod";
import * as dotenv from "dotenv";
import { NumberStringSchema } from "../lib/zod-schemas";

// Load env variables
dotenv.config();

const configSchema = z.object({
  PORT: NumberStringSchema.default("7000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  SENDGRID_API_KEY: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>;

export const config = configSchema.parse(process.env);

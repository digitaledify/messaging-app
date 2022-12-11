import { z } from "zod";
import appConfig from "../config.json";

const configSchema = z.object({
  port: z.number().default(8080),
  db: z.object({
    host: z.string().default("localhost"),
    port: z.number().default(5432),
    user: z.string().default("postgres"),
    password: z.string().default("postgres"),
    database: z.string().default("postgres"),
  }),
});

export type Config = z.infer<typeof configSchema>;

export const config = configSchema.parse({
  ...appConfig,
  ...process.env, // Overwrite with environment variables
});

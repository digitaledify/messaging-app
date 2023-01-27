import { z } from "zod";

export const NumberStringSchema = z.string().transform((text) => parseInt(text));

import { z } from "zod";

export const NumberStringSchema = z
  .string()
  .transform((text) => parseInt(text));

export const SearchQuerySchema = z.object({
  search: z
    .string()
    .optional()
    .transform((v) => v?.toLocaleLowerCase()),
});


import axios from "axios";
import { z } from "zod";
import { APIError } from "../types";
import { notify } from "./notifications";

export function normalizeAPIError(data: APIError): string {
  const { error } = data;
  console.log("🚀 ~ file: errors.tsx:9 ~ normalizeAPIError ~ error", error);

  if (Array.isArray(error)) {
    if (z.string().array().min(1).safeParse(error).success) {
      return error.join("\n");
    }

    return (error as { message: string }[]).reduce(
      (previousValue: string, currentValue) => {
        return previousValue + currentValue.message;
      },
      ""
    );
  }

  if (typeof error === "string") {
    return error;
  }

  return error.message;
}

export function handleAPIError(error: unknown) {
  let message = "Something went wrong.";
  let title = "Error";
  if (axios.isAxiosError(error)) {
    message = normalizeAPIError(error.response?.data);
    title = "Error";
  }

  notify({
    message,
    title,
    type: "error",
  });
}

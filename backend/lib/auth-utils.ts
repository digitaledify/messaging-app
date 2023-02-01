import jwt from "jsonwebtoken";
import { config } from "../src/config";
import { SafeUser } from "../src/types";
import { compareSync, hash } from "bcryptjs";
import { pick } from "./util";
import { sendEmail } from "./emails";
import logger from "./logger";

export function generateToken(user: SafeUser): string {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      username: user.username,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

export function comparePasswords(password: string, hash: string) {
  return compareSync(password, hash);
}

export function getSafeUserData<T extends SafeUser>(unSafeUser: T) {
  return pick(unSafeUser, ["email", "name", "username", "avatar"]);
}

export function generatePasswordHash(password: string) {
  return hash(password, 10);
}

export function generatePasswordResetLink(email: string) {
  const jwtSignedUserId = jwt.sign({ email }, config.JWT_SECRET, {
    expiresIn: "30m",
  });
  const url = new URL("/reset-password", config.FRONTEND_URL);
  url.searchParams.set("email", jwtSignedUserId);
  return url.toString();
}

export async function sendPasswordResetLink(email: string) {
  const link = generatePasswordResetLink(email);
  try {
    await sendEmail({
      to: email,
      subject: "Password reset link",
      text: link,
    });
  } catch (error) {
    logger.fatal(error);
    throw new Error("Failed to email password reset link");
  }
}

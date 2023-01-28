import jwt from "jsonwebtoken";
import { config } from "../src/config";
import { SafeUser } from "../src/types";
import { compareSync, hash } from "bcryptjs";
import { pick } from "./util";

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

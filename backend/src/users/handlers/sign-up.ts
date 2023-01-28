import { Prisma, User } from "@prisma/client";
import { RequestHandler } from "express";
import {
  generatePasswordHash,
  generateToken,
  getSafeUserData,
} from "../../../lib/auth-utils";
import db from "../../../lib/db";
import { SignUpDataSchema } from "../zod-schemas";

const signUpHandler: RequestHandler = async (req, res, next) => {
  const { name, email, password, username } = SignUpDataSchema.parse(req.body);

  // Create user
  let user: User;
  try {
    user = await db.user.create({
      data: {
        name,
        email,
        username,
        passwordHash: await generatePasswordHash(password),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({
          error: "An account with same email already exists.",
        });
      }
    }

    next(error);
    return;
  }

  // Send token
  const token = generateToken(user);
  res.json({
    token,
    user: getSafeUserData(user),
  });
};

export default signUpHandler;

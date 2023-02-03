import { expressjwt } from "express-jwt";
import { config } from "../../src/config";
import { SocketIOMiddleware } from "../../src/types/socket-io";
import jwt from "jsonwebtoken";
import { getAuthTokenPayload } from "../auth-utils";
import { pick } from "../util";

function authenticate() {
  return expressjwt({
    secret: config.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "user",
  }).unless({
    path: [
      "/api/v1/users/sign-in",
      "/api/v1/users/sign-up",
      "/api/v1/users/forgot-password",
      "/api/v1/users/reset-password",
    ], // Skip auth check for sign in and sign up
  });
}

export const authenticateSocket: SocketIOMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new Error("Auth token not found."));
    return;
  }

  const payload = getAuthTokenPayload(token);
  if (!payload) {
    next(new Error("Invalid auth token."));
    return;
  }

  socket.data.user = pick(payload, ["username", "email", "avatar", "name"]);
  next();
};

export default authenticate;

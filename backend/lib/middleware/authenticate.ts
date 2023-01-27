import { expressjwt } from "express-jwt";
import { config } from "../../src/config";

 function authenticate() {
  return expressjwt({
    secret: config.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/v1/users/sign-in", "/api/v1/users/sign-up"], // Skip auth check for sign in and sign up
  });
}

export default authenticate;
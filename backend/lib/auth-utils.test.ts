import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import {
  generatePasswordResetLink,
  getPasswordResetTokenPayload,
} from "./auth-utils";
import { toBase64 } from "./util";

describe("Test auth utils", () => {
  it("Reset link decodes given jwt correctly", () => {
    const email = "ramesh@example.com";
    const link = generatePasswordResetLink(email);
    const token = new URL(link).searchParams.get("token");
    expect(token).not.toBeNull();
    const payload = getPasswordResetTokenPayload(token as string);
    expect((payload as JwtPayload).email).toBe(email);
  });
  it("Handles tampered reset token correctly", () => {
    const email = "ramesh@example.com";
    const link = generatePasswordResetLink(email);
    const token = new URL(link).searchParams.get("token") as string; // Change some chars
    expect(token).not.toBeNull();
    const tamperedToken = [
      token.split(".")[0],
      toBase64(JSON.stringify({ email: "not-ramesh@example.com" })),
      token.split(".")[2],
    ].join(".");
    expect(() =>
      getPasswordResetTokenPayload(tamperedToken as string)
    ).toThrowError(JsonWebTokenError);
  });
});

import forgotPasswordHandler from "./forgot-password";
import getUsersListHandler from "./get-users-list";
import signInHandler from "./sign-in";
import signUpHandler from "./sign-up";
import updateUserHandler from "./update-user";

export const userHandlers = {
  signInHandler,
  signUpHandler,
  getUsersListHandler,
  updateUserHandler,
  forgotPasswordHandler
};

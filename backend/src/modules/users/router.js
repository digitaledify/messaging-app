"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlers_1 = require("./handlers");
const validator_1 = __importDefault(
  require("../../../lib/middleware/validator")
);
const zod_schemas_1 = require("./zod-schemas");
const zod_schemas_2 = require("../../../lib/zod-schemas");
const userRouter = (0, express_1.Router)({
  mergeParams: true,
});
userRouter.get(
  "/:username",
  (0, validator_1.default)(zod_schemas_2.UsernameParamsSchema, "params"),
  handlers_1.userHandlers.getUserHandler
);
userRouter.post(
  "/sign-in",
  (0, validator_1.default)(zod_schemas_1.SignInDataSchema),
  handlers_1.userHandlers.signInHandler
);
userRouter.post(
  "/sign-up",
  (0, validator_1.default)(zod_schemas_1.SignUpDataSchema),
  handlers_1.userHandlers.signUpHandler
);
userRouter.post(
  "/forgot-password",
  (0, validator_1.default)(zod_schemas_2.EmailQueryParamsSchema, "query"),
  handlers_1.userHandlers.forgotPasswordHandler
);
userRouter.post(
  "/reset-password",
  (0, validator_1.default)(zod_schemas_1.ResetPasswordSchema),
  handlers_1.userHandlers.resetPasswordHandler
);
userRouter.put(
  "/",
  (0, validator_1.default)(zod_schemas_1.UpdateUserSchema),
  handlers_1.userHandlers.updateUserHandler
);
userRouter
  .route("/")
  .put(
    (0, validator_1.default)(zod_schemas_1.UpdateUserSchema),
    handlers_1.userHandlers.updateUserHandler
  )
  .get(
    (0, validator_1.default)(zod_schemas_2.SearchQuerySchema, "query"),
    handlers_1.userHandlers.getUsersListHandler
  );
exports.default = userRouter;

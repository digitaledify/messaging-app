"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../lib/middleware/validator"));
const handlers_1 = __importDefault(require("./handlers"));
const zod_schemas_1 = require("./zod-schemas");
const channelsRouter = (0, express_1.Router)();
channelsRouter
  .route("/")
  .get(handlers_1.default.getChannelsHandler)
  .post(
    (0, validator_1.default)(zod_schemas_1.CreateChannelDataSchema),
    handlers_1.default.createChannelHandler
  );
exports.default = channelsRouter;

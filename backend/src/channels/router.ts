import { Router } from "express";
import validator from "../../lib/middleware/validator";
import { ChannelNameParamsSchema, UsernameParamsSchema } from "../../lib/zod-schemas";
import channelHandlers from "./handlers";
import { CreateChannelDataSchema } from "./zod-schemas";

const channelsRouter = Router();

channelsRouter
  .route("/")
  .get(channelHandlers.getChannelsHandler)
  .post(
    validator(CreateChannelDataSchema),
    channelHandlers.createChannelHandler
  );

channelsRouter
  .route("/:channelName")
  .get(
    validator(ChannelNameParamsSchema, "params"),
    channelHandlers.getChannelHandler
  );

export default channelsRouter;

import { Router } from "express";
import validator from "../../lib/middleware/validator";
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

export default channelsRouter;

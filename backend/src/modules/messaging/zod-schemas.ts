import { z } from "zod";

export const ChatTypeSchema = z.enum(["dm", "channel"]).optional();

export const MessagesPaginationCursorSchema = z
  .object({
    chatType: z.literal("dm"),
    messageId: z.string(),
    username: z.string(),
  })
  .or(
    z.object({
      chatType: z.literal("channel"),
      messageId: z.string(),
      channelName: z.string(),
    })
  );

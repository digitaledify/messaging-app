import { z } from "zod";
import db from "../../../../lib/db";
import { sanitizeError } from "../../../../lib/errors";
import io from "../../../socketio";
import { SocketEventHandler } from "../../../types/util";
import createMessage from "../repository/create-message";
import getOldMessagesAsPage from "../repository/get-old-messages-page";
import {
  CreateMessageSchema,
  MessagesPaginationCursorSchema,
} from "../zod-schemas";

export const handleNewMessage: SocketEventHandler<"messages:new_message"> =
  (socket) => async (message) => {
    let validatedMessage;
    let newMessage;
    try {
      validatedMessage = CreateMessageSchema.parse(message);
      newMessage = await createMessage({
        ...validatedMessage,
        fromUsername: z.string().parse(socket.data.user?.username),
      });
    } catch (error) {
      socket.emit("app_error", sanitizeError(error));
      return;
    }

    io.emit("messages:new_message", newMessage);
  };

export const handleGetMessages: SocketEventHandler<
  "messages:get_old_messages"
> = (socket) => async (cursor, chatType, to, callback) => {
  console.log("lol, im");

  if (chatType === "channel") {
    throw new Error("not implemented");
  }

  let messages;
  try {
    // Cursor not available, for first time.
    if (!cursor) {
      messages = await db.message.findMany({
        take: 20,
        where: {
          toUsername: to,
        },
        orderBy: {
          time: "desc",
        },
      });
    } else {
      // Next pages
      messages = await db.message.findMany({
        take: 20,
        skip: 1, // Skip the cursor
        where: {
          toUsername: to,
        },
        orderBy: {
          time: "desc",
        },
        cursor: {
          id: cursor,
        },
      });
    }
  } catch (error) {
    socket.emit("app_error", sanitizeError(error));
    return;
  }

  const nextCursor = messages.length === 20 ? messages[19].id : null;

  console.log("🚀 ~ file: index.ts:76 ~ >= ~ { data: messages, nextCursor }", {
    data: messages,
    nextCursor,
  });
  callback({ data: messages, nextCursor });
};

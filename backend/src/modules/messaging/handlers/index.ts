import { z } from "zod";
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
> = (socket) => async (cursor, callback) => {
  let page;
  let validatedCursor;
  try {
    validatedCursor = MessagesPaginationCursorSchema.parse(cursor);
    page = await getOldMessagesAsPage({
      ...validatedCursor,
      fromUsername: z.string().parse(socket.data.user?.username),
    });
  } catch (error) {
    socket.emit("app_error", sanitizeError(error));
    return;
  }

  callback(page);
};

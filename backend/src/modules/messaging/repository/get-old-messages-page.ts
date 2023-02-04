import { Message } from "@prisma/client";
import db from "../../../../lib/db";
import { MessagesPaginationCursor } from "../../../types";

async function getOldMessagesAsPage(
  cursor: MessagesPaginationCursor & Pick<Message, "fromUsername">
): Promise<{ data: Message[]; nextCursor: MessagesPaginationCursor | null }> {
  const messages = await db.message.findMany({
    where: {
      fromUsername: cursor.fromUsername,
      [cursor.chatType === "channel" ? "channelName" : "toUsername"]:
        cursor.chatType === "channel" ? cursor.channelName : cursor.username,
    },
    take: 21,
    cursor: {
      id: cursor.messageId,
    },
    orderBy: {
      time: "asc",
    },
  });

  return {
    data: messages.slice(0, -2),
    nextCursor: messages[20].id
      ? {
          ...cursor,
          messageId: messages[20].id,
        }
      : null,
  };
}

export default getOldMessagesAsPage;

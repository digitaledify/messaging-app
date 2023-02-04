import { Socket } from "socket.io-client";
import { Message, MessagesPaginationCursor } from ".";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: boolean) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  "users:user_online": (username: string) => void;
  "users:user_offline": (username: string) => void;
  "users:user_created": (username: string) => void;
  "messages:new_message": (message: Message) => void;
}
export interface ClientToServerEvents {
  "messages:new_message": (
    message: Pick<Message, "text" | "toUsername">
  ) => void;
  "messages:get_new_messages": (
    cursor: MessagesPaginationCursor | null,
    callback: (messages: { data: Message[]; nextCursor?: string }) => void
  ) => void;
}

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

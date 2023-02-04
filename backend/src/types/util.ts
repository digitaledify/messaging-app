import { AppSocket, ClientToServerEvents } from "./socket-io";

export type SocketEventHandler<T extends keyof ClientToServerEvents> = (
  socket: AppSocket
) => ClientToServerEvents[T];

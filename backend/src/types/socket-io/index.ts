import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { SafeUser } from "..";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: SafeUser;
}

export type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketIOMiddleware = (
  socket: AppSocket,
  next: (err?: ExtendedError | undefined) => void
) => void;

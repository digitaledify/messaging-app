import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types/socketio";

const httpServer = createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

export default httpServer;

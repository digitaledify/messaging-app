import httpServer from "./server";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types/socket-io";
import { authenticateSocket } from "../lib/middleware/authentication";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.use(authenticateSocket);

io.on("connection", (socket) => {});

export default io;

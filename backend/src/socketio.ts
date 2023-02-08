import httpServer from "./server";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types/socketio";
import { authenticateSocket } from "../lib/middleware/authentication";
import {
  handleGetMessages,
  handleNewMessage,
} from "./modules/messaging/handlers";

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

io.on("connection", (socket) => {
  socket.join(socket.data.user?.username as string);

  socket.on("messages:get_old_messages", handleGetMessages(socket));
  socket.on('messages:new_message', )
});

export default io;

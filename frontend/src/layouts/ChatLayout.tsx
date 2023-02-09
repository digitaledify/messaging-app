import { IconBuildingLighthouse } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import socket from "../lib/socketio";
import { ChatPageParamsSchema } from "../lib/zod-schemas";
import { ChatType, CreateMessageData, Message } from "../types";

interface ChatContext {
  getMessages: (room: string) => Message[];
  getCursor: (room: string) => string | null;
  room: string;
  usernameOrChannelName: string;
  sendMessage: (message: CreateMessageData) => void;
  chatType: ChatType;
}

function ChatLayout() {
  const [messages, setMessages] = useState(new Map<string, Message[]>());
  const [cursors, setCursors] = useState(new Map<string, string | null>());
  const auth = useAuth();

  console.log(useParams());
  const params = ChatPageParamsSchema.parse(useParams());
  const room =
    params.chatType === "dm"
      ? [auth.user?.username, params.name].sort().join("-")
      : params.name;
  const usernameOrChannelName = params.name;

  // Listen for new messages
  useEffect(() => {
    socket.on("messages:new_message", (message) => {
      console.log("new message", message);
      setMessages((messages) => {
        return new Map(messages).set(room, [
          ...(messages.get(room) || []),
          message,
        ]);
      });
    });

    return () => {
      socket.off("messages:new_message");
    };
  }, [room]);

  // Fetch old initial 20 messages
  const isInitialMessagesFetched = messages.has(room);
  useEffect(() => {
    if (isInitialMessagesFetched) {
      return;
    }
    socket.emit(
      "messages:get_old_messages",
      null,
      params.chatType,
      usernameOrChannelName,
      (page) => {
        setMessages((messages) => new Map(messages).set(room, [...page.data]));
        setCursors((cursors) => new Map(cursors).set(room, page.nextCursor));
      }
    );
  }, [isInitialMessagesFetched, params.chatType, room, usernameOrChannelName]);

  const sendMessage = (message: CreateMessageData) => {
    socket.emit("messages:new_message", message);
  };

  const context: ChatContext = {
    getCursor(room) {
      return cursors.get(room) || null;
    },
    getMessages(room) {
      return messages.get(room) || [];
    },
    room,
    sendMessage,
    chatType: params.chatType,
    usernameOrChannelName,
  };

  return (
    <>
      <Outlet context={context} />
    </>
  );
}

export const useChatContext = () => useOutletContext<ChatContext>();

export default ChatLayout;

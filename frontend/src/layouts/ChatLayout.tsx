import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { z } from "zod";
import socket from "../lib/socketio";
import { ChatType, Message, MessagesPaginationCursor } from "../types";

type MessagePages = Record<
  string,
  {
    data: Message[];
    nextCursor?: string;
  }
>;

type OutletContext = {
  getMessages: (usernameOrChannelName: string) => {
    data: Message[];
    nextCursor: MessagesPaginationCursor | null;
  };
  handleNewMessage: (chatType: ChatType, text: string, to: string) => void;
  handlePagination: (cursor: MessagesPaginationCursor | null) => void;
};

function ChatLayout() {
  const [messages, setMessages] = useState<MessagePages>({});

  const handlePagination = (cursor: MessagesPaginationCursor | null) => {
    if (!cursor) {
      return;
    }
    socket.emit("messages:get_new_messages", cursor, (page) => {
      const to =
        cursor.chatType === "dm" ? cursor.username : cursor.channelName;

      setMessages({
        ...messages,
        [to]: {
          data: [...page.data, ...messages[to].data],
          nextCursor: page.nextCursor,
        },
      });
    });
  };

  const handleNewMessage = (chatType: ChatType, text: string, to: string) => {
    socket.emit("messages:new_message", {
      text,
      toUsername: to, // to channel name?
    });
  };

  useEffect(() => {
    socket.on("messages:new_message", (message) => {
      const to = z.string().parse(message.toUsername || message.channelName);
      setMessages({
        ...messages,
        [to]: {
          ...messages[to],
          data: [...messages[to].data, message],
        },
      });
    });

    return () => {
      socket.off("messages:new_message");
    };
  }, [messages]);

  const getMessages = (usernameOrChannelName: string) =>
    messages[usernameOrChannelName];

  const context: OutletContext = {
    getMessages,
    handleNewMessage,
    handlePagination,
  };

  return (
    <>
      <Outlet context={context} />
    </>
  );
}

export const useChatContext = () => useOutletContext<OutletContext>();

export default ChatLayout;

import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { z } from "zod";
import socket from "../lib/socketio";
import { ChatType, Message, MessagesPaginationCursor } from "../types";

type MessagePages = Record<
  string,
  {
    data: Message[];
    nextCursor: MessagesPaginationCursor | null;
  }
>;

type OutletContext = {
  getMessages: (usernameOrChannelName: string) => {
    data: Message[];
    nextCursor: MessagesPaginationCursor;
  };
  handleNewMessage: (
    chatType: NonNullable<ChatType>,
    text: string,
    to: string
  ) => void;
  handlePagination: (cursor: MessagesPaginationCursor) => void;
};

function ChatLayout() {
  const [messages, setMessages] = useState<MessagePages>({});

  const handlePagination = (cursor: MessagesPaginationCursor) => {
    socket.emit("messages:get_old_messages", cursor, (page) => {
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

  const handleNewMessage = (
    chatType: NonNullable<ChatType>,
    text: string,
    usernameOrChannelName: string
  ) => {
    if (chatType === "channel") {
      socket.emit("messages:new_message", {
        text,
        chatType,
        channelName: usernameOrChannelName,
      });
    } else {
      // dm case
      socket.emit("messages:new_message", {
        text,
        chatType,
        username: usernameOrChannelName,
      });
    }
  };

  useEffect(() => {
    socket.on("messages:new_message", (message) => {
      const to = z.string().parse(message.toUsername || message.channelName);
      setMessages({
        ...messages,
        [to]: {
          ...messages[to],
          data: [...(messages[to]?.data || []), message],
        },
      });
    });

    return () => {
      socket.off("messages:new_message");
    };
  }, [messages]);

  const getMessages = (usernameOrChannelName: string) =>
    messages[usernameOrChannelName] || {
      data: [],
      nextCursor: null,
    };

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

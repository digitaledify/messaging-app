import { Stack, Box, Divider, ScrollAreaProps } from "@mantine/core";
import { IconSelector } from "@tabler/icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { z } from "zod";
import { UserButton } from "../../components/UserButton";
import useAuth from "../../hooks/useAuth";
import socket from "../../lib/socketio";
import { ChatType, Message, User } from "../../types";
import Messages from "./messages";

type PageProps = {
  chatType: ChatType;
};

function Page(props: PageProps) {
  const data = useLoaderData() as User;
  const auth = useAuth();
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });
      viewport.current.scrollIntoView();
    }
  };

  const params = useParams();
  const username = z.string().parse(params.username);

  const [messages, setMessages] = useState<Message[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  useEffect(() => {
    console.log("emitting event");
    socket.emit(
      "messages:get_old_messages",
      null,
      props.chatType,
      username,
      (page) => {
        setMessages((prevMessages) => [...page.data, ...prevMessages]);
        setCursor(page.nextCursor);
        scrollToBottom();
      }
    );
  }, [props.chatType, username]);

  const handleScrollPositionChange: ScrollAreaProps["onScrollPositionChange"] =
    (position) => {
      if (position.y === 0 && cursor) {
        socket.emit(
          "messages:get_old_messages",
          cursor,
          props.chatType,
          username,
          (page) => {
            setMessages((prevMessages) => [...page.data, ...prevMessages]);
            setCursor(page.nextCursor);
            scrollToBottom();
          }
        );
      }
    };

  return (
    <Stack
      align={"stretch"}
      sx={{ height: "100vh" }}
      pb="md"
      px={"md"}
      spacing={"md"}
      justify={"space-between"}
    >
      <Box>
        <UserButton
          image={data.avatar}
          name={data.name}
          email={data.email}
          icon={<IconSelector size={14} stroke={1.5} />}
        />
        <Divider mx={"-md"} />
      </Box>
      <Messages
        ref={viewport}
        handleScrollPositionChange={handleScrollPositionChange}
        messages={messages}
      />
    </Stack>
  );
}

export default Page;

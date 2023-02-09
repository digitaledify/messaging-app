import {
  Stack,
  Box,
  Divider,
  ScrollAreaProps,
  Group,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { IconAdjustments, IconEdit, IconEditCircle, IconSelector, IconSettings, IconSettingsAutomation } from "@tabler/icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { z } from "zod";
import { ColorSchemeToggle } from "../../components/ColorSchemeToggle";
import { ChatProfile } from "../../components/ChatProfile";
import useAuth from "../../hooks/useAuth";
import { useChatContext } from "../../layouts/ChatLayout";
import socket from "../../lib/socketio";
import { Channel, ChatType, Message, User } from "../../types";
import Messages from "./messages";

function Page() {
  const data = useLoaderData() as User | Channel;
  const { getMessages, room } = useChatContext();
  const viewport = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   if (viewport.current) {
  //     viewport.current.scrollTo({
  //       top: viewport.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //     viewport.current.scrollIntoView();
  //   }
  // };

  // const handleScrollPositionChange: ScrollAreaProps["onScrollPositionChange"] =
  //   (position) => {
  //     if (position.y === 0 && cursor) {
  //       socket.emit(
  //         "messages:get_old_messages",
  //         cursor,
  //         props.chatType,
  //         username,
  //         (page) => {
  //           setMessages((prevMessages) => [...page.data, ...prevMessages]);
  //           setCursor(page.nextCursor);
  //           scrollToBottom();
  //         }
  //       );
  //     }
  //   };

  const messages = getMessages(room);

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
        <Flex>
          <ChatProfile />
          <Flex justify={"center"} align="center" gap={16}>
            <ActionIcon
              // onClick={() => toggleColorScheme()}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[6],
              })}
            >
              <IconAdjustments />
            </ActionIcon>
            <ColorSchemeToggle />
          </Flex>
        </Flex>

        <Divider mx={"-md"} />
      </Box>
      <Messages
        ref={viewport}
        // handleScrollPositionChange={handleScrollPositionChange}
        messages={messages}
      />
    </Stack>
  );
}

export default Page;

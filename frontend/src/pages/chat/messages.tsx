import {
  Box,
  Card,
  ScrollArea,
  ScrollAreaProps,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import { useChatContext } from "../../layouts/ChatLayout";
import { ChatTypeSchema } from "../../lib/zod-schemas";
import { ChatPageParams } from "./loader";

function Messages() {
  const params = useParams<ChatPageParams>();
  const usernameOrChannelName = z.string().parse(params.usernameOrChannelName);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatType = ChatTypeSchema.parse(searchParams.get("chatType"));
  const [message, setMessage] = useState("");
  const { getMessages, handleNewMessage, handlePagination } = useChatContext();
  const messages = getMessages(usernameOrChannelName);
  const auth = useAuth();

  useEffect(() => {
    // Trigger on mount
    if (messages.data.length === 0) {
      handlePagination(null);
    }
  }, [handlePagination, messages.data.length]);

  const handleScrollPositionChange: ScrollAreaProps["onScrollPositionChange"] =
    (position) => {
      if (position.y > 50) {
        return;
      }

      handlePagination(messages.nextCursor);
    };

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight * 2,
        behavior: "smooth",
      });
    }
  };
  const handleMessageSubmit: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.code === "Enter" && chatType) {
      handleNewMessage(chatType, message, usernameOrChannelName);
      setMessage("");
      scrollToBottom();
    }
  };
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatType) {
      setSearchParams(new URLSearchParams([["chatType", "dm"]]));
    }
  }, [chatType, setSearchParams]);


  return (
    <>
      <ScrollArea
        sx={{
          height: "100%",
        }}
        ref={viewport}
        onScrollPositionChange={handleScrollPositionChange}
      >
        <Stack spacing={"xs"}>
          {messages.data.map((message) => {
            if (message.fromUsername === auth.user?.username) {
              return (
                <Card
                  key={message.id}
                  shadow={"sm"}
                  withBorder
                  w={"60%"}
                  mr="auto"
                  radius={"md"}
                  sx={(theme) => ({
                    background: theme.colors.blue[9],
                    color: theme.white,
                  })}
                >
                  <Card.Section>
                    <Text
                      sx={(theme) => ({
                        padding: theme.spacing.xs,
                        borderRadius: theme.radius.md,
                        width: "60%",
                      })}
                      size="sm"
                    >
                      {message.text}
                    </Text>
                    <Text
                      color={"dimmed"}
                      sx={(theme) => ({
                        color: theme.white,
                      })}
                      size="xs"
                      p={"xs"}
                    >
                      {message.time.toString()}
                    </Text>
                  </Card.Section>
                </Card>
              );
            }

            return (
              <>
                <Card
                  shadow={"sm"}
                  radius={"md"}
                  withBorder
                  w={"60%"}
                  ml="auto"
                >
                  <Card.Section>
                    <Text
                      sx={(theme) => ({
                        // background: theme.colors.blue[9],
                        color:
                          theme.colorScheme === "light"
                            ? theme.black
                            : theme.white,
                        padding: theme.spacing.xs,
                        borderRadius: theme.radius.md,
                        width: "60%",
                      })}
                      size="sm"
                    >
                      {message.text}
                    </Text>
                    <Text color={"dimmed"} size="xs" p={"xs"}>
                      {message.time.toString()}
                    </Text>
                  </Card.Section>
                </Card>
              </>
            );
          })}
        </Stack>
      </ScrollArea>
      <Box>
        <TextInput
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleMessageSubmit}
          rightSection={<IconSend />}
          placeholder="Type here.."
        />
        <Space h={10} />
      </Box>
    </>
  );
}

export default Messages;

import {
  Box,
  Card,
  ScrollArea,
  ScrollAreaProps,
  Space,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { KeyboardEventHandler, useEffect, useState } from "react";
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

  if (!chatType) {
    setSearchParams(new URLSearchParams([["chatType", "dm"]]));
    return null;
  }

  const handleScrollPositionChange: ScrollAreaProps["onScrollPositionChange"] =
    (position) => {
      if (position.y > 50) {
        return;
      }

      handlePagination(messages.nextCursor);
    };

  const handleMessageSubmit: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.code === "Enter") {
      handleNewMessage(chatType, message, usernameOrChannelName);
    }
  };

  return (
    <>
      <ScrollArea
        sx={{
          height: "100%",
        }}
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
                      Dolor est nulla culpa eu occaecat amet culpa excepteur
                      velit
                    </Text>
                    <Text
                      color={"dimmed"}
                      sx={(theme) => ({
                        color: theme.white,
                      })}
                      size="xs"
                      p={"xs"}
                    >
                      23:23 Sent
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
                      Dolor est nulla culpa eu occaecat amet culpa excepteur
                      velit cupidatat proident ut quis aliqua. Esse ad nostrud
                      nulla sint occaecat laborum officia. Fugiat velit nulla
                      velit sit. Do anim proident id reprehenderit occaecat
                      commodo cillum id adipisicing in culpa amet. Nostrud non
                      consequat irure exercitation duis magna sint. Tempor esse
                      pariatur ad aliqua consectetur ullamco et.
                    </Text>
                    <Text color={"dimmed"} size="xs" p={"xs"}>
                      23:23 Sent
                    </Text>
                  </Card.Section>
                </Card>
              </>
            );
          })}
        </Stack>
      </ScrollArea>
      <Box>
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleMessageSubmit}
        />
        <Space h={10} />
      </Box>
    </>
  );
}

export default Messages;

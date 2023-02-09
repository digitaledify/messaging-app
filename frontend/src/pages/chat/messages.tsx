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
import { forwardRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useChatContext } from "../../layouts/ChatLayout";
import socket from "../../lib/socketio";
import { Message } from "../../types";

type MessagesProps = {
  messages: Message[];
  // handleScrollPositionChange: ScrollAreaProps["onScrollPositionChange"];
};

const Messages = forwardRef<HTMLDivElement, MessagesProps>(function Messages(
  props: MessagesProps,
  ref
) {
  const auth = useAuth();
  const [text, setText] = useState("");
  const { usernameOrChannelName, chatType, room } = useChatContext();
  const handleMessageSubmit: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.code !== "Enter") {
      return;
    }

    socket.emit(
      "messages:new_message",
      chatType === "dm"
        ? {
            chatType,
            username: usernameOrChannelName,
            text,
          }
        : {
            chatType,
            channelName: usernameOrChannelName,
            text,
          }
    );

    setText("");
  };

  return (
    <>
      <ScrollArea
        sx={{
          height: "100%",
        }}
        ref={ref}
        // onScrollPositionChange={props.handleScrollPositionChange}
      >
        <Stack spacing={"xs"}>
          {props.messages.map((message) => {
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
              <Card
                shadow={"sm"}
                radius={"md"}
                withBorder
                key={message.id}
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
            );
          })}
        </Stack>
      </ScrollArea>
      <Box>
        <TextInput
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleMessageSubmit}
          rightSection={<IconSend />}
          autoComplete="off"
          placeholder="Type here.."
        />
        <Space h={10} />
      </Box>
    </>
  );
});

export default Messages;

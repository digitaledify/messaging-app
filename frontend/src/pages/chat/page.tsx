import { Stack, Box, Divider, Flex, ActionIcon } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons";
import { ColorSchemeToggle } from "../../components/ColorSchemeToggle";
import { ChatProfile } from "../../components/ChatProfile";
import { useChatContext } from "../../layouts/ChatLayout";
import Messages from "./messages";
import DeleteChannel from "./components/DeleteChannel";

function Page() {
  const { getMessages, room, chatType } = useChatContext();
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
            {chatType === "channel" ? (
              <>
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
                <DeleteChannel />
              </>
            ) : null}
            <ColorSchemeToggle />
          </Flex>
        </Flex>

        <Divider mx={"-md"} />
      </Box>
      <Messages messages={messages} />
    </Stack>
  );
}

export default Page;

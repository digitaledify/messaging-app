import { Stack, Box, Divider, Textarea, Space } from "@mantine/core";
import { IconSelector } from "@tabler/icons";
import { Outlet } from "react-router-dom";
import Comments from "../components/Comments";
import { UserButton } from "../components/UserButton";

function Chat() {
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
          image="https://i.imgur.com/fGxgcDF.png"
          name="Bob Rulebreaker"
          email="Product owner"
          icon={<IconSelector size={14} stroke={1.5} />}
        />
        <Divider mx={"-md"} />
      </Box>

      <Outlet />
    </Stack>
  );
}

export default Chat;

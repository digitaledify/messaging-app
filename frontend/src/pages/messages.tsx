import { Box, Space, Textarea } from "@mantine/core";
import Comments from "../components/Comments";

function Messages() {
  return (
    <>
      <Comments />
      <Box>
        <Textarea />
        <Space h={10} />
      </Box>
    </>
  );
}

export default Messages;

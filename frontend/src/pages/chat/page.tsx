import { Stack, Box, Divider } from "@mantine/core";
import { IconSelector } from "@tabler/icons";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { UserButton } from "../../components/UserButton";
import { ChatTypeSchema } from "../../lib/zod-schemas";
import { ChatType, User } from "../../types";
import Messages from "./messages";

function Page() {
  const data = useLoaderData() as User;
 

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
      <Messages />
    </Stack>
  );
}

export default Page;

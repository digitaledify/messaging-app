import "./App.css";
import { AppShell, Box, Divider, Space, Stack, Textarea } from "@mantine/core";
import { NavbarSearch } from "./components/NavbarSearch";
import { IconSelector } from "@tabler/icons";
import { UserButton } from "./components/UserButton";
import Comments from "./components/Comments";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function App() {
  // Redirect to signin if not logged in
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/sign-in");
  }

  return (
    <AppShell
      fixed
      padding={0}
      aside={<NavbarSearch />}
      styles={{
        main: {
          overflow: "hidden",
          height: "100vh",
        },
      }}
    >
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

        <Comments />
        <Box>
          <Textarea />
          <Space h={10} />
        </Box>
      </Stack>
    </AppShell>
  );
}

export default App;

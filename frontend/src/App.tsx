import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  AppShell,
  Box,
  ColorScheme,
  ColorSchemeProvider,
  createStyles,
  Divider,
  Group,
  Header,
  MantineProvider,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { NavbarSearch } from "./components/NavbarSearch";
import { IconSelector } from "@tabler/icons";
import { UserButton } from "./components/UserButton";
import Comments from "./components/Comments";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./router";
import { NotificationsProvider } from "@mantine/notifications";
import useAuth from "./hooks/useAuth";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Register shortcuts
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  // Redirect to signin if not logged in
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/sign-in");
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        <NotificationsProvider>
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
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

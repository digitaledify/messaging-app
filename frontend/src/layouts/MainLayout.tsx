import React from "react";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from '@mantine/modals';
import { Outlet, useLoaderData } from "react-router-dom";
import AuthProvider from "../contexts/authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function MainLayout() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Register shortcuts
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <AuthProvider>
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
          <NotificationsProvider position="top-right">
            <Outlet />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  );
}

export default MainLayout;

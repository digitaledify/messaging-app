import "../App.css";

import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import {
  ColorScheme,
  ColorSchemeProvider,
  Loader,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Outlet } from "react-router-dom";
import AuthProvider from "../contexts/authentication/AuthProvider";
import { Suspense } from "react";

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

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
}

export default App;

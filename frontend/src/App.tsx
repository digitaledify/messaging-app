import "./App.css";
import { AppShell, Box, Divider, Space, Stack, Textarea } from "@mantine/core";
import { NavbarSearch } from "./components/NavbarSearch";
import { IconSelector } from "@tabler/icons";
import { UserButton } from "./components/UserButton";
import Comments from "./components/Comments";
import { Outlet, useNavigate } from "react-router-dom";
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
      <Outlet />
    </AppShell>
  );
}

export default App;

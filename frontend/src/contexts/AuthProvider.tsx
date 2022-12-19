import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../types";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface IAuthContext extends AuthState {
  signIn: (authState: AuthState) => Promise<void>;
  signUp: (authState: AuthState) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useLocalStorage<AuthState>({
    key: "authState",
    defaultValue: {
      token: null,
      user: null,
    },
  });

  const signIn = async (authState: AuthState) => {
    setAuthState(authState);
    navigate("/");
    showNotification({
      title: "Welcome back!",
      message: "You have successfully signed in.",
      icon: <IconCheck />,
      color: "teal",
    });
  };

  const signUp = async (authState: AuthState) => {
    setAuthState(authState);
    navigate("/");
    showNotification({
      title: "Welcome!",
      message: "You have successfully signed up.",
      icon: <IconCheck />,
      color: "teal",
    });
  };

  const signOut = async () => {
    setAuthState({
      token: null,
      user: null,
    });
    navigate("/sign-in");
    showNotification({
      title: "Goodbye!",
      message: "You have successfully signed out.",
      icon: <IconCheck />,
      color: "teal",
    });
  };

  return <>{props.children}</>;
}

export default AuthProvider;

import { useNavigate } from "react-router-dom";
import { AuthState } from "../../types";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import StorageKeys from "../../lib/storage-keys";
import { persistAuthState, retriveAuthState } from "../../lib/auth-utils";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({});

  const signIn = async (authState: Required<AuthState>) => {
    setAuthState(authState);
    persistAuthState(authState);
    navigate("/");
    showNotification({
      title: "Welcome back!",
      message: "You have successfully signed in.",
      icon: <IconCheck />,
      color: "teal",
    });
  };

  const signUp = async (authState: Required<AuthState>) => {
    setAuthState(authState);
    persistAuthState(authState);
    navigate("/");
    showNotification({
      title: "Welcome!",
      message: "You have successfully signed up.",
      icon: <IconCheck />,
      color: "teal",
    });
  };

  const signOut = async () => {
    setAuthState({});
    localStorage.removeItem(StorageKeys.AUTH_STATE);
    navigate("/sign-in");
    showNotification({
      title: "Goodbye!",
      message: "You have successfully signed out.",
      icon: <IconCheck />,
      color: "teal",
    });
  };

  useEffect(() => {
    const authState = retriveAuthState();
    if (authState) {
      setAuthState(authState);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!authState.token,
        ...authState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

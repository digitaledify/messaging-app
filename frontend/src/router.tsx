import { createBrowserRouter } from "react-router-dom";
import App from "./layouts/MainLayout";
import MainLayout from "./layouts/App";
import Bot from "./pages/bot";
import Chat from "./pages/chat";
import { ErrorPage } from "./pages/error-page";
import { ForgotPassword } from "./pages/forgot-password";
import Me from "./pages/me";
import Messages from "./pages/chat/messages";
import Notifications from "./pages/notifications";
import { ResetPassword } from "./pages/reset-password";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import chatPage from "./pages/chat";
import GenericError from "./components/GenericError";
import ChatLayout from "./layouts/ChatLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "bot",
            element: <Bot />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "me",
            element: <Me />,
          },
          {
            path: "chat",
            element: <ChatLayout />,
            children: [
              {
                path: ":chatType/:name",
                element: <chatPage.Page />,
                loader: chatPage.loader,
                errorElement: <GenericError />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

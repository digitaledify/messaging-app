import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./layouts/MainLayout";
import { ErrorPage } from "./pages/error-page";
import { ForgotPassword } from "./pages/forgot-password";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

export default router;

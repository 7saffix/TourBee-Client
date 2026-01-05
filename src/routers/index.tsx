import App from "@/App";
import AboutPage from "@/pages/AboutPage";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: AboutPage,
        path: "about",
      },
    ],
  },
  {
    Component: Signup,
    path: "/signup",
  },
  {
    Component: Signin,
    path: "/signin",
  },
]);

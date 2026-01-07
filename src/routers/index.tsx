import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AboutPage from "@/pages/AboutPage";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import { generateRoute } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItem";
import { UserSidebarItems } from "./UserSidebarItem";
import Unauth from "@/pages/Unauth";
import { UserRole } from "@/contant/role";
import type { IRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

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
    Component: withAuth(DashboardLayout, UserRole.admin as IRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytic" /> },
      ...generateRoute(AdminSidebarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...generateRoute(UserSidebarItems),
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
  {
    Component: Unauth,
    path: "/unauthorized",
  },
]);

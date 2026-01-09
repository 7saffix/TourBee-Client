import { UserRole } from "@/constant/role";
import { AdminSidebarItems } from "@/routers/AdminSidebarItem";
import { UserSidebarItems } from "@/routers/UserSidebarItem";
import type { IRole } from "@/types";

export const generateSidebarItem = (userRole: IRole) => {
  switch (userRole) {
    case UserRole.superAdmin:
      return [...AdminSidebarItems];
    case UserRole.admin:
      return [...AdminSidebarItems];
    case UserRole.user:
      return [...UserSidebarItems];
    default:
      return [];
  }
};

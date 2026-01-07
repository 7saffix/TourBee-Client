import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { IRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, role?: IRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    if (!data?.user && !isLoading) {
      return <Navigate to={"/signin"} />;
    }

    if (role && !isLoading && data?.user.role !== role) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
};

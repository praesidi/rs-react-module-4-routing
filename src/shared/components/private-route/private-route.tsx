import type { ReactNode } from "react";
import { useAuth } from "../../../app/providers/auth/useAuth";
import { Navigate, useLocation } from "react-router";
import { internalPaths } from "../../constants/routes";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth && auth.user === null) {
    return <Navigate to={internalPaths.login} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

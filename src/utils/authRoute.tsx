import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/provider/Provider";

interface AuthRouteProps {
  children: React.ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default AuthRoute;

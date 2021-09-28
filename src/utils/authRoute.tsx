import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../components/provider/Provider";

function AuthRoute({ children, ...rest }: RouteProps) {
  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/auth", state: { from: location } }} />
        )
      }
    />
  );
}

export default AuthRoute;

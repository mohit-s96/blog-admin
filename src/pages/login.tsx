import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import LoginForm from "../components/login/form";
import { useAuth, useTheme } from "../components/provider/Provider";
import SwitchTheme from "../components/sidebar/switchTheme";
import { getClasses } from "../utils/classNameResolver";

interface Props {
  auth?: boolean;
}

function Login({ auth }: Props): ReactElement {
  const history = useHistory();

  const { signin, isAuth } = useAuth();

  const { theme } = useTheme();

  if (isAuth) {
    history.push("/");
  }

  async function handleSubmit(uname: string, pass: string) {
    if (uname.trim().length > 5 && pass.trim().length > 10) {
      try {
        await signin(uname, pass);
      } catch (err) {
        throw new Error("unauthorized login");
      }
    } else {
      throw new Error("invalid data in form fields");
    }
  }
  return (
    <div
      className={`flex flex-col w-full h-screen ${
        theme === "neon" ? "bg-[#090d24]" : getClasses("bg", theme, "btn")
      } justify-center items-center overflow-hidden`}
    >
      <nav
        className={`flex items-center justify-center absolute w-full top-0 ${getClasses(
          "bg",
          theme
        )}`}
      >
        <SwitchTheme isNav />
      </nav>
      <LoginForm submit={handleSubmit} />
    </div>
  );
}

export default Login;

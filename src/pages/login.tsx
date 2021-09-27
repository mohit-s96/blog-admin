import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import LoginForm from "../components/login/form";
import { useAuth } from "../components/provider/Provider";

interface Props {
  auth?: boolean;
}

function Login({ auth }: Props): ReactElement {
  const history = useHistory();

  const { signin, isAuth } = useAuth();

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
    <div className="flex flex-col w-full h-screen bg-dark-2 justify-center items-center overflow-hidden">
      <LoginForm submit={handleSubmit} />
    </div>
  );
}

export default Login;

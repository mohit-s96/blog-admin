import React, { ReactElement } from "react";

interface Props {
  auth?: boolean;
}

function Login({ auth }: Props): ReactElement {
  return <div>Login page</div>;
}

export default Login;

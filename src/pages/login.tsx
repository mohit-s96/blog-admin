import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../components/provider/Provider";

interface Props {
  auth?: boolean;
}

function Login({ auth }: Props): ReactElement {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  console.log("rendered");

  const history = useHistory();

  const { signin, isAuth } = useAuth();

  if (isAuth) {
    history.push("/");
  }

  async function handleSubmit() {
    if (uname.trim().length > 5 && pass.trim().length > 10) {
      try {
        await signin(uname, pass);
      } catch (err) {
        setError(true);
      }
    } else {
      setError(true);
    }
  }
  return (
    <div className="flex flex-col w-2/12">
      <input
        type="text"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
        className="border-4 border-black m-4"
        placeholder="Username"
      />
      <input
        className="border-4 border-black m-4"
        type="password"
        value={pass}
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />
      {error ? <div className="text-red-600">Unauthorized</div> : null}
      <button className="bg-yellow-400 p-2" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default Login;

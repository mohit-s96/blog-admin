import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router";

interface Props {
  auth?: boolean;
}

function Login({ auth }: Props): ReactElement {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  async function handleSubmit() {
    if (uname.trim().length > 5 && pass.trim().length > 10) {
      try {
        const json = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uname: uname, pass: pass }),
        });
        const data = await json.json();
        if (data.success) {
          setError(false);
          console.log(data);

          // history.push("/");
        }
      } catch (err) {
        console.log(err);
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

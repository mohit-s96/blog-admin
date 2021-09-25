import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUri } from "../../utils/resolvePort";
import AuthLoader from "../loaders/authLoader";

interface Props {
  children: ReactNode;
}

type AuthContextType = {
  isAuth: boolean;
  signin: (uname: string, pass: string) => Promise<void>;
  logout: () => void;
};

const initState: AuthContextType = {
  isAuth: false,
  signin: () => Promise.resolve(),
  logout: () => {},
};

const AuthContext = React.createContext<AuthContextType>(initState);

export const useAuth = () => useContext(AuthContext);

function Provider({ children }: Props): ReactElement {
  const [auth, setAuth] = useState(false);
  const [ready, setReady] = useState(false);

  async function authenticateUser(uname: string, pass: string) {
    try {
      const json = await fetch(`${getUri()}/api/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ uname: uname, pass: pass }),
      });
      const data = await json.json();

      if (data?.message === "success") {
        setAuth(true);
      }
    } catch (error) {
      throw new Error(`Unauthorized: ${JSON.stringify(error)}`);
    }
  }

  function unAuthenticateUser() {
    setAuth(false);
  }

  useEffect(() => {
    fetch(`${getUri()}/api/rfrt`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
        setReady(true);
      })
      .catch(() => {
        setReady(true);
        setAuth(false);
      });
  }, []);

  const value = {
    isAuth: auth,
    signin: authenticateUser,
    logout: unAuthenticateUser,
  };

  if (!ready) {
    return <AuthLoader />;
  } else {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
}

export default Provider;

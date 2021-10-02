import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthContextType,
  ThemeContextType,
  ThemeType,
} from "../../types/globalTypes";
import { getUri } from "../../utils/resolvePort";
import AuthLoader from "../loaders/authLoader";

interface Props {
  children: ReactNode;
}

const initState: AuthContextType = {
  isAuth: false,
  signin: () => Promise.resolve(),
  logout: () => {},
};

const ThemeContext = React.createContext<ThemeContextType>({ theme: "dark" });

const AuthContext = React.createContext<AuthContextType>(initState);

export const useAuth = () => useContext(AuthContext);

export const useTheme = () => useContext(ThemeContext);

function Provider({ children }: Props): ReactElement {
  const [auth, setAuth] = useState(false);
  const [ready, setReady] = useState(false);

  const [theme, setTheme] = useState<ThemeType>("light");

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

      if (!json.ok) {
        throw new Error("error");
      }

      const data = await json.json();

      if (data?.message === "success") {
        setAuth(true);
      }
    } catch (error) {
      throw new Error(`Unauthorized: ${JSON.stringify(error)}`);
    }
  }

  function unAuthenticateUser() {
    fetch(`${getUri()}/api/logout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          setAuth(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    return <AuthLoader theme={theme} />;
  } else {
    return (
      <AuthContext.Provider value={value}>
        <ThemeContext.Provider
          value={{
            theme,
            setTheme,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default Provider;

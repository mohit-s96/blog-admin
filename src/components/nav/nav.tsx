import React, { ReactElement } from "react";
import Navitem from "./navitem";
import { Blogs, Branding, Logout, Settings } from "../svg/svg.collection";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../provider/Provider";
import { getClasses } from "../../utils/classNameResolver";

function Nav(): ReactElement {
  const { logout } = useAuth();

  const { theme } = useTheme();

  return (
    <nav
      className={`sticky z-50 top-0 p-2 ${
        theme === "dark"
          ? "bg-accent-dark"
          : theme === "light"
          ? "bg-accent-light"
          : "bg-primary-neon"
      } flex justify-between items-center border-b-2 ${getClasses(
        "border",
        theme,
        "btn"
      )}`}
    >
      <Link to="/" className="cursor-pointer flex justify-center items-center" aria-label="home page">
        <Branding color={getClasses("nb", theme, "icon")} />
      </Link>
      <div className="flex justify-center items-center">
        <Navitem>
          <Blogs color={getClasses("nb", theme, "icon")} />
          <Link to="/" children="blogs" />
        </Navitem>
        <Navitem>
          <Settings color={getClasses("nb", theme, "icon")} />
          <Link to="/test" children="manage" />
        </Navitem>
        <Navitem callback={logout}>
          <Logout color={getClasses("nb", theme, "icon")} /> log out
        </Navitem>
      </div>
    </nav>
  );
}

export default Nav;

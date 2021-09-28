import React, { ReactElement } from "react";
import Navitem from "./navitem";
import { Blogs, Branding, Logout, Settings } from "../svg/svg.collection";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/Provider";

function Nav(): ReactElement {
  const { logout } = useAuth();

  return (
    <nav className="p-2 bg-primary-dark flex justify-between items-center border-b-2 border-cyan">
      <Link to="/" className="cursor-pointer flex justify-center items-center">
        <Branding color="cyan" />
      </Link>
      <div className="flex justify-center items-center">
        <Navitem>
          <Blogs color="cyan" /> Blogs
        </Navitem>
        <Navitem>
          <Settings color="cyan" /> Manage
        </Navitem>
        <Navitem callback={logout}>
          <Logout color="cyan" /> Log out
        </Navitem>
        <Navitem>
          <Link to="/create" children="Create" />
        </Navitem>
      </div>
    </nav>
  );
}

export default Nav;
